Instruction for Setting Up MariaDB Cluster (Excluding Step 3)

1: MariaDB Installation
Note: Perform this section on all cluster nodes.

Starting from version 10.1, MariaDB combines MariaDB Server and MariaDB Galera Server into one package. Therefore, installing mariadb-server is sufficient, and Galera and several dependencies will be installed automatically.

```bash
sudo apt install mariadb-server
```

Confirm the installation by entering "yes" when prompted.

Starting from MariaDB 10.4, the root user in MariaDB is created without a default password. To set a password, log in to MariaDB:

```bash
sudo mysql -uroot
```

In the MariaDB shell, run the following command to set a password:

```sql
set password = password("your_password");
```

You will see this output:

```sql
Query OK, 0 rows affected (0.001 sec)
```

Exit MariaDB:

```sql
quit;
```

Now, you have all the necessary components for cluster setup. Ensure that rsync is installed on the server:

```bash
sudo apt install rsync
```

This will install the latest version of rsync or prompt you to update your current installation.

2: Configuration of the First Node
All cluster nodes will use nearly identical configurations. You can configure one machine first and then copy its configuration to the other nodes.

By default, MariaDB checks the /etc/mysql/conf.d directory for additional configurations from .cnf files. Create such a file in this directory:

```bash
sudo nano /etc/mysql/conf.d/galera.cnf
```

Copy and paste the following code into it. This configuration specifies various cluster parameters, information about the current server and other servers in the cluster, as well as replication settings. Note that you should specify the internal IP addresses of your servers in the configuration.

```ini
[mysqld]
binlog_format=ROW
default-storage-engine=innodb
innodb_autoinc_lock_mode=2
bind-address=0.0.0.0

# Galera Provider Configuration
wsrep_on=ON
wsrep_provider=/usr/lib/galera/libgalera_smm.so

# Galera Cluster Configuration
wsrep_cluster_name="test_cluster"
wsrep_cluster_address="gcomm://First_Node_IP,Second_Node_IP,Third_Node_IP"

# Galera Synchronization Configuration
wsrep_sst_method=rsync

# Galera Node Configuration
wsrep_node_address="This_Node_IP"
wsrep_node_name="This_Node_Name"
```

The first section modifies or sets MariaDB/MySQL settings. Copy the content of this file to the clipboard, save, and close it.

Once the cluster configuration file is ready, copy its content to the clipboard, save, and close the file.

Now that you have successfully configured your first node, you can proceed to configure the remaining nodes.

4: Configuration of the Remaining Nodes
You need to create a configuration file on the other cluster nodes. Open the file:

```bash
sudo nano /etc/mysql/conf.d/galera.cnf
```

Paste the copied parameters into it. Adjust the Galera Node Configuration section to specify the IP address or domain name of the current node and choose a unique name for it.

```ini
# Galera Node Configuration
wsrep_node_address="This_Node_IP"
wsrep_node_name="This_Node_Name"
```

Save and close the file.

Repeat these steps for the remaining node.

The cluster is almost ready; you just need to open the ports in the firewall.

5: Firewall Configuration
Note: Perform this section on each cluster node.

At this stage, we will configure the firewall to open the ports necessary for communication between nodes.

Check the firewall status:

```bash
sudo ufw status
```

In this example, the command returns:

```
Status: active
To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
OpenSSH (v6)               ALLOW       Anywhere (v6)
```

Firewall rules on your server may differ. In this case, it only allows SSH. If you try to start the cluster now, it will be blocked by the firewall.

Galera uses four ports:

- 3306: For MySQL client connections and State Snapshot Transfer (using mysqldump method).
- 4567: For Galera Cluster replication and multicast replication over UDP and TCP.
- 4568: Incremental State Transfer.
- 4444: For other State Snapshot Transfer operations.

Open these ports:

```bash
sudo ufw allow 3306,4567,4568,4444/tcp
sudo ufw allow 4567/udp
```

Remember to repeat this on all other nodes.

Now, you can start the cluster.

6: Starting the Cluster
Start the MariaDB cluster. First, you need to stop the current MariaDB service.

Stopping the MariaDB Service
Note: Do this on all cluster nodes.

Stop the MariaDB service:

```bash
sudo systemctl stop mysql
```

The systemctl command may not display the results of some commands. To ensure the service is stopped, enter:

```bash
sudo systemctl status mysql
```

You will see:

```
systemd[1]: Stopped MariaDB 10.4.4 database server.
```

Starting the First Node
To start the first node, use a special boot script. According to the cluster settings, each started node will attempt to connect to at least one of the nodes listed in the galera.cnf file. Without the galera_new_cluster script, which allows systemd to send the --wsrep-new-cluster flag, the regular cluster start command won't work because there are currently no nodes to connect to.

```bash
sudo galera_new_cluster
```

After successfully running the script, the node registers as part of the cluster. To verify this, run:

```bash
mysql -u root -p -e "SHOW STATUS LIKE 'wsrep_cluster_size'"
```

You will see the output indicating that the cluster size is 1.

For the remaining nodes, you can use the standard mysql command. It will discover available cluster nodes and connect to them.

Starting the Second Node
To start the second node, run:

```bash
sudo systemctl start mysql
```

If the command runs successfully, there will be no output. The cluster size will increase with each additional node:

```bash
mysql -u root -p -e "SHOW STATUS LIKE 'wsrep_cluster_size'"
```

You will see the output indicating that the cluster size is now 2.

Starting the Third Node
Start the mysql command:

```bash
sudo systemctl start mysql
```

If the node starts successfully, the cluster size will increase:

```bash
mysql -u root -p -e "SHOW STATUS LIKE 'wsrep_cluster_size'"
```

You will see the output indicating that the cluster size is now 3.

Now the cluster is up and running, and the nodes can communicate with each other.
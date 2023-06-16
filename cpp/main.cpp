#include <iostream>
#include <map>
#include <string>

std::map<std::string, std::string> passwords;

void addPassword(const std::string& site, const std::string& password) {
    passwords[site] = password;
    std::cout << "Password added for site: " << site << std::endl;
}

void getPassword(const std::string& site) {
    auto it = passwords.find(site);
    if (it != passwords.end()) {
        std::cout << "Password for site " << site << ": " << it->second << std::endl;
    } else {
        std::cout << "No password found for site: " << site << std::endl;
    }
}

void printAllPasswords() {
    std::cout << "All stored passwords: " << std::endl;
    for (const auto& pair : passwords) {
        std::cout << "Site: " << pair.first << ", Password: " << pair.second << std::endl;
    }
}

int main() {
    std::cout << "Hello! Welcome to the password storage." << std::endl;

    while (true) {
        std::cout << "Choose an option:" << std::endl;
        std::cout << "1. Add password" << std::endl;
        std::cout << "2. Get password" << std::endl;
        std::cout << "3. Show all passwords" << std::endl;
        std::cout << "4. Exit" << std::endl;

        int choice;
        std::cin >> choice;

        switch (choice) {
            case 1: {
                std::cout << "Enter site name: ";
                std::string site;
                std::cin >> site;
                std::cout << "Enter password: ";
                std::string password;
                std::cin >> password;
                addPassword(site, password);
                break;
            }
            case 2: {
                std::cout << "Enter site name: ";
                std::string site;
                std::cin >> site;
                getPassword(site);
                break;
            }
            case 3:
                printAllPasswords();
                break;
            case 4:
                std::cout << "Exiting..." << std::endl;
                return 0;
            default:
                std::cout << "Invalid option. Please try again." << std::endl;
                break;
        }
    }

    return 0;
}
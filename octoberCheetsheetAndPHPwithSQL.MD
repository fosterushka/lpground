# translation for backend button in controller list_toolbar
```
<?= e(trans('backend::lang.form.create')) ?> 
```
====================
# showtree in config_list of controller 
```
# Show tree
showTree: true
treeExpanded: true
```
### RESULT
![result](https://raw.githubusercontent.com/idevmans/lpground/master/october-nested-tree.png)
====================
# download file with original name via routes lara-october
```
class download controll


use Illuminate\Support\Facades\Response;
use October\Rain\Support\Facades\File;
use Symfony\Component\HttpKernel\Exception\HttpException;

class DownloadController
{
    public function download($name): \Symfony\Component\HttpFoundation\Response
    {
        $filepath = temp_path('public/' . $name);

        if (!file_exists($filepath)) {
            throw new HttpException(404, 'File not found');
        }

        $headers = Response::download($filepath, $name)->headers->all();
        $response = Response::make(File::get($filepath), 200, $headers);

        @File::delete($filepath);
        return $response;
    }
}

route

Route::get('/download-file/{name}', '\Wms\Crm\Classes\DownloadController@download');
```
# Work with realtionships and rendering relation manager 
https://octobercms.com/docs/backend/relations#extend-view-widget

# Category for backend settings
https://github.com/octobercms/october/blob/develop/modules/system/classes/SettingsManager.php

# Merging config when you extend controller
```
Controller::extend(function($controller) {
            if (!in_array('Backend.Behaviors.RelationController',$controller->implement)) {
                $controller->implement[] = 'Backend.Behaviors.RelationController';
            }
            if (!isset($controller->relationConfig)) {
                $controller->addDynamicProperty('relationConfig');
            }
            $myConfigPath = '$/vendor/plugin/controllers/nameController/config_relation.yaml';


            $controller->relationConfig = $controller->mergeConfig(
                $controller->relationConfig,
                $myConfigPath
            );

        });
```

# Plural declinsion for count words
https://graker.ru/news/2018/01/21/octobercms-pluralize



#sql radius for closest point
```$lat = 41.118491 // user's latitude
$lng = 25.404509 // user's longitude

SELECT *, 
( 6371 * acos( cos( radians($lat) ) 
* cos( radians( latitude ) ) 
* cos( radians( longitude ) - radians($lng) ) + sin( radians($lat) ) 
* sin( radians( latitude ) ) ) ) 
AS calculated_distance 
FROM settings as T 
HAVING calculated_distance <= (SELECT distance FROM settings WHERE sid=T.sid) 
ORDER BY distance_calc```

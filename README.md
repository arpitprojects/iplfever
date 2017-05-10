# Ipl Fever

- A web app on the ipl dataset, provided in question.
- This is not standard template readme.md, rather has all the details of app.



### Find codes/app below : 


```sh
Find :   https://iplfever.herokuapp.com
```

```sh
Codes :   https://github.com/arpitprojects/iplfever
```
## Tech

##### - Web app front end is completely based on vue.js@2 and webpack-simple.
 - Front end/ UI based on the Material design, based on materializecss framework and it has two files stylesheet and javascript files.
 - For generating chart, Highcharts.js is used, we have a css file, js file.
 - ###### Additional file of- Highcharts is used to make 3D graphs and export.js for exporting the data.
 - It has a material icons cdn imported for the designing of UI.
 - It uses PAPAPARSE for importing the approx(1.4 lac) row data on DOM(deliveries.js).

## Folder Structure and description
- App has the index.html folder on the root that is served when app is running.
- Web app is based on the Vue.js with webpack-simple, where there is a src folder.
- /src - has routes.js for the SinglePageWEbApp route ,then -main.js where all the components 
has the description and VUE RESOURCE, VUE ROUTES are binded to components and also served for build.js, for running the applications.
- /components folder which is the route's files .vue file where all the html, components are written for making charts and various js manupilations.
- /vendors has css, js , img folder that has all external libraries used (earlier discussed).
- /resources folder has css folder - reset.css to remove all browser default padding margin ,and of tags , 
	main.css has all major (non-scoped) css files apart from used on .vue files.
- /data folder has .csv files provided in the question.
- /dist folder has the production code build.js running on the server.
- node_moudules has all the package.

# Bonus points completed!

 - App is completely in VUE.JS@2 and webpack-simple, with all the .vue files and components duly modularised.
 - App is responsive, can be check in mobo devices, but some graphs may look very small in small window.
 - I tried to optimize loading time but in second deliveries.csv , 1.4 lacs rows hadling that on a web document was tough, and trying to manupilating it for various json has big time complexity , trying to optimize that!!

# Bonus point left:
-   The progressive web app, itself has the feature of
-   Making an app offline, by making service_worker.js files, and adding to main.js easily be tested through latest version of Chrome canary application console tab.
-   manifest.json file can make the progressive app features like ADD TO HOMESCREEN etc, 
-   I got little sort of time.

## How app was made:
    - I started with the setting up the vue.js with webpack-simple and setting up the folder and files structure.
    - Second step was to find the dependency/libraries to find, how to use efficient libraries and setting up.
    - Third thing was setting up the data folder with the csv files, analysing that also noting down the possiblities/ manupilations.
    - Forth, setting up the routes and testing the vue-resources and vue-routes and http protocols.
    - Fifth the actually making various components and and connecting them with the routes in main.js and then, I made the basic layout that also supports reponsiveness along with color combination tried on material.io/tools, 
    - Then I started testing some of the graph, and how to set functionality.
    - I,then set up the color, model of the various graphs and layout, text-color.
    
    - > The best challenge on the whole app was the importing 1.4 lac data .csv file to the DOM, therefore i used papa parse to import.
    - Even single loop on the grpah was taking hell lot of time.
    - Best way to my mind is to use mongodb , I am trying to make that but time is little less.
    
# Run the app locally 

```sh
git clone https://github.com/arpitprojects/iplfever.git / or DOWNLOAD
```
```
use npm run dev or npm start
```


### Future Scope 
- Working on the making app progressive, also offline usage, and homescreen adding etc.
- Service Worker, manifest.json file making is the future scope.

## Know about me 
- arpitanand.tk
- github.com/arpitprojects
- arpit.engghelp@gmail.com

License
----
None

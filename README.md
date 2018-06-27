This application has the following components:
- Node.js server that loads GTFS and exposes an API with the subway stops.
- Frontend App that shows all the stops on a map (developed using jquery/AJAX).

To start the application, run server first (in project directory):

# `node server.js`

Server listens to http://localhost:3001<br>
Open index.html on a browser to see the web application.<br>
The web app has been successfully tested in Chrome and Firefox.

## Folder Structure
```
jquery/
  README.md
  node_modules/
  package.json
  data/
      GTRFs (text files)
  assets/
    images/
      icon.png
  css/
    app.css
    markerstyle.css
  js/
    app.js
  index.html
  server.js
```

Files & Folders
* `server.js`: Nodejs server.
* `index.html`: web page.
* `app.css`: css for the web page.
* `markerstyle.css`: css for clustering.
* `app.js`: script for the web page.

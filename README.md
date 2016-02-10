# Instructions for using the plugin

1. First navigate to the searchblox installation and go to `searchblox/webapps/searchblox`
2. Clone the repo and place the `plugin` folder in this directory.
3. Now you can access the plugin as follows `http://localhost:8080/searchblox/plugin/index.html`
4. Make sure you enable CORS for elastic search for the plugin. This can be done by adding these 2 config options in your `elasticsearch.yml` file. In searchblox this file is located in `searchblox/webapps/searchblox/WEB-INF`
    ```sh
    - http.cors.enabled : true
    - http.cors.allow-origin : /https?:\/\/localhost(:[0-9]+)?/
     ```

* http.cors.enabled : Enable or disable cross-origin resource sharing, i.e. whether a browser on another origin can do requests to Elasticsearch. Defaults to false.

* http.cors.allow-origin: Which origins to allow. Defaults to *, i.e. any origin. If you prepend and append a / to the value, this will be treated as a regular expression, allowing you to support HTTP and HTTPs. for example using /https?:\/\/localhost(:[0-9]+)?/ would return the request header appropriately in both cases.
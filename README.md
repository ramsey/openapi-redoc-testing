# OpenAPI Redoc Testing

## Running

1. Make sure gulp-cli is installed: `npm install gulp-cli -g`

2. Run `npm install`

3. Run `gulp` to watch the YAML files for changes and to run the web server

4. Load <http://localhost:9000> in a browser to view your changes

## ReDoc Error

I receive the following error from ReDoc when I run this repository as-is:

![ReDoc Error Screenshot](https://raw.githubusercontent.com/ramsey/openapi-redoc-testing/master/redoc-error.png)

However, if I move the path schemas to the main `openapi/openapi.yaml` file,
then ReDoc loads properly.

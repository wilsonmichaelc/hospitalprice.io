# Hospitalprice

Angualar UI for searching hospital prices. Due to the limitations of MySQL full text searching, the results are not fantastic. But its a start.

The data was extracted from [dolthub](https://www.dolthub.com/repositories/dolthub/hospital-price-transparency) and inserted into a MySQL database.

There are 2 php files here which provide the basic searching of hospitals by city and prices by hospital number and text query.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4300/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

There are no unit tests yet...
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

There are no e2e tests yet...
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

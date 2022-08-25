# NTERSOL React Starter app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It has not been ejected (read about ejecting [here](https://create-react-app.dev/docs/available-scripts/#npm-run-eject)).
One of the usual reasons for ejecting is to when a new feature requires a change
to the webpack configuration.  But alternatives to ejecting should be explored first.

## Installing and Running

### Prerequisits

* Install [nvm](https://github.com/nvm-sh/nvm)
* Install Node 16 (`nvm install 16`)

### `nvm use`
Chooses the version of node specified in the `.nvmrc`

### `npm install`
Self-explanatory.
### `npm run start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

One of the great things about a bundled build is you can host it on a simple AWS S3 bucket
(or the equivalents for Azure, GCP).  Saves you money on standing up a Linux server
on EC2 etc.

## Features

Considered for future inclusion:

* Overview:  React app page flow
* Redux
* Router
* Context API
* Express server with proxy
* REST service call with fetch examples
* autocomplete widget
* infinite scroll widget
* CSS libraries (SASS, classnames package, react css modules)
* A form library (Formik, react-hook-form)
* A UI library (material-ui, tailwind)
* Linting setup for IDEs (VSCode, Webstorm)
* Testing framework
* Helmet
* Adding a favicon


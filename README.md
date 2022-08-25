# NTERSOL React Starter app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It has not been ejected (read about ejecting [here](https://create-react-app.dev/docs/available-scripts/#npm-run-eject)).
One of the usual reasons for ejecting is to when a new feature requires a change
to the webpack configuration.  But alternatives to ejecting should be explored first.

## Installing and Running

### Prerequisits

* Install [nvm](https://github.com/nvm-sh/nvm)
* Install the correct Node Version (see the `nvmrc` file)

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

BELOW HERE:  added features

## Linting Setup
These packages are added to `devDependencies`:   
> eslint, eslint-config-standard, eslint-config-standard-jsx, 
eslint-config-standard-react, eslint-plugin-import, eslint-plugin-json, eslint-plugin-n, eslint-plugin-node, eslint-plugin-promise, eslint-plugin-react, prettier


### Linting IDE Setup: Webstorm
1. Preferences -> Languages & Frameworks -> JavaScript -> Code Quality Tools -> ESLint
2. Selecting the `Automatic ESLing Configuration` radio button should be sufficient
3. Check the box if you want ESLint fixing on save

If you would like a keystroke to fire off your ESLint fixing:

1. Preferences -> Keymap -> Plugins -> Javascript and TypeScript, double-click on item "Fix ESLint Problems", select "Add Keyboard Shortcut" and type in your shortcut.  Mine is ctrl-Shift-L.

### Linting IDE Setup: VSCode
1. In the left rail, click the Extensions icon
2. In the search field, type eslint.  The `ESLint` extension should come up.  If not installed, press the blue `Install` button
3. Open VSCode settings (cmd-comma on a Mac).  It the left rail, Open `Extensions` and click on *ESLint*.
4. Press the checkbox under `Eslint: Enable`
5. Under `Eslint: Run` select the *onSave* option.


> 
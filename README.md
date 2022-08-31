# NTERSOL React Starter app

This application is a series of demos of various features of React that can help jump start an application.  One can pick and choose from the features list for your apps needs.

## Installing and Running

### Prerequisites

* Install [nvm](https://github.com/nvm-sh/nvm)
* Install the Node Version given in the `.nvmrc` file.

### `nvm use`
Chooses the version of node specified in the `.nvmrc`

### `npm install`
Self-explanatory.
### `npm run start`
Runs the app in the development mode.
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

One of the great things about a bundled build is you can host it on a simple AWS S3 bucket
(or the equivalents for Azure, GCP).  Saves you money on standing up a Linux server
on EC2 etc.

## Features

Considered for future inclusion:

* &check; <del>Linting setup for IDEs (VSCode, Webstorm)</del>
* &check; <del>Router</del>
* &check; <del>React Helmet</del>
* &check; <del>Context API</del>
* &check; <del>react css modules</del>
* &check; <del>CSS classnames package</del>
* &check; <del>REST service call with fetch examples</del>
* &check; <del>Form validation with react-hook-form</del>
* &check; <del>Paginated tabular data with Material-UI</del>
* &check; <del>Adding a favicon</del> 
* &check; <del>Redux</del>
* Overview in README:  React app page flow
* Express server with proxy
* autocomplete widget
* infinite scroll widget
* SASS library
* Testing framework


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
> The instructions below are incomplete and need to be improved by
> someone who knows VSCode well.

1. In the left rail, click the Extensions icon
2. In the search field, type eslint.  The `ESLint` extension should come up.  If not installed, press the blue `Install` button
3. Open VSCode settings (cmd-comma on a Mac).  It the left rail, Open `Extensions` and click on *ESLint*.
4. Press the checkbox under `Eslint: Enable`
5. Under `Eslint: Run` select the *onSave* option.

## React Routing
React Routing is used throughout for defining 'pages' and generating links to them.  It takes advantage of &lt;NavLink&gt;'s ability to style the currently selected link.

## CSS modules
React CSS modules are used to namespace the CSS and prevent any component's styles from polluting the styles of others.  CSS files become modules when you name them `xxxx.module.css`.  See the code for the convention of declaring and referencing your styles.

When you view the source, you will notice that the css class names and id's have been decorated with additional characters.  Example: `App_link__xYAAD`.  

## CSS classnames package
The [classnames](https://www.npmjs.com/package/classnames) package is in use in the `Paginated, Tabular Data` demo. 

## Helmet
`react-helmet-async` solves the inherent problem of SPAs where all 'pages' inherit the HTML &lt;title&gt; of the main App.  Helmet allows you to set the title for each component individually.  You would want to have a &lt;Helmet&gt; element for a component that has a route assigned to it, not to components instantiated by composition.

The original `react-helmet` is buggy.

## Naming convention for components
This app is using the widely-used approach of:

1. Creating a folder for the component beginning lower case, e.g. `myComponent`
2. The file for the component itself is named `index.html`.  The exported Component will begin upper case, e.g. `MyComponent`

This is by no means the universal approach, so considering others is certainly an option.

## Context API
The demo `Shared data via Context API` shows two unrelated components who have access to items from a Context API instance: some JSON data, and a method for rendering it.  The title prefixes used by `Helmet` are also obtained this way.  The implementation steps are:

(1) Create `StarterContext.js` (src/containers/App)

(2) In the App container, import it: `import { StarterProvider } from './StarterContext'

(3) In App's return value, wrap the HTML output with &lt;StarterContext&lt;:

```
    <Router>
       ...other stuff here...
          <StarterProvider>
             ...your HTML here...
          </StarterProvider>
       ...
    </Router>
```
(4) Repeat sep 2 for each component that needs the provider

(5) In each component retrieve the item you need: `  const { HTMLtitlePre } = useContext(StarterContext)`



Context API is simpler and lighter weight than Redux for sharing read-only contents.

## Passing styles to a component via props
The `Shared data via Context API` demonstrates this.

## REST service call with fetch()
This is now part of the `Shared data via Context API` demo.

## React Hooks
All components and containers are function based, so any of them can support hooks.

The `Shared data via Context API` demo uses the `useEffect()` and `useState()` hooks.

## Container/Component composition
&lt;App&gt; and &lt;ContextDemo&gt; are designated as *Containers* because they compose *Components* inside them.

## Form Validation
The library used for this demo is `react-hook-form`.

## Paginated, Tabular Data
This example uses [material-react-table](https://www.material-react-table.com/) which is in 
turn based on [material-ui (a.k.a. MUI)](https://mui.com/).  The packages added to `Dependencies` are:

> @mui/material, @mui/icons-material, @emotion/react, @emotion/styled,  material-react-table

## favicon
An NTERSOL favicon as added, look for it in your browser tabs.

The approach was to take a small logo from [Company Images](https://ntersol.atlassian.net/wiki/spaces/NTER/pages/98566145/Company+Images)
and pass it to the online [Favicon Generator](https://favicon.io/favicon-converter/).  The images it produced
were all copied into `public`, they are:

> android-chrome-192x192.png, favicon.ico, android-chrome-512x512.png, index.html, apple-touch-icon.png		manifest.json
favicon-16x16.png, favicon-32x32.png

...and these lines were added to `public/index.html`:

```
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <LINK REL="SHORTCUT ICON" HREF="%PUBLIC_URL%/favicon.ico?v=2" type="image/x-icon" />

```

## Redux
This demo uses the [hooks version of Redux](https://react-redux.js.org/api/hooks).

The packages added are:

>  react-redux, react-router-dom, redux, redux-thunk

The definition of the state we are managing in Redux resides in `src/redux`.  For further information, try [Getting Started with Redux](https://redux.js.org/introduction/getting-started).

The top level `App` component needs to be wrapped with &lt;Provider&gt;:

```
    import { Provider } from 'react-redux'
    import store from './redux/store'
    ...
    <Provider store={store}>
      <App />
    </Provider>
```

Clients who need to read the Redux state:

```
  import { useSelector } from 'react-redux'
  ...
  const ourStore = useSelector(state => state.ourReducer)
  const { ourValue }= ourStore.state
```

Clients who need to write the state:

```
  import { useDispatch } from 'react-redux'
  import { setGlobalState } from '../../redux/actions'
  ...
  const dispatch = useDispatch()
  const valueToSet = 'foo'
  dispatch(setGlobalState({ state: { ourValue: valueToSet } }))
``` 
The names *setGlobalState*, *state*, *ourStore*, *ourValue*, etc. are all arbitrary and should be selected according to the meaning they have in your app.

## Misc Notes
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It has not been ejected (read about ejecting [here](https://create-react-app.dev/docs/available-scripts/#npm-run-eject)).
One of the usual reasons for ejecting is to when a new feature requires a change
to the webpack configuration.  But alternatives to ejecting should be explored first.


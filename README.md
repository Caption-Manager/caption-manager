<p align="center">
  <a href="" rel="noopener">
 <img width="300" height="300" src="https://i.imgur.com/Fwei51k.jpg" alt="Caption Manager Logo"></a>
</p>

<div>
  This repository contains source code for <b>Caption Manager</b>, an add-on that brings the power of captions to Google Docs. It was created using the one and only <a href="https://github.com/enuchi/React-Google-Apps-Script">React-Google-Apps-Script</a> boilerplate code (thanks 🎉), allowing the development of software using tools like <a href="https://www.typescriptlang.org/" target="_blank">Typescript</a>, <a href="https://reactjs.org/" target="_blank">React</a> & <a href="https://webpack.js.org/" target="_blank">Webpack</a>. This document describes issues relevant to code development. If you just want to learn how to use the add-on, go to <a href="https://caption-manager.com/" target="_blank">https://caption-manager.com/</a>. The structure and much of the instructions in this document were copied or adapted from <a href="https://github.com/enuchi/React-Google-Apps-Script" target="_blank">https://github.com/enuchi/React-Google-Apps-Script</a>.
 </div>


---

## 📝 Table of Contents

- [About](#about)
- [Install](#install)
  - [Prerequisites](#prerequisites)
  - [Getting started](#getting-started)
- [Development](#development)
  - [Local Development](#local-development)
  - [Production Development](#production-development)
  - [Deployment](#deployment)
- [Usage](#usage)
  - [Adding packages](#adding-packages)
  - [Styles](#styles)
  - [Modifying scopes](#modifying-scopes)
  - [Calling server-side Google Apps Script functions](#calling-server-side-google-apps-script-functions)
  - [Autocomplete](#autocomplete)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

<br/>

## 🔎 About <a name = "about"></a>

[Google Apps Script](https://developers.google.com/apps-script/overview) is Google's Javascript-based development platform for building applications and add-ons for Google Sheets, Docs, Forms and other Google Apps. You can add custom [user interfaces inside dialog windows](https://developers.google.com/apps-script/guides/html), but the platform is designed for simple HTML pages built with [templates](https://developers.google.com/apps-script/guides/html/templates) and [jQuery](https://developers.google.com/apps-script/guides/html/best-practices#take_advantage_of_jquery).
However, using this repo, it's easy to run [React](https://reactjs.org/) apps inside these dialogs, and build everything from small projects to advanced add-ons that can be published on the G Suite Marketplace. This repo is a boilerplate project that uses React and the same development tools that you use for building traditional websites, all inside Google Apps Script projects. See below to understand how the code is structured.

<br/>

## 🚜 Installation <a name = "install"></a>

These instructions will get you set up with a copy of the React project code on your local machine. It will also get you logged in to `clasp` so you can manage script projects from the command line.

### Prerequisites <a name = "prerequisites"></a>

- Make sure you're running at least [Node.js](https://nodejs.org/en/download/) v10 and `npm` v6.

- You'll need to enable the Google Apps Script API. You can do that by visiting [script.google.com/home/usersettings](https://script.google.com/home/usersettings).

- To use live reload while developing, you'll need to configure certificates. See [local development](#local-development) below for how to set up your local environment.

### 🏁 Getting started <a name = "getting-started"></a>

**1.** First, let's clone the repo and install the dependencies.

```bash
git clone https://github.com/Caption-Manager/caption-manager.git
cd caption-manager
npm install
```

**2.** Next, we'll need to log in to [clasp](https://github.com/google/clasp), which lets us manage our Google Apps Script projects locally.

```bash
clasp login
```

**3.** Now edit the clasp.json file with the following three key/value pairs:

```json
{
  "scriptId": "1PY037hPcy................................................",
  "parentId": ["1Df30......................................."],
  "rootDir": "./dist"
}
```

- `scriptId`: An existing script project's `scriptId`. You can find it by opening a Google App Script file, selecting  **File > Project properties**, and it will be listed as "Script ID".

- `parentId`: An array with a single string, the ID of the parent file (spreadsheet, doc, etc.) that the script project is bound to, if any. You can get this ID from the url, where the format is usually `https://docs.google.com/document/d/{id}/edit`. This allows you to run `clasp open --addon` and open your file directly from the command line. This is not needed if your are developing using a [standalone](#https://developers.google.com/apps-script/guides/standalone) project.

- `rootDir`: This should be `"./dist"`, i.e. the local build folder that is configure in Webpack to store project files.

<br/>

## 🚀 Development <a name = "development"></a>
There are two ways to develop the application: local and production mode. 

In local mode, any changes to the client-side code are seen directly in your Google Document views (Sidebar, Modals or wherever we are developing). But if you make a change to the server-side code, you will need to restart the terminal and run the command "npm start" (see [Local Development](#local-development) below) again. 

In production mode, changes to the client or server-side code will only take effect by restarting or terminating and running the command "npm run push:prod" (see [Production Development](#production-development) below) again. Production mode is actually only useful for deployment (see [Deployment](#deployment) below) or if you are not able to install the certificates to develop in local mode.

###  Local Development <a name="local-development"></a>

We can develop our client-side React apps locally, and see our changes directly inside our Google Document views (Sidebar, Modals or wherever we are developing). There are two steps to getting started: installing a certificate (first time only), and running the start command.

1. Generating a certificate for local development <a name = "generatingcerts"></a>

   Install the mkcert package:

   ```bash
   # mac:
   brew install mkcert

   # windows:
   choco install mkcert
   ```

   [More install options here.](https://github.com/FiloSottile/mkcert#installation)

   Then run the mkcert install script:

   ```bash
   mkcert -install
   ```

   Create the certs in your repo:

   ```
   npm run setup:https
   ```

2. Now you're ready to start:
   ```bash
   npm run start
   ```

The start command will create and push a development build, and serve your local files.
After running the start command, navigate to your document and open one the menu items. It should now be serving your local files. When you make and save changes to your React app, your app will reload instantly within the Google Document, and have access to any server-side functions! Support for [Fast Refresh](https://github.com/pmmmwh/react-refresh-webpack-plugin) now means that only modified components are refreshed when files are changed, and state is not lost.

After creating the certificates, just run "npm run start" again anytime you need to develop using local mode.
<br/>

### Production Development <a name = "production-development"></a>

Developing the app in production mode means you need to run "npm run push:prod" anytime you make any type of change in your app. Local development is recommended, but production mode is needed if you can't configure the certificates (and, right now, as a manual step to deploy the app).
<br />

### Deployment <a name = "deployment"></a>

Deployment is the process of sending the code to production (i.e the code that will effectively be used as source code for the add-on). Unfortunately, currently the deployment process is quite manual and a bit confusing (but there are plans to change this). You have to do these steps:

**1.** Change the "scriptId" of the .clasp.json to be the one that matches your [standalone](#https://developers.google.com/apps-script/guides/standalone) apps script project (add-ons must be deployed as standalone projects) 

**2.** Generate the production build. Run:

```bash
npm run push:prod
```

As before, this command will build all necessary files using production settings. All bundled files will be outputted to the `dist/` folder, then pushed to the standalone Google Apps Script project specified. 

**3.** Create a versioned deployment on Google App Script editor. Follow the steps specified on [https://developers.google.com/apps-script/concepts/deployments#create_a_versioned_deployment](#https://developers.google.com/apps-script/concepts/deployments#create_a_versioned_deployment).
(I think) this will make the code for your add-on be updated to the users.
<br/>


## ⛏️ Usage <a name = "Usage"></a>

### Semantic UI React
This project is developed using this library as the only production dependency in addition to React. You can see the documentation at [https://react.semantic-ui.com/](#https://react.semantic-ui.com/). 

### Typescript

Currently, it is okay to have a mix of javascript and typescript. The plan is to change this and only support Typescript on the entire project.

A basic typescript configuration is used here, because after code is transpiled from typescript to javascript it is once again transpiled to code that is compatible with Google Apps Script. However, if you want more control over your setup you can modify the included [tsconfig.json file](./tsconfig.json).

### Adding packages

You can add packages to your client-side React app.

For instance, install `react-transition-group` from npm:

```bash
npm install semantic-ui-react semantic-ui-css
```

Important: Since Google Apps Scripts projects don't let you easily reference external files, this project will bundle an entire app into one HTML file. This can result in large files if you are importing large packages. To help split up the files, you can grab a CDN url for your package and declare it in the [webpack file, here](./webpack.config.js#L170). If set up properly, this will add a script tag that will load packages from a CDN, reducing your bundle size. The proper setup requires finding a global variable exposed by the CDN code given as a string to the "var" object property - you must inspect the CDN code and find this global variable, if any.

### Styles

By default this project supports global CSS stylesheets. Make sure to import your stylesheet in your entrypoint file [index.js](./src/client/dialog-demo/index.js):

```javascript
import './styles.css';
```

You can also import stylesheets in the HTML templates, like:
```html
<!DOCTYPE html>
<html>
  <head>
    <base target="_top" />
    <!-- CSS Package for Semantic UI React -->
    <link
      async
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
      />
  </head>
  <body>
    <section id="index">
      <!-- Bundled React code will appear here on build -->
    </section>
  </body>
</html>
```
The webpack.config.js file can also be modified to support scss and other style libraries.

### Modifying scopes

Currently, the included app only requires access to the current Google Document and to using Google UI's. Make sure to edit the oauthScopes in the [appscript.json file](./appsscript.json) properly if need to.

See https://developers.google.com/apps-script/manifest for information on the `appsscript.json` structure.

### Calling server-side Google Apps Script functions

This project uses the [gas-client](https://github.com/enuchi/gas-client) package to more easily call server-side functions using promises.

```js
// Google's documentation wants you to do this. Boo.
google.script.run
  .withSuccessHandler(response => doSomething(response))
  .withFailureHandler(err => handleError(err))
  .addSheet(sheetTitle);

// Poof! With a little magic we can now do this:
import Server from 'gas-client';
const { serverFunctions } = new Server();

// We now have access to all our server functions, which return promises!
serverFunctions
  .addSheet(sheetTitle)
  .then(response => doSomething(response))
  .catch(err => handleError(err));

// Or we can equally use async/await style:
async () => {
  try {
    const response = await serverFunctions.addSheet(sheetTitle);
    doSomething(response);
  } catch (err) {
    handleError(err);
  }
};
```

In development, `gas-client` will interact with [the custom Webpack Dev Server package](https://github.com/enuchi/Google-Apps-Script-Webpack-Dev-Server) which allows us to run our app within the dialog window and still interact with Google Apps Script functions.

### Autocomplete

This project includes support for autocompletion and complete type definitions for Google Apps Script methods.

All available methods from the Google Apps Script API are shown with full definitions and links to the official documentation, plus information on argument, return type and sample code.

<br/>

## ✍️ Authors <a name = "authors"></a>

- [@leonardolombardi07](https://github.com/leonardolombardi07) - Creator of this add-on
- ...loading
<br/>

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

Again, thanks a lot to the creator of [React-Google-Apps-Script](https://github.com/enuchi/React-Google-Apps-Script/contributors) [apps-script-starter](https://github.com/labnol/apps-script-starter), [@enuchi](https://github.com/enuchi). 

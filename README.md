## Ellipse.IO

The "Ellipse.IO" project is a mobile application designed to connect an Android mobile device with a fitness bracelet to track health indicators. These indicators are sent to the server for further monitoring of the patient's health and diagnostics of seizures and are displayed for the doctor in the web application

The Ellipse-Admin-Panel is designed to process data and interact with data transmitted from a fitness bracelet.

Dashboard to interact with patient data, built with React, JavaScript and CSS.

Graphics Library

-     material-ui/core
-     material-ui/icons
-     material-ui/lab

Libraries

- web-socket
-     axios
-     js-cookie
-     material-ui-phone-number
-     react
-     react-auth-kit
-     react-dom
-     react-router-dom
-     react-scripts
-     recharts

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`

To Run Test Suite:

`npm test`

To Start Server:

`npm start`

To Visit App:

`localhost:3000/`

## Project Status

This project is currently under development. Administrators can filter patients and see a visual representation of the data.

## Project Screen Shot(s)

#### Login Page

![alt tag](https://i.imgur.com/u5DKw7Q.png)

#### Users Page

![alt tag](https://i.imgur.com/qEczGIo.png)

## Directory Structure

```
│   App.js
│   index.js
│   Routes.js
│   serviceWorker.js
│   setupTests.js
│
└───components
    ├───dashboard
    │       BarHealth.js
    │       ChartHealth.js
    │       NotesUser.js
    │       SettingDashboard.js
    │       UserHealthDashbord.js
    │       UsersList.js
    │
    ├───interface
    │       NavList.js
    │       ThemeSwitch.js
    │       TittleNav.js
    │
    ├───login
    │       Login.js
    │
    └───profile
            AddUser.js
            DeleteUser.js
            EditCurrentUser.js
```

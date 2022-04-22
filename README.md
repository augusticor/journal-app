# 📓 Journal App 📓

## Content
* [Description](#description)
* [Project Tech Stack](#project-tech-stack)
* [How to use this project ?](#how-to-use-this-project-)
  * [Development / Production mode](development/production-mode)
  * [Testing mode](testing-mode)
* [Dependencies](#dependencies)
  * [Main dependencies](#main-dependencies)
  * [Dev dependencies](#development-dependencies)
* [Available Scripts](#available-scripts)
  * [npm start](#npm-start)
  * [npm test](#npm-test)

## Description

This is a minimalist Journaling web application for writing down your thoughts or what happened during your day. Create a profile and start creating notes, the app has multiple features like :

- Creating a text note
- Adding an image to a note
- Showing the list of notes
- Display the note creation date
- Save your notes and open them whenever you want
- Focus mode (hide the note's list)

Here is how the web app looks like :

![capture](public/capture.JPG)

---

## Project tech stack

Journal App was made using the library [Reactjs](https://reactjs.org/)  for building the User Interface and other utilities like react hooks, [Redux](https://redux.js.org/) for the application state management and finally [React Router v6](https://reactrouter.com/) for routes manipulation.

On the other hand for media storage like the notes images, [Cloudinary](https://cloudinary.com/) was the choosen solution. For database was used the [Firestore Database](https://firebase.google.com/docs/firestore) from Firebase and also from Firebase was used [Firebase Authentication](https://firebase.google.com/docs/auth) for user authentication.

For devops was used [GitHub Actions](https://github.com/features/actions) for running the app tests every time a commit was pushed to the main branch and ensure all the tests passed. Check the "yml" configuration file at [journalapp.js.yml](.github/workflows/journalapp.js.yml).

Finally for testing the app were used multiple tools like [Jest](https://jestjs.io/), [Enzyme](https://enzymejs.github.io/enzyme/) with the [Enzyme Adapter](npmjs.com/package/@wojtekmaj/enzyme-adapter-react-17) for react 17 and [Enzyme to JSON](https://www.npmjs.com/package/enzyme-to-json) and at last [Redux Mock Store](https://github.com/reduxjs/redux-mock-store) for creating store mocks at tests.

## How to use this project ?

You can use this project by two ways, Development/Production mode where you can create a profile and notes, or the Testing mode for test the application using the terminal and ***npm test*** command. One mode does not depend on the other so you can use it independently.

Note: You have to create a **.env.*** file for each mode because you need to save the environment variables related to APIKEYS and Secrets of Firebase or Cloudinary depending on the mode you run the app. These files are created in the project base directory.

### Development/Production mode

1. Create a new project on [Firebase console](https://console.firebase.google.com/u/0/) and configure the *Firestore Database* to `write if true` (allow anyone to write) and also configure the *Authentication* sign-in options to "Sign-in with Google" and with "Email and password".
2. Prepare your firebase "app credentials and keys" for the following step. Also create a [Cloudinary](https://cloudinary.com/) account and get your "credentials" to connect the Journal App with Firebase and Cloudinary.
3. Create a file in the project base directory named **.env.development** and using the information of the previous step fill in the following variables :

```
REACT_APP_SEED=Hello development world !
REACT_APP_APIKEY=YOUR_APIKEY_FROM_FIREBASE
REACT_APP_AUTHDOMAIN=YOUR_AUTHDOMAIN_FROM_FIREBASE
REACT_APP_PROJECTID=YOUR_PROJECTID_FROM_FIREBASE
REACT_APP_STORAGEBUCKET=YOUR_STORAGEBUCKET_FROM_FIREBASE
REACT_APP_MESSAGINGSENDERID=YOUR_MESSAGINGSENDERID_FROM_FIREBASE
REACT_APP_APPID=YOUR_APPID_FROM_FIREBASE

REACT_APP_CLOUDINARYURL=YOUR_CLOUDINARY_UPLOAD_URL( may look like this one https://api.cloudinary.com/v1_1/YOURCLOUDNAME/image/upload)
```

4. Open a command terminal in the project directory and run the command ***npm install*** to install the [main dependencies](#main-dependencies) of the project.
5. Save all and use the [npm start](#npm-start) command in the terminal to start the project.

### Testing mode

Note: If you already have created and configured the Firebase App and the Cloudinary account you can use those same credentials for the Test environment variables, or create a new Firebase App just for testing to separate the firebase testing database and auth from the firebase dev app.

1. Create a new project on [Firebase console](https://console.firebase.google.com/u/0/) and configure the *Firestore Database* to `write if true` (allow anyone to write) and also configure the *Authentication* sign-in options to "Sign-in with Google" and with "Email and password".
2. Prepare your firebase "app credentials and keys" for the following step. Also create a [Cloudinary](https://cloudinary.com/) account and get your "credentials" to connect the Journal App with Firebase and Cloudinary.
3. Create a file in the project base directory named **.env.test** and using the information of the previous step fill in the following test environment variables :

```
REACT_APP_SEED=Hello testing world !
REACT_APP_APIKEY=YOUR_APIKEY_FROM_FIREBASE
REACT_APP_AUTHDOMAIN=YOUR_AUTHDOMAIN_FROM_FIREBASE
REACT_APP_PROJECTID=YOUR_PROJECTID_FROM_FIREBASE
REACT_APP_STORAGEBUCKET=YOUR_STORAGEBUCKET_FROM_FIREBASE
REACT_APP_MESSAGINGSENDERID=YOUR_MESSAGINGSENDERID_FROM_FIREBASE
REACT_APP_APPID=YOUR_APPID_FROM_FIREBASE

REACT_APP_CLOUD_NAME=YOUR_CLOUD_NAME_FROM_CLOUDINARY
REACT_APP_API_KEY=YOUR_API_KEY_FROM_CLOUDINARY
REACT_APP_API_SECRET=YOUR_API_SECRET_FROM_CLOUDINARY
REACT_APP_SECURE=true
REACT_APP_CLOUDINARYURL=YOUR_CLOUDINARY_UPLOAD_URL( may look like this one https://api.cloudinary.com/v1_1/YOURCLOUDNAME/image/upload)
```

4. Open a command terminal in the project directory and run the command ***npm install --include=dev*** to install both the [main dependencies](#main-dependencies) and the [development dependencies](#development-dependencies) of the project.
5. Save all and use the [npm test](#npm-test) command in the terminal to start TESTING the project.

## Dependencies

The project has multiple dependencies but the main are the basics for the project to work. The development dependencies are not strictly necessary to the project to work just for testing.

### Main dependencies

| Dependency   | Version |
|--------------|--------|
| @reduxjs/toolkit | ^1.6.2 |
| @testing-library/jest-dom | ^5.15.0 |
| @testing-library/react | ^11.2.7 |
| @testing-library/user-event | ^12.8.3 |
| enzyme | ^3.11.0 |
| firebase | ^9.6.1 |
| moment | ^2.29.1 |
| react | ^17.0.2 |
| react-dom | ^17.0.2 |
| react-redux | ^7.2.6 |
| react-router-dom | ^6.0.0 |
| react-scripts | 4.0.3 |
| redux | ^4.1.2 |
| redux-thunk | ^2.4.1 |
| sass | ^1.49.9 |
| sweetalert2 | ^11.3.6 |
| validator | ^13.7.0 |
| web-vitals | ^1.1.2 |

### Development dependencies

| Dependency                         | Version |
|------------------------------------|---------|
| @wojtekmaj/enzyme-adapter-react-17 | ^0.6.6  |
| cloudinary                         | ^1.28.1 |
| enzyme-to-json                     | ^3.6.2  |
| redux-mock-store                   | ^1.5.4  |
| enzyme                             | ^3.11.0 |

## Available Scripts

In the project directory, you can run:

### npm start

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### npm test

Launches the test runner in the interactive watch mode.

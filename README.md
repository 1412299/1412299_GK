# react-firebase-chat

A simple chat app example using React and Firebase, based on [create-react-app](https://github.com/facebook/create-react-app) and [react-redux-firebase](https://github.com/prescottprue/react-redux-firebase/)

MANY MANY THANKS to Prescott Prue, your super duper hard work made this a breeze.

n.b. Users will need google accounts to sign in.

[Demo](https://react-firebase-chat-70982.firebaseapp.com/signin)


## Sign Up (free)

react-firebase-chat uses the [Firebase Realtime Database](https://firebase.google.com/docs/database/?utm_source=firechat)
as a backend, and for authentication, so it requires no server-side code. You can
[sign up here](https://console.firebase.google.com/?utm_source=firechat) for a free account.


## Install

yarn install

npm should work too...


## Configure

You must configure react-firebase-chat with the Firebase credentials created when you signed up and created a new Firebase project.

Create a /.env file in the root directory and fill it, no brackets or quotes:

REACT_APP_FIREBASE_APIKEY=[your api key]

REACT_APP_FIREBASE_AUTHDOMAIN=[your auth domain]

REACT_APP_FIREBASE_DATABASEURL=[your database url]

REACT_APP_FIREBASE_PROJECTID=[your project Id ]

REACT_APP_FIREBASE_STOREAGEBUCKET=[your storage bucket]

REACT_APP_FIREBASE_MESSAGINGSENDERID=[your messaging sender Id]


Also, update the /.firebaserc file to use the name of your firebase project

Finally, react-firebase-chat utilizes the Firebase authenticator for Google.
Enable it in the Firebase console, under the sign-in method tab of the Auth section.


### Other files you may want update prior to deploy

#### database.rules.json
Add rules to lock down access to the data?

#### /public/manifest.json
Change the name or short name?

#### /public/index.html
Add a pretty favicon or additional features?

## Deploy on localhost, if you're in the mood

yarn start


## Build

yarn build

Creates an optimized production build for deployment to your host of choice

## Deploy

Firebase provides a built in hosting solution. To use it, install the [Firebase CLI] (https://firebase.google.com/docs/cli/)
It should not be necessary to install the CLI globally.
The following command will copy the files in the /build directory to firebase hosting:

firebase deploy --only hosting

The deployment URL is shown in the console when successful.

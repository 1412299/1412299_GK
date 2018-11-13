import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reactReduxFirebase } from "react-redux-firebase";
import firebase from "firebase";
import rootReducer from "./rootReducer";

// Firebase config
const fbConfig = {
  apiKey: "AIzaSyB2UUAjvDgFoWP2arj6NAQPDr3Cm0JKAXo",
  authDomain: "chat-app-eab1d.firebaseapp.com",
  databaseURL: "https://chat-app-eab1d.firebaseio.com",
  projectId: "chat-app-eab1d",
  storageBucket: "chat-app-eab1d.appspot.com",
  messagingSenderId: "1091503571937"
};

// react-redux-firebase config
const rrfConfig = { userProfile: "users" };

const initialState = {};
firebase.initializeApp(fbConfig);

export const databaseRef = firebase.database();

function configure() {
  let store;
  switch (process.env.NODE_ENV) {
    case "development":
      let composeEnhancers = composeWithDevTools({});
      store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(reactReduxFirebase(firebase, rrfConfig))
      );
      break;

    default:
      store = createStore(
        rootReducer,
        initialState,
        reactReduxFirebase(firebase, rrfConfig)
      );
  }

  return store;
}

export default configure;

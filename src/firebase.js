import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import config from "./config/config.js";

const app = firebase.initializeApp(config.fireBase);

export const auth = app.auth();
export default app;

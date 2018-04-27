const firebase = require("firebase");

const app = firebase.initializeApp({
  apiKey: "AIzaSyARPaiqw88T1pE4Pj7Vw6X_Fwjg1XuKUHU",
  authDomain: "wexershop.firebaseapp.com",
  databaseURL: "https://wexershop.firebaseio.com",
  projectId: "wexershop",
  storageBucket: "wexershop.appspot.com",
  messagingSenderId: "343454232078"
});

export default app;

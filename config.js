/* Firebase web settings for this Nightlight install. These are public by design;
   the Firestore security rules decide what can be read or written. */
window.NIGHTLIGHT_CONFIG = {
  apiKey: "AIzaSyCbrZBgEOIjUhuYrOYbqYPdDRTkf6bC6j0",
  authDomain: "nightlight-be738.firebaseapp.com",
  projectId: "nightlight-be738",
  storageBucket: "nightlight-be738.firebasestorage.app",
  messagingSenderId: "1057530822962",
  appId: "1:1057530822962:web:7f98c1823912208b5c572b",
  // public half of the notification key; the private half lives only in the reminder service
  vapidPublicKey: "BGgb8O0r4xaeTpg-ZK4Juk7WHol0izuOgQ-RIDHFuDoSr_Hz-UaxWcTx3X6ohjNrSyaPfo3C2Dk3zQIYNxm7mmc"
};

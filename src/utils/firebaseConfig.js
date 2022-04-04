import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.GATSBY_APIKEY,
  authDomain: process.env.GATSBY_AUTHDOMAIN,
  databaseURL: process.env.GATSBY_DOMAIN_URL,
  projectId: process.env.GATSBY_PROJECT_ID,
  storageBucket: process.env.GATSBY_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_MESSAGING_APP_ID,
};

export const isBrowser = typeof window !== `undefined`;

export const app = isBrowser ? initializeApp(firebaseConfig) : {};

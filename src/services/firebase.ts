import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const isDevelopment = process.env.NODE_ENV === 'development';
const apiKey = isDevelopment ? '' : '';
const projectId = isDevelopment ? '' : '';

export const app = firebase.initializeApp({
  apiKey,
  projectId
});

export const db = firebase.firestore();
export const auth = firebase.auth();

import * as firebase from 'firebase/app';
import 'firebase/firestore';

export const app = firebase.initializeApp({
  apiKey: '',
  projectId: ''
});

export const db = firebase.firestore();

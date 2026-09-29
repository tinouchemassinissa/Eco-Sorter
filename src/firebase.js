import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDNYWqQQTq7rwDafnus-Y5T92L3UrlUwyA",
  authDomain: "eco-sorter-5d8ff.firebaseapp.com",
  projectId: "eco-sorter-5d8ff",
  storageBucket: "eco-sorter-5d8ff.firebasestorage.app",
  messagingSenderId: "825749656915",
  appId: "1:825749656915:web:b8de0b8d4f7e6e1807fda6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const submitScore = async (name, score) => {
  try {
    await addDoc(collection(db, "leaderboard"), {
      name,
      score,
      timestamp: new Date()
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getLeaderboard = async () => {
  try {
    const q = query(collection(db, "leaderboard"), orderBy("score", "desc"), limit(10));
    const querySnapshot = await getDocs(q);
    const scores = [];
    querySnapshot.forEach((doc) => {
      scores.push({ id: doc.id, ...doc.data() });
    });
    return scores;
  } catch (e) {
    console.error("Error getting leaderboard: ", e);
    return [];
  }
};

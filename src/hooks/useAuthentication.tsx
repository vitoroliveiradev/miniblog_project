import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [errror, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // Cleanup
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);
  
  const auth = getAuth();
  console.log(`Autenticação: ${auth}`);

  const checkIfIsCancelled = () => {
    if(cancelled) {
      return;
    }
  }
}
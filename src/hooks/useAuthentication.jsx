import { db } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from "firebase/auth";


import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cleanup
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);
  
  const auth = getAuth();

  const checkIfIsCancelled = () => {
    if(cancelled) {
      return;
    }
  }

  // Função de registro;
  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError("");

    try {

      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName
      })
      setLoading(false);
      return user;
    }catch(err) {
      let systemErrorMessage;

      if(err.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
      }else if(err.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado"
      }else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
      }
      setError(systemErrorMessage)
      setLoading(false);
    }
  }

  // Função de Logout.
  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  }

  // Função de login;
  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;
      if(error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado."
      } else if(error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha Incorreta."
      } else {
        systemErrorMessage = "Ocorreu um erro! Tente mais tarde."
      }
      setError(systemErrorMessage);
      setLoading(false);
    }
  }

  // Limpando a memória;
  useEffect(() => {
    return () => setCancelled(true);
  }, [])

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login
  }
}
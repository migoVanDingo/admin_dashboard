import React, { useContext, useState, useEffect } from "react";
import { sendPasswordResetEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";

const AuthContext = React.createContext<any | null | undefined>("");


export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState<any>(true);

  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  const value = {
    currentUser,
    signUp,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
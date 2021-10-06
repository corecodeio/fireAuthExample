import AuthContext from './auth-context';
import { auth } from '../services/firebase';
import { 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'; 
import { useState, useEffect } from 'react';

const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = () => {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscriber;
  }, [])
  

  const authContext = {
    currentUser,
    register,
    login,
    logout
  }

  return <AuthContext.Provider value={authContext}>
    { !loading && props.children }
  </AuthContext.Provider>;
}

export default AuthProvider;
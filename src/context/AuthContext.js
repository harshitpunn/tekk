import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '289621286274-5romp3io67ppa6nguuusb3b6fq25upif.apps.googleusercontent.com',
    iosClientId:
      '289621286274-pq5rnrb6l9crogmgg39rifmeh7ar70t6.apps.googleusercontent.com',
    expoClientId:
      '289621286274-3oa8fkftfdi17amo8c550bk0c98p5s8n.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      console.log(response.authentication.accessToken);
      setToken(response.authentication.accessToken);

      const persistAuth = async () => {
        await AsyncStorage.setItem(
          'token',
          JSON.stringify(response.authentication.accessToken)
        );
      };
      persistAuth();
    }
  }, [response]);

  const [user, setUser] = useState(null);

  const createUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    return await signOut(auth).then(setUser(''));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        setUser,
        logout,
        signIn,
        setToken,
        promptAsync,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};

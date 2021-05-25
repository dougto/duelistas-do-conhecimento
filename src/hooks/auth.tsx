import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUser } from '../types';
import generateNewUser from '../services/generateNewUser';
import { firebase } from '../services/firebaseProvider';
import { getUserFromDB, updateUserFromDB } from '../services/databaseService';

interface AuthState {
  token: string;
  user: IUser;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  user: IUser;
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: IUser): Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [[, token], [, user]] = await AsyncStorage.multiGet([
        '@WiseDuelists:token',
        '@WiseDuelists:user',
      ]);

      if (token && user) {
        // api.defaults.headers.authorization = `Bearer ${token}`;

        setData({token, user: JSON.parse(user)});
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({email, password}) => {
    let response;

    try {
      response = await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch(error) {
      console.log(error);
      Alert.alert(error.message);
      return;
    }

    if (!response?.user?.uid) {
      Alert.alert('User not found');
      return;
    }

    const userData = await getUserFromDB(response.user.uid);

    const {token, user} = { token: response.user.refreshToken || '', user: userData};

    await AsyncStorage.multiSet([
      ['@WiseDuelists:token', token],
      ['@WiseDuelists:user', JSON.stringify(user)],
    ]);

    setData({token, user});
  }, []);

  const signUp = useCallback(async ({email, password}) => {
    let response;

    try {
      response = await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch(error) {
      console.log(error);
      Alert.alert(error.message);
      return;
    }

    const {token, user} = { token: response?.user?.refreshToken || '', user: generateNewUser(response?.user?.uid || '')};

    await AsyncStorage.multiSet([
      ['@WiseDuelists:token', token],
      ['@WiseDuelists:user', JSON.stringify(user)],
    ]);

    await updateUserFromDB(user);

    setData({token, user});
  }, []);

  const signOut = useCallback(async () => {
    firebase.auth().signOut();

    await AsyncStorage.multiRemove(['@WiseDuelists:token', '@WiseDuelists:user']);

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: IUser) => {
      await AsyncStorage.setItem('@WiseDuelists:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{user: data.user, signIn, signUp, signOut, loading, updateUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

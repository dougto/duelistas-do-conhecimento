import React, { useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Authentication from '../pages/Auth';
import MainMenu from '../pages/MainMenu';
import Character from '../pages/Character';
import Create from '../pages/Character/Create';
import Loading from '../pages/Loading';
import Duel from '../pages/Duel';
import Store from '../pages/Store';
import Results from '../pages/Duel/Results';

import { useAuth } from '../hooks/auth';
import { useDuel } from '../hooks/duel';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  const { user } = useAuth();
  const { isDueling, didDuelJustFinish } = useDuel();

  const renderStack = useCallback(() => {
    if (didDuelJustFinish) {
      return (<Stack.Screen name="Results" component={Results}/>);
    }

    if (isDueling) {
      return (<Stack.Screen name="Duel" component={Duel}/>);
    }

    if (user) {
      if (user?.char?.ex) {
        return (
          <>
            <Stack.Screen name="Main" component={MainMenu}/>
            <Stack.Screen name="Character" component={Character}/>
            <Stack.Screen name="Store" component={Store}/>
          </>
        );
      } else {
        return (
          <Stack.Screen name="CharCreate" component={Create}/>
        );
      }
    } else {
      return (<Stack.Screen name="Auth" component={Authentication}/>);
    }
  }, [user, isDueling, didDuelJustFinish]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
      }}
    >
      {renderStack()}
    </Stack.Navigator>
  );
};

export default Routes;

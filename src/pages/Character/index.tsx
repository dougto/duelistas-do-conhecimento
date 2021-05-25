import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Inventory from './Inventory';
import Skills from './Skills';
import Statistics from './Statistics';
import config from './../../config';

const Tab = createBottomTabNavigator();

const { styles } = config;

const Character: React.FC = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: styles.colors.black,
      inactiveTintColor: styles.colors.white,
      activeBackgroundColor: styles.colors.yellow,
      inactiveBackgroundColor: styles.colors.darkBrown,
      labelStyle: { display: 'flex', flex: 1, fontSize: 18, marginTop: 8 },
      style: { backgroundColor: '#000' },
    }}
  >
    <Tab.Screen name="Inventário" component={Inventory} />
    <Tab.Screen name="Habilidades" component={Skills} />
    <Tab.Screen name="Estatísticas" component={Statistics} />
  </Tab.Navigator>
);

export default Character;

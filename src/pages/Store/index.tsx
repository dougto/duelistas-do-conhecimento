import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BuyCommon from './BuyCommon';
import BuyPremium from './BuyPremium';
import Sell from './Sell';
import config from './../../config';

const Tab = createBottomTabNavigator();

const { styles } = config;

const Store: React.FC = () => (
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
    <Tab.Screen name="Loja Comum" component={BuyCommon} />
    <Tab.Screen name="Loja Premium" component={BuyPremium} />
    <Tab.Screen name="Vender" component={Sell} />
  </Tab.Navigator>
);

export default Store;

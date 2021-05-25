import { Platform } from 'react-native';

const config = {
  styles: {
    font: Platform.OS === 'ios' ? 'Arial' : 'Roboto',
    colors: {
      white: '#ffffff',
      black: '#000000',
      yellow: '#ffd800',
      darkBrown: '#533',
      brown: '#955',
      lightBrown: '#d77a50',
      red: '#e33',
      green: '#3c3',
    },
  },
};

export default config;

import { ImageSourcePropType } from 'react-native';

export interface IEye {
  id: number;
  name: string;
  charAsset: ImageSourcePropType;
}

const Eyes: IEye[] = [
  {
    id: 1,
    name: 'Neutro Preto',
    charAsset: require('../../../assets/character-style/eye/eye-1/eye-1-1.png'),
  },
  {
    id: 2,
    name: 'Neutro Castanho',
    charAsset: require('../../../assets/character-style/eye/eye-1/eye-1-2.png'),
  },
  {
    id: 3,
    name: 'Neutro Verde',
    charAsset: require('../../../assets/character-style/eye/eye-1/eye-1-3.png'),
  },
  {
    id: 4,
    name: 'Neutro Azul',
    charAsset: require('../../../assets/character-style/eye/eye-1/eye-1-4.png'),
  },
  {
    id: 5,
    name: 'Sereno Preto',
    charAsset: require('../../../assets/character-style/eye/eye-2/eye-2-1.png'),
  },
  {
    id: 6,
    name: 'Sereno Castanho',
    charAsset: require('../../../assets/character-style/eye/eye-2/eye-2-2.png'),
  },
  {
    id: 7,
    name: 'Sereno Verde',
    charAsset: require('../../../assets/character-style/eye/eye-2/eye-2-3.png'),
  },
  {
    id: 8,
    name: 'Sereno Azul',
    charAsset: require('../../../assets/character-style/eye/eye-2/eye-2-4.png'),
  },
  {
    id: 9,
    name: 'Alegre',
    charAsset: require('../../../assets/character-style/eye/eye-3/eye-3-1.png'),
  },
];

export default Eyes;

import { ImageSourcePropType } from 'react-native';

export interface IHair {
  id: number;
  name: string;
  charAsset: ImageSourcePropType;
}

const Hairs: IHair[] = [
  {
    id: 1,
    name: 'Curto Preto',
    charAsset: require('../../../assets/character-style/hair/hair-1/hair-1-1.png'),
  },
  {
    id: 2,
    name: 'Curto Castanho',
    charAsset: require('../../../assets/character-style/hair/hair-1/hair-1-2.png'),
  },
  {
    id: 3,
    name: 'Curto Loiro',
    charAsset: require('../../../assets/character-style/hair/hair-1/hair-1-3.png'),
  },
  {
    id: 4,
    name: 'Franja Preto',
    charAsset: require('../../../assets/character-style/hair/hair-2/hair-2-1.png'),
  },
  {
    id: 5,
    name: 'Franja Castanho',
    charAsset: require('../../../assets/character-style/hair/hair-2/hair-2-2.png'),
  },
  {
    id: 6,
    name: 'Franja Loiro',
    charAsset: require('../../../assets/character-style/hair/hair-2/hair-2-3.png'),
  },
  {
    id: 7,
    name: 'Ondulado Preto',
    charAsset: require('../../../assets/character-style/hair/hair-3/hair-3-1.png'),
  },
  {
    id: 8,
    name: 'Ondulado Castanho',
    charAsset: require('../../../assets/character-style/hair/hair-3/hair-3-2.png'),
  },
  {
    id: 9,
    name: 'Ondulado Loiro',
    charAsset: require('../../../assets/character-style/hair/hair-3/hair-3-3.png'),
  },
  {
    id: 10,
    name: 'Comprido Preto',
    charAsset: require('../../../assets/character-style/hair/hair-4/hair-4-1.png'),
  },
  {
    id: 11,
    name: 'Comprido Castanho',
    charAsset: require('../../../assets/character-style/hair/hair-4/hair-4-2.png'),
  },
  {
    id: 12,
    name: 'Comprido Loiro',
    charAsset: require('../../../assets/character-style/hair/hair-4/hair-4-3.png'),
  },
];

export default Hairs;

import { IPlayerItem } from '../../types';

const Hats: IPlayerItem[] = [
  {
    id: 11,
    type: 'hat',
    name: 'Chapéu Azul',
    price: 20,
    charAsset: require('../../../assets/character-style/hat/hat-1/hat-1-1.png'),
    iconAsset: require('../../../assets/character-style/hat/hat-1/hat-1-1-icon.png'),
  },
  {
    id: 12,
    type: 'hat',
    name: 'Chapéu Verde',
    price: 20,
    charAsset: require('../../../assets/character-style/hat/hat-1/hat-1-2.png'),
    iconAsset: require('../../../assets/character-style/hat/hat-1/hat-1-2-icon.png'),
  },
  {
    id: 13,
    type: 'hat',
    name: 'Chapéu Rosa',
    price: 20,
    charAsset: require('../../../assets/character-style/hat/hat-1/hat-1-3.png'),
    iconAsset: require('../../../assets/character-style/hat/hat-1/hat-1-3-icon.png'),
  },
];

export default Hats;

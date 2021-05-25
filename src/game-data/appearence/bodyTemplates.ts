import { ImageSourcePropType } from 'react-native';

export interface ITemplate {
  id: number;
  name: string;
  bottomAsset: ImageSourcePropType;
  topAsset: ImageSourcePropType;
}

const Templates: ITemplate[] = [
  {
    id: 1,
    name: 'Template Moreno',
    bottomAsset: require('../../../assets/character-style/templates/temp-1/temp-bot-1.png'),
    topAsset: require('../../../assets/character-style/templates/temp-1/temp-top-1.png'),
  },
  {
    id: 2,
    name: 'Template Branco',
    bottomAsset: require('../../../assets/character-style/templates/temp-2/temp-bot-2.png'),
    topAsset: require('../../../assets/character-style/templates/temp-2/temp-top-2.png'),
  },
  {
    id: 3,
    name: 'Template Bronzeado',
    bottomAsset: require('../../../assets/character-style/templates/temp-3/temp-bot-3.png'),
    topAsset: require('../../../assets/character-style/templates/temp-3/temp-top-3.png'),
  },
];

export default Templates;

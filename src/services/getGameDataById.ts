import Accessories from '../game-data/items/accessories';
import Potions from '../game-data/items/potions';
import Hats from '../game-data/items/hats';
import Robes from '../game-data/items/robes';
import Totens from '../game-data/items/totens';
import Templates, { ITemplate } from '../game-data/appearence/bodyTemplates';
import Eyes, { IEye } from '../game-data/appearence/eyes';
import Hairs, { IHair } from '../game-data/appearence/hairs';
import { IPlayerItem } from '../types';

export function getBodyTemplateById(id: number): ITemplate | null {
  if (id === 0) return null;
  return Templates.filter(template => template.id == id)[0];
}

export function getEyeById(id: number): IEye | null {
  if (id === 0) return null;
  return Eyes.filter(eye => eye.id == id)[0];
}

export function getHairById(id: number): IHair | null {
  if (id === 0) return null;
  return Hairs.filter(hair => hair.id == id)[0];
}

export function getItemById(id: number): IPlayerItem | null {
  if (id === 0) return null;
  return Hats.concat(Accessories)
    .concat(Robes)
    .concat(Potions)
    .concat(Totens)
    .filter(item => item.id == id)[0];
}

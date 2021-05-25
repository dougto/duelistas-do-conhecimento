import { ImageSourcePropType } from 'react-native';

export interface IUser {
  id: string; // user id
  char: ICharacter;
  info: IAccountInfo; // collection containing general info of the account
}

export interface ICharacter {
  ex: boolean; // if character exists
  lvl: number; // level
  exp: number; // experience
  name: string; // name
  att: number; // attack
  hp: number; // hit points
  coin: number; // number of coins
  cro: number; // number of crowns
  diam: number; // number of diamonds
  es: number[]; // array of length 4 containing the id of the equiped items. The order is hat, robe, accessory, totem.
  sp: number; // skill points
  hab: number[]; // array of length 7 containing the level of each of the seven skills
  inv: number[]; // array of length 15 containing the id of each item in inventory
  perf: number; // performance score
  stat: IStatistics; // statistics collection
  app: IAppearence; // collection containing the information about how the character looks like
}

export interface IStatistics {
  bd: number; // battles drawn
  bl: number; // battles lost
  bw: number; // battles won
  su1: number; // skill used one, represents the total amount of times the player used the first skill
  su2: number; // skill used two, represents the total amount of times the player used the second skill
  su3: number; // skill used three, represents the total amount of times the player used the third skill
  su4: number; // skill used four, represents the total amount of times the player used the fourth skill
  su5: number; // skill used five, represents the total amount of times the player used the fifth skill
  su6: number; // skill used six, represents the total amount of times the player used the sixth skill
  su7: number; // skill used seven, represents the total amount of times the player used the seventh skill
  tc: number; // total coins obtained
  td: number; // total diamonds obtained
  ts: number; // total different style items obtained
}

export interface IAppearence {
  hair: number; // hair style id
  eye: number; // eye style id
  sc: number; // skin color id
}

export interface IAccountInfo {
  frie: string[]; // array containing friends names
}

export interface IQuestion {
  question: string;
  correctAnswerIndex: number;
  answers: string[];
}

export interface IDuelInstace {
  me: IPlayerInfo; // player events info
  op: IPlayerInfo | null;
}

export interface IPlayerInfo {
  id: string; // duel instance id
  ev: IDuelEvents; // event info
  ch: ICharacterInfo; // character info
}

export interface IDuelEvents {
  sk: boolean; // skill was selected
  sp: boolean; // skill processing
  qa: boolean; // question was answered
  ar: boolean; // answer is right
  qp: boolean; // shield up
}

export interface ICharacterInfo {
  lvl: number; // level
  name: string; // name
  att: number; // attack
  hp: number; // hit points
  chp: number; // current hit points
  app: IDuelAppearence; // collection containing the information about how the character looks like
}

export interface IDuelAppearence {
  hair: number; // hair style id
  eye: number; // eye style id
  sc: number; // skin color id
  hat: number; // hat id
  rob: number; // robe id
  acc: number; // accessory id
}

export interface IPlayerItem {
  id: number;
  type: 'acc' | 'robe' | 'hat' | 'misc' | 'pot' | 'totem';
  name: string;
  price: number;
  charAsset: ImageSourcePropType;
  iconAsset: ImageSourcePropType;
  effect?(arg: any): any;
}

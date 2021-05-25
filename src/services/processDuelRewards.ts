import { IUser } from '../types';
import expTable from '../game-data/mechanics/expTable';

export default function processDuelRewards(
  user: IUser,
  coin: number,
  exp: number,
  diamonds?: number,
): IUser {
  let levelUp = false;
  let newCharacterLevel = user.char.lvl;
  let newCurrentExpValue = user.char.exp + exp;
  let newCoinsValue = user.char.coin + coin;
  let newDiamondsValue = diamonds ? user.char.diam + diamonds : user.char.diam;
  let newAttValue = user.char.att + 1;
  let newHpValue = user.char.hp + 4;
  let newSpValue = user.char.sp + 1;

  if (newCurrentExpValue >= expTable[user.char.lvl - 1]) {
    newCharacterLevel = newCharacterLevel + 1;
    newCurrentExpValue = newCurrentExpValue - expTable[user.char.lvl - 1];
    levelUp = true;
  }

  let updatedUser: IUser;

  if (levelUp) {
    updatedUser = {
      ...user,
      char: {
        ...user.char,
        lvl: newCharacterLevel,
        exp: newCurrentExpValue,
        att: newAttValue,
        coin: newCoinsValue,
        diam: newDiamondsValue,
        hp: newHpValue,
        sp: newSpValue,
      },
    };
  } else {
    updatedUser = {
      ...user,
      char: {
        ...user.char,
        exp: newCurrentExpValue,
        coin: newCoinsValue,
        diam: newDiamondsValue,
      },
    };
  }

  return updatedUser;
}

import * as Random from 'expo-random';

import generateNewDuel from './generateNewDuel';
import { uint8ArrayToStr } from '../utils/uint8ArrayToStr';
import { firebase } from './firebaseProvider';
import { IUser, IDuelInstace, IPlayerInfo } from '../types';

export const updateUserFromDB = async (user: IUser): Promise<void> => {
  firebase.database().ref(`users/${user.id}`).set(user);
};

export const getUserFromDB = async (id: string): Promise<IUser> => {
  const user = await (await firebase.database().ref(`users/${id}`).get()).val();

  return (user as unknown) as IUser;
};

export const createDuelInstace = async (user: IUser): Promise<IDuelInstace> => {
  const id = uint8ArrayToStr(Random.getRandomBytes(16));

  const newDuel = generateNewDuel(id, user);

  await firebase.database().ref(`duels/${id}`).set(newDuel);

  return newDuel;
};

export const deleteDuelInstance = async (id: string): Promise<void> => {
  firebase.database().ref(`duels/${id}`).remove();
};

export const getAvailableDuel = async (
  currentDuelId: string,
): Promise<IDuelInstace | null> => {
  const duels = await firebase.database().ref(`duels`).get();

  let availableDuel: IDuelInstace | null = null;

  duels.forEach(duel => {
    if (!availableDuel) {
      const duelValue = duel.val() as IDuelInstace;

      if (!duelValue.op && duelValue.me.id !== currentDuelId) {
        availableDuel = duelValue;
      }
    }
  });

  return availableDuel;
};

export const updateDuelInstace = async (
  id: string,
  updatedDuel: IDuelInstace,
): Promise<void> => {
  firebase.database().ref(`duels/${id}`).set(updatedDuel);
};

export const updateDuelInstaceOpponent = async (
  duelId: string,
  opponentInfo: IPlayerInfo,
): Promise<void> => {
  firebase.database().ref(`duels/${duelId}/op`).set(opponentInfo);
};

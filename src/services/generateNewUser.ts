import { IUser } from '../types';

export default function generateNewUser(id: string): IUser {
  return {
    id,
    char: {
      ex: false,
      app: {
        eye: 1,
        hair: 1,
        sc: 1,
      },
      att: 11,
      coin: 20,
      cro: 0,
      diam: 0,
      es: [0, 0, 0, 0],
      exp: 0,
      hab: [0, 0, 0, 0, 0, 0, 0],
      hp: 44,
      inv: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      lvl: 1,
      name: 'new-name',
      perf: 0,
      sp: 1,
      stat: {
        bd: 0,
        bl: 0,
        bw: 0,
        su1: 0,
        su2: 0,
        su3: 0,
        su4: 0,
        su5: 0,
        su6: 0,
        su7: 0,
        tc: 20,
        td: 0,
        ts: 0,
      },
    },
    info: {
      frie: [],
    },
  };
}

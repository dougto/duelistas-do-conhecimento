import { IDuelInstace, IUser } from '../types';

export default function generateNewDuel(id: string, user: IUser): IDuelInstace {
  return {
    me: {
      ch: {
        app: {
          acc: user.char.es[2],
          eye: user.char.app.eye,
          hair: user.char.app.hair,
          hat: user.char.es[0],
          rob: user.char.es[1],
          sc: user.char.app.sc,
        },
        att: user.char.att,
        hp: user.char.hp,
        chp: user.char.hp,
        lvl: user.char.lvl,
        name: user.char.name,
      },
      ev: {
        ar: false,
        qa: false,
        qp: false,
        sk: false,
        sp: false,
      },
      id,
    },
    op: null,
  };
}

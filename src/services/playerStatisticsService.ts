import { IUser } from '../types';

export const increaseBattlesWon = (user: IUser): IUser => {
  const updatedUser: IUser = {
    ...user,
    char: {
      ...user.char,
      stat: {
        ...user.char.stat,
        bw: user.char.stat.bw + 1,
      },
    },
  };

  return updatedUser;
};

export const increaseBattlesLost = (user: IUser): IUser => {
  const updatedUser: IUser = {
    ...user,
    char: {
      ...user.char,
      stat: {
        ...user.char.stat,
        bl: user.char.stat.bl + 1,
      },
    },
  };

  return updatedUser;
};

export const increaseBattlesDrawn = (user: IUser): IUser => {
  const updatedUser: IUser = {
    ...user,
    char: {
      ...user.char,
      stat: {
        ...user.char.stat,
        bd: user.char.stat.bd + 1,
      },
    },
  };

  return updatedUser;
};

export const increaseSkillOneUsed = (user: IUser): IUser => {
  const updatedUser: IUser = {
    ...user,
    char: {
      ...user.char,
      stat: {
        ...user.char.stat,
        su1: user.char.stat.su1 + 1,
      },
    },
  };

  return updatedUser;
};

export const increaseSkillTwoUsed = (user: IUser): IUser => {
  const updatedUser: IUser = {
    ...user,
    char: {
      ...user.char,
      stat: {
        ...user.char.stat,
        su2: user.char.stat.su2 + 1,
      },
    },
  };

  return updatedUser;
};

export const increaseSkillThreeUsed = (user: IUser): IUser => {
  const updatedUser: IUser = {
    ...user,
    char: {
      ...user.char,
      stat: {
        ...user.char.stat,
        su3: user.char.stat.su3 + 1,
      },
    },
  };

  return updatedUser;
};

export const increaseSkillFourUsed = (user: IUser): IUser => {
  const updatedUser: IUser = {
    ...user,
    char: {
      ...user.char,
      stat: {
        ...user.char.stat,
        su4: user.char.stat.su4 + 1,
      },
    },
  };

  return updatedUser;
};

export const increaseSkillFiveUsed = (user: IUser): IUser => {
  const updatedUser: IUser = {
    ...user,
    char: {
      ...user.char,
      stat: {
        ...user.char.stat,
        su5: user.char.stat.su5 + 1,
      },
    },
  };

  return updatedUser;
};

export const increaseSkillSixUsed = (user: IUser): IUser => {
  const updatedUser: IUser = {
    ...user,
    char: {
      ...user.char,
      stat: {
        ...user.char.stat,
        su6: user.char.stat.su6 + 1,
      },
    },
  };

  return updatedUser;
};

export const increaseSkillSevenUsed = (user: IUser): IUser => {
  const updatedUser: IUser = {
    ...user,
    char: {
      ...user.char,
      stat: {
        ...user.char.stat,
        su7: user.char.stat.su7 + 1,
      },
    },
  };

  return updatedUser;
};

export const increaseTotalCoins = (user: IUser, quantity: number): IUser => {
  const updatedUser: IUser = {
    ...user,
    char: {
      ...user.char,
      stat: {
        ...user.char.stat,
        tc: user.char.stat.tc + quantity,
      },
    },
  };

  return updatedUser;
};

export const increaseTotalDiamonds = (user: IUser, quantity: number): IUser => {
  const updatedUser: IUser = {
    ...user,
    char: {
      ...user.char,
      stat: {
        ...user.char.stat,
        td: user.char.stat.td + quantity,
      },
    },
  };

  return updatedUser;
};

export const increaseTotalStyles = (user: IUser): IUser => {
  const updatedUser: IUser = {
    ...user,
    char: {
      ...user.char,
      stat: {
        ...user.char.stat,
        ts: user.char.stat.ts + 1,
      },
    },
  };

  return updatedUser;
};

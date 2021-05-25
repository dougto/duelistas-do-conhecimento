import React, { useState, useContext, createContext, useCallback } from 'react';

import { firebase } from '../services/firebaseProvider';
import { useAuth } from './auth';
import {
  createDuelInstace,
  deleteDuelInstance,
  getAvailableDuel,
  updateDuelInstace,
} from '../services/databaseService';
import {
  getRandomHistoryQuestion,
  getRandomMathQuestion,
  getRandomNatureQuestion,
  getRandomPopQuestion,
  getRandomQuestion
} from '../services/getRandomQuestion';
import { IQuestion, IDuelInstace, IPlayerInfo } from '../types';
interface IDuelContext {
  isSearchingForDuel: boolean;
  setIsSearchingForDuel(value: boolean): void;
  isDueling: boolean;
  toggleIsDueling(): void;
  currentDuel: IDuelInstace;
  setCurrentDuel(duel: IDuelInstace): void;
  isInQuestionStage: boolean;
  setIsInQuestionStage(value: boolean): void;
  isBattleDrawn: boolean;
  setIsBattleDrawn(value: boolean): void;
  isVictorious: boolean;
  setIsVictorious(value: boolean): void;
  didDuelJustFinish: boolean;
  setDidDuelJustFinish(value: boolean): void;
  selectedSkill: number;
  setSelectedSkill(skill: number): void;
  selectedOption: number;
  setSelectedOption(skill: number): void;
  round: number;
  setRound(round: number): void;
  currentQuestion: IQuestion;
  setCurrentQuestion(question: IQuestion): void;
  handleCountdownComplete(): void;
  fetchQuestion(index: number): void;
  handleStartDuelSearch(): void;
  handleStopDuelSearch(): void;
}

export const DuelContext = createContext<IDuelContext>({} as IDuelContext);

export const DuelProvider: React.FC = ({ children }) => {
  const { user } = useAuth();

  const [isSearchingForDuel, setIsSearchingForDuel] = useState(false);

  const [isReference, setIsReference] = useState(false);
  const [isDueling, setIsDueling] = useState(false);
  const [isBattleDrawn, setIsBattleDrawn] = useState(false);
  const [isVictorious, setIsVictorious] = useState(false);
  const [didDuelJustFinish, setDidDuelJustFinish] = useState(false);
  const [currentDuel, setCurrentDuel] = useState<IDuelInstace>({} as IDuelInstace);
  const [isInQuestionStage, setIsInQuestionStage] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(0);
  const [selectedOption, setSelectedOption] = useState(4); // 4 for none
  const [round, setRound] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion>(getRandomQuestion());

  const handleStartDuelSearch = async () => {
    setIsSearchingForDuel(true);

    const newDuel = await createDuelInstace(user);

    setCurrentDuel(newDuel);

    const availableDuel = await getAvailableDuel(newDuel.me.id);

    if (availableDuel) {
      setCurrentDuel({...newDuel, op: availableDuel.me});

      await updateDuelInstace(availableDuel.me.id, {
        ...availableDuel,
        op: {
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
          id: newDuel.me.id
        }
      });


      await updateDuelInstace(newDuel.me.id, {
        ...newDuel,
        op: availableDuel.me,
      });

      setIsSearchingForDuel(false);
      setIsDueling(true);
      return;
    }

    setIsReference(true);

    firebase.database().ref(`duels/${newDuel.me.id}/op`).on('value', async (data) => {
      const opponentInfo = data.val() as IPlayerInfo | null;

      if (opponentInfo) {
        setCurrentDuel({...newDuel, op: opponentInfo});
        setIsSearchingForDuel(false);
        setIsDueling(true);

        firebase.database().ref(`duels/${newDuel.me.id}/op`).off();
      };
    });
  }

  const handleStopDuelSearch = async () => {
    setIsSearchingForDuel(false);

    if (currentDuel.me.id) {
      await deleteDuelInstance(currentDuel.me.id);
    }

    setCurrentDuel({} as IDuelInstace);
  }

  const fetchQuestion = (index: number) => {
    let question: IQuestion;

    switch(index) {
      case 3:
        question = getRandomMathQuestion();
        break;
      case 4:
        question = getRandomHistoryQuestion();
        break;
      case 5:
        question = getRandomNatureQuestion();
        break;
      case 6:
        question = getRandomPopQuestion();
        break;
      default:
        question = getRandomQuestion();
        break;
    }

    setCurrentQuestion(question);
  };

  const handleCountdownComplete = async () => {
    if (isInQuestionStage) {
      if (round === 10) {
        setDidDuelJustFinish(true);
        setIsBattleDrawn(true);
        return;
      }

      setSelectedOption(4);
      setIsInQuestionStage(false);
      setSelectedSkill(8);
      setRound(round + 1);

      const resetedEvents = {
        ar: false,
        qa: false,
        qp: false,
        sk: false,
        sp: false,
      };

      if (currentDuel.op && isReference) {
        await Promise.all([
          updateDuelInstace(currentDuel.me.id, {
            op: {...currentDuel.op, ev: {...resetedEvents}},
            me: {...currentDuel.me, ev: {...resetedEvents}},
          }),
          updateDuelInstace(currentDuel.op?.id, {
            me: {...currentDuel.op, ev: {...resetedEvents}},
            op: {...currentDuel.me, ev: {...resetedEvents}},
          }),
        ]);
      }
    } else {
      fetchQuestion(selectedSkill);
      setIsInQuestionStage(true);
    }
  };

  const toggleIsDueling = useCallback(() => {
    setIsDueling(!isDueling);
  }, [isDueling, setIsDueling]);

  return (
    <DuelContext.Provider value={{
      isSearchingForDuel,
      setIsSearchingForDuel,
      isDueling,
      toggleIsDueling,
      currentDuel,
      setCurrentDuel,
      currentQuestion,
      setCurrentQuestion,
      isInQuestionStage,
      setIsInQuestionStage,
      round,
      setRound,
      selectedOption,
      setSelectedOption,
      selectedSkill,
      setSelectedSkill,
      handleCountdownComplete,
      fetchQuestion,
      handleStartDuelSearch,
      handleStopDuelSearch,
      isBattleDrawn,
      setIsBattleDrawn,
      isVictorious,
      setIsVictorious,
      didDuelJustFinish,
      setDidDuelJustFinish,
    }}>
      {children}
    </DuelContext.Provider>
  );
};

export function useDuel(): IDuelContext {
  const context = useContext(DuelContext);

  if (!context) {
    throw new Error('useDuel must be used within DuelProvider');
  }

  return context;
}

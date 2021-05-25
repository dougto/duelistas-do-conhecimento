import historyQuestions from '../game-data/questions/history';
import mathQuestions from '../game-data/questions/math';
import natureQuestions from '../game-data/questions/nature';
import popQuestions from '../game-data/questions/pop';
import { IQuestion } from '../types';

export const getRandomQuestion = (): IQuestion => {
  const maxIndex =
    historyQuestions.length +
    mathQuestions.length +
    natureQuestions.length +
    popQuestions.length;
  const randomIndex = Math.floor(Math.random() * maxIndex);
  const randomQuestion = historyQuestions.concat(
    mathQuestions.concat(natureQuestions.concat(popQuestions)),
  )[randomIndex];
  return randomQuestion;
};

export const getRandomHistoryQuestion = (): IQuestion => {
  const maxIndex = historyQuestions.length;
  const randomIndex = Math.floor(Math.random() * maxIndex);
  const randomQuestion = historyQuestions[randomIndex];
  return randomQuestion;
};

export const getRandomMathQuestion = (): IQuestion => {
  const maxIndex = mathQuestions.length;
  const randomIndex = Math.floor(Math.random() * maxIndex);
  const randomQuestion = mathQuestions[randomIndex];
  return randomQuestion;
};

export const getRandomNatureQuestion = (): IQuestion => {
  const maxIndex = natureQuestions.length;
  const randomIndex = Math.floor(Math.random() * maxIndex);
  const randomQuestion = natureQuestions[randomIndex];
  return randomQuestion;
};

export const getRandomPopQuestion = (): IQuestion => {
  const maxIndex = popQuestions.length;
  const randomIndex = Math.floor(Math.random() * maxIndex);
  const randomQuestion = popQuestions[randomIndex];
  return randomQuestion;
};

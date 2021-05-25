import { IQuestion } from '../../types';

const mathQuestions: IQuestion[] = [
  {
    question: 'Quantos lados tem o icosaedro?',
    correctAnswerIndex: 3,
    answers: ['6', '8', '12', '20'],
  },
  {
    question: 'Qual é a raiz quadrada de 225?',
    correctAnswerIndex: 2,
    answers: ['13', '14', '15', '16'],
  },
  {
    question: 'Qual é o único número primo que é par?',
    correctAnswerIndex: 2,
    answers: ['0', '1', '2', '4'],
  },
  {
    question: 'O que é um ângulo reto?',
    correctAnswerIndex: 0,
    answers: [
      'É um ângulo de 90 graus',
      'É um ângulo de 60 graus',
      'É qualquer ângulo de um triângulo',
      'Nenhuma das anteriores',
    ],
  },
  {
    question: 'Quantos zeros tem o número "um bilhão"?',
    correctAnswerIndex: 2,
    answers: ['3', '6', '9', '12'],
  },
  {
    question: 'Qual paralelogramo possui os 4 lados sempre iguais?',
    correctAnswerIndex: 1,
    answers: ['retângulo', 'losango', 'trapézio', 'triângulo'],
  },
  {
    question: 'Qual é o resultado da expressão "2 + 4 x 3"?',
    correctAnswerIndex: 3,
    answers: ['18', '9', '12', '14'],
  },
  {
    question: 'Como se calcula Pi a partir de um círculo?',
    correctAnswerIndex: 1,
    answers: [
      'Multiplicando o raio pela circunferência',
      'Dividindo a circunferência pelo diâmetro',
      'Somando o raio e o diâmetro',
      'Subtraindo o diâmetro da circunferência',
    ],
  },
  {
    question: 'Todo pentágono possui:',
    correctAnswerIndex: 1,
    answers: [
      'Cinco lados iguais',
      'Angulos internos cuja soma é 540 graus',
      'Apenas ângulos agudos',
      'Angulos externos cuja soma é 540 graus',
    ],
  },
  {
    question: 'O resultado da expressão "4 dividido por 3" é um número:',
    correctAnswerIndex: 2,
    answers: ['Natural', 'Inteiro', 'Racional', 'Irracional'],
  },
];

export default mathQuestions;

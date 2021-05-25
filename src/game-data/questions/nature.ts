import { IQuestion } from '../../types';

const natureQuestions: IQuestion[] = [
  {
    question: 'O que é inércia?',
    correctAnswerIndex: 0,
    answers: [
      'É a tendência que um objeto tem de manter sua velocidade constante',
      'É a certeza que uma força sempre gera uma força oposta',
      'É a tendência de um objeto de sempre acelerar',
      'É a certeza que uma força nem sempre gera outra força',
    ],
  },
  {
    question: 'O que é mitose?',
    correctAnswerIndex: 3,
    answers: [
      'É o processo de evolução da célula',
      'É quando uma célula morre',
      'É o processo de crescimento da célula',
      'É o processo de divisão celular',
    ],
  },
  {
    question: 'Na tabela periódica, qual é o símbolo do mercúrio?',
    correctAnswerIndex: 2,
    answers: ['Mg', 'Me', 'Hg', 'Hs'],
  },
  {
    question: 'O que é DNA?',
    correctAnswerIndex: 0,
    answers: ['Um polímero', 'Um lipídio', 'Um aminoácido', 'Um carboidrato'],
  },
  {
    question: 'Qual partícula é mais leve?',
    correctAnswerIndex: 2,
    answers: ['Um proton', 'Um neutron', 'Um elétron', 'Um átomo'],
  },
  {
    question: 'Todo mamífero possui:',
    correctAnswerIndex: 3,
    answers: ['Pelos', 'Placenta', 'Quatro patas', 'Glândulas mamárias'],
  },
  {
    question: 'Qual é o maior órgão do corpo humano?',
    correctAnswerIndex: 2,
    answers: ['Pulmão', 'Coração', 'Pele', 'Fígado'],
  },
  {
    question: 'Qual elemento químico possui apenas um próton?',
    correctAnswerIndex: 3,
    answers: ['Hélio', 'Oxigênio', 'Lítio', 'Hidrogênio'],
  },
  {
    question: 'Qual é, aproximadamente, a aceleração da gravidade, em m/sˆ2?',
    correctAnswerIndex: 1,
    answers: ['8.2', '9.8', '12.2', '19.8'],
  },
  {
    question: 'Quantos planetas temos em nosso sistema solar?',
    correctAnswerIndex: 0,
    answers: ['8', '9', '10', '11'],
  },
];

export default natureQuestions;

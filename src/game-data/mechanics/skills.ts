export interface ISkill {
  id: number;
  icon:
    | 'star'
    | 'sword'
    | 'lightning-bolt'
    | 'shield-star'
    | 'calculator-variant'
    | 'timer-sand'
    | 'leaf';
  name: string;
  description: string;
  index: number;
}

const Skills: ISkill[] = [
  {
    id: 1,
    icon: 'sword',
    name: 'Ofensiva Mágica',
    description:
      'O personagem causará o dobro de dano caso responda a pergunta certo, mas receberá o dobro de dano caso responda errado.',
    index: 0,
  },
  {
    id: 2,
    icon: 'lightning-bolt',
    name: 'Feitiço de Ataque',
    description:
      'Antes dos jogadores responderem a uma pergunta, o inimigo recebe dano equivalente a metade do seu ataque, arredondando para baixo.',
    index: 1,
  },
  {
    id: 3,
    icon: 'shield-star',
    name: 'Escudo Mágico',
    description:
      'O personagem será protegido de receber dano uma vez durante essa rodada.',
    index: 2,
  },
  {
    id: 4,
    icon: 'calculator-variant',
    name: 'Magia Exata',
    description:
      'A pergunta na etapa Responder Pergunta do duelo será uma pergunta de matemática.',
    index: 3,
  },
  {
    id: 5,
    icon: 'timer-sand',
    name: 'Magia do Tempo',
    description:
      'A pergunta na etapa Responder Pergunta do duelo será uma pergunta de história.',
    index: 4,
  },
  {
    id: 6,
    icon: 'leaf',
    name: 'Magia da Natureza',
    description:
      'A pergunta na etapa Responder Pergunta do duelo será uma pergunta de ciências da natureza.',
    index: 5,
  },
  {
    id: 7,
    icon: 'star',
    name: 'Magia Pop',
    description:
      'A pergunta na etapa Responder Pergunta do duelo será uma pergunta sobre cultura pop.',
    index: 6,
  },
];

export default Skills;

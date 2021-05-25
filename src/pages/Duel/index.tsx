import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  increaseSkillOneUsed,
  increaseSkillTwoUsed,
  increaseSkillThreeUsed,
  increaseSkillFourUsed,
  increaseSkillFiveUsed,
  increaseSkillSixUsed,
  increaseSkillSevenUsed,
} from '../../services/playerStatisticsService';
import { updateDuelInstace } from '../../services/databaseService';
import { firebase } from '../../services/firebaseProvider';
import DuelBackgroundImage from '../../../assets/backgrounds/background-2.png';
import { useDuel } from '../../hooks/duel';
import { useAuth } from '../../hooks/auth';
import SkillsData from '../../game-data/mechanics/skills';
import config from '../../config';
import {
  getBodyTemplateById,
  getEyeById,
  getHairById,
  getItemById,
} from '../../services/getGameDataById';
import { Countdown } from '../../components/Countdown';
import { IDuelInstace } from '../../types';
import {
  Container,
  RoundText,
  HorizontalLine,
  SkillColumn,
  SkillRow,
  CountdownContainer,
  SkillButton,
  SkillButtonText,
  DuelBackgroundContainer,
  DuelBackground,
  QuestOptionButton,
  QuestionContainer,
  QuestionText,
  PlayerAccessory,
  PlayerBodyBottom,
  PlayerBodyTop,
  PlayerEyes,
  PlayerHair,
  PlayerHat,
  PlayerRobe,
  OpponentAccessory,
  OpponentBodyBottom,
  OpponentBodyTop,
  OpponentEyes,
  OpponentHair,
  OpponentHat,
  OpponentRobe,
  HpText,
  OpponentHpContainer,
  PlayerHpContainer,
} from './styles';

const Duel: React.FC = () => {
  const { white } = config.styles.colors;

  const resetRef = useRef<Countdown>(null);

  const {
    toggleIsDueling,
    currentQuestion,
    isInQuestionStage,
    setIsInQuestionStage,
    round,
    setRound,
    selectedOption,
    setSelectedOption,
    selectedSkill,
    setSelectedSkill,
    fetchQuestion,
    currentDuel,
    setCurrentDuel,
    setIsVictorious,
    setDidDuelJustFinish,
  } = useDuel();

  const { user, updateUser } = useAuth();

  const [skillUses, setSkillUses] = useState([...user.char.hab, 0]);

  useEffect(() => {
    setRound(1);
    setIsInQuestionStage(false);
    setSelectedSkill(8);
    setSelectedOption(4);

    firebase.database().ref(`duels/${currentDuel.me.id}`).on('value', handleDuelChange);

    return (() => {firebase.database().ref(`duels/${currentDuel.me.id}`).off()})
  }, []);

  useEffect(() => {
    const opponentHp = currentDuel.op ? currentDuel.op.ch.chp : 0;
    const playerHp = currentDuel.me.ch.chp;

    if (currentDuel.op?.ev.qa) {
      setSelectedOption(-1);
      setSelectedSkill(8);
    }

    if (opponentHp < 1 && playerHp < 1) {
      setIsVictorious(false);
      setDidDuelJustFinish(true);
    }
    if (opponentHp < 1) {
      setIsVictorious(true);
      setDidDuelJustFinish(true);
    }
    if (playerHp < 1) {
      setIsVictorious(false);
      setDidDuelJustFinish(true);
    }
  }, [currentDuel]);

  const handleDuelChange = (data: firebase.database.DataSnapshot) => {
    const duel = data.val() as IDuelInstace;

    setCurrentDuel({...duel});
  }

  const handleAnswerResult = async (index: number, correctIndex: number) => {
    setSelectedOption(index);

    let damageMultiplier = 1;

    if (selectedSkill === 0) {
      damageMultiplier = 2;
    }

    if (currentDuel.op?.ev.qp) {
      damageMultiplier = 0;
    }

    const isCorrect = index === correctIndex;

    const updatedEvents = {
      ...currentDuel.me.ev,
      ar: isCorrect,
      qa: true,
    };

    if (currentDuel.op) {
      if (isCorrect) {
        await Promise.all([
          updateDuelInstace(currentDuel.me.id, {
            op: {
              ...currentDuel.op,
              ch: {...currentDuel.op.ch, chp: (currentDuel.op.ch.chp - currentDuel.me.ch.att * damageMultiplier)}
            },
            me: {...currentDuel.me, ev: {...updatedEvents}},
          }),
          updateDuelInstace(currentDuel.op?.id, {
            me: {
              ...currentDuel.op,
              ch: {...currentDuel.op.ch, chp: (currentDuel.op.ch.chp - currentDuel.me.ch.att * damageMultiplier)}
            },
            op: {...currentDuel.me, ev: {...updatedEvents}},
          }),
        ]);
      } else {
        await Promise.all([
          updateDuelInstace(currentDuel.me.id, {
            op: {...currentDuel.op},
            me: {
              ...currentDuel.me,
              ev: {...updatedEvents},
              ch: {...currentDuel.me.ch, chp: (currentDuel.me.ch.chp - currentDuel.me.ch.att * damageMultiplier)}
            },
          }),
          updateDuelInstace(currentDuel.op?.id, {
            me: {...currentDuel.op},
            op: {
              ...currentDuel.me,
              ev: {...updatedEvents},
              ch: {...currentDuel.me.ch, chp: (currentDuel.me.ch.chp - currentDuel.me.ch.att * damageMultiplier)}
            },
          }),
        ]);
      }
    }

    setSelectedSkill(8);
  };

  const handleSkillUse = async (index: number) => {
    const updatedSkillUses = [...skillUses];
    updatedSkillUses[index] = updatedSkillUses[index] - 1;
    setSkillUses([...updatedSkillUses]);
    setSelectedSkill(index);
    fetchQuestion(index);

    let updatedUser = {...user};

    switch (index) {
      case 0:
        updatedUser = increaseSkillOneUsed(updatedUser);
        break;
      case 1:
        updatedUser = increaseSkillTwoUsed(updatedUser);
        break;
      case 2:
        updatedUser = increaseSkillThreeUsed(updatedUser);
        break;
      case 3:
        updatedUser = increaseSkillFourUsed(updatedUser);
        break;
      case 4:
        updatedUser = increaseSkillFiveUsed(updatedUser);
        break;
      case 5:
        updatedUser = increaseSkillSixUsed(updatedUser);
        break;
      case 6:
        updatedUser = increaseSkillSevenUsed(updatedUser);
        break;
      default:
        break;
    }

    updateUser(updatedUser);

    if (index === 2 && currentDuel.op) {
      await Promise.all([
        updateDuelInstace(currentDuel.me.id, {
          op: {...currentDuel.op},
          me: {...currentDuel.me, ev: {...currentDuel.me.ev, qp: true}},
        }),
        updateDuelInstace(currentDuel.op?.id, {
          me: {...currentDuel.op},
          op: {...currentDuel.me, ev: {...currentDuel.me.ev, qp: true}},
        }),
      ]);
    }

    if (index === 1 && currentDuel.op) {
        await Promise.all([
        updateDuelInstace(currentDuel.me.id, {
          op: {
            ...currentDuel.op,
            ch: {...currentDuel.op.ch, chp: (currentDuel.op.ch.chp - Math.floor(currentDuel.me.ch.att/2) )}
          },
          me: {...currentDuel.me},
        }),
        updateDuelInstace(currentDuel.op?.id, {
          me: {
            ...currentDuel.op,
            ch: {...currentDuel.op.ch, chp: (currentDuel.op.ch.chp - Math.floor(currentDuel.me.ch.att/2) )}
          },
          op: {...currentDuel.me},
        }),
      ]);
    }
  };

  const handleReset = useCallback(() => {
    resetRef.current?.reset();
  }, []);

  const renderSkillButton = useCallback((skillIndex: number, usesLeft: number) => (
    <SkillButton
      isFaded={!usesLeft || (selectedSkill !== 8)}
      disabled={!usesLeft || (selectedSkill !== 8)}
      onPress={() => { handleSkillUse(skillIndex) }}
    >
      <MaterialCommunityIcons name={SkillsData[skillIndex].icon} size={20} color={white} />
      <SkillButtonText>{SkillsData[skillIndex].name}</SkillButtonText>
      <SkillButtonText>{usesLeft}</SkillButtonText>
    </SkillButton>
  ), [SkillsData, skillUses, selectedSkill, setSelectedSkill, handleSkillUse]);

  const renderSkillChoice = useCallback(() => {
    return (
      <SkillRow>
        <SkillColumn>
          {renderSkillButton(0, skillUses[0])}
          {renderSkillButton(1, skillUses[1])}
          {renderSkillButton(2, skillUses[2])}
          {renderSkillButton(3, skillUses[3])}
        </SkillColumn>
        <SkillColumn>
          {renderSkillButton(4, skillUses[4])}
          {renderSkillButton(5, skillUses[5])}
          {renderSkillButton(6, skillUses[6])}
          <SkillButton
            isFaded={false || selectedSkill !== 8}
            disabled={selectedSkill !== 8}
            onPress={() => { handleSkillUse(7) }}
          >
            <SkillButtonText>Pular</SkillButtonText>
          </SkillButton>
        </SkillColumn>
      </SkillRow>
    );
  }, [SkillsData, renderSkillButton, skillUses, setSkillUses, handleSkillUse]);

  const renderQuestion = useCallback(() => {
    return (
      <>
        <QuestionContainer>
          <QuestionText>{currentQuestion.question}</QuestionText>
        </QuestionContainer>
        <HorizontalLine/>
        <QuestOptionButton
          isFaded={selectedOption < 4}
          isCorrect={selectedOption === currentQuestion.correctAnswerIndex}
          isSelected={selectedOption === 0}
          disabled={selectedOption < 4}
          onPress={() => {handleAnswerResult(0, currentQuestion.correctAnswerIndex);}}
        >
          <QuestionText>{currentQuestion.answers[0]}</QuestionText>
        </QuestOptionButton>
        <QuestOptionButton
          isFaded={selectedOption < 4}
          isCorrect={selectedOption === currentQuestion.correctAnswerIndex}
          isSelected={selectedOption === 1}
          disabled={selectedOption < 4}
          onPress={() => {handleAnswerResult(1, currentQuestion.correctAnswerIndex);}}
        >
          <QuestionText>{currentQuestion.answers[1]}</QuestionText>
        </QuestOptionButton>
        <QuestOptionButton
          isFaded={selectedOption < 4}
          isCorrect={selectedOption === currentQuestion.correctAnswerIndex}
          isSelected={selectedOption === 2}
          disabled={selectedOption < 4}
          onPress={() => {handleAnswerResult(2, currentQuestion.correctAnswerIndex);}}
        >
          <QuestionText>{currentQuestion.answers[2]}</QuestionText>
        </QuestOptionButton>
        <QuestOptionButton
          isFaded={selectedOption < 4}
          isCorrect={selectedOption === currentQuestion.correctAnswerIndex}
          isSelected={selectedOption === 3}
          disabled={selectedOption < 4}
          onPress={() => {handleAnswerResult(3, currentQuestion.correctAnswerIndex);}}
        >
          <QuestionText>{currentQuestion.answers[3]}</QuestionText>
        </QuestOptionButton>
      </>
    );
  }, [setIsInQuestionStage, selectedSkill, selectedOption, setSelectedOption, currentQuestion]);

  const renderPlayer = useCallback(() => {
    const bodyBottomAsset = getBodyTemplateById(user.char.app.sc)?.bottomAsset;
    const bodyTopAsset = getBodyTemplateById(user.char.app.sc)?.topAsset;
    const hairAsset = getHairById(user.char.app.hair)?.charAsset;
    const eyeAsset = getEyeById(user.char.app.eye)?.charAsset;

    const hatAsset = getItemById(user.char.es[0])?.charAsset;
    const robeAsset = getItemById(user.char.es[1])?.charAsset;
    const accessoryAsset = getItemById(user.char.es[2])?.charAsset;

    return (
      <>
        <PlayerHpContainer>
          <HpText>{currentDuel.me.ch.chp} / {currentDuel.me.ch.hp}</HpText>
        </PlayerHpContainer>
        {bodyBottomAsset ? <PlayerBodyBottom resizeMode={'contain'} source={bodyBottomAsset}/> : null}
        {bodyTopAsset ? <PlayerBodyTop resizeMode={'contain'} source={bodyTopAsset}/> : null}
        {hairAsset ? <PlayerHair resizeMode={'contain'} source={hairAsset}/> : null}
        {eyeAsset ? <PlayerEyes resizeMode={'contain'} source={eyeAsset}/> : null}
        {hatAsset ? <PlayerHat resizeMode={'contain'} source={hatAsset}/> : null}
        {robeAsset ? <PlayerRobe resizeMode={'contain'} source={robeAsset}/> : null}
        {accessoryAsset ? <PlayerAccessory resizeMode={'contain'} source={accessoryAsset}/> : null}
      </>
    );
  }, [user, currentDuel]);

  const renderOpponent = useCallback(() => {
    const bodyBottomAsset = getBodyTemplateById(currentDuel.op ? currentDuel.op.ch.app.sc : 0)?.bottomAsset;
    const bodyTopAsset = getBodyTemplateById(currentDuel.op ? currentDuel.op.ch.app.sc : 0)?.topAsset;
    const hairAsset = getHairById(currentDuel.op ? currentDuel.op.ch.app.hair : 0)?.charAsset;
    const eyeAsset = getEyeById(currentDuel.op ? currentDuel.op.ch.app.eye : 0)?.charAsset;

    const hatAsset = getItemById(currentDuel.op ? currentDuel.op.ch.app.hat : 0)?.charAsset;
    const robeAsset = getItemById(currentDuel.op ? currentDuel.op.ch.app.rob : 0)?.charAsset;
    const accessoryAsset = getItemById(currentDuel.op ? currentDuel.op.ch.app.acc : 0)?.charAsset;

    return (
      <>
        <OpponentHpContainer>
          <HpText>{currentDuel.op?.ch.chp} / {currentDuel.op?.ch.hp}</HpText>
        </OpponentHpContainer>
        {bodyBottomAsset ? <OpponentBodyBottom resizeMode={'contain'} source={bodyBottomAsset}/> : null}
        {bodyTopAsset ? <OpponentBodyTop resizeMode={'contain'} source={bodyTopAsset}/> : null}
        {hairAsset ? <OpponentHair resizeMode={'contain'} source={hairAsset}/> : null}
        {eyeAsset ? <OpponentEyes resizeMode={'contain'} source={eyeAsset}/> : null}
        {hatAsset ? <OpponentHat resizeMode={'contain'} source={hatAsset}/> : null}
        {robeAsset ? <OpponentRobe resizeMode={'contain'} source={robeAsset}/> : null}
        {accessoryAsset ? <OpponentAccessory resizeMode={'contain'} source={accessoryAsset}/> : null}
      </>
    );
  }, [currentDuel]);

  return (
    <Container>
      <TouchableOpacity onPress={() => {toggleIsDueling()}}>
        <RoundText>Rodada {round}</RoundText>
      </TouchableOpacity>
      <DuelBackgroundContainer>
        {renderPlayer()}
        {renderOpponent()}
        <DuelBackground style={{resizeMode: 'stretch'}} source={DuelBackgroundImage}/>
      </DuelBackgroundContainer>
      <CountdownContainer>
        <Countdown initialCounter={8} ref={resetRef} />
      </CountdownContainer>
      <HorizontalLine/>
        {isInQuestionStage ? renderQuestion() : renderSkillChoice()}
      <HorizontalLine/>
    </Container>
  );
};

export default Duel;

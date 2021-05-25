import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAuth } from '../../hooks/auth';
import config from '../../config';
import SkillsData from '../../game-data/mechanics/skills';
import { IUser } from '../../types';
import { updateUserFromDB } from '../../services/databaseService';

import {
  Container,
  ButtonContainer,
  BackButton,
  DetailsText,
  SkillContainer,
  SkillDescriptionText,
  SkillPointsText,
  SkillTitle,
  ColumnContainer,
  PlusMinusButton,
  HorizontalLine,
} from './styles';

const Skills: React.FC = () => {
  const { white, black } = config.styles.colors;

  const { user, updateUser } = useAuth();

  const { navigate } = useNavigation();

  const handleSkillIncrease = useCallback(async (index: number) => {
    if (user.char.sp < 1) return;

    const updatedHabilities = user.char.hab;
    updatedHabilities[index]++;

    const updatedUser: IUser = { ...user,
      char: {
        ...user.char,
        sp: user.char.sp - 1,
        hab: updatedHabilities,
      }
    };

    await updateUserFromDB(updatedUser);
    updateUser(updatedUser);
  }, [user]);

  const handleSkillDecrease = useCallback(async (index: number) => {
    if (user.char.hab[index] < 1) return;

    const updatedHabilities = user.char.hab;
    updatedHabilities[index]--;

    const updatedUser: IUser = { ...user,
      char: {
        ...user.char,
        sp: user.char.sp + 1,
        hab: updatedHabilities,
      }
    };

    await updateUserFromDB(updatedUser);
    updateUser(updatedUser);
  }, [user]);

  const renderSkills = useCallback(() => (
    SkillsData.map((skill) => (
      <SkillContainer key={skill.id}>
        <MaterialCommunityIcons name={skill.icon} size={40} color={white} />
        <ColumnContainer>
          <SkillTitle>{skill.name}</SkillTitle>
          <SkillTitle>Nível {user.char.hab[skill.index]}</SkillTitle>
          <SkillDescriptionText>{skill.description}</SkillDescriptionText>
        </ColumnContainer>
        <ColumnContainer>
          <PlusMinusButton onPress={() => { handleSkillIncrease(skill.index) }}>
            <MaterialCommunityIcons name="plus" size={40} color={black} />
          </PlusMinusButton>
          <PlusMinusButton onPress={() => { handleSkillDecrease(skill.index) }}>
            <MaterialCommunityIcons name="minus" size={40} color={black} />
          </PlusMinusButton>
        </ColumnContainer>
      </SkillContainer>
    ))
  ), [user])

  return (
    <Container>
      <ButtonContainer>
        <BackButton onPress={() => { navigate('Main') }}>
          <MaterialCommunityIcons name="arrow-left" size={20} color={config.styles.colors.white} />
          <DetailsText>Voltar</DetailsText>
        </BackButton>
      </ButtonContainer>
      <SkillPointsText>Pontos de Habilidade: {user.char.sp}</SkillPointsText>
      <HorizontalLine/>
      <ScrollView centerContent style={{ padding: 10, width: '100%' }}>
        {renderSkills()}
      </ScrollView>
    </Container>
  );
};

export default Skills;

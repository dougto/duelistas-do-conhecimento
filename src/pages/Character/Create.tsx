import React, { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import config from '../../config';
import { useAuth } from '../../hooks/auth';
import {
  getBodyTemplateById,
  getEyeById,
  getHairById,
} from '../../services/getGameDataById';
import Hairs from '../../game-data/appearence/hairs';
import Eyes from '../../game-data/appearence/eyes';
import Bodies from '../../game-data/appearence/bodyTemplates';
import { updateUserFromDB } from '../../services/databaseService';

import {
  Container,
  CreateCharacterTitle,
  CharacterNameInput,
  SelectorContainer,
  SelectorText,
  AvatarBodyBottom,
  AvatarBodyTop,
  AvatarEyes,
  AvatarHair,
  AvatarContainer,
  DetailsFrame,
  ConfirmationButton,
  ConfirmationButtonText,
} from './styles';

const Create: React.FC = () => {
  const [hairIndex, setHairIndex] = useState(0);
  const [eyeIndex, setEyeIndex] = useState(0);
  const [bodyIndex, setBodyIndex] = useState(0);
  const [characterName, setCharacterName] = useState('');

  const { user, updateUser } = useAuth();

  const { white } = config.styles.colors;

  const renderAvatar = useCallback(() => {
    const bodyBottomAsset = getBodyTemplateById(user.char.app.sc)?.bottomAsset;
    const bodyTopAsset = getBodyTemplateById(user.char.app.sc)?.topAsset;
    const hairAsset = getHairById(user.char.app.hair)?.charAsset;
    const eyeAsset = getEyeById(user.char.app.eye)?.charAsset;

    return (
      <>
        {bodyBottomAsset ? <AvatarBodyBottom source={bodyBottomAsset}/> : null}
        {bodyTopAsset ? <AvatarBodyTop source={bodyTopAsset}/> : null}
        {hairAsset ? <AvatarHair source={hairAsset}/> : null}
        {eyeAsset ? <AvatarEyes source={eyeAsset}/> : null}
      </>
    );
  }, [user])

  const handleHairIncrease = useCallback(() => {
    if (hairIndex >= Hairs.length - 1) return;

    const hairId = Hairs[hairIndex + 1].id;
    setHairIndex(hairIndex + 1);

    updateUser({
      ...user,
      char: {
        ...user.char,
        app: {
          ...user.char.app,
          hair: hairId,
        },
      },
    });
  }, [user, updateUser, hairIndex, setHairIndex]);

  const handleHairDecrease = useCallback(() => {
    if (hairIndex === 0) return;

    const hairId = Hairs[hairIndex - 1].id;
    setHairIndex(hairIndex - 1);

    updateUser({
      ...user,
      char: {
        ...user.char,
        app: {
          ...user.char.app,
          hair: hairId,
        },
      },
    });
  }, [user, updateUser, hairIndex, setHairIndex]);

  const handleEyeIncrease = useCallback(() => {
    if (eyeIndex >= Eyes.length - 1) return;

    const eyeId = Eyes[eyeIndex + 1].id;
    setEyeIndex(eyeIndex + 1);

    updateUser({
      ...user,
      char: {
        ...user.char,
        app: {
          ...user.char.app,
          eye: eyeId,
        },
      },
    });
  }, [user, updateUser, eyeIndex, setEyeIndex]);

  const handleEyeDecrease = useCallback(() => {
    if (eyeIndex === 0) return;

    const eyeId = Eyes[eyeIndex - 1].id;
    setEyeIndex(eyeIndex - 1);

    updateUser({
      ...user,
      char: {
        ...user.char,
        app: {
          ...user.char.app,
          eye: eyeId,
        },
      },
    });
  }, [user, updateUser, eyeIndex, setEyeIndex]);

  const handleBodyIncrease = useCallback(() => {
    if (bodyIndex >= Bodies.length - 1) return;

    const bodyId = Bodies[bodyIndex + 1].id;
    setBodyIndex(bodyIndex + 1);

    updateUser({
      ...user,
      char: {
        ...user.char,
        app: {
          ...user.char.app,
          sc: bodyId,
        },
      },
    });
  }, [user, updateUser, bodyIndex, setBodyIndex]);

  const handleBodyDecrease = useCallback(() => {
    if (bodyIndex === 0) return;

    const bodyId = Bodies[bodyIndex - 1].id;
    setBodyIndex(bodyIndex - 1);

    updateUser({
      ...user,
      char: {
        ...user.char,
        app: {
          ...user.char.app,
          sc: bodyId,
        },
      },
    });
  }, [user, updateUser, bodyIndex, setBodyIndex]);

  const handleCreateCharacter = useCallback(async () => {
    if (!characterName) {
      Alert.alert('Insira um nome para o seu personagem')
      return;
    }

    const updatedUser = {
      ...user,
      char: {
        ...user.char,
        name: characterName,
        ex: true,
      },
    };

    await updateUserFromDB(updatedUser);
    updateUser(updatedUser);
  }, [user, updateUser, characterName]);

  return (
    <Container>
      <CreateCharacterTitle>
        Crie seu Personagem
      </CreateCharacterTitle>
      <DetailsFrame>
        <AvatarContainer>
          {renderAvatar()}
        </AvatarContainer>
      </DetailsFrame>
      <SelectorContainer>
        <CharacterNameInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Insira o nome do seu personagem"
          placeholderTextColor="#fff"
          onChangeText={(text) => { setCharacterName(text) }}
        />
      </SelectorContainer>
      <SelectorContainer>
        <MaterialCommunityIcons onPress={handleHairDecrease} name="arrow-left-bold" size={40} color={white} />
        <SelectorText>Cabelo</SelectorText>
        <MaterialCommunityIcons onPress={handleHairIncrease} name="arrow-right-bold" size={40} color={white} />
      </SelectorContainer>
      <SelectorContainer>
        <MaterialCommunityIcons onPress={handleEyeDecrease} name="arrow-left-bold" size={40} color={white} />
        <SelectorText>Olhos</SelectorText>
        <MaterialCommunityIcons onPress={handleEyeIncrease} name="arrow-right-bold" size={40} color={white} />
      </SelectorContainer>
      <SelectorContainer>
        <MaterialCommunityIcons onPress={handleBodyDecrease} name="arrow-left-bold" size={40} color={white} />
        <SelectorText>Pele</SelectorText>
        <MaterialCommunityIcons onPress={handleBodyIncrease} name="arrow-right-bold" size={40} color={white} />
      </SelectorContainer>
      <ConfirmationButton onPress={handleCreateCharacter}>
        <ConfirmationButtonText>Criar</ConfirmationButtonText>
      </ConfirmationButton>
    </Container>
  );
};

export default Create;

import React, { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import processDuelRewards from '../../services/processDuelRewards';
import config from '../../config';
import { useAuth } from '../../hooks/auth';
import expTable from '../../game-data/mechanics/expTable';
import {
  getBodyTemplateById,
  getEyeById,
  getHairById,
  getItemById,
} from '../../services/getGameDataById';
import { IPlayerItem, IUser } from '../../types';

import {
  Container,
  DetailsFrame,
  EquipedItemsSlotsContainer,
  ItemSlot,
  Row,
  DetailsText,
  Paragraph,
  AvatarContainer,
  AvatarAccessory,
  AvatarBodyBottom,
  AvatarBodyTop,
  AvatarEyes,
  AvatarHair,
  AvatarHat,
  AvatarRobe,
  ButtonContainer,
  BackButton,
  ItemIcon,
} from './styles';
import { updateUserFromDB } from '../../services/databaseService';
import Hairs from '../../game-data/appearence/hairs';
import BodyTemplates from '../../game-data/appearence/bodyTemplates';
import Eyes from '../../game-data/appearence/eyes';

const Inventory: React.FC = () => {
  const { user, updateUser } = useAuth();

  const { navigate } = useNavigation();

  useEffect(() => {
    const sortedInventory = [...user.char.inv].sort().reverse();

    const updatedUser: IUser = { ...user,
      char: {
        ...user.char,
        inv: sortedInventory,
      }
    };

    updateUser(updatedUser);
  }, []);

  const renderAvatar = useCallback(() => {
    const bodyBottomAsset = getBodyTemplateById(user.char.app.sc)?.bottomAsset;
    const bodyTopAsset = getBodyTemplateById(user.char.app.sc)?.topAsset;
    const hairAsset = getHairById(user.char.app.hair)?.charAsset;
    const eyeAsset = getEyeById(user.char.app.eye)?.charAsset;

    const hatAsset = getItemById(user.char.es[0])?.charAsset;
    const robeAsset = getItemById(user.char.es[1])?.charAsset;
    const accessoryAsset = getItemById(user.char.es[2])?.charAsset;

    return (
      <>
        {bodyBottomAsset ? <AvatarBodyBottom source={bodyBottomAsset}/> : null}
        {bodyTopAsset ? <AvatarBodyTop source={bodyTopAsset}/> : null}
        {hairAsset ? <AvatarHair source={hairAsset}/> : null}
        {eyeAsset ? <AvatarEyes source={eyeAsset}/> : null}
        {hatAsset ? <AvatarHat source={hatAsset}/> : null}
        {robeAsset ? <AvatarRobe source={robeAsset}/> : null}
        {accessoryAsset ? <AvatarAccessory source={accessoryAsset}/> : null}
      </>
    );
  }, [user]);

  const renderIcon = useCallback((id: number) => {
    const iconAsset = getItemById(id)?.iconAsset;

    if (iconAsset) {
      return (<ItemIcon source={iconAsset} />);
    }

    return null;
  }, []);

  const equipItem = useCallback((index: number) => {
    const item = getItemById(user.char.inv[index])

    if (!item) return;

    let equipIndex: number;
    let totemAttackBonus = 0;
    let totemLifeBonus = 0;

    switch (item.type) {
      case 'hat':
        equipIndex = 0;
        break;
      case 'robe':
        equipIndex = 1;
        break;
      case 'acc':
        equipIndex = 2;
        break;
      case 'totem':
        equipIndex = 3;
        switch (item.id) {
          case 91:
            totemAttackBonus = 5;
            break;
          case 92:
            totemLifeBonus = 20;
            break;
        }
        break;
      case 'pot':
        handlePotionUsage(item);
        return;
      default:
        return;
    }

    if (user.char.es[3] === 91) { totemAttackBonus = -5; }
    if (user.char.es[3] === 92) { totemLifeBonus = -20; }

    const updatedEquipedSlots = [...user.char.es];
    updatedEquipedSlots[equipIndex] = item.id;

    const updatedInventory = [...user.char.inv];
    updatedInventory[index] = user.char.es[equipIndex];

    const updatedUser: IUser = { ...user,
      char: {
        ...user.char,
        hp: user.char.hp + totemLifeBonus,
        att: user.char.att + totemAttackBonus,
        es: updatedEquipedSlots,
        inv: updatedInventory.sort().reverse(),
      }
    };

    updateUser(updatedUser);
  }, [user, updateUser]);

  const unnequipItem = useCallback((index: number) => {
    if (!user.char.inv.includes(0)) return;

    let totemAttackBonus = 0;
    let totemLifeBonus = 0;

    if (index === 3) {
      const totemId = user.char.es[index];

      switch (totemId) {
        case 91:
          totemAttackBonus = 5;
          break;
        case 92:
          totemLifeBonus = 20;
          break;
      }
    }

    const updatedEquipedSlots = [...user.char.es];
    updatedEquipedSlots[index] = 0;

    const updatedInventory = [...user.char.inv, user.char.es[index]];

    const updatedUser: IUser = { ...user,
      char: {
        ...user.char,
        hp: user.char.hp - totemLifeBonus,
        att: user.char.att - totemAttackBonus,
        es: updatedEquipedSlots,
        inv: updatedInventory.sort().reverse(),
      }
    };

    updateUser(updatedUser);
  }, [user, updateUser])

  const handlePotionUsage = useCallback((item: IPlayerItem) => {
    let updatedInventory;
    let index;
    let updatedUser;

    switch (item.id) {
      case 31:
        const randomHairId = Math.floor(Math.random() * Hairs.length) + 1;
        updatedInventory = [...user.char.inv];
        index = updatedInventory.indexOf(31);
        updatedInventory[index] = 0;
        updatedUser = {
          ...user,
          char: {
            ...user.char,
            inv: updatedInventory.sort().reverse(),
            app: {
              ...user.char.app,
              hair: randomHairId,
            },
          },
        };
        updateUser(updatedUser);
        updateUserFromDB(updatedUser);
        break;
      case 32:
        const randomBodyTemplateId = Math.floor(Math.random() * BodyTemplates.length) + 1;
        updatedInventory = [...user.char.inv];
        index = updatedInventory.indexOf(32);
        updatedInventory[index] = 0;
        updatedUser = {
          ...user,
          char: {
            ...user.char,
            inv: updatedInventory.sort().reverse(),
            app: {
              ...user.char.app,
              sc: randomBodyTemplateId,
            },
          },
        };
        updateUser(updatedUser);
        updateUserFromDB(updatedUser);
        break;
      case 33:
        const randomEyeId = Math.floor(Math.random() * Eyes.length) + 1;
        updatedInventory = [...user.char.inv];
        index = updatedInventory.indexOf(33);
        updatedInventory[index] = 0;
        updatedUser = {
          ...user,
          char: {
            ...user.char,
            inv: updatedInventory.sort().reverse(),
            app: {
              ...user.char.app,
              eye: randomEyeId,
            },
          },
        };
        updateUser(updatedUser);
        updateUserFromDB(updatedUser);
        break;
      case 34:
        updatedInventory = [...user.char.inv];
        index = updatedInventory.indexOf(34);
        updatedInventory[index] = 0;
        updatedUser = {
          ...user,
          char: {
            ...user.char,
            inv: updatedInventory.sort().reverse(),
          },
        };
        const updatedUserWithExp = processDuelRewards(updatedUser, 0, 100);
        updateUser(updatedUserWithExp);
        updateUserFromDB(updatedUserWithExp);
        break;
      case 35:
        break;
      case 36:
        break;
      default:
        return;
    }
  }, [user, updateUser]);

  return (
    <Container>
      <ButtonContainer>
        <BackButton onPress={() => { navigate('Main') }}>
          <MaterialCommunityIcons name="arrow-left" size={20} color={config.styles.colors.white} />
          <DetailsText>Voltar</DetailsText>
        </BackButton>
      </ButtonContainer>
      <Row>
        <DetailsFrame>
          <DetailsText>Nome: {user.char.name}</DetailsText>
          <Paragraph/>
          <DetailsText>Nível: {user.char.lvl}</DetailsText>
          <DetailsText>Exp: {user.char.exp}/{expTable[user.char.lvl - 1]}</DetailsText>
          <Paragraph/>
          <DetailsText>Vida: {user.char.hp}</DetailsText>
          <DetailsText>Ataque: {user.char.att}</DetailsText>
          <Paragraph/>
          <DetailsText>Moedas: {user.char.coin}</DetailsText>
          <DetailsText>Diamantes: {user.char.diam}</DetailsText>
          {/* <DetailsText>Coroas: {user.char.cro}</DetailsText> */}
        </DetailsFrame>
        <DetailsFrame>
          <AvatarContainer>
            {renderAvatar()}
          </AvatarContainer>
        </DetailsFrame>
      </Row>
      <EquipedItemsSlotsContainer>
        <Row>
          <ItemSlot onPress={() => { unnequipItem(0) }}>
            {user.char.es[0] === 0 ? <MaterialCommunityIcons name="wizard-hat" size={40} color={config.styles.colors.brown} /> : renderIcon(user.char.es[0])}
          </ItemSlot>
          <ItemSlot onPress={() => { unnequipItem(1) }}>
            {user.char.es[1] === 0 ? <MaterialCommunityIcons name="tshirt-crew" size={40} color={config.styles.colors.brown} /> : renderIcon(user.char.es[1])}
          </ItemSlot>
          <ItemSlot onPress={() => { unnequipItem(2) }}>
            {user.char.es[2] === 0 ? <MaterialCommunityIcons name="ring" size={40} color={config.styles.colors.brown} /> : renderIcon(user.char.es[2])}
          </ItemSlot>
          <ItemSlot onPress={() => { unnequipItem(3) }}>
            {user.char.es[3] === 0 ? <MaterialCommunityIcons name="chevron-triple-up" size={40} color={config.styles.colors.brown} /> : renderIcon(user.char.es[3])}
          </ItemSlot>
        </Row>
      </EquipedItemsSlotsContainer>
      <Row>
        <ItemSlot onPress={() => { equipItem(0) }}>
          {user.char.inv[0] > 0 ? renderIcon(user.char.inv[0]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => { equipItem(1) }}>
          {user.char.inv[1] > 0 ? renderIcon(user.char.inv[1]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => { equipItem(2) }}>
          {user.char.inv[2] > 0 ? renderIcon(user.char.inv[2]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => { equipItem(3) }}>
          {user.char.inv[3] > 0 ? renderIcon(user.char.inv[3]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => { equipItem(4) }}>
          {user.char.inv[4] > 0 ? renderIcon(user.char.inv[4]) : null}
        </ItemSlot>
      </Row>
      <Row>
        <ItemSlot onPress={() => { equipItem(5) }}>
          {user.char.inv[5] > 0 ? renderIcon(user.char.inv[5]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => { equipItem(6) }}>
          {user.char.inv[6] > 0 ? renderIcon(user.char.inv[6]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => { equipItem(7) }}>
          {user.char.inv[7] > 0 ? renderIcon(user.char.inv[7]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => { equipItem(8) }}>
          {user.char.inv[8] > 0 ? renderIcon(user.char.inv[8]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => { equipItem(9) }}>
          {user.char.inv[9] > 0 ? renderIcon(user.char.inv[9]) : null}
        </ItemSlot>
      </Row>
      <Row>
        <ItemSlot onPress={() => { equipItem(10) }}>
          {user.char.inv[10] > 0 ? renderIcon(user.char.inv[10]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => { equipItem(11) }}>
          {user.char.inv[11] > 0 ? renderIcon(user.char.inv[11]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => { equipItem(12) }}>
          {user.char.inv[12] > 0 ? renderIcon(user.char.inv[12]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => { equipItem(13) }}>
          {user.char.inv[13] > 0 ? renderIcon(user.char.inv[13]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => { equipItem(14) }}>
          {user.char.inv[14] > 0 ? renderIcon(user.char.inv[14]) : null}
        </ItemSlot>
      </Row>
    </Container>
  )
};

export default Inventory;

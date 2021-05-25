import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Potions from '../../game-data/items/potions';
import { getItemById } from '../../services/getGameDataById';
import { updateUserFromDB } from '../../services/databaseService';
import { useAuth } from '../../hooks/auth';
import config from '../../config';
import {
  Container,
  BackButton,
  ButtonContainer,
  DetailsText,
  CurrencyContainer,
  HorizontalLine,
  ItemIcon,
  ItemSlot,
  Row,
  SectionTitle,
  ItemDetailText,
  ItemDetailContainer,
  BuyOrSellButton,
  BuyOrSellButtonText,
} from './styles';
import { IPlayerItem } from '../../types';

const BuyPremium: React.FC = () => {
  const [selectedItemId, setSelectedItemId] = useState(0);

  const { navigate } = useNavigation();

  const { user, updateUser } = useAuth();

  const handleItemPurchase = useCallback(async (id: number, item: IPlayerItem) => {
    if (user.char.diam < item.price) {
      Alert.alert('Diamantes insuficientes');
      return;
    }

    const updatedInventory = [...user.char.inv];
    if (!(updatedInventory[14] === 0)) {
      Alert.alert('Invetário cheio');
      return;
    }

    updatedInventory[14] = id;
    const updatedDiamonds = user.char.diam - item.price;

    await updateUser({
      ...user,
      char: {
        ...user.char,
        inv: updatedInventory.sort().reverse(),
        diam: updatedDiamonds,
      },
    });

    await updateUserFromDB({
      ...user,
      char: {
        ...user.char,
        inv: updatedInventory,
        diam: updatedDiamonds,
      },
    });

    Alert.alert('Item comprado com suscesso!');
  }, [selectedItemId, user, updateUser]);

  const renderSelectedItemDetail = useCallback(() => {
    const item = getItemById(selectedItemId);

    if (!item) {
      return (<ItemDetailText>Selecione um item</ItemDetailText>);
    }

    return (
      <>
        <ItemDetailText>{item.name}</ItemDetailText>
        <ItemDetailText>Preço: {item.price} diamantes</ItemDetailText>
        <BuyOrSellButton onPress={() => {handleItemPurchase(selectedItemId, item)}}>
          <BuyOrSellButtonText>comprar</BuyOrSellButtonText>
        </BuyOrSellButton>
      </>
    );
  }, [selectedItemId, handleItemPurchase]);

  return (
    <Container>
      <ButtonContainer>
        <BackButton onPress={() => { navigate('Main') }}>
          <MaterialCommunityIcons name="arrow-left" size={20} color={config.styles.colors.white} />
          <DetailsText>Voltar</DetailsText>
        </BackButton>
      </ButtonContainer>
      <CurrencyContainer>
        <DetailsText>Moedas: {user.char.coin}</DetailsText>
        <DetailsText>Diamantes: {user.char.diam}</DetailsText>
      </CurrencyContainer>
      <SectionTitle>Premium</SectionTitle>
      <HorizontalLine/>
      <Row>
        <ItemSlot onPress={() => {setSelectedItemId(Potions[3].id)}}>
          <ItemIcon source={Potions[3].iconAsset}/>
        </ItemSlot>
        <ItemSlot></ItemSlot>
        <ItemSlot></ItemSlot>
        <ItemSlot></ItemSlot>
        <ItemSlot></ItemSlot>
      </Row>
      <ItemDetailContainer>{renderSelectedItemDetail()}</ItemDetailContainer>
    </Container>
  );
};

export default BuyPremium;

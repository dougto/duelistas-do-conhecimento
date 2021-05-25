import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { increaseTotalStyles } from '../../services/playerStatisticsService';
import { updateUserFromDB } from '../../services/databaseService';
import { useAuth } from '../../hooks/auth';
import { getItemById } from '../../services/getGameDataById';
import Potions from '../../game-data/items/potions';
import Accessories from '../../game-data/items/accessories';
import Hats from '../../game-data/items/hats';
import Robes from '../../game-data/items/robes';
import Totens from '../../game-data/items/totens';
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
  ItemDetailContainer,
  BuyOrSellButton,
  BuyOrSellButtonText,
  ItemDetailText,
} from './styles';
import { IPlayerItem } from '../../types';

const BuyCommon: React.FC = () => {
  const [selectedItemId, setSelectedItemId] = useState(0);

  const { updateUser, user } = useAuth();
  const { navigate } = useNavigation();

  const handleItemPurchase = useCallback(async (id: number, item: IPlayerItem) => {
    if (user.char.coin < item.price) {
      Alert.alert('Dinheiro insuficiente');
      return;
    }

    const updatedInventory = [...user.char.inv];
    if (!(updatedInventory[14] === 0)) {
      Alert.alert('Invetário cheio');
      return;
    }

    updatedInventory[14] = id;
    const updatedCoins = user.char.coin - item.price;

    let updatedUser = {
      ...user,
      char: {
        ...user.char,
        inv: updatedInventory.sort().reverse(),
        coin: updatedCoins,
      },
    };

    if (['acc', 'robe', 'hat'].includes(item.type)) {
      updatedUser = increaseTotalStyles(updatedUser);
    }

    await updateUser(updatedUser);

    await updateUserFromDB({
      ...user,
      char: {
        ...user.char,
        inv: updatedInventory,
        coin: updatedCoins,
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
        <ItemDetailText>Preço: {item.price} moedas</ItemDetailText>
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
      <SectionTitle>Roupas</SectionTitle>
      <HorizontalLine/>
      <Row>
        <ItemSlot onPress={() => {setSelectedItemId(Hats[0].id)}}>
          <ItemIcon source={Hats[0].iconAsset}/>
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(Hats[1].id)}}>
          <ItemIcon source={Hats[1].iconAsset}/>
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(Hats[2].id)}}>
          <ItemIcon source={Hats[2].iconAsset}/>
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(Robes[0].id)}}>
          <ItemIcon source={Robes[0].iconAsset}/>
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(Robes[1].id)}}>
          <ItemIcon source={Robes[1].iconAsset}/>
        </ItemSlot>
      </Row>
      <Row>
        <ItemSlot onPress={() => {setSelectedItemId(Robes[2].id)}}>
          <ItemIcon source={Robes[2].iconAsset}/>
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(Accessories[0].id)}}>
          <ItemIcon source={Accessories[0].iconAsset}/>
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(Accessories[1].id)}}>
          <ItemIcon source={Accessories[1].iconAsset}/>
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(Accessories[2].id)}}>
          <ItemIcon source={Accessories[2].iconAsset}/>
        </ItemSlot>
        <ItemSlot></ItemSlot>
      </Row>
      <SectionTitle>Poções</SectionTitle>
      <HorizontalLine/>
      <Row>
        <ItemSlot onPress={() => {setSelectedItemId(Potions[0].id)}}>
          <ItemIcon source={Potions[0].iconAsset}/>
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(Potions[1].id)}}>
          <ItemIcon source={Potions[1].iconAsset}/>
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(Potions[2].id)}}>
          <ItemIcon source={Potions[2].iconAsset}/>
        </ItemSlot>
        <ItemSlot></ItemSlot>
        <ItemSlot></ItemSlot>
      </Row>
      <SectionTitle>Totens</SectionTitle>
      <HorizontalLine/>
      <Row>
        <ItemSlot onPress={() => {setSelectedItemId(Totens[0].id)}}>
          <ItemIcon source={Totens[0].iconAsset}/>
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(Totens[1].id)}}>
          <ItemIcon source={Totens[1].iconAsset}/>
        </ItemSlot>
        <ItemSlot></ItemSlot>
        <ItemSlot></ItemSlot>
        <ItemSlot></ItemSlot>
      </Row>
      <ItemDetailContainer>{renderSelectedItemDetail()}</ItemDetailContainer>
    </Container>
  );
};

export default BuyCommon;

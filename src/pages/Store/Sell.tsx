import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { updateUserFromDB } from '../../services/databaseService';
import { getItemById } from '../../services/getGameDataById';
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

const Sell: React.FC = () => {
  const [selectedItemId, setSelectedItemId] = useState(0);

  const { navigate } = useNavigation();

  const { user, updateUser } = useAuth();

  const handleSelling = useCallback(async (item: IPlayerItem) => {
    const updatedInventory = [...user.char.inv];

    const index = updatedInventory.indexOf(item.id);
    updatedInventory[index] = 0;
    const updatedCoins = user.char.coin + item.price/2;

    await updateUser({
      ...user,
      char: {
        ...user.char,
        inv: updatedInventory.sort().reverse(),
        coin: updatedCoins,
      },
    });

    await updateUserFromDB({
      ...user,
      char: {
        ...user.char,
        inv: updatedInventory,
        coin: updatedCoins,
      },
    });

    setSelectedItemId(0);

    Alert.alert('Item vendido com suscesso!');
  }, [selectedItemId, user, updateUser, setSelectedItemId]);

  const renderIcon = useCallback((id: number) => {
    const iconAsset = getItemById(id)?.iconAsset;

    if (iconAsset) {
      return (<ItemIcon source={iconAsset} />);
    }

    return null;
  }, []);

  const renderSelectedItemDetail = useCallback(() => {
    const item = getItemById(selectedItemId);

    if (!item) {
      return (<ItemDetailText>Selecione um item</ItemDetailText>);
    }

    return (
      <>
        <ItemDetailText>{item.name}</ItemDetailText>
        <ItemDetailText>Preço de venda: {item.price/2} moedas</ItemDetailText>
        <BuyOrSellButton onPress={() => {handleSelling(item)}}>
          <BuyOrSellButtonText>vender</BuyOrSellButtonText>
        </BuyOrSellButton>
      </>
    );
  }, [selectedItemId, handleSelling]);

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
      <SectionTitle>Inventário</SectionTitle>
      <HorizontalLine/>
      <Row>
        <ItemSlot onPress={() => {setSelectedItemId(user.char.inv[0])}}>
          {user.char.inv[0] > 0 ? renderIcon(user.char.inv[0]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(user.char.inv[1])}}>
          {user.char.inv[1] > 0 ? renderIcon(user.char.inv[1]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(user.char.inv[2])}}>
          {user.char.inv[2] > 0 ? renderIcon(user.char.inv[2]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(user.char.inv[3])}}>
          {user.char.inv[3] > 0 ? renderIcon(user.char.inv[3]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(user.char.inv[4])}}>
          {user.char.inv[4] > 0 ? renderIcon(user.char.inv[4]) : null}
        </ItemSlot>
      </Row>
      <Row>
        <ItemSlot onPress={() => {setSelectedItemId(user.char.inv[5])}}>
          {user.char.inv[5] > 0 ? renderIcon(user.char.inv[5]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(user.char.inv[6])}}>
          {user.char.inv[6] > 0 ? renderIcon(user.char.inv[6]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(user.char.inv[7])}}>
          {user.char.inv[7] > 0 ? renderIcon(user.char.inv[7]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(user.char.inv[8])}}>
          {user.char.inv[8] > 0 ? renderIcon(user.char.inv[8]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(user.char.inv[9])}}>
          {user.char.inv[9] > 0 ? renderIcon(user.char.inv[9]) : null}
        </ItemSlot>
      </Row>
      <Row>
        <ItemSlot onPress={() => {setSelectedItemId(user.char.inv[10])}}>
          {user.char.inv[10] > 0 ? renderIcon(user.char.inv[10]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(user.char.inv[11])}}>
          {user.char.inv[11] > 0 ? renderIcon(user.char.inv[11]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(user.char.inv[12])}}>
          {user.char.inv[12] > 0 ? renderIcon(user.char.inv[12]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(user.char.inv[13])}}>
          {user.char.inv[13] > 0 ? renderIcon(user.char.inv[13]) : null}
        </ItemSlot>
        <ItemSlot onPress={() => {setSelectedItemId(user.char.inv[14])}}>
          {user.char.inv[14] > 0 ? renderIcon(user.char.inv[14]) : null}
        </ItemSlot>
      </Row>
      <ItemDetailContainer>{renderSelectedItemDetail()}</ItemDetailContainer>
    </Container>
  );
};

export default Sell;

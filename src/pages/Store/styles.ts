import styled from 'styled-components/native';
import { StatusBar } from 'react-native';
import config from '../../config';

const barSize = StatusBar.currentHeight;

export const Container = styled.View`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding-top: ${barSize || 30}px;
  background-color: ${config.styles.colors.lightBrown};
`;

export const ButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 10px;
`;

export const BackButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 90px;
  height: 30px;
  border-radius: 15px;
  background-color: ${config.styles.colors.darkBrown};
  margin: 10px;
`;

export const DetailsText = styled.Text`
  color: ${config.styles.colors.white};
  font-size: 16px;
`;

export const CurrencyContainer = styled.View`
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  width: 90%;
  height: 36px;
  border-radius: 18px;
  background-color: ${config.styles.colors.darkBrown};
  margin: 10px;
`;

export const HorizontalLine = styled.View`
  background-color: ${config.styles.colors.darkBrown};
  width: 95%;
  height: 2px;
  margin: 10px 0 10px 0;
`;

export const SectionTitle = styled.Text`
  color: ${config.styles.colors.darkBrown};
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

export const ItemSlot = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  margin: 8px;
  border-radius: 4px;
  background-color: ${config.styles.colors.darkBrown};
  align-items: center;
  justify-content: center;
`;

export const ItemIcon = styled.Image`
  height: 50px;
  width: 50px;
`;

export const ItemDetailContainer = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: ${config.styles.colors.darkBrown};
  height: 120px;
  border-radius: 4px;
  bottom: 8px;
  left: 8px;
  right: 8px;
`;

export const ItemDetailText = styled.Text`
  color: ${config.styles.colors.white};
  font-size: 20px;
  font-weight: bold;
  margin: 2px 0 2px 0;
`;

export const BuyOrSellButton = styled.TouchableHighlight`
  border-radius: 8px;
  background-color: ${config.styles.colors.yellow};
  width: 90px;
  height: 30px;
  margin-top: 15px;
  align-items: center;
  justify-content: center;
`;

export const BuyOrSellButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${config.styles.colors.black};
`;

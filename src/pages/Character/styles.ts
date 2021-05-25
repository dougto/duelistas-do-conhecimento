import styled from 'styled-components/native';
import { StatusBar } from 'react-native';
import config from '../../config';

const barSize = StatusBar.currentHeight;

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding-top: ${barSize || 30}px;
  background-color: ${config.styles.colors.lightBrown};
`;

export const CreateCharacterTitle = styled.Text`
  color: ${config.styles.colors.black};
  font-size: 36px;
  margin-top: 30px;
  margin-bottom: 10px;
`;

export const CharacterNameInput = styled.TextInput`
  border: 2px solid ${config.styles.colors.white};
  color: ${config.styles.colors.white};
  width: 100%;
  height: 48px;
  border-radius: 24px;
  padding: 16px;
`;

export const SelectorContainer = styled.View`
  background-color: ${config.styles.colors.darkBrown};
  border-radius: 24px;
  height: 48px;
  width: 80%;
  margin-bottom: 10px;
  margin-top: 10px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const SelectorText = styled.Text`
  color: ${config.styles.colors.white};
  font-size: 24px;
`;

export const ConfirmationButton = styled.TouchableOpacity`
  border-radius: 8px;
  background-color: ${config.styles.colors.yellow};
  width: 80px;
  height: 55px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ConfirmationButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${config.styles.colors.black};
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

export const DetailsFrame = styled.View`
  width: 160px;
  height: 260px;
  border-radius: 4px;
  padding: 8px;
  background-color: ${config.styles.colors.darkBrown};
`;

export const DetailsText = styled.Text`
  color: ${config.styles.colors.white};
  font-size: 16px;
`;

export const EquipedItemsSlotsContainer = styled.View`
  margin: 20px;
`;

export const Paragraph = styled.View`
  height: 12px;
`;

export const AvatarContainer = styled.View`
  position: relative;
  height: 244px;
  width: 144px;
  margin-top: 16px;
`;

export const AvatarAccessory = styled.Image`
  position: absolute;
  height: 200px;
  width: 144px;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 4;
`;

export const AvatarEyes = styled.Image`
  position: absolute;
  height: 200px;
  width: 144px;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 3;
`;

export const AvatarHair = styled.Image`
  position: absolute;
  height: 200px;
  width: 144px;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1;
`;

export const AvatarHat = styled.Image`
  position: absolute;
  height: 200px;
  width: 144px;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: -1;
`;

export const AvatarRobe = styled.Image`
  position: absolute;
  height: 200px;
  width: 144px;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 3;
`;

export const AvatarBodyTop = styled.Image`
  position: absolute;
  height: 200px;
  width: 144px;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 0;
`;

export const AvatarBodyBottom = styled.Image`
  position: absolute;
  height: 200px;
  width: 144px;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 2;
`;

export const SkillPointsText = styled.Text`
  font-size: 24px;
  color: ${config.styles.colors.black};
  margin-bottom: 20px;
`;

export const HorizontalLine = styled.View`
  background-color: ${config.styles.colors.darkBrown};
  width: 95%;
  height: 2px;
`;

export const SkillContainer = styled.View`
  background-color: ${config.styles.colors.darkBrown};
  width: 95%;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
`;

export const SkillTitle = styled.Text`
  color: ${config.styles.colors.white};
  font-size: 20px;
  margin-bottom: 10px;
`;

export const SkillDescriptionText = styled.Text`
  color: ${config.styles.colors.white};
  font-size: 14px;
`;

export const PlusMinusButton = styled.TouchableOpacity`
  background-color: ${config.styles.colors.yellow};
  border-radius: 4px;
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;

export const ColumnContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 60%;
`;

export const StatisticsContainer = styled.View`
  background-color: ${config.styles.colors.darkBrown};
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  width: 92%;
  border-radius: 4px;
`;

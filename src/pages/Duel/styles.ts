import styled from 'styled-components/native';
import { StatusBar } from 'react-native';
import config from '../../config';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const barSize = StatusBar.currentHeight;

interface ISkillButtonProps {
  isFaded: boolean;
}

interface IQuestOptionButtonProps {
  isCorrect: boolean;
  isSelected: boolean;
  isFaded: boolean;
}

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding-top: ${barSize || 30}px;
  background-color: ${config.styles.colors.lightBrown};
`;

export const RoundText = styled.Text`
  color: ${config.styles.colors.darkBrown};
  font-size: 24px;
  margin: 30px 0 15px 0;
  font-weight: bold;
`;

export const HorizontalLine = styled.View`
  background-color: ${config.styles.colors.darkBrown};
  width: 95%;
  height: 2px;
  margin: 10px 0 10px 0;
`;

export const DuelBackgroundContainer = styled.View`
  position: relative;
  width: 100%;
  height: 300px;
  border: 2px solid ${config.styles.colors.darkBrown};
`;

export const DuelBackground = styled.Image`
  width: 100%;
  height: 100%;
  z-index: -2;
`;

export const CountdownContainer = styled.View`
  margin-top: -24px;
  width: 84px;
  height: 84px;
  border-radius: 42px;
  background-color: ${config.styles.colors.darkBrown};
  align-items: center;
  justify-content: center;
`;

export const SkillButton = styled.TouchableOpacity<ISkillButtonProps>`
  background-color: ${config.styles.colors.darkBrown};
  border-radius: 2px;
  width: 90%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  margin: 10px 0 10px 0;
  opacity: ${props => (props.isFaded ? 0.6 : 1)};
`;

export const SkillButtonText = styled.Text`
  font-size: 14px;
  color: ${config.styles.colors.white};
  max-width: 80px;
`;

export const SkillColumn = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

export const SkillRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 90%;
`;

export const QuestionContainer = styled.View`
  background-color: ${config.styles.colors.darkBrown};
  border-radius: 2px;
  width: 90%;
  align-items: center;
  justify-content: center;
  padding: 12px;
  margin: 10px 0 10px 0;
`;

export const QuestionText = styled.Text`
  font-size: 18px;
  color: ${config.styles.colors.white};
`;

export const QuestOptionButton = styled.TouchableOpacity<IQuestOptionButtonProps>`
  background-color: ${props =>
    props.isSelected
      ? props.isCorrect
        ? config.styles.colors.green
        : config.styles.colors.red
      : config.styles.colors.darkBrown};
  border: 2px solid ${config.styles.colors.darkBrown};
  width: 85%;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin: 8px 0 8px 0;
  opacity: ${props => (props.isFaded ? 0.6 : 1)};
`;

export const PlayerAccessory = styled.Image`
  position: absolute;
  height: 120px;
  left: -40px;
  top: 160px;
  z-index: 4;
  transform: scaleX(-1);
`;

export const PlayerEyes = styled.Image`
  position: absolute;
  height: 120px;
  left: -40px;
  top: 160px;
  z-index: 3;
  transform: scaleX(-1);
`;

export const PlayerHair = styled.Image`
  position: absolute;
  height: 120px;
  left: -40px;
  top: 160px;
  z-index: 1;
  transform: scaleX(-1);
`;

export const PlayerHat = styled.Image`
  position: absolute;
  height: 120px;
  left: -40px;
  top: 160px;
  z-index: -1;
  transform: scaleX(-1);
`;

export const PlayerRobe = styled.Image`
  position: absolute;
  height: 120px;
  left: -40px;
  top: 160px;
  z-index: 3;
  transform: scaleX(-1);
`;

export const PlayerBodyTop = styled.Image`
  position: absolute;
  height: 120px;
  left: -40px;
  top: 160px;
  z-index: 0;
  transform: scaleX(-1);
`;

export const PlayerBodyBottom = styled.Image`
  position: absolute;
  height: 120px;
  left: -40px;
  top: 160px;
  z-index: 2;
  transform: scaleX(-1);
`;

export const OpponentAccessory = styled.Image`
  position: absolute;
  height: 120px;
  right: -40px;
  top: 160px;
  z-index: 4;
`;

export const OpponentEyes = styled.Image`
  position: absolute;
  height: 120px;
  right: -40px;
  top: 160px;
  z-index: 3;
`;

export const OpponentHair = styled.Image`
  position: absolute;
  height: 120px;
  right: -40px;
  top: 160px;
  z-index: 1;
`;

export const OpponentHat = styled.Image`
  position: absolute;
  height: 120px;
  right: -40px;
  top: 160px;
  z-index: -1;
`;

export const OpponentRobe = styled.Image`
  position: absolute;
  height: 120px;
  right: -40px;
  top: 160px;
  z-index: 3;
`;

export const OpponentBodyTop = styled.Image`
  position: absolute;
  height: 120px;
  right: -40px;
  top: 160px;
  z-index: 0;
`;

export const OpponentBodyBottom = styled.Image`
  position: absolute;
  height: 120px;
  right: -40px;
  top: 160px;
  z-index: 2;
`;

export const PlayerHpContainer = styled.View`
  position: absolute;
  height: 30px;
  width: 80px;
  left: 70px;
  top: 140px;
  z-index: 2;
  background-color: ${config.styles.colors.red};
  border-radius: 8px;
`;

export const OpponentHpContainer = styled.View`
  position: absolute;
  height: 30px;
  width: 80px;
  right: 70px;
  top: 140px;
  z-index: 2;
  background-color: ${config.styles.colors.red};
  border-radius: 8px;
`;

export const HpText = styled.Text`
  font-size: 14px;
  color: ${config.styles.colors.white};
  margin: auto;
`;

export const ResultsPageContainer = styled.View`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${config.styles.colors.lightBrown};
`;

export const ResultsContainer = styled.View`
  width: 80%;
  padding: 30px;
  border-radius: 8px;
  background-color: ${config.styles.colors.darkBrown};
`;

export const ResultsText = styled.Text`
  color: ${config.styles.colors.white};
  font-size: 30px;
  margin-bottom: 16px;
`;

export const ResultsSmallText = styled.Text`
  color: ${config.styles.colors.white};
  font-size: 18px;
  margin-bottom: 8px;
`;

export const BackToMenuButton = styled.TouchableHighlight`
  border-radius: 8px;
  background-color: ${config.styles.colors.yellow};
  width: 100%;
  height: 55px;
  min-width: 256px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BackToMenuButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${config.styles.colors.black};
`;

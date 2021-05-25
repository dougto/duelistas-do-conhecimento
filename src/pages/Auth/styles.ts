import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import config from '../../config';

const { font } = config.styles;
const { colors } = config.styles;

export const PageContainer = styled.View`
  height: 100%;
  width: 100%;
  position: relative;
  background-color: ${colors.lightBrown};
`;

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${colors.darkBrown};
  width: 80%;
  padding: 20px;
  margin: 30px;
  border-radius: 8px;
`;

export const Logo = styled.Image`
  width: 250px;
  height: 200px;
  box-shadow: 5px -5px 4px black;
`;

export const BackgroundImage = styled.Image`
  position: absolute;
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
`;

export const Header = styled.Text`
  font: 32px ${font};
  font-weight: bold;
  color: ${colors.white};
`;

export const Text = styled.Text`
  font: 12px ${font};
  color: ${colors.white};
`;

export const BoldClickingText = styled.Text`
  font: bold 12px ${font};
  color: ${colors.white};
`;

export const Input = styled.TextInput`
  border: 2px solid ${colors.white};
  color: ${colors.white};
  width: 100%;
  height: 55px;
  min-width: 256px;
  border-radius: 8px;
  margin-top: 12px;
  margin-bottom: 24px;
  padding: 16px;
`;

export const Button = styled.TouchableOpacity`
  border-radius: 8px;
  background-color: ${colors.yellow};
  width: 100%;
  height: 55px;
  min-width: 256px;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font: 18px ${font};
  font-weight: bold;
  color: ${colors.black};
`;

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  margin-bottom: 20px;
`;

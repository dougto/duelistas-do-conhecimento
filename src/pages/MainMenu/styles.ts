import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import config from '../../config';

const { font } = config.styles;
const { colors } = config.styles;

export const PageContainer = styled.View`
  height: 100%;
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: ${colors.lightBrown};
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

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${colors.darkBrown};
  width: 80%;
  padding: 20px;
  margin: 30px;
  border-radius: 8px;
  max-height: 65%;
`;

export const Button = styled.TouchableOpacity`
  border-radius: 8px;
  background-color: ${colors.yellow};
  width: 100%;
  height: 55px;
  min-width: 256px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font: 18px ${font};
  font-weight: bold;
  color: ${colors.black};
`;

import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const PageContainer = styled.View`
  height: 100%;
  width: 100%;
  position: relative;
`;

export const BackgroundImage = styled.Image`
  position: absolute;
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
`;

export const ContentContainer = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Image`
  width: 250px;
  height: 200px;
  box-shadow: 5px -5px 4px black;
`;

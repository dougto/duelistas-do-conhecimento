import styled from 'styled-components/native';

import config from '../../config';

const { colors } = config.styles;

export const Backdrop = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const ModalContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${colors.lightBrown};
  padding: 20px;
  border-radius: 4px;
`;

export const ModalText = styled.Text`
  font-size: 18px;
  color: ${colors.black};
`;

export const CloseButton = styled.TouchableOpacity`
  background-color: ${colors.yellow};
  border-color: ${colors.black};
  border-width: 2px;
  border-radius: 4px;
  padding: 8px;
`;

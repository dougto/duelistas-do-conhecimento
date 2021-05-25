import React from 'react';
import { ActivityIndicator } from 'react-native';
import config from '../../config';

import {
  Backdrop,
  CloseButton,
  ModalContainer,
  ModalText,
} from './styles';

interface IModalProps {
  isVisible: boolean;
  onClose(): void;
}

const { colors } = config.styles;

const DuelSearchModal: React.FC<IModalProps> = ({ isVisible, onClose = () => {} }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <Backdrop>
      <ModalContainer>
        <ModalText>Porcurando duelo...</ModalText>
        <ActivityIndicator style={{ margin: 10 }} size={'large'} color={colors.black}/>
        <CloseButton onPress={onClose}>
          <ModalText>cancelar</ModalText>
        </CloseButton>
      </ModalContainer>
    </Backdrop>
  );
};

export default DuelSearchModal;

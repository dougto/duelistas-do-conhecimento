import React, { useCallback } from 'react';
import { ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';
import { useDuel } from '../../hooks/duel';

import config from '../../config';
import logo from '../../../assets/general/logo.png';
import DuelSearchModal from '../../components/DuelSearchModal';
import {
  PageContainer,
  Logo,
  Container,
  Button,
  ButtonText,
} from './styles';

const MainMenu: React.FC = () => {
  const { black } = config.styles.colors;

  const { signOut } = useAuth();
  const { isSearchingForDuel, handleStartDuelSearch, handleStopDuelSearch } = useDuel();

  const { navigate } = useNavigation();

  const handleModalClose = useCallback(() => {
    handleStopDuelSearch();
  }, [handleStopDuelSearch]);

  return (
    <PageContainer>
      <DuelSearchModal isVisible={isSearchingForDuel} onClose={handleModalClose} />
      <Logo source={logo} />
      <Container>
        <ScrollView centerContent persistentScrollbar style={{ width: '100%' }}>
          <Button onPress={handleStartDuelSearch}>
            <ButtonText>
              <MaterialCommunityIcons name="sword-cross" size={25} color={black} /> Duelar
            </ButtonText>
          </Button>
          <Button onPress={() => { navigate('Character'); }}>
            <ButtonText>
              <MaterialCommunityIcons name="account" size={25} color={black} /> Personagem
            </ButtonText>
          </Button>
          <Button onPress={() => { navigate('Store'); }}>
            <ButtonText>
              <MaterialCommunityIcons name="cart" size={25} color={black} /> Loja
            </ButtonText>
          </Button>
          {/* <Button>
            <ButtonText>
              <MaterialCommunityIcons name="account-multiple" size={25} color={black} /> Amigos
            </ButtonText>
          </Button>
          <Button>
            <ButtonText>
              <MaterialCommunityIcons name="crown" size={25} color={black} /> Leaderboards
            </ButtonText>
          </Button>
          <Button>
            <ButtonText>
              <MaterialCommunityIcons name="medal" size={25} color={black} /> Conquistas
            </ButtonText>
          </Button>
          <Button>
            <ButtonText>
              <MaterialCommunityIcons name="cog" size={25} color={black} /> Configurações
            </ButtonText>
          </Button> */}
          <Button
            onPress={signOut}
          >
            <ButtonText>
              <MaterialCommunityIcons name="arrow-left-bold" size={25} color={black} /> Sair
            </ButtonText>
          </Button>
        </ScrollView>
      </Container>
    </PageContainer>
  );
};

export default MainMenu;

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import config from '../../config';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  ButtonContainer,
  BackButton,
  DetailsText,
  StatisticsContainer,
  Paragraph,
} from './styles';

const Statistics: React.FC = () => {
  const { user } = useAuth();
  const { stat } = user.char;

  const { navigate } = useNavigation();

  return (
    <Container>
      <ButtonContainer>
        <BackButton onPress={() => { navigate('Main') }}>
          <MaterialCommunityIcons name="arrow-left" size={20} color={config.styles.colors.white} />
          <DetailsText>Voltar</DetailsText>
        </BackButton>
      </ButtonContainer>
      <StatisticsContainer>
        <DetailsText>Batalhas Vencidas: {stat.bw}</DetailsText>
        <DetailsText>Batalhas Perdidas: {stat.bl}</DetailsText>
        <DetailsText>Batalhas Empatadas: {stat.bd}</DetailsText>
        <Paragraph />
        <DetailsText>Total de usos de 'Ofensiva Mágica': {stat.su1}</DetailsText>
        <DetailsText>Total de usos de 'Feitiço de Ataque': {stat.su2}</DetailsText>
        <DetailsText>Total de usos de 'Escudo Mágico': {stat.su3}</DetailsText>
        <DetailsText>Total de usos de 'Magia Exata': {stat.su4}</DetailsText>
        <DetailsText>Total de usos de 'Magia do Tempo': {stat.su5}</DetailsText>
        <DetailsText>Total de usos de 'Magia da Natureza': {stat.su6}</DetailsText>
        <DetailsText>Total de usos de 'Magia Pop': {stat.su7}</DetailsText>
        <Paragraph/>
        <DetailsText>Total de Moedas: {stat.tc}</DetailsText>
        <DetailsText>Total de Diamantes: {stat.td}</DetailsText>
        <DetailsText>Total de Estilos Obtidos: {stat.ts}</DetailsText>
      </StatisticsContainer>
    </Container>
  );
};

export default Statistics;

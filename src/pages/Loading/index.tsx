import React from 'react';
import { ActivityIndicator } from 'react-native';

import backgorundImage from '../../../assets/backgrounds/background-1.png';
import logo from '../../../assets/general/logo.png';

import {
  PageContainer,
  BackgroundImage,
  ContentContainer,
  Logo,
} from './styles';

const Loading: React.FC = () => (
  <PageContainer>
    <BackgroundImage source={backgorundImage} />
    <ContentContainer>
      <Logo source={logo} />
      <ActivityIndicator size="large" />
    </ContentContainer>
  </PageContainer>
);

export default Loading;

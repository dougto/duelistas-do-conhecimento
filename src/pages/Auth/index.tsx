import React, { useState } from 'react';
import { Platform, KeyboardAvoidingView, Alert } from 'react-native';

import { useAuth } from '../../hooks/auth';
import logo from '../../../assets/general/logo.png';
import {
  PageContainer,
  Container,
  Header,
  Text,
  BoldClickingText,
  Button,
  ButtonText,
  Input,
  Row,
  Logo,
} from './styles';

const Authentication: React.FC = () => {
  const [isSignInPage, setIsSignInPage] = useState(true);
  const [authCredentials, setAuthCredentials] = useState({ email: '', password: ''});
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { signIn, signUp } = useAuth();

  const handleSignIn = async () => {
    signIn(authCredentials);
  };

  const handleSignUp = async () => {
    if (authCredentials.password !== passwordConfirmation) {
      Alert.alert('Confirmação de senha incorreta');
      return;
    }

    signUp(authCredentials);
  };

  const renderSignIn = (): any => (
    <>
      <Header>Entre com sua conta para jogar</Header>
      <Row>
        <Text>Não possui uma conta? </Text>
        <BoldClickingText
          onPress={() => {
            setIsSignInPage(false);
          }}
        >
          Clique aqui
        </BoldClickingText>
      </Row>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="emailAddress"
        placeholder="E-mail"
        placeholderTextColor="#ddf"
        onChangeText={(email) => {
          setAuthCredentials({...authCredentials, email});
        }}
      />
      <Input
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="password"
        placeholder="Senha"
        placeholderTextColor="#ddf"
        onChangeText={(password) => {
          setAuthCredentials({...authCredentials, password});
        }}
      />
      <Button
        onPress={handleSignIn}
      >
        <ButtonText>Entrar</ButtonText>
      </Button>
    </>
  );

  const renderSignUp = (): any => (
    <>
      <Header>Crie sua conta para jogar</Header>
      <Row>
        <Text>Já possui uma conta? </Text>
        <BoldClickingText
          onPress={() => {
            setIsSignInPage(true);
          }}
        >
          Clique aqui
        </BoldClickingText>
      </Row>
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="emailAddress"
        placeholder="E-mail"
        placeholderTextColor="#ddf"
        onChangeText={(email) => {
          setAuthCredentials({...authCredentials, email});
        }}
      />
      <Input
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="password"
        placeholder="Senha"
        placeholderTextColor="#ddf"
        onChangeText={(password) => {
          setAuthCredentials({...authCredentials, password});
        }}
      />
      <Input
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="password"
        placeholder="Confirmar senha"
        placeholderTextColor="#ddf"
        onChangeText={(password) => {
          setPasswordConfirmation(password);
        }}
      />
      <Button
        onPress={handleSignUp}
      >
        <ButtonText>Criar Conta</ButtonText>
      </Button>
    </>
  );

  return (
    <PageContainer>
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Logo source={logo} />
        <Container>{isSignInPage ? renderSignIn() : renderSignUp()}</Container>
      </KeyboardAvoidingView>
    </PageContainer>
  );
};

export default Authentication;

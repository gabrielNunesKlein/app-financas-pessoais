import React, { useContext, useState } from "react";
import { Platform, ActivityIndicator } from "react-native";
import { 
    Background, 
    Logo, 
    Container, 
    AreaInput, 
    Input,
    SubmitButton,
    SubmitText,
    Link,
    LinkText } from './styles'

import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";

export default function SignIn() {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signIn, loading } = useContext(AuthContext);

    function handleLogin(){
        signIn(email, password)
    }

    return (
        <Background>
            <Container
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled
            >
                <Logo source={require('../../../assets/Logo.png')} />
                <AreaInput>
                    <Input 
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    placeholder="Seu email" />
                </AreaInput>

                <AreaInput>
                    <Input 
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    placeholder="Seu senha" />
                </AreaInput>

                <SubmitButton activeOpacity={0.8} onPress={handleLogin}>
                    {
                        loading ? (
                            <ActivityIndicator size={20} color='#fff' />
                        ) : (
                        <SubmitText>
                            Acessar
                        </SubmitText>
                        )
                    }
                </SubmitButton>

                <Link onPress={() => navigation.navigate('SingUp')}>
                    <LinkText>
                        Criar uma conta
                    </LinkText>
                </Link>

            </Container>
        </Background>
    )
}
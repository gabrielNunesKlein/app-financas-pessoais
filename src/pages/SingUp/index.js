import React, { useContext, useState } from "react";
import { Platform, ActivityIndicator } from "react-native";

import { Background, Container, AreaInput, Input, SubmitButton, SubmitText } from '../SignIn/styles'
import { AuthContext } from "../../contexts/auth";

export default function SignUp() {
    const { signUp, loading } = useContext(AuthContext)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSignUp(){
        if(nome === '' || email === '' || password === '') return;
        
        signUp(email, password, nome)
    }

    return (
        <Background>
            <Container
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled
            >
                <AreaInput>
                    <Input 
                    value={nome}
                    onChangeText={(value) => setNome(value)}
                    placeholder="Nome" />
                </AreaInput>

                <AreaInput>
                    <Input 
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                    placeholder="seu email" />
                </AreaInput>

                <AreaInput>
                    <Input 
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    placeholder="sua senha" />
                </AreaInput>

                <SubmitButton onPress={handleSignUp}>
                    {
                        loading ? (
                            <ActivityIndicator size={20} color='#fff' />
                        ) : 
                        (
                        <SubmitText>
                            Cadastrar
                        </SubmitText>
                        )
                    }
                </SubmitButton>

            </Container>
        </Background>
    )
}
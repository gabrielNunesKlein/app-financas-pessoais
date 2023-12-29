import React, { createContext, useState, useEffect } from "react";
import api from '../../src/services/api'
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }){

    const navigation = useNavigation()

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorage(){
            setLoading(true)
            const storageUser = await AsyncStorage.getItem('@finToken')

            if(storageUser){
                const response = await api.get('/me', {
                    headers: {
                        'Authorization': `Bearar ${storageUser}`
                    }
                }).catch(() => {
                    setUser(null)
                })

                api.defaults.headers['Authorization'] = `Bearer ${storageUser}`
                setUser(response.data)
            }

            setLoading(false)
        }

        loadStorage()
    }, [])

    async function signUp(email, password, nome){
        setLoading(true)
        try {

            const response = await api.post('users', {
                name: nome,
                email: email,
                password: password
            })

            console.log('RESPONSE >>>> ', response)
            setLoading(false)
            navigation.goBack()

        } catch(err){
            console.log('Error ', err)
            setLoading(false)
        }
    }

    async function signIn(email, password){
        setLoading(true)

        try {

            const response = await api.post('/login', {
                email: email,
                password: password
            })

            const { id, name, token } = response.data
            const data = {
                id,
                name,
                token,
                email
            }

            await AsyncStorage.setItem('@finToken', token)
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            setUser({
                id,
                name,
                email
            })
            setLoading(false)

        } catch(err){
            console.log(err)
            loading(false)
        }
    }


    async function signOut(){
        await AsyncStorage.clear()
            .then(() => {
                setUser(null);
            })
    }
    
    return (
        <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, signOut, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
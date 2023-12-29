import React, { useState } from "react";
import { RegisterContainer, RegisterTypeButton, RegisterLabel } from './styles'
import { Feather } from '@expo/vector-icons'

export default function RegisterTypes({ type, sendTypeChanged }){

    const [typeChecked, setTypeCheked] = useState(type)
    
    function changeType(name){
        setTypeCheked(name)
        sendTypeChanged(name)
    }
    return (
        <RegisterContainer>
            <RegisterTypeButton 
            onPress={() => changeType('receita')}
            checked={ typeChecked === 'receita' ? true : false}>
                <Feather name="arrow-up" size={25} color="#121212" />
                <RegisterLabel>
                    Receita
                </RegisterLabel>
            </RegisterTypeButton>

            <RegisterTypeButton 
            onPress={() => changeType('despesa')}
            checked={ typeChecked === 'despesa' ? true : false}>
                <Feather name="arrow-down" size={25} color="#121212" />
                <RegisterLabel>
                    Despesa
                </RegisterLabel>
            </RegisterTypeButton>

        </RegisterContainer>
    )
}
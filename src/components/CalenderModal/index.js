import React, { useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { ButtonFilterText, Container, ModalContent, ButtonFilter } from './styles'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import { ptBr } from "./localeCalandar";

LocaleConfig.locales['pt-br'] = ptBr
LocaleConfig.defaultLocale = 'pt-br'

export default function CalenderModal({ setVisible, handleFilter }){

    const [dateNow, setDateNow] = useState(new Date())
    const [markedDates, setMarkedDates] = useState({})

    function handleOnDaysPress(date){
        setDateNow(new Date(date.dateString))
        let markedDay = {}
        markedDay[date.dateString] = {
            selected: true,
            selectedColor: '#3b3dbf',
            textColor: '#fff'
        }

        setMarkedDates(markedDay)
        
    }

    function handleFilterDate(){
        handleFilter(dateNow)
        setVisible(false)
    }

    return (
        <Container>
            <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                <View style={{ flex: 1}}>
                </View>
            </TouchableWithoutFeedback>

            <ModalContent>
                <Calendar 
                onDayPress={handleOnDaysPress}
                markedDates={markedDates}
                enableSwipeMonths={true}
                theme={{
                    todayTextColor: '#ff0000',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#fff'
                }}
                />
                <ButtonFilter onPress={handleFilterDate}>
                    <ButtonFilterText>
                        Filtrar
                    </ButtonFilterText>
                </ButtonFilter>
            </ModalContent>


        </Container>
    )
}
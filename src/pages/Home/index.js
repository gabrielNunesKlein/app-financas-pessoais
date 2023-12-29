import React, { useContext, useEffect, useState } from "react";
import { Modal, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'
import { AuthContext } from "../../contexts/auth";
import { Background, 
    ListBalance, Area, Title, List } from "./styles";

import Header from '../../components/Header/index'
import { format } from "date-fns";
import api from "../../services/api";

import { useIsFocused } from "@react-navigation/native";
import BalanceItem from "../../components/BalanceItem";
import HistoricoList from "../../components/HistoricoList";
import CalenderModal from "../../components/CalenderModal";

export default function Home(){
    const { signOut, user } = useContext(AuthContext)
    const isFocused = useIsFocused()

    const [listBalance, setListBalence] = useState([])
    const [dateMoviment, setDateMoviment] = useState(new Date())
    const [moviments, setMoviments] = useState([])
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        let isActive = true;

        async function getMoviments(){
            //let dateFormat = format(dateMoviment, 'dd/MM/yyyy')
            let date = new Date(dateMoviment)
            let onlyDate = date.valueOf() + date.getTimezoneOffset() * 60 * 1000;
            let dateFormated = format(onlyDate, 'dd/MM/yyyy')

            console.log(dateFormated)

            const receives = await api.get('/receives', {
                params: {
                    date: dateFormated
                }
            })

            const balance = await api.get('/balance', {
                params: {
                    date: dateFormated
                }
            })

            if(isActive){
                setMoviments(receives.data)
                setListBalence(balance.data)
            }
        }

        getMoviments()

        return () => { 
            isActive = false
         }
    }, [isFocused, dateMoviment])

    async function handleDelete(id){
        try {
            await api.delete('/receives/delete', {
                params: {
                    item_id: id
                }
            })

            setDateMoviment(new Date())
        } catch(err){
            console.log(err)
        }
    }

    function filterDateMoviment(dateSelected){
        setDateMoviment(dateSelected)
    }

    return (
        <Background>
            <Header title="Minhas movimentações" />
            <ListBalance 
            data={listBalance}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.tag}
            renderItem={({item}) => ( <BalanceItem data={item} /> ) }
            />

            <Area>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <MaterialIcons name="event" color="#121212" size={30} />
                </TouchableOpacity>
                <Title>
                    Ultimas movimentações
                </Title>
            </Area>

            <List 
            data={moviments}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <HistoricoList data={item} deleteItem={handleDelete} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20}}
             />

            <Modal visible={modalVisible} animationType="fade" transparent={true}>
                <CalenderModal 
                setVisible={() => setModalVisible(false) }
                handleFilter={filterDateMoviment}
                />
            </Modal>


        </Background>
    )
}
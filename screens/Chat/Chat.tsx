import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    Dimensions
} from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import { filterConfig } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-navigation';
import { UIHeader } from '../../components';
import { fontSizes } from '../../constants';
import { get, child, firebaseDatabase, firebaseDatabaseRef, onValue } from '../../firebase/firebase';
import ChatItem from './ChatItem';


const Chat = ({ navigation }: NativeStackHeaderProps) => {

    const [users, setUsers] = useState([
        {
            // url: 'https://randomuser.me/api/portraits/men/10.jpg',
            // name: 'Đỗ Quốc Thưởng',
            // message: 'Hello, how are you ?',
            // numberOfUnreadMessages: 3
        }
    ]);

    useEffect(() => {
        onValue(firebaseDatabaseRef(firebaseDatabase, 'users'), async (snapshot) => {
            if (snapshot.exists()) {
                let snapshotObject = snapshot.val()
                let stringUser = await AsyncStorage.getItem("user")
                let myUserId = JSON.parse(stringUser).userId
                setUsers(Object.keys(snapshotObject)
                    .filter(eachKey => eachKey != myUserId).map(eachKey => {
                        let eachObject = snapshotObject[eachKey]
                        return {
                            //default profile url
                            url: 'https://www.w3schools.com/howto/img_avatar.png',
                            name: eachObject.email,
                            email: eachObject.email,
                            accessToken: eachObject.accessToken,
                            numberOfUnreadMessages: 0,
                            userId: eachKey,
                        }
                    }))
            } else {
                console.log('No data available')
            }
        })
    }, []);

    return (
        <View
            style={{
                flexDirection: 'column'
            }}
        >
            <UIHeader
                title={'Notification'}
                lefIconName={'arrow-left'}
                rightIconName={'search'}
                onPressLeftIcon={() => {
                    return alert('left icon');
                }}
                onPressRightIcon={() => {
                    return alert('right icon');
                }}
            />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingStart: 10
                }}
            >
                <Text
                    style={{
                        color: 'black',
                        fontSize: fontSizes.h6
                    }}>
                    6 unread messages
                </Text>
                <Icon name={'search'} size={23} color={'white'}
                    style={{
                        padding: 10
                    }}
                    onPress={() => alert('You Press delete')}
                />
            </View>
            <FlatList
                scrollEnabled={true}
                style={{
                    // backgroundColor: 'red'
                }}
                // keyExtractor={item => item.accessToken}
                data={users}
                renderItem={({ item, index }) =>
                    <ChatItem
                        key={item.accessToken}
                        name={item.name}
                        url={item.url}
                        message={item.message}
                        numberOfUnreadMessages={item.numberOfUnreadMessages}
                        onPress={() => navigation.navigate('Messenger', { user: item })}
                    />}
            />
        </View>
    )
}

export default Chat
import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    Keyboard
} from "react-native";
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-navigation';
import { UIHeader } from '../../components';
import { colors, fontSizes } from '../../constants';
import MessengerItem from './MessengerItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    auth,
    firebaseDatabase,
    onAuthStateChanged,
    firebaseDatabaseRef,
    firebaseSet,
    onValue
} from '../../firebase/firebase'

import { useSafeAreaInsets } from 'react-native-safe-area-context';


const Messenger = (props: any) => {
    // alert('234')
    const safeAreaInsets = useSafeAreaInsets();
    const { url, name } = props.route.params.user;
    const { navigation } = props;
    const [typedText, setTypedText] = useState('');
    const [chatHistory, setChatHistory] = useState([
        {
            // url: 'https://randomuser.me/api/portraits/men/70.jpg',
            // showUrl: true,
            // isSender: true,
            // messenger: "Hello",
            // timestamp: 1641654238000,
        }
    ]);

    useEffect(() => {
        // alert(JSON.stringify(safeAreaInsets));
        onValue(firebaseDatabaseRef(firebaseDatabase, 'chats'), async (snapshot) => {
            // debugger
            if (snapshot.exists()) {
                let snapshotObject = snapshot.val();
                let stringUser = await AsyncStorage.getItem('user');
                let myUserId = JSON.parse(stringUser).userId;
                // debugger
                let updatedChatHistory = Object.keys(snapshotObject).filter(item => item.includes(myUserId) && item.includes(props.route.params.user.userId))
                    .map(eachKey => {
                        // debugger
                        return {
                            ...snapshotObject[eachKey],
                            isSender: eachKey.split('-')[0] == myUserId,
                            userId1: eachKey.split('-')[0],
                            userId2: eachKey.split('-')[1]
                        }
                    }).sort((item1, item2) => item1.timestamp - item2.timestamp);
                // debugger
                for (let i = 0; i < updatedChatHistory.length; i++) {
                    if (i < updatedChatHistory.length - 1) {
                        let user1_c = updatedChatHistory[i].userId1;
                        let user1_n = updatedChatHistory[i + 1].userId1;
                        if (user1_c != user1_n) {
                            updatedChatHistory[i + 1].showUrl = true
                        }
                        console.log(`${user1_c}-${user1_n}`);
                    }

                }
                // console.log(updatedChatHistory);
                setChatHistory(updatedChatHistory);
                // debugger
            }
        })
    }, [])

    return (
        <View
            style={{
                flexDirection: 'column',
                flex: 1
            }}
        >
            <View style={{ height: safeAreaInsets.top }} />
            <UIHeader
                title={name}
                lefIconName={'arrow-left'}
                rightIconName={'ellipsis-v'}
                onPressLeftIcon={() => {
                    navigation.goBack();
                }}
                onPressRightIcon={() => {
                    return alert('right icon');
                }}
            />
            <FlatList
                style={{
                    flex: 1
                }}
                keyExtractor={(item,) => item.messenger}
                data={chatHistory}
                renderItem={({ item, index }) =>
                    <MessengerItem
                        key={`${item.timestamp}`}
                        item={item}
                        onPress={() => alert("234")}
                    />}
            />
            <View style={{
                height: 50,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                borderTopWidth: 1,
                borderTopColor: '#ccc',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <TextInput
                    value={typedText}
                    onChangeText={(text) => {
                        setTypedText(text)
                    }}
                    placeholder='Enter your message here'
                    placeholderTextColor={colors.placeholder}
                    style={{
                        height: 50,
                        paddingStart: 10,
                        color: 'black',
                        flex: 1
                    }}
                />
                <TouchableOpacity
                    onPress={async () => {
                        if (typedText.trim().length == 0) {
                            return
                        }

                        let stringUser = await AsyncStorage.getItem("user")
                        let myUserId = JSON.parse(stringUser).userId
                        let myFriendUserId = props.route.params.user.userId
                        //save to Firebase DB
                        let newMessengerObject = {
                            //fake
                            url: 'https://randomuser.me/api/portraits/men/50.jpg',
                            showUrl: false,
                            messenger: typedText,
                            timestamp: (new Date()).getTime(),
                        }
                        Keyboard.dismiss()
                        firebaseSet(firebaseDatabaseRef(
                            firebaseDatabase,
                            `chats/${myUserId}-${myFriendUserId}-${newMessengerObject.timestamp}`
                        ), newMessengerObject).then(() => {
                            setTypedText('')
                        })
                    }}
                >
                    <Icon name='paper-plane' size={20} color={colors.primary} style={{
                        padding: 10
                    }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Messenger
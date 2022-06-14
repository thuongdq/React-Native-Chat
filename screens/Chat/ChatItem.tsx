import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity
} from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-navigation';
import { UIHeader } from '../../components';
import { colors, fontSizes } from '../../constants';

const ChatItem = ({ name, url, message, numberOfUnreadMessages, userId, onPress }:
    { name: string, url: string, message: string, numberOfUnreadMessages: number, userId: string, onPress: any }) => {


    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                height: 80,
                paddingTop: 20,
                paddingHorizontal: 10,
                flexDirection: 'row'
            }}
        >
            <View>
                <Image
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        resizeMode: 'cover',
                        marginRight: 15,
                        marginStart: 10
                    }}
                    source={{
                        uri: url
                    }}
                />
                {numberOfUnreadMessages > 0 && <Text
                    style={{
                        position: 'absolute',
                        right: 7,
                        backgroundColor: 'red',
                        color: 'white',
                        fontSize: fontSizes.h6 * 0.8,
                        borderRadius: 10,
                        overflow: 'hidden',
                        paddingHorizontal: numberOfUnreadMessages > 9 ? 2 : 4
                    }}
                >{numberOfUnreadMessages}</Text>}
            </View>
            <View style={{
                flexDirection: 'column'
            }}>
                <Text
                    style={{
                        color: 'black',
                        fontSize: fontSizes.h6,
                        fontWeight: 'bold'
                    }}
                >{name}</Text>
                <Text
                    style={{
                        color: colors.inactive,
                        fontSize: fontSizes.h6
                    }}
                >{message}</Text>
            </View>
            <View style={{
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end'
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: fontSizes.h6 * 0.8
                }}>
                    4 minutes ago
                </Text>
            </View>
        </TouchableOpacity >
    )
}

export default ChatItem
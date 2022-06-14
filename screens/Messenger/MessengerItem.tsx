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
import { screenWidth } from '../../util/Device';

const MessengerItem = ({ item, onPress }:
    { item: any, onPress: any }) => {

    const { url, showUrl, isSender, messenger, timestamp } = item;
    return (
        isSender == false ? <TouchableOpacity
            onPress={onPress}
            style={{
                paddingStart: 10,
                marginTop: showUrl == true ? 10 : 2,
                flexDirection: 'row'
            }}
        >
            {showUrl == true ? <Image
                style={{
                    width: 40,
                    height: 40,
                    marginRight: 15,
                    marginStart: 10,
                    resizeMode: 'cover',
                    borderRadius: 25
                }}
                source={{
                    uri: url
                }}
            /> : <View style={{ width: 40, height: 40, marginRight: 15, marginStart: 10, }} />}
            <View style={{
                flexDirection: 'row',
                width: screenWidth * 0.7,
                justifyContent: 'flex-start',
                alignSelf: 'flex-start'
            }}>

                <Text style={{
                    color: 'black',
                    fontSize: fontSizes.h6,
                    paddingVertical: 10,
                    paddingHorizontal: 7,
                    backgroundColor: colors.messenger,
                    borderRadius: 10,
                    overflow: 'hidden'
                }}>
                    {messenger}
                </Text>
            </View>

            <View style={{ flex: 1 }} />

        </TouchableOpacity > :
            <TouchableOpacity
                onPress={onPress}
                style={{
                    paddingStart: 10,
                    marginTop: showUrl == true ? 10 : 2,
                    flexDirection: 'row'
                }}
            >
                <View style={{ flex: 1 }} />
                <View style={{
                    flexDirection: 'row',
                    width: screenWidth * 0.7,
                    justifyContent: 'flex-end',
                    alignSelf: 'flex-end'
                }}>

                    <Text style={{
                        color: 'black',
                        fontSize: fontSizes.h6,
                        paddingVertical: 10,
                        paddingHorizontal: 7,
                        backgroundColor: colors.messenger,
                        borderRadius: 10,
                        overflow: 'hidden'
                    }}>
                        {messenger}
                    </Text>
                </View>
                {showUrl == true ? <Image
                    style={{
                        width: 40,
                        height: 40,
                        resizeMode: 'cover',
                        borderRadius: 25,
                        marginRight: 15,
                        marginStart: 10
                    }}
                    source={{
                        uri: url
                    }}
                /> : <View style={{ width: 40, height: 40, marginRight: 15, marginStart: 10, }} />}

            </TouchableOpacity >
    )
}

export default MessengerItem
import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SafeAreaView } from "react-navigation";
import { colors, fontSizes } from "../constants";

function UIHeader({ title, lefIconName, rightIconName, onPressLeftIcon, onPressRightIcon }:
    { title: string, lefIconName: string, rightIconName: string, onPressLeftIcon: any, onPressRightIcon: any }) {
    return (
        <View style={{
            height: 60,
            backgroundColor: colors.primary,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            {lefIconName != undefined ? <Icon name={lefIconName} size={23} color={'white'}
                style={{
                    padding: 10
                }}
                onPress={onPressLeftIcon}
            /> : <View style={{ width: 50, height: 50 }} />}
            <Text
                style={{
                    fontSize: fontSizes.h5,
                    color: 'white',
                    lineHeight: 45
                }}
            >

                {title}

            </Text>
            {rightIconName != undefined ? <Icon name={rightIconName} size={23} color={'white'}
                style={{
                    padding: 10
                }}
                onPress={onPressRightIcon}
            /> : <View style={{ width: 50, height: 50 }} />}
        </View>
    )
}

export default UIHeader;
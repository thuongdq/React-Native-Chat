import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, Platform } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { UIButton } from '../components';
import { colors, fontSizes, icons, images } from '../constants';
import {
    auth,
    firebaseDatabase,
    onAuthStateChanged,
    firebaseDatabaseRef,
    firebaseSet
} from '../firebase/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
function Welcome({ navigation }: NativeStackHeaderProps) {
    // let accountTypes = [
    //     'Influencer', 'Business', 'Individual'
    // ];

    const [accountTypes, setAccountType] = useState([
        {
            name: 'Influencer',
            isSelected: true
        },
        {
            name: 'Business',
            isSelected: false
        },
        {
            name: 'Individual',
            isSelected: false
        }
    ])

    useEffect(() => {
        onAuthStateChanged(auth, (responseUser) => {
            if (responseUser != null) {
                //sign in
                //Save to firebase
                let user = {
                    userId: responseUser.uid,
                    email: responseUser.email,
                    emailVerified: responseUser.emailVerified,
                    accessToken: responseUser.accessToken
                }

                firebaseSet(firebaseDatabaseRef(
                    firebaseDatabase,
                    `users/${responseUser.uid}`
                ), user)


                //Save to local stoage
                AsyncStorage.setItem('user', JSON.stringify(user));
                navigation.navigate('UITab');
            } else {
                //signout
            }
        })
    });
    return (
        <View style={{
            backgroundColor: 'white',
            flex: 100
        }}>
            <ImageBackground
                source={images.background}
                resizeMode='cover'
                style={{
                    flex: 100,
                    justifyContent: 'center'
                }}

            >
                <View
                    style={{
                        flexDirection: 'row',
                        flex: 20,
                        marginTop: Platform.OS === 'ios' ? 40 : 0
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            height: 50,
                            flex: 1,
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}
                    >
                        <Image
                            source={icons.fire}
                            style={{
                                width: 30,
                                height: 30,
                                marginStart: 10,
                                marginEnd: 5
                            }}
                        />
                        <Text
                            style={{
                                color: "#fff"
                            }}
                        >
                            YOURCOMPANY.CO
                        </Text>
                        <View style={{ flex: 1 }}></View>
                        {/* <Image
                            source={icons.question}
                            style={{
                                width: 20,
                                height: 20,
                                marginEnd: 10,
                                tintColor: "#fff"
                            }}
                        /> */}
                        <Icon
                            name='question-circle'
                            size={20}
                            color='white'
                            style={{
                                marginEnd: 20
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        flex: 20,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            marginBottom: 7,
                            color: '#fff',
                            fontSize: fontSizes.h6
                        }}
                    >
                        Welcom to
                    </Text>
                    <Text
                        style={{
                            marginBottom: 7,
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: fontSizes.h5
                        }}
                    >
                        COURCOMPANY.CO
                    </Text>
                    <Text
                        style={{
                            marginBottom: 7,
                            color: '#fff',
                            fontSize: fontSizes.h6
                        }}
                    >
                        Please select your account type
                    </Text>
                </View>
                <View
                    style={{
                        flex: 40,
                    }}
                >
                    {accountTypes.map((accountType, index, array) => {
                        return (
                            <UIButton
                                key={index}
                                isSelected={accountType.isSelected}
                                title={accountType.name}
                                onPress={() => {
                                    let newAccountTypes = accountTypes.map((eachAccountType) => {
                                        return { ...eachAccountType, isSelected: eachAccountType.name == accountType.name }
                                    })
                                    setAccountType(newAccountTypes);
                                }}
                            />
                        )
                    })}
                </View>
                <View
                    style={{
                        flex: 20
                    }}
                >
                    <UIButton
                        title={"Login".toLocaleUpperCase()}
                        isSelected={false}
                        onPress={() => {
                            navigation.navigate('Login');
                        }}
                    />
                    <Text
                        style={{
                            color: "white",
                            fontSize: fontSizes.h6,
                            alignSelf: 'center'
                        }}
                    >
                        Want to register new Account ?
                    </Text>
                    <TouchableOpacity
                        style={{
                            padding: 5
                        }}
                        onPress={() => {
                            navigation.navigate('Register');
                        }}
                    >
                        <Text
                            style={{
                                color: colors.primary,
                                fontSize: fontSizes.h6,
                                alignSelf: 'center',
                                textDecorationLine: 'underline',
                            }}
                        >
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Welcome
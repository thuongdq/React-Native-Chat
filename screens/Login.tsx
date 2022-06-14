import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Keyboard
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

import { images, colors, icons, fontSizes } from '../constants';
import { auth, firebaseDatabase, firebaseDatabaseRef, firebaseSet, signInWithEmailAndPassword } from '../firebase/firebase';
import { isValidEmail, isValidPassword } from '../util/Validations';

const Login = ({ navigation }: NativeStackHeaderProps) => {

    const [keyboardIsShown, setKeyboardIsShown] = useState(false);
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [email, setEmail] = useState('thuongdq@gmail.com');
    const [password, setPassword] = useState('123456');

    const isValidationOK = () => email.length > 0 && password.length > 0
        && isValidEmail(email) == true
        && isValidPassword(password) == true;

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsShown(true)
        })

        Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsShown(false)
        })
    })




    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'white'
            }}
        >
            <View
                style={{
                    height: 200,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flex: 30
                }}
            >
                <Text
                    style={{
                        color: 'black',
                        fontSize: fontSizes.h1,
                        fontWeight: 'bold',
                        width: '50%'
                    }}
                >
                    Already have an Account
                </Text>
                <Image
                    source={images.computer}
                    style={{
                        width: 120,
                        height: 120,
                        tintColor: colors.primary,
                        alignSelf: 'center'
                    }}
                />
            </View>
            <View
                style={{
                    flex: 30
                }}
            >
                <View
                    style={{
                        marginBottom: 15,
                        marginHorizontal: 15
                    }}
                >
                    <Text
                        style={{
                            fontSize: fontSizes.h6,
                            color: colors.primary
                        }}
                    >
                        Email:
                    </Text>
                    <TextInput
                        value={email}
                        placeholder='example@gmail.com'
                        keyboardType='email-address'
                        placeholderTextColor={colors.placeholder}
                        style={{
                            color: 'black',

                        }}
                        onChangeText={(text) => {
                            setErrorEmail(isValidEmail(text) == true ? '' : "Email not in correct format");
                            setEmail(text)
                        }}
                    />
                    <View
                        style={{
                            height: 1,
                            backgroundColor: colors.primary,
                            width: '100%',
                            marginHorizontal: 15,
                            alignSelf: 'center'
                        }}
                    />
                    {errorEmail !== '' && <Text
                        style={{
                            color: 'red',
                            fontStyle: 'italic',
                            fontSize: fontSizes.h6
                        }}
                    >
                        (*) {errorEmail}
                    </Text>}
                </View>
                <View
                    style={{
                        marginBottom: 15,
                        marginHorizontal: 15
                    }}
                >
                    <Text
                        style={{
                            fontSize: fontSizes.h6,
                            color: colors.primary
                        }}
                    >
                        Password:
                    </Text>
                    <TextInput
                        value={password}
                        placeholder='Enter you password'
                        placeholderTextColor={colors.placeholder}
                        secureTextEntry={true}
                        style={{
                            color: 'black'
                        }}
                        onChangeText={(text) => {
                            setErrorPassword(isValidPassword(text) == true ? '' : "Password must be at the least 3 character");
                            setPassword(text)
                        }}
                    />
                    <View
                        style={{
                            height: 1,
                            backgroundColor: colors.primary,
                            width: '100%',
                            marginHorizontal: 15,
                            alignSelf: 'center'
                        }}
                    />
                    {errorPassword !== '' && <Text
                        style={{
                            color: 'red',
                            fontStyle: 'italic',
                            fontSize: fontSizes.h6
                        }}
                    >
                        (*) {errorPassword}
                    </Text>}
                </View>
            </View>

            {keyboardIsShown == false && <View
                style={{
                    flex: 15
                }}
            >
                <TouchableOpacity
                    disabled={!isValidationOK()}
                    style={{
                        backgroundColor: isValidationOK() ? colors.primary : colors.inactive,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '50%',
                        alignSelf: 'center',
                        borderRadius: 17
                    }}
                    onPress={() => {
                        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                            const user = userCredential.user;
                            navigation.navigate('UITab');
                        }).catch((error) => {
                            alert(`Cannot sign, error: ${error.message}`)
                        })
                    }}
                >
                    <Text
                        style={{
                            padding: 8,
                            color: '#fff',
                            fontSize: fontSizes.h5
                        }}
                    >
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        padding: 5
                    }}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text
                        style={{
                            padding: 8,
                            color: colors.primary,
                            fontSize: fontSizes.h5,
                            alignSelf: 'center'
                        }}
                    >
                        New user? Register now
                    </Text>
                </TouchableOpacity>
            </View>}

            {keyboardIsShown == false && <View
                style={{
                    flex: 25,
                }}
            >
                <View
                    style={{
                        height: 40,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: 20
                    }}
                >
                    <View style={{ height: 1, backgroundColor: 'black', flex: 1 }} />
                    <Text
                        style={{
                            padding: 8,
                            fontSize: fontSizes.h6,
                            color: 'black',
                            alignSelf: 'center',
                            fontWeight: 'bold',
                            marginHorizontal: 5
                        }}
                    >
                        User other methods?
                    </Text>
                    <View style={{ height: 1, backgroundColor: 'black', flex: 1 }} />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}
                >
                    <TouchableOpacity
                        style={{
                            marginHorizontal: 5
                        }}
                        onPress={() => {
                            alert("Press Login facebook");
                        }}
                    >
                        <Icon name='facebook-square' size={40} color={colors.facebook} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            marginHorizontal: 5
                        }}
                        onPress={() => {
                            alert("Press Login google");
                        }}
                    >
                        <Icon name='google-plus' size={40} color={colors.google} />
                    </TouchableOpacity>
                </View>

            </View>}
        </View>
    )
}
export default Login
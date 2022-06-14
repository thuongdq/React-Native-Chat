import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Keyboard,
    Dimensions
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { images, colors, icons, fontSizes } from '../constants';
import { isValidEmail, isValidPassword } from '../util/Validations';
import {
    auth,
    createUserWithEmailAndPassword,
    firebaseDatabase,
    firebaseDatabaseRef,
    firebaseSet,
    sendEmailVerification
} from '../firebase/firebase';
import { screenHeight } from '../util/Device';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

const Register = ({ navigation }: NativeStackHeaderProps) => {

    const [keyboardIsShown, setKeyboardIsShown] = useState(false);
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [email, setEmail] = useState('thuongdq@gmail.com');
    const [password, setPassword] = useState('123456');
    const [retypePassword, setRetypePassword] = useState('123456');
    const isValidationOK = () => email.length > 0 && password.length > 0
        && isValidEmail(email) == true
        && isValidPassword(password) == true
        && password == retypePassword;

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsShown(true)
        })

        Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsShown(false)
        })
    })
    return (
        <KeyboardAwareScrollView
            style={{
                flex: 1,
                backgroundColor: colors.primary
            }}
        >
            <View
                style={{
                    height: 200,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        color: 'white',
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
                        tintColor: 'white',
                        alignSelf: 'center'
                    }}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    minHeight: screenHeight * 0.5,
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    padding: 10,
                    margin: 10,
                    borderRadius: 20
                }}
            >
                <View
                    style={{
                        marginHorizontal: 15,
                        marginBottom: 15,
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
                        placeholder='example@gmail.com'
                        placeholderTextColor={colors.placeholder}
                        value={email}
                        style={{
                            color: 'black',
                            marginVertical: 10
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
                    <Text
                        style={{
                            color: 'red',
                            fontStyle: 'italic',
                            fontSize: fontSizes.h6
                        }}
                    >
                        {errorEmail}
                    </Text>
                </View>
                <View
                    style={{
                        marginHorizontal: 15,
                        marginBottom: 15
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
                        placeholder='Enter you password'
                        placeholderTextColor={colors.placeholder}
                        secureTextEntry={true}
                        value={password}
                        style={{
                            color: 'black',
                            marginVertical: 10
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
                    <Text
                        style={{
                            color: 'red',
                            fontStyle: 'italic',
                            fontSize: fontSizes.h6
                        }}
                    >
                        {errorPassword}
                    </Text>
                </View>
                <View
                    style={{
                        marginHorizontal: 15,
                        marginBottom: 15
                    }}
                >
                    <Text
                        style={{
                            fontSize: fontSizes.h6,
                            color: colors.primary
                        }}
                    >
                        Retype password:
                    </Text>
                    <TextInput
                        placeholder='Re-Enter you password'
                        placeholderTextColor={colors.placeholder}
                        secureTextEntry={true}
                        value={retypePassword}
                        style={{
                            color: 'black',
                            marginVertical: 10
                        }}
                        onChangeText={(text) => {
                            setErrorPassword(isValidPassword(text) == true ? '' : "Password must be at the least 3 character");
                            setRetypePassword(text)
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
                    <Text
                        style={{
                            color: 'red',
                            fontStyle: 'italic',
                            fontSize: fontSizes.h6
                        }}
                    >
                        {errorPassword}
                    </Text>
                </View>
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
                        // alert(`Email: ${email}, password: ${password}`);
                        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                            const user = userCredential.user;
                            sendEmailVerification(userCredential.user).then(() => {
                                console.log("Email Verification sent");
                            }).catch(error => console.log(`Error send mail ${error.message}`))
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
                        Register
                    </Text>
                </TouchableOpacity>
            </View>



            {keyboardIsShown == false && <View>
                <View
                    style={{
                        height: 40,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: 20
                    }}
                >
                    <View style={{ height: 1, backgroundColor: 'white', flex: 1 }} />
                    <Text
                        style={{
                            padding: 8,
                            fontSize: fontSizes.h6,
                            color: 'white',
                            alignSelf: 'center',
                            fontWeight: 'bold',
                            marginHorizontal: 5
                        }}
                    >
                        User other methods?
                    </Text>
                    <View style={{ height: 1, backgroundColor: 'white', flex: 1 }} />
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
        </KeyboardAwareScrollView >
    )
}
export default Register
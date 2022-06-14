import * as React from 'react';
import { Welcome, Login, Register, Messenger } from '../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { fontSizes, colors } from '../constants';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UITab from './UITab';

const Stack = createNativeStackNavigator();


function Navigation(props: any) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Welcome"}>
                <Stack.Screen
                    name={"Welcome"}
                    component={Welcome}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={"Login"}
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={"Register"}
                    component={Register}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={"UITab"}
                    component={UITab}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={"Messenger"}
                    component={Messenger}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Navigation
import * as React from 'react';
import { Settings, ProductGridView, FoodList, Chat } from '../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { fontSizes, colors } from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();
const screenOptions = ({ route }: any) => ({
    headerShown: false,
    tabBarActiveTintColor: 'white',
    tabBarInActiveTintColor: colors.inactive,
    tabBarActiveBackgroundColor: colors.primary,
    tabBarInActiveBackgroundColor: colors.primary,
    tabBarBackground: () => {
        return <View
            style={{
                backgroundColor: colors.primary,
                flex: 1
            }}
        >
        </View>
    },
    tabBarIcon: ({ focused, color, size }) => {
        let screenName = route.name;
        return <Icon
            style={{
                paddingTop: 5
            }}
            name={route.name == "ProductGridView" ? "align-center" :
                (route.name == "FoodList" ? "accusoft" : (
                    route.name == "Settings" ? "cogs" :
                        (route.name == "Profile" ? "user" :
                            (route.name == "Chat" ? "comment-dots" : ""))
                ))}
            size={20}
            color={focused ? 'white' : colors.inactive} />
    }
})


function UITab({ route }: any) {
    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
            forceInset={{ bottom: 'never' }}
        >
            <Tab.Navigator initialRouteName={'Chat'} screenOptions={screenOptions}>
                <Tab.Screen
                    name={'ProductGridView'}
                    component={ProductGridView}
                    options={{
                        tabBarLabel: 'Products',
                        tabBarLabelStyle: {
                            fontSize: fontSizes.h5
                        }
                    }}
                />
                <Tab.Screen
                    name={'Chat'}
                    component={Chat}
                    options={{
                        tabBarLabel: 'Chat',
                        tabBarLabelStyle: {
                            fontSize: fontSizes.h5
                        }
                    }}
                />
                <Tab.Screen
                    name={'FoodList'}
                    component={FoodList}
                    options={{
                        tabBarLabel: 'Foods',
                        tabBarLabelStyle: {
                            fontSize: fontSizes.h5
                        }
                    }}
                />
                <Tab.Screen
                    name={'Settings'}
                    component={Settings}
                    options={{
                        tabBarLabel: 'Settings',
                        tabBarLabelStyle: {
                            fontSize: fontSizes.h5
                        }
                    }}
                />
                <Tab.Screen
                    name={'Profile'}
                    component={Profile}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarLabelStyle: {
                            fontSize: fontSizes.h5
                        }
                    }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    )
}

export default UITab;
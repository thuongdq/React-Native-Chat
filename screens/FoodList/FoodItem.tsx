import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

import { colors, fontSizes } from '../../constants';

function _getColorFromStatus(status: string) {
    // if (status.toLocaleLowerCase().trim() == 'opening soon') {
    //     return colors.success;
    // } else if (status.toLocaleLowerCase().trim() == 'closing soon') {
    //     return colors.alert;
    // } else if (status.toLocaleLowerCase().trim() == 'coming soon') {
    //     return colors.warning;
    // } else {
    //     return colors.success;
    // }

    // switch (status.toLocaleLowerCase().trim()) {
    //     case 'closing soon':
    //         return colors.alert;
    //     case 'comming soon':
    //         return colors.warning;
    //     default:
    //         return colors.success;
    // }

    return status.toLowerCase().trim() == 'opening soon' ? colors.success :
        (status.toLowerCase().trim() == 'closing soon' ? colors.alert :
            (status.toLowerCase().trim() == 'comming soon' ? colors.warning : colors.success));
}

function FoodItem(props: any) {
    const { onPress } = props;
    const { name, url, price, status, website, socialNetworks } = props.food;

    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <View
                style={{
                    height: 150,
                    paddingTop: 10,
                    paddingStart: 10,
                    flexDirection: 'row'
                }}
            >
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'cover',
                        borderRadius: 10,
                        marginRight: 15
                    }}
                    source={{
                        uri: url
                    }}
                />
                <View
                    style={{
                        marginRight: 10,
                        flex: 1
                    }}
                >
                    <Text
                        style={{
                            color: 'black',
                            fontSize: fontSizes.h6,
                            fontWeight: 'bold'
                        }}
                    >
                        {name}
                    </Text>
                    <View style={{ height: 1, backgroundColor: 'black' }} />
                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <Text
                            style={{
                                color: 'black',
                                fontSize: fontSizes.h6
                            }}
                        >
                            Status:&nbsp;
                        </Text>
                        <Text
                            style={{
                                color: _getColorFromStatus(status),
                                fontSize: fontSizes.h6,
                            }}
                        >
                            {status.toUpperCase()}
                        </Text>
                    </View>
                    <Text
                        style={{
                            color: colors.inactive,
                            fontSize: fontSizes.h6
                        }}
                    >
                        Price: {price} $
                    </Text>
                    <Text
                        style={{
                            color: colors.inactive,
                            fontSize: fontSizes.h6
                        }}
                    >
                        Food Type: Pizza
                    </Text>

                    <Text
                        style={{
                            color: colors.inactive,
                            fontSize: fontSizes.h6
                        }}
                    >
                        Website: {website}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        {socialNetworks.facebook != undefined && <Icon
                            name='facebook' size={18}
                            color={colors.inactive}
                            style={{
                                paddingEnd: 5
                            }}
                        />}
                        {socialNetworks.twitter != undefined && <Icon
                            name='twitter' size={18}
                            color={colors.inactive}
                            style={{
                                paddingEnd: 5
                            }}
                        />}
                        {socialNetworks.instagram != undefined && <Icon
                            name='instagram' size={18}
                            color={colors.inactive}
                            style={{
                                paddingEnd: 5
                            }}
                        />}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default FoodItem;
import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

import { colors, fontSizes } from '../../constants';
import FiveStars from './FiveStars';

function GridItem(props: any) {
    const { item, index, onPress } = props;
    return (
        <View
            key={index}
            style={{
                flex: 0.5,
                marginLeft: index % 2 == 0 ? 10 : 0,
                marginRight: 10,
                marginTop: 5,
                marginBottom: 5,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: colors.inactive
            }}
        >
            <View
                style={{
                    marginTop: 10,
                    flexDirection: 'row'
                }}>
                <Image
                    style={{
                        width: 90,
                        height: 100,
                        resizeMode: 'cover',
                        borderRadius: 20,
                        marginRight: 15
                    }}
                    source={{
                        uri: item.url
                    }}
                />
                <Text
                    style={{
                        color: 'black',
                        fontSize: fontSizes.h3,
                        flex: 1,
                        textAlign: 'right'
                    }}
                >
                    $ {item.price}
                </Text>
            </View>
            <Text
                style={{
                    color: colors.primary,
                    fontWeight: 'bold',
                    fontSize: fontSizes.h5,
                    marginHorizontal: 10,
                    marginTop: 5
                }}
            >
                {item.productName}
            </Text>
            {
                item.specifications.map((specification, index) =>
                    <Text
                        key={index}
                        style={{
                            color: 'black',
                            fontSize: fontSizes.h6,
                            paddingHorizontal: 5,
                            paddingBottom: 10
                        }}
                    >
                        * {specification}
                    </Text>)
            }

            <View
                style={{
                    flexDirection: 'row',
                    padding: 10
                }}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row'
                    }}
                    onPress={onPress}
                >
                    <Icon
                        name='heart' size={22}
                        color={item.isSaved == undefined || item.isSaved == false ?
                            colors.inactive : 'red'}
                        style={{
                            marginEnd: 5
                        }}
                    />
                    <Text
                        style={{
                            color: item.isSaved == undefined || item.isSaved == false ?
                                colors.inactive : 'red',
                            fontSize: fontSizes.h6 * 0.8,
                            width: 50
                        }}
                    >
                        Saved for later
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        flex: 1
                    }}
                >
                    <FiveStars numberOfStars={item.stars} />
                    <Text
                        style={{
                            color: 'blue',
                            fontSize: fontSizes.h6 * 0.8,
                            textAlign: 'right',
                            paddingTop: 3
                        }}
                    >
                        {item.reviews} reviews
                    </Text>
                </View>

            </View>
        </View>
    )
}

export default GridItem;


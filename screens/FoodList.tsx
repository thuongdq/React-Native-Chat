import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

import { colors, fontSizes } from '../constants';

/**
 * 
 - Listview from map
 - Flatlist
 */
function FoodList(props: any) {
    // list of food = state
    const [foods, setFoods] = useState([
        {
            name: 'Paella Valenciana, with rabbit and chicken; and seafood paella',
            url: 'https://www.bluristorante.com/wp-content/uploads/2019/03/9-Traditional-Italian-Food-Dishes-You-Will-Love-1080x700.jpg',
            status: 'Opening soon',
            price: 5223.56,
            website: 'https://edition.cnn.com',
            socialNetworks: {
                facebook: 'https://www.facebook.com/duyvu91',
                twitter: 'https://twitter.com/LostInBrittany',
                instagram: 'https://www.instagram.com/nghiatran__/'
            }
        },
        {
            name: 'Gazpacho',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK4gjyk-VN438EkSnwwAcCRVgzW6F_MmeH-A&usqp=CAU',
            status: 'Opening Now',
            price: 1124.56,
            website: 'https://huands.abc.com',
            socialNetworks: {
                twitter: 'https://twitter.com/LostInBrittany',
                instagram: 'https://www.instagram.com/nghiatran__/'
            }
        },
        {
            name: 'Gazpacho abcsd',
            url: 'https://i.insider.com/5f340aab5af6cc63ab37bf14?width=1000&format=jpeg&auto=webp',
            status: 'Opening Now',
            price: 1124.56,
            website: 'https://huands.abc.com',
            socialNetworks: {
                twitter: 'https://twitter.com/LostInBrittany',
                instagram: 'https://www.instagram.com/nghiatran__/'
            }
        },
        {
            name: 'Pimientos de Padron',
            url: 'https://www.thatsmags.com/image/view/201807/favorita-1.jpg',
            status: 'Closing soon',
            price: 2342.56,
            website: 'https://www.uiuds.com',
            socialNetworks: {
                facebook: 'https://www.facebook.com/duyvu91',
            }
        },
        {
            name: 'Albondigas',
            url: 'https://149366112.v2.pressablecdn.com/wp-content/uploads/2016/09/lead7.jpg',
            status: 'Comming soon',
            price: 2354.56,
            website: 'https://edition.sabc.com',
            socialNetworks: {
                instagram: 'https://www.instagram.com/nghiatran__/'
            }
        },
        {
            name: 'Abc xyz',
            url: 'https://blogs.biomedcentral.com/on-medicine/wp-content/uploads/sites/6/2019/09/iStock-1131794876.t5d482e40.m800.xtDADj9SvTVFjzuNeGuNUUGY4tm5d6UGU5tkKM0s3iPk-620x342.jpg',
            status: 'Closing soon',
            price: 5568.11,
            website: 'https://www.food.com/',
            socialNetworks: {
                instagram: 'https://www.instagram.com/aeisinger/'
            }
        }
    ]);
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'white'
            }}
        >
            <View>
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
                            uri: 'https://www.bluristorante.com/wp-content/uploads/2019/03/9-Traditional-Italian-Food-Dishes-You-Will-Love-1080x700.jpg'
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
                            Pimientos de Padron
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
                                Status:
                            </Text>
                            <Text
                                style={{
                                    color: colors.warning,
                                    fontSize: fontSizes.h6
                                }}
                            >
                                Opening soon
                            </Text>
                        </View>
                        <Text
                            style={{
                                color: colors.inactive,
                                fontSize: fontSizes.h6
                            }}
                        >
                            Price: 1234$
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
                            Wwebsite: https://www.food.com/
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row'
                            }}
                        >
                            <Icon
                                name='facebook' size={18}
                                color={colors.inactive}
                                style={{
                                    paddingEnd: 5
                                }}
                            />
                            <Icon
                                name='twitter' size={18}
                                color={colors.inactive}
                                style={{
                                    paddingEnd: 5
                                }}
                            />
                            <Icon
                                name='instagram' size={18}
                                color={colors.inactive}
                                style={{
                                    paddingEnd: 5
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <Text style={{ color: 'black' }}>
                This is FoodList
            </Text>
        </View>
    )
}

export default FoodList
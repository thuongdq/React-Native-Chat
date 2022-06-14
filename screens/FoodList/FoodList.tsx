import React, { useState } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    FlatList,
    SafeAreaView
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

import { colors, fontSizes, dataFoods } from '../../constants';
import FoodItem from './FoodItem';

// import data from '../../constants/data.json';

/**
 * 
 - Listview from map
 - Flatlist
 */
function FoodList(props: any) {
    const [foods, setFoods] = useState(dataFoods.foods);
    const [categories, setCategories] = useState(dataFoods.categories);
    const [searchText, setSearchTech] = useState('');
    const filteredFoods = () => {
        return foods.filter(eachFood => eachFood.name.toLowerCase().includes(searchText.toLowerCase()));
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'white'
            }}
        >
            <View
                style={{
                    margin: 10,
                    flexDirection: 'row',
                    alignItems: 'center'
                }} >
                <Icon
                    name='search' size={15} color={'black'}
                    style={{
                        position: 'absolute',
                        top: 12,
                        left: 10
                    }}
                />
                <TextInput
                    autoCorrect={false}
                    onChangeText={(text) => setSearchTech(text)}
                    style={{
                        backgroundColor: colors.inactive,
                        height: 40,
                        flex: 1,
                        marginEnd: 5,
                        borderRadius: 5,
                        opacity: 0.5,
                        paddingStart: 30
                    }}
                />
                <Icon name='bars' size={30} color={'black'} />
            </View>
            <View
                style={{
                    height: 100
                }}
            >
                <View style={{ height: 1, backgroundColor: colors.inactive }} />

                <FlatList
                    horizontal={true}
                    data={categories}
                    keyExtractor={eachCatrgory => eachCatrgory.name}
                    showsHorizontalScrollIndicator={false}
                    style={{ flex: 1 }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    return alert(`Press Category ${item.name}`);
                                }}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Image
                                    style={{
                                        width: 50,
                                        height: 50,
                                        resizeMode: 'cover',
                                        borderRadius: 80,
                                        marginRight: 15,
                                        margin: 10
                                    }}
                                    source={{
                                        uri: item.url
                                    }}
                                />
                                <Text
                                    style={{
                                        color: 'black',
                                        fontSize: fontSizes.h6 * 0.8
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )
                    }}
                >

                </FlatList>
                <View style={{ height: 1, backgroundColor: colors.inactive }} />
            </View>
            {/* <ScrollView>
                {
                    foods.map((eachFood: any, index: number) => <FoodItem key={index} he food={eachFood} />)
                }
            </ScrollView> */}
            {filteredFoods().length > 0 ? <FlatList
                data={filteredFoods()}
                keyExtractor={eachFood => eachFood.name}
                renderItem={({ item, index }) => {
                    return <FoodItem
                        food={item} key={index}
                        onPress={() => {
                            alert(`You press item's name ${item.name}`);
                        }}
                    />
                }}
            /> :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text
                        style={{
                            color: 'black',
                            fontSize: fontSizes.h3
                        }}
                    >
                        No found food
                    </Text>
                </View>}
        </SafeAreaView>
    )
}

export default FoodList
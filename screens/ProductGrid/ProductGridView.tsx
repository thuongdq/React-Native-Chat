import React, { useState } from 'react';
import {
    View,
    Image,
    FlatList,
    SafeAreaView
} from "react-native";
// import { SafeAreaView } from 'react-native-safe-area-context';

import { dataProducts } from '../../constants';
import GridItem from './GridItem';

function ProductGridView(props: any) {
    const [products, setProducts] = useState(dataProducts.products);
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'white'
            }}
        >
            <FlatList
                style={{ marginTop: 5 }}
                keyExtractor={(eachProduct) => eachProduct.productName}
                data={products}
                numColumns={2}
                renderItem={({ item, index }) => <GridItem
                    item={item} index={index}
                    onPress={() => {
                        let cloneProducts = products.map(eachProduct => {
                            if (item.productName == eachProduct.productName) {
                                // return { ...eachProduct, isSaved: true };
                                return { ...eachProduct, isSaved: eachProduct.isSaved == undefined || eachProduct.isSaved == false ? true : false };
                            }
                            return eachProduct;
                        })
                        setProducts(cloneProducts);
                    }}
                />}
            />
        </SafeAreaView >
    )
}

export default ProductGridView;


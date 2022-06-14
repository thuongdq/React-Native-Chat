import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { colors } from "../../constants";

function FiveStars(props: any) {
    const { numberOfStars } = props;
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            {[0, 1, 2, 3, 4].map((item, index) =>
                <Icon name='star' size={8} key={index}
                    style={{ marginEnd: 2 }}
                    color={item <= numberOfStars - 1 ? colors.warning : colors.inactive}
                />)}
        </View>
    )
}

export default FiveStars;
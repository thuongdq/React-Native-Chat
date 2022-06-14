import React from "react";
import { TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { colors } from "../constants";

function UIButton(props: any) {
    const { onPress, title, isSelected } = props;
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                borderColor: 'white',
                borderWidth: 1,
                height: 40,
                borderRadius: 5,
                marginVertical: 10,
                marginHorizontal: 15,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isSelected ? 'white' : null,
            }}
        >

            {isSelected == true && <Icon
                name="check-circle"
                size={20}
                style={{
                    color: 'green',
                    marginHorizontal: 10,
                    position: 'absolute',
                    left: 0
                }}
            />}
            <Text
                style={{
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: isSelected ? colors.primary : 'white',
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default UIButton;
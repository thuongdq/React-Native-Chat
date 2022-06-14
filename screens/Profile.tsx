import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Image,
    Dimensions
} from "react-native";
import { SafeAreaView } from 'react-navigation';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { images, colors, icons, fontSizes } from '../constants';
import { convertDateTimeToString } from '../util/DateTime';
import {
    user as UserRepository,
    population as PopulationRepository
} from '../repositories';



const Profile = () => {
    const [user, setUser] = useState({});
    const [populations, setPopulations] = useState([]);
    const { email, dateOfBirth, gender, userId, address, username, url, registerDate, phone } = user;
    const cars = [
        { id: 1, make: "Make1", year: 2016, color: "black" },
        { id: 2, make: "Make2", year: 2006, color: "gray" },
        { id: 3, make: "Make3", year: 2012, color: "purple" },
    ];

    useEffect(() => {
        UserRepository.getUserDetail().then(responseUser => setUser(responseUser));
        PopulationRepository.getPopulation({ drilldowns: 'Nation', measures: 'Population' })
            .then(responsePopulations => setPopulations(responsePopulations));
    }, []);
    return (
        <SafeAreaView style={{
            flex: 1,
            paddingTop: 50,
            paddingStart: 20
        }}>
            <Image
                style={{
                    width: 160,
                    height: 160,
                    resizeMode: 'cover',
                    borderRadius: 80,
                    alignSelf: 'center',
                    marginBottom: 20
                }}
                source={{
                    uri: url
                }}
            />
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}>Username: </Text>
                <Text>
                    {username}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}>Email: </Text>
                <Text>
                    {email}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}>DOB: </Text>
                <Text>
                    {convertDateTimeToString(dateOfBirth)}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}>Gender: </Text>
                <Text>
                    {gender}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}>Address: </Text>
                <Text>
                    {address}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold' }}>Phone: </Text>
                <Text>
                    {phone}
                </Text>
            </View>
            <View>
                <Text style={{ fontSize: fontSizes.h6 }}>
                    {JSON.stringify(populations)}
                </Text>
                <Text style={{ fontSize: fontSizes.h6 }}>
                    {typeof (populations)}
                </Text>
            </View>
            {/* <LineChart
                data={{
                    labels: populations.map(item => item.year),
                    datasets: [
                        {
                            data: populations.map(item => item.population),
                            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                            strokeWidth: 2 // optional
                        }
                    ],
                    legend: ["Rainy Days"] // optional
                }}
                width={Dimensions.get("window").width}
                height={220}
                chartConfig={{
                    backgroundGradientFrom: "white",
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientTo: "white",
                    backgroundGradientToOpacity: 1,
                    color: (opacity = 1) => colors.primary,
                    strokeWidth: 2, // optional, default 3
                    barPercentage: 0.5,
                    useShadowColorFromDataset: false // optional
                }}
            /> */}
        </SafeAreaView>
    )
}

export default Profile;
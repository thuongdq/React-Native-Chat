// https://randomuser.me/api
import axios from 'axios';

const SERVER_NAME = 'randomuser.me';
const urlGetUserDetail = `https://${SERVER_NAME}/api`;

const getUserDetail = async () => {
    try {
        let response = await axios.get(urlGetUserDetail);
        if (response.status != 200) {
            throw 'Failed request'
        }

        if (response.data.results.length > 0) {
            let responseUser = response.data.results[0];
            let user = {
                'dateOfBirth': new Date(responseUser.dob.date),
                'email': responseUser.email,
                'gender': responseUser.gender ?? 'male',
                'userId': `${responseUser.id.name}${responseUser.id.value}`,
                'address': `${responseUser.location.state}, ${responseUser.location.street.name}`,
                'username': responseUser.login.username,
                'url': responseUser.picture.large,
                'phone': responseUser.phone ?? '',
                'registerDate': new Date(responseUser.registered.date)
            };
            return user;
        }
        throw 'User not found';

    } catch (error) {
        throw error
    }
}

const login = (email: string, password: string) => {

}

export default {
    getUserDetail,
    login
}
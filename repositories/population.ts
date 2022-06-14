import axios from "axios"
//https://datausa.io/api/data?drilldowns=Nation&measures=Population
const SERVER_NAME = 'datausa.io'
async function getPopulation({ drilldowns, measures }: { drilldowns: string, measures: string }) {
    const urlGetPopulation = `https://${SERVER_NAME}/api/data?drilldowns=${drilldowns}&measures=${measures}`
    try {
        let result = new Array();
        let responseData = await axios.get(urlGetPopulation)
        let index = 0;
        responseData.data.data.forEach(function (item) {
            let myObject = {
                'nationId': item['ID Nation'],
                'year': item['Year'],
                'population': item['Population']
            }
            // result[index] = myObject;
            result.push(myObject);
            index++;
        })

        return result;
    } catch (error) {
        throw error
    }
}
//many other functions
export default {
    getPopulation,
}
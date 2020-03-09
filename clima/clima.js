const axios = require('axios');
const lugar = require('../lugar/lugar');

const getClima = async (lat, lng) => {
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=2dcbc9fbf71bbda70b4ec1d4864401e1&units=metric`);
    return resp.data.main.temp;
}

const getInfo = async (direccion) => {
    let coordenadas = await lugar.getLugarLatLng(direccion);
    if (coordenadas.length === 0){
        throw new Error(`No se pudo determinar el clima de ${direccion}`);
    }

    const temp = await getClima(coordenadas.lat, coordenadas.lng);
    return `El clima de ${direccion} es de ${temp}`;
    //console.log('Coordendas:', coordenadas);
}

module.exports = {
    getClima,
    getInfo
}
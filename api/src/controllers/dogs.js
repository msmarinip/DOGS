const axios = require('axios');
const {Dog, Temperament } = require('../db');
const getAPIDogs = async () => {
    const response = await axios.get('https://api.thedogapi.com/v1/breeds')
    const arrAPIDogs = [];
    
    response.data.forEach(d => {
        const obj = {
            idName: 'id',
            id: d.id,
            name: d.name,
            weight: d.weight.metric,
            height: d.height.metric,
            life_span: d.life_span,
            temperament: d.temperament,
            image: d.image

        }
        arrAPIDogs.push(obj);
    });
    // return response.data;
    return arrAPIDogs;
}

const getDBDogs = async () => {
    const dogs = await Dog.findAll({
      //  attributes: ['uuid', 'name', 'weight', 'height', 'life_span'],
        include: [{
            model: Temperament,
            as: 'temperaments',
            attributes: ['temperament']
        }]
    });

    const arrDBDogs = [];
    dogs.forEach(d => {
        const obj = {
            idName: 'uuid',
            id: d.uuid,
            name: d.name,
            weight: d.weight,
            height: d.height,
            life_span: d.life_span,
            temperament: d.temperament

        }
        arrDBDogs.push(obj);
    });

    return arrDBDogs;
}

const getDBDogByName = async (name) => {
    const dog = await Dog.findOne({
        where: {name: name},
        include: [{
            model: Temperament,
            as: 'temperaments',
            attributes: ['temperament']
        }]
    });

    return dog;
}

const getAPIDogByName = async (name) => {
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
    // console.log(name, response.data.length, `https://api.thedogapi.com/v1/breeds/search?q=${name}`)
    if(response.data.length > 0){
        const dog = response.data[0];
        const obj = {
            id: dog.id,
            name: dog.name,
            weight: dog.weight.metric,
            height: dog.height.metric,
            life_span: dog.life_span,
            temperament: dog.temperament,
            image: dog.image
        }
        return obj;
    } else {
        return null;
    }

}

const getDBDogById = async (id) => {
    const dog = await Dog.findOne({
        where: {uuid: idRaza},
        include: [{
            model: Temperament,
            as: 'temperaments',
            attributes: ['temperament']
        }]
    });
    return dog;
}
const getApiDogById = async (id) => {

}




module.exports = {
    getAPIDogs,
    getDBDogs,
    getDBDogByName,
    getAPIDogByName,
    getDBDogById,
    getApiDogById
}


/* 

[
    {
        "weight": {
            "imperial": "6 - 13",
            "metric": "3 - 6"
        },
        "height": {
            "imperial": "9 - 11.5",
            "metric": "23 - 29"
        },
        "id": 1,
        "name": "Affenpinscher",
        "bred_for": "Small rodent hunting, lapdog",
        "breed_group": "Toy",
        "life_span": "10 - 12 years",
        "temperament": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
        "origin": "Germany, France",
        "reference_image_id": "BJa4kxc4X",
        "image": {
            "id": "BJa4kxc4X",
            "width": 1600,
            "height": 1199,
            "url": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
        }
    }]
*/
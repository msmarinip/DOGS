const axios = require('axios');
const {Dog, Temperament, Op } = require('../db');
const { dogObject, listDogTemperament, getMin, nameToStandar } = require('../helpers/helpers');
const {
        API_URL,
        API_KEY
     } = process.env;


const getAPIDogs = async () => {
    
    const response = await axios.get(`${API_URL}?api_key=${API_KEY}`)
    const arrAPIDogs = [];
    
    response.data.forEach(d => {
        // const obj = {
        //     idName: 'id',
        //     id: d.id,
        //     name: d.name,
        //     weight: d.weight.metric,
        //     weightMin: getMin(d.weight.metric),
        //     height: d.height.metric,
        //     heightMin: getMin(d.height.metric),
        //     life_span: d.life_span,
        //     life_spanMin: parseInt(d.life_span),
        //     temperament: d.temperament,
        //     reference_image_id: d.reference_image_id,
        //     image: d.image

        // }
        // dog.forEach(d => arrDogs.push(dogObject(d,'db')))
        arrAPIDogs.push(dogObject(d,'api'));
    });

    return arrAPIDogs;
}

const getDBDogs = async () => {
    const dogs = await Dog.findAll({
        include: [{
            model: Temperament,
            as: 'temperaments',
            attributes: ['temperament']
        }]
    });

    const arrDBDogs = [];
    dogs.forEach(d => {
        // const obj = {
        //     idName: 'uuid',
        //     id: d.uuid,
        //     name: nameToStandar(d.name),
        //     weight: d.weight,
        //     weightMin: d.weightMin,
        //     weightMax: d.weightMax,
        //     height: d.height,
        //     heightMin: d.heightMin,
        //     heightMax: d.heightMax,
        //     life_span: d.life_span,
        //     life_spanMin: d.life_spanMin,
        //     // life_spanMax: d.life_spanMax,
        //     temperament: listDogTemperament(d.temperaments)

        // }
        // dog.forEach(d => arrDogs.push(dogObject(d,'db')))
        arrDBDogs.push(dogObject(d,'db'));
    });

    return arrDBDogs;
}


const getDBDogByName = async (name) => {
    const dog = await Dog.findAll({
        where: {name: {[Op.iLike]:`%${name}%`}},
        include: [{
            model: Temperament,
            as: 'temperaments',
            attributes: ['temperament']
        }]
    });
    arrDogs = [];
    if(dog.length>0){
        dog.forEach(d => arrDogs.push(dogObject(d,'db')))
    }
    
    return arrDogs;
}

const getAPIDogByName = async (name) => {
    
    const response = await axios.get(`${API_URL}?api_key=${API_KEY}`)
    arrDogs = [];
    if(response.data.length > 0){
        const filteredData = response.data.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
        filteredData.forEach(d => arrDogs.push(dogObject(d,'apiName')))
    
    }
    return arrDogs;

}

const getDBDogById = async (id) => {
    const dog = await Dog.findOne({
        where: {uuid: id},
        include: [{
            model: Temperament,
            as: 'temperaments',
            attributes: ['temperament']
        }]
    });
    return dogObject(dog, 'db');
}
const getApiDogById = async (id) => {
    // console.log('id=', id)
    const dogs = await getAPIDogs();
    const dog = dogs.find(d => d.id === parseInt(id))
    return dog;
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
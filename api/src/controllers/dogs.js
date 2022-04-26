const axios = require('axios');
const {Dog, Temperament, Op } = require('../db');


const getMin = (data) => {
    const arr = data.split('-')
    let value;
    if(arr.length>1){
        value = isNaN(Number(arr[0].trim())) ?  Number(arr[1].trim()) : Number(arr[0].trim())
    } else {
        value = isNaN(Number(arr[0].trim())) ?  "No information" : Number(arr[0].trim())
    }
    return value;
}

const getAPIDogs = async () => {
    //TODO: usar variables de entorno
    
    const response = await axios.get('https://api.thedogapi.com/v1/breeds')
    const arrAPIDogs = [];
    
    response.data.forEach(d => {
        // const apiWeight = d.weight.metric.split('-').trim()
        const obj = {
            idName: 'id',
            id: d.id,
            name: d.name,
            weight: d.weight.metric,
            weightMin: getMin(d.weight.metric),
            height: d.height.metric,
            heightMin: getMin(d.height.metric),
            life_span: d.life_span,
            life_spanMin: parseInt(d.life_span),
            temperament: d.temperament,
            reference_image_id: d.reference_image_id,
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
        console.log(d)
        const obj = {
            idName: 'uuid',
            id: d.uuid,
            name: d.name,
            weight: d.weight,
            weightMin: d.weightMin,
            // weightMax: d.weightMax,
            height: d.height,
            heightMin: d.heightMin,
            // heightMax: d.heightMax,
            life_span: d.life_span,
            life_spanMin: d.life_spanMin,
            // life_spanMax: d.life_spanMax,
            temperament: listDogTemperament(d.temperaments)

        }
        arrDBDogs.push(obj);
    });

    return arrDBDogs;
}
const listDogTemperament = (temps) => {
    const temperaments =  temps.map(t => {
        return ' '+ t.temperament
    })
    return temperaments.toString().trim();
}

const dogObject = (objDog,source) => {
    return {
        
        id: (source === 'db') ? objDog.uuid : objDog.id,
        name: objDog.name,
        weight: (source === 'db') ? objDog.weight : objDog.weight.metric,
        height: (source === 'db') ? objDog.height : objDog.height.metric,
        life_span: objDog.life_span,
        image: (source === 'db') ? '' : objDog.reference_image_id,
        temperament: (source === 'db') ? listDogTemperament(objDog.temperaments) : objDog.temperament
    }
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
    //TODO: usar variables de entorno
    
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
    // console.log(name, response.data.length, `https://api.thedogapi.com/v1/breeds/search?q=${name}`)
    arrDogs = [];
    if(response.data.length > 0){
        response.data.forEach(d => arrDogs.push(dogObject(d,'api')))
    //     const dog = response.data[0];
    //     const obj = {
    //         id: dog.id,
    //         name: dog.name,
    //         weight: dog.weight.metric,
    //         height: dog.height.metric,
    //         life_span: dog.life_span,
    //         temperament: dog.temperament,
    //         image: dog.image
    //     }
    //     return obj;
    // } else {
    //     return null;
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
    return dog;
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
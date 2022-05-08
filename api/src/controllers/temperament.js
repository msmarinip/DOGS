const  axios  = require("axios");
const { Router } = require('express');

const { Temperament } = require('../db');

const router = Router();
const { API_URL, API_KEY } = process.env;

const addTemperamentsToDB = () =>{

    try {
        const arrTemperamentosDB = [];
        const dbTemp = await Temperament.findAll({
            attributes: ['temperament']
          });
        dbTemp.forEach(element => {
            arrTemperamentosDB.push(element.temperament);
        })
        const arrTemps = [];
        const arrNewTemperamentos = [];
        await axios.get(`${API_URL}?api_key=${API_KEY}`)
            .then(res => res.data.forEach(dog => {
                if(dog.temperament){
                    dog.temperament.split(", ").forEach(temperamento => {
                        if(!arrTemperamentosDB.includes(temperamento.trim()) && !arrTemps.includes(temperamento.trim())) {
                            arrNewTemperamentos.push({temperament:temperamento.trim()});
                            arrTemps.push(temperamento.trim());
                        }
                    });
                }
            }))
        if(arrNewTemperamentos.length >0) await Temperament.bulkCreate(arrNewTemperamentos);

        
    } catch (error) {
        next(error);
    }   
    

}

module.exports = {
    addTemperamentsToDB
}
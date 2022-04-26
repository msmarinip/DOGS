const  axios  = require("axios");
const { Router } = require('express');

const { Temperament } = require('../db');

const router = Router();
const { API_URL } = process.env;

//TODO: realizar el post de temperamentos al ingresar al site, dónde conviene? llamarlo desde el front? o desde el back?

router.post('/', async(req, res, next) => {

    try {
        const arrTemperamentosDB = [];
        const dbTemp = await Temperament.findAll({
            attributes: ['temperament']
          });
        dbTemp.forEach(element => {
            arrTemperamentosDB.push(element.temperament);
        })
        // const arrNewTemperamentos = [];
        // await axios.get(API_URL)
        //     .then(res => res.data.forEach(dog => {
        //         if(dog.temperament){
        //             dog.temperament.split(",").forEach(temperamento => {
        //                 if(!arrTemperamentosDB.includes(temperamento.trim()) && !arrNewTemperamentos.includes(temperamento.trim())) {
        //                     arrNewTemperamentos.push(temperamento.trim());
        //                 }
        //             });
        //         }
        //     }))

        // const newTemperaments = await arrNewTemperamentos.map((temperament) => {
            //      return Temperament.findOrCreate({
                //         where: {temperament: temperament.trim()},
                //         defaults: {temperament: temperament.trim()}
                //     })
                // })
                
                // await Promise.all(newTemperaments)
        //TODO: BULKCREATE
        const arrTemps = [];
        const arrNewTemperamentos = [];
        await axios.get(API_URL)
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

        res.send([...arrTemperamentosDB,...arrTemps].sort());
    } catch (error) {
        next(error);
    }   
    
})

router.get('/', async (req, res, next) => {
    try {
        const temperaments = await Temperament.findAll({
            order:[[ 'temperament', 'ASC' ]]
        });
        res.json(temperaments); 
    } 
    catch (error) {
        next(error);
    }

});


module.exports = router;
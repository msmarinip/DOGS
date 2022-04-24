const  axios  = require("axios");
const { Router } = require('express');

const { Temperament } = require('../db');

const router = Router();
router.post('/', async(req, res, next) => {
    // const { temperaments } = req.body;
    try {

        const arrTemperamentosDB = [];
        const dbTemp = await Temperament.findAll();
        dbTemp.forEach(element => {
            arrTemperamentosDB.push(element.temperament);
        })
        //Traigo los temperamentos de la API y los guardo en el array si no existen en la BD
        
        const arrNewTemperamentos = [];
        const response = await axios.get('https://api.thedogapi.com/v1/breeds')
                                    .then(res => res.data.forEach(dog => {
                                        if(dog.temperament){
                                            dog.temperament.split(",").forEach(temperamento => {
                                                if(!arrTemperamentosDB.includes(temperamento) && !arrNewTemperamentos.includes(temperamento)) {
                                                    arrNewTemperamentos.push(temperamento);
                                                }
                                            });
                                        }
                                    }))
        const newTemperaments = await arrNewTemperamentos.map((temperament) => {
             return Temperament.findOrCreate({
                where: {temperament: temperament.trim()},
                defaults: {temperament: temperament.trim()}
            })
        })

        await Promise.all(newTemperaments)
        res.send([...arrTemperamentosDB,...arrNewTemperamentos].sort());
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
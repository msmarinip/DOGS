const { Router } = require('express');
const {Dog, Temperament, conn } = require('../db');

const { 
    getAPIDogs, 
    getDBDogs, 
    getDBDogByName, 
    getAPIDogByName, 
    getDBDogById, 
    getApiDogById } = require('../controllers/dogs');
// const temperament = require('../models/Temperament');
// const { nameToStandar } = require('../helpers/helpers');
const router = Router();



router.get('/', async (req, res, next) => {
    const { name, source } = req.query;
    try {
        if(!name){
            const apiDogs =(!source || source==='api') ?  await getAPIDogs() : [];
            const dbDogs = (!source || source==='db') ? await getDBDogs() : [];
            res.json([...dbDogs, ...apiDogs].sort((a,b) => (a.name >= b.name) ? 1 : -1))
            
        } else {
            const dbDog = (!source || source==='db') ?  await getDBDogByName(name) :[];
            const apiDog = (!source || source==='api') ? await getAPIDogByName(name) :[];
            (apiDog || dbDog) ? res.json([...dbDog, ...apiDog].sort((a,b) => (a.name >= b.name) ? 1 : -1)) : res.status(404).send('Not found.')
        
        }
    } 
    catch (error) {
        next(error);
    }
    
})

router.get('/:idRaza', async (req, res, next) => {
    const { idRaza } = req.params;
    
        try {
            if(idRaza.split('-').length > 1){
                const dog = await getDBDogById(idRaza)
                dog ? res.json(dog) : res.status(404).send('Not found.') 
            } else {
                const dog = await getApiDogById(idRaza);
                dog ? res.status(200).json(dog) : res.status(404).send('Not found.')
            }
        } 
        catch (error) {
            next(error);
        }

})

//Get Only DataBase OLD
router.get('/db', async (req, res, next) => {
    const { name } = req.query;
    try {
        if(name) {
            const dog = await Dog.findOne({
                where: {name: name},
                include: [{
                    model: Temperament,
                    as: 'temperaments',
                    attributes: ['temperament']
                }]
            });
            dog ? res.json(dog) : res.status(404).send('Not found');
        } else {

            const dogs = await Dog.findAll({
                include: [{
                    model: Temperament,
                    as: 'temperaments',
                    attributes: ['temperament']
                }]
            });

            res.json([...dogs]);
        }
    } 
    catch (error) {
        next(error);
    }
    
})


router.post('/', async (req, res, next) => {
    const { name,weightMin,weightMax,heightMin,heightMax,life_spanMin,life_spanMax, temp, newTemps } = req.body;
    
    
    const t = await conn.transaction();
    try {
        //Agrego los nuevos temperamentos a la base de datos
        const objTemp = newTemps.map(t => {
            return {temperament:t.trim()}
        })
        const newTemperaments = await Temperament.bulkCreate(objTemp, { transaction: t });
        //Creo el perro
        
        const newDog = await Dog.create({
            name,   
            weightMin,
            weightMax,
            heightMin,
            heightMax,
            life_spanMin,
            life_spanMax
        }, { transaction: t });
        //preparo los ids e inserto en Dog_Temperament
        const newIds = newTemperaments.map(t => t.id)
        const totTemperaments = [...temp, ...newIds]
        const dogTemps = await newDog.setTemperaments(totTemperaments, { transaction: t })
        const returnData = {
            ...newDog,
            temperaments: [...dogTemps]
        }
        await t.commit();
        res.json(returnData);
    } catch (error) {
        await t.rollback();
        next(error);
    }
})



module.exports = router;
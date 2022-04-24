const { Router } = require('express');
const {Dog, Temperament, conn } = require('../db');
// const axios = require('axios');
const { 
    getAPIDogs, 
    getDBDogs, 
    getDBDogByName, 
    getAPIDogByName, 
    getDBDogById, 
    getApiDogById } = require('../controllers/dogs');
const router = Router();



router.get('/', async (req, res, next) => {
    const { name } = req.query;
    try {
        if(!name){
            const apiDogs = await getAPIDogs();
            const dbDogs = await getDBDogs();
            res.json([...dbDogs, ...apiDogs])
        } else {
            const dbDog = await getDBDogByName(name);
            // dbDog ? res.json(dbDog) : res.status(404).send('Not found');
            if(dbDog) return res.json(dbDog);
            else {
                const apiDog = await getAPIDogByName(name);
                apiDog ? res.json(apiDog) : res.status(404).send('Not found.')
            }
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
                dog ? res.json(dog) : res.status(404).send('Not found.')
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
         //   res.json([...dogs, ...apiDogs]);
            res.json([...dogs]);
        }
    } 
    catch (error) {
        next(error);
    }
    
})


router.post('/', async (req, res, next) => {
    const { name,weightMin,weightMax,heightMin,heightMax,life_spanMin,life_spanMax, temp } = req.body;
    
    const t = await conn.transaction();
    try {
        const newDog = await Dog.create({
            name,   
            weightMin,
            weightMax,
            heightMin,
            heightMax,
            life_spanMin,
            life_spanMax
        }, { transaction: t });
        console.log('newDOG=',newDog)
        await newDog.setTemperaments(temp, { transaction: t })

        await t.commit();
        res.json(newDog);
    } catch (error) {
        await t.rollback();
        next(error);
    }
})

module.exports = router;
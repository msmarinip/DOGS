const { Router } = require('express');


// Importar todos los routers;
const dogRouter = require('./dog.js');
const temperamentRouter = require('./temperament.js');
const router = Router();

// Configurar los routers
router.use('/dog', dogRouter);
router.use('/temperament', temperamentRouter);

module.exports = router;

const { Router } = require('express');
const router = Router();
// Importar todos los routers;
const dogRouter = require("./DogRoutes")
const tempsRoutes = require("./TemperamentsRoutes")
// Ejemplo: const authRouter = require('./auth.js');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogRouter)
router.use("/temperaments", tempsRoutes)


module.exports = router;

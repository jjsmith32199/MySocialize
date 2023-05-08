const router = require('express').Router();

const thoughtRoutes = require('./thought-route');
const userRoutes = require('./user-route');


router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;

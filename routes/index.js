const router = require('express').Router();
const apiRoutes = require('./api');
const thoughtRoutes = require('./api/thoughtRoutes');
const userRoutes = require('./api/userRoutes');
const reactionRoutes = require('./api/reactionRoutes');

router.use('/api', apiRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);
router.use('/reactions', reactionRoutes);

router.use((req, res) => {
    res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;

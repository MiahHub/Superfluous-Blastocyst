const router = require('express').Router();
const commentRoutes = require('./commentRoutes');
const blogRoutes = require('./blogRoutes');
const userRoutes = require('./userRoutes');

router.use('/comment', commentRoutes);
router.use('/blog', blogRoutes);
router.use('/user', userRoutes);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getBootcamp, getBootcamps, createBootcamp, updateBootcamp, deleteBootcamp } = require('../controllers/bootcamps')

// router.get('/', getBootcamps)
// router.get('/:id', getBootcamp)
// router.post('/', createBootcamp)
// router.patch('/:id', updateBootcamp)
// router.delete('/:id', deleteBootcamp)

router.route('/').get(getBootcamps).post(createBootcamp)
router.route("/:id").get(getBootcamp).patch(updateBootcamp).delete(deleteBootcamp)

module.exports = router;
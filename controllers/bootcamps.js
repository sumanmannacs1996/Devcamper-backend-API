const Bootcamp = require('../models/Bootcamp')
const asyncHandaler = require('express-async-handler')

// @desc Get all bootcamps
// @route GET /api/v1/bootcamps
// @access Public  
exports.getBootcamps = asyncHandaler(async (req, res, next) => {
    let query
    // Copy req,query
    let reqQuery = { ...req.query };

    // Field to be executed
    const removeField = ['select', 'sort', 'page', 'limit']

    // Loop over removeField and delete them from the query
    removeField.forEach(param => delete reqQuery[param]);

    // Create quesy string 
    let questString = JSON.stringify(reqQuery);

    // Create operator ($gt, $get, $lt, $let, $in)
    questString = questString.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)

    // Find resources
    query = Bootcamp.find(JSON.parse(questString));

    // Select Field
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
    }

    // Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    } else {
        query = query.sort('-createdAt')
    }

    // Pagination
    if (req.query.page || req.query.limit) {
        // first approach
        // const page = parseInt(req.query.page) || 1
        // const limit = parseInt(req.query.limit) || 15
        // const skip = (page - 1) * limit
        // query = query.skip(skip).limit(limit)

        // 2nd approach
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 15
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const total = await Bootcamp.countDocuments()
        query = query.skip(startIndex).limit(limit)

        const pagination = {}
        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            }
        }
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            }
        }

        // Executing query
        const bootcamps = await query
        res.status(200).json({ pagination, data: bootcamps })
        return
    }

    // Executing query
    const bootcamps = await query
    res.status(200).json(bootcamps)
})

// @desc Get single bootcamp
// @route GET /api/v1/bootcamps/:id
// @access Public  
exports.getBootcamp = asyncHandaler(async (req, res, next) => {
    const updatedBootcamp = await Bootcamp.findById(req.params.id);
    if (!updatedBootcamp) {
        res.status(404)
        throw new Error(`bootcamps not found with the id ${req.params.id}`)
    }
    res.json(updatedBootcamp)
})

// @desc Create single bootcamp
// @route POST /api/v1/bootcamps/
// @access Private
exports.createBootcamp = asyncHandaler(async (req, res, next) => {
    const newBootcamp = await Bootcamp.create(req.body);
    res.status(201).json(newBootcamp)
})


// @desc Update single bootcamp
// @route PATCH /api/v1/bootcamps/:id
// @access Private
exports.updateBootcamp = asyncHandaler(async (req, res, next) => {
    const updatedBootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    if (!updatedBootcamp) {
        res.status(404)
        throw new Error(`bootcamps not found with the id ${req.params.id}`)
    }
    res.json(updatedBootcamp)
})


// @desc Delete single bootcamp
// @route DELETE /api/v1/bootcamps/:id
// @access Private
exports.deleteBootcamp = asyncHandaler(async (req, res, next) => {
    const updatedBootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!updatedBootcamp) {
        res.status(404)
        throw new Error(`bootcamps not found with the id ${req.params.id}`)
    }
    res.json(updatedBootcamp)
})
const Track = require('../models/track.js')
const express = require('express')
const router = express.Router()

//POST a track
router.post('/', async (req, res) => {
    try{
        const createTrack = await Track.create(req.body)
        res.status(201).json(createTrack)
    }catch(error) {
        res.status(500).json({ error: error.message })
    }
})

//GET ALL TRACKS
router.get('/', async (req, res) => {
    try{
        const getTracks = await Track.find()
        res.status(201).json(getTracks)
    }catch(error) {
        res.status(500).json({ error: error.message })
    }
})

//GET TRACK BY ID
router.get('/:trackId', async (req, res) => {
    try{
        const getTrackbyId = await Track.findById(req.params.trackId)
        if (!getTrackbyId) {
            res.status(404)
                throw new Error('Track not found')
        }
            res.status(200).json(getTrackbyId)
    }  catch(error) {
        if (res.statuscode === 404) {
            res.json({ error: error.message })
        } else{
            res.status(500).json({ error: error.message })
        }
    }
})

//UPDATE A TRACK

router.put('/:trackId', async (req, res) => {
    try{
        const updateTrack = await Track.findByIdAndUpdate(req.params.trackId, req.body, {new: true})
        if (!updateTrack) {
            res.status(404)
            throw new Error('Track not found')
        }
        res.status(200).json(updateTrack)
    } catch(error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message })
        } else {
            res.status(500).json({ error: error.message })
        }
    }
})


//DELETE A TRACK

router.delete('/:trackId', async (req, res) => {
    try {
        const deleteTrack = await Track.findByIdAndDelete(req.params.trackId)
        if (!deleteTrack){
            res.status(404)
            throw new Error('No track found')
        } res.status(200).json(deleteTrack)
    }catch(error) {
        if (res.statusCode === 404){
            res.json({ error: error.message})
        } else{
            res.status(500).json({ error: error.message })
        }
    }
})

module.exports = router
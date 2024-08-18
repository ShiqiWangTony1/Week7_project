
const express = require('express');
const router = express.Router();
const Track = require('../models/Track');

// Get all tracks
router.get('/', async (req, res) => {
    try {
        const tracks = await Track.find();
        res.json({ data: tracks, total: tracks.length });
    } catch (err) {
        res.status(500).json({ err: 201, msg: "Resource doesn't exist" });
    }
});

// Get single track by id
router.get('/:track_id', async (req, res) => {
    try {
        const track = await Track.findById(req.params.track_id);
        if (!track) throw new Error();
        res.json({ data: track });
    } catch (err) {
        res.status(404).json({ err: 201, msg: "Resource doesn't exist" });
    }
});

// Add a new track
router.post('/', async (req, res) => {
    try {
        const newTrack = new Track(req.body);
        const savedTrack = await newTrack.save();
        res.status(201).json({ data: savedTrack });
    } catch (err) {
        res.status(400).json({ err: 201, msg: "Error creating resource" });
    }
});

// Update a track by id
router.put('/:track_id', async (req, res) => {
    try {
        const updatedTrack = await Track.findByIdAndUpdate(req.params.track_id, req.body, { new: true });
        if (!updatedTrack) throw new Error();
        res.json({ data: updatedTrack });
    } catch (err) {
        res.status(404).json({ err: 201, msg: "Resource doesn't exist" });
    }
});

// Delete a track by id
router.delete('/:track_id', async (req, res) => {
    try {
        const deletedTrack = await Track.findByIdAndDelete(req.params.track_id);
        if (!deletedTrack) throw new Error();
        res.json({ data: deletedTrack });
    } catch (err) {
        res.status(404).json({ err: 201, msg: "Resource doesn't exist" });
    }
});

module.exports = router;

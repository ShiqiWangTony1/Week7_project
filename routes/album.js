
const express = require('express');
const router = express.Router();
const Album = require('../models/Album');

// Get all albums
router.get('/', async (req, res) => {
    try {
        const albums = await Album.find();
        res.json({ data: albums, total: albums.length });
    } catch (err) {
        res.status(500).json({ err: 201, msg: "Resource doesn't exist" });
    }
});

// Get single album by id
router.get('/:pid', async (req, res) => {
    try {
        const album = await Album.findById(req.params.pid);
        if (!album) throw new Error();
        res.json({ data: album });
    } catch (err) {
        res.status(404).json({ err: 201, msg: "Resource doesn't exist" });
    }
});

// Add a new album
router.post('/', async (req, res) => {
    try {
        const newAlbum = new Album(req.body);
        const savedAlbum = await newAlbum.save();
        res.status(201).json({ data: savedAlbum });
    } catch (err) {
        res.status(400).json({ err: 201, msg: "Error creating resource" });
    }
});

// Update an album by id
router.put('/:pid', async (req, res) => {
    try {
        const updatedAlbum = await Album.findByIdAndUpdate(req.params.pid, req.body, { new: true });
        if (!updatedAlbum) throw new Error();
        res.json({ data: updatedAlbum });
    } catch (err) {
        res.status(404).json({ err: 201, msg: "Resource doesn't exist" });
    }
});

// Delete an album by id
router.delete('/:pid', async (req, res) => {
    try {
        const deletedAlbum = await Album.findByIdAndDelete(req.params.pid);
        if (!deletedAlbum) throw new Error();
        res.json({ data: deletedAlbum });
    } catch (err) {
        res.status(404).json({ err: 201, msg: "Resource doesn't exist" });
    }
});

module.exports = router;

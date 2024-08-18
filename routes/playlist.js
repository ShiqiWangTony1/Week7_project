const express = require('express');
const router = express.Router();

// In-memory playlist data
let playlists = [];

// Get all playlists
router.get('/', (req, res) => {
    res.json({ data: playlists, total: playlists.length });
});

// Get single playlist by id
router.get('/:pid', (req, res) => {
    const playlist = playlists.find(p => p.id === req.params.pid);
    if (playlist) {
        res.json({ data: playlist });
    } else {
        res.status(404).json({ err: 201, msg: "Resource doesn't exist" });
    }
});

// Add a new playlist
router.post('/', (req, res) => {
    const newPlaylist = req.body;
    playlists.push(newPlaylist);
    res.status(201).json({ data: newPlaylist });
});

// Update a playlist by id
router.put('/:pid', (req, res) => {
    const playlistIndex = playlists.findIndex(p => p.id === req.params.pid);
    if (playlistIndex !== -1) {
        playlists[playlistIndex] = { ...playlists[playlistIndex], ...req.body };
        res.json({ data: playlists[playlistIndex] });
    } else {
        res.status(404).json({ err: 201, msg: "Resource doesn't exist" });
    }
});

// Delete a playlist by id
router.delete('/:pid', (req, res) => {
    const playlistIndex = playlists.findIndex(p => p.id === req.params.pid);
    if (playlistIndex !== -1) {
        const deletedPlaylist = playlists.splice(playlistIndex, 1);
        res.json({ data: deletedPlaylist[0] });
    } else {
        res.status(404).json({ err: 201, msg: "Resource doesn't exist" });
    }
});

module.exports = router;

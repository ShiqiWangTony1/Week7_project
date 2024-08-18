const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String },
    album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
    playlist: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' },
    url: { type: String, required: true },
    duration: { type: Number }, // in seconds
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Track', TrackSchema);

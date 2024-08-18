const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const playlistRoutes = require('./routes/playlist');
app.use('/playlist', playlistRoutes);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory data storage (initial mock data)
let albums = [
    {
        id: "1",
        title: "My First Album",
        description: "This is my first album.",
        coverImage: "cover.jpg",
        tracks: []
    },
    {
        id: "2",
        title: "Second Album",
        description: "Another cool album.",
        coverImage: "cover2.jpg",
        tracks: []
    }
];

// Example route
app.get('/', (req, res) => {
    res.send('Hello, world! This is your music platform API without MongoDB.');
});

// Album Routes
app.get('/album', (req, res) => {
    res.json({ data: albums, total: albums.length });
});

app.post('/album', (req, res) => {
    const newAlbum = req.body;
    albums.push(newAlbum);
    res.status(201).json({ data: newAlbum });
});

app.get('/album/:id', (req, res) => {
    const album = albums.find(a => a.id === req.params.id);
    if (album) {
        res.json({ data: album });
    } else {
        res.status(404).json({ msg: 'Album not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

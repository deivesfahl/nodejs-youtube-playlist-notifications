require('dotenv').config({
    path: '../.env',
});

const express = require('express');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');

const routesApiPlaylist = require('./routes/api/playlist');
const routesApiVideo = require('./routes/api/video');

const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/playlists', routesApiPlaylist);
app.use('/api/videos', routesApiVideo);

app.listen(process.env.SERVER_PORT);

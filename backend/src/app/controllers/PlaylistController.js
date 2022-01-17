const Playlist = require('../models/Playlist');
const GetYouTubePlaylistInformationsService = require('../services/GetYouTubePlaylistInformationsService');
const { errors, hasErrors } = require('../utils/Validation');

const index = async (request, response) => {
    const { id } = request.query;

    const playlists = await Playlist.FindAll({ id });

    return response.status(200).json(playlists);
};

const informations = async (request, response) => {
    const validationErrors = errors(request);

    if (hasErrors(request)) {
        return response.status(400).json({ errors: validationErrors.mapped() });
    }

    const { id } = request.params;

    const playlist = await Playlist.Find(id);

    if (!playlist) {
        return response.status(404).json({
            message: 'Playlist not found',
        });
    }

    const { title, quantityVideos } = await GetYouTubePlaylistInformationsService.getInformations(playlist.url);

    return response.status(200).json({
        title,
        quantityVideos: Number(quantityVideos),
    });
};

const store = async (request, response) => {
    const validationErrors = errors(request);

    if (hasErrors(request)) {
        return response.status(400).json({ errors: validationErrors.mapped() });
    }

    const { title, url } = request.body;

    const playlistCreated = await Playlist.Create({ title, url });

    return response.status(201).json(playlistCreated);
};

const update = async (request, response) => {
    const validationErrors = errors(request);

    if (hasErrors(request)) {
        return response.status(400).json({ errors: validationErrors.mapped() });
    }

    const { id } = request.params;
    const { title } = request.body;

    const playlist = await Playlist.Find(id);

    if (!playlist) {
        return response.status(404).json({
            message: 'Playlist not found',
        });
    }

    const playlistChanged = await Playlist.Update(id, { title });

    return response.status(200).json(playlistChanged);
};

const destroy = async (request, response) => {
    const validationErrors = errors(request);

    if (hasErrors(request)) {
        return response.status(400).json({ errors: validationErrors.mapped() });
    }

    const { id } = request.params;

    const playlist = await Playlist.Find(id);

    if (!playlist) {
        return response.status(404).json({
            message: 'Playlist not found',
        });
    }

    await Playlist.Delete(id);

    return response.status(204).json();
};

module.exports = { index, informations, store, update, destroy };

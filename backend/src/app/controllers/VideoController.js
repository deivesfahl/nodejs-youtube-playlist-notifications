const Video = require('../models/Video');
const { errors, hasErrors } = require('../utils/Validation');

const index = async (request, response) => {
    const { id, playlistId } = request.query;

    const videos = await Video.FindAll({ id, playlistId });

    return response.status(200).json(videos);
};

const store = async (request, response) => {
    const validationErrors = errors(request);

    if (hasErrors(request)) {
        return response.status(400).json({ errors: validationErrors.mapped() });
    }

    const { title, url, imageUrl, notify, playlistId } = request.body;

    const videoCreated = await Video.Create({ title, url, imageUrl, notify, playlistId });

    return response.status(201).json(videoCreated);
};

const update = async (request, response) => {
    const validationErrors = errors(request);

    if (hasErrors(request)) {
        return response.status(400).json({ errors: validationErrors.mapped() });
    }

    const { id } = request.params;
    const { title, imageUrl, notify } = request.body;

    const video = await Video.Find(id);

    if (!video) {
        return response.status(404).json({
            message: 'Video not found',
        });
    }

    const videoChanged = await Video.Update(id, { title, imageUrl, notify });

    return response.status(200).json(videoChanged);
};

const destroy = async (request, response) => {
    const validationErrors = errors(request);

    if (hasErrors(request)) {
        return response.status(400).json({ errors: validationErrors.mapped() });
    }

    const { id } = request.params;

    const video = await Video.Find(id);

    if (!video) {
        return response.status(404).json({
            message: 'Video not found',
        });
    }

    await Video.Delete(id);

    return response.status(204).json();
};

module.exports = { index, store, update, destroy };

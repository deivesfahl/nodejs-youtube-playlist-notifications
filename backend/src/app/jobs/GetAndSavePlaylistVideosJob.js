const Playlist = require('../models/Playlist');
const Video = require('../models/Video');
const GetYouTubePlaylistVideosService = require('../services/GetYouTubePlaylistVideosService');

const getPlaylistVideos = async playlists => {
    const videos = [];

    for (const playlist of playlists) {
        const { id: playlistId, url: playlistUrl } = playlist;

        const youtubeVideos = await GetYouTubePlaylistVideosService.getVideos(playlistUrl);

        videos.push({
            playlistId,
            data: youtubeVideos,
        });
    }

    return videos;
};

const saveVideo = async ({ playlistId, title, url, imageUrl }) => {
    const video = await Video.FindByUrl(url);

    if (video) {
        await Video.Update(video.id, {
            title,
            url,
            imageUrl,
            notify: 'N',
        });

        return;
    }

    await Video.Create({
        title,
        url,
        imageUrl,
        notify: 'S',
        playlistId,
    });
};

const execute = async () => {
    const playlists = await Playlist.FindAll();

    if (!playlists) {
        return;
    }

    const videos = await getPlaylistVideos(playlists);

    if (videos.length === 0) {
        return;
    }

    for (const video of videos) {
        const { playlistId, data } = video;

        for (const playlistVideo of data) {
            const { title, url, imageUrl } = playlistVideo;

            await saveVideo({
                playlistId,
                title,
                url,
                imageUrl,
            });
        }
    }
};

module.exports = { execute };

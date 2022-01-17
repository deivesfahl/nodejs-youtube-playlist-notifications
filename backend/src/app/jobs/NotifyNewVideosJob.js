const fs = require('fs');
const path = require('path');

const MailService = require('../services/MailService');
const Playlist = require('../models/Playlist');
const Video = require('../models/Video');

const generateVideosHtml = videos => {
    let rows = '';

    for (const video of videos) {
        const { title, url, imageUrl } = video;

        rows += `
            <tr>
                <td class="image"><img src="${imageUrl}" alt="${title}"></td>
                <td>${title}</td>
                <td class="button"><a class="button" href="${url}">Acessar</a></td>
            </tr>
        `;
    }

    const templateVideos = `
        <table>
            <tbody>
                ${rows}
            </tbody>
        </table>
    `;

    return templateVideos;
};

const generateHtml = playlists => {
    let template = '';

    for (const playlist of playlists) {
        const { title, url, videos } = playlist;

        let templateVideos = generateVideosHtml(videos);

        template += `
            <div class="card">
                <h4 class="cardTitle">
                    <a href="${url}">${title}</a>
                </h4>

                ${templateVideos}
            </div>
        `;
    }

    return template;
};

const getTemplate = playlists => {
    const template = 'views/mail/newPublishedVideos.html';
    const templateContent = fs.readFileSync(path.join(__dirname, '..', '..', template), 'utf8');

    return templateContent.replace('{{ content }}', generateHtml(playlists));
};

const getVideos = async () => {
    const playlists = await Playlist.FindVideosForNotify();

    if (!playlists) {
        return [];
    }

    return playlists;
};

const updateVideos = async playlists => {
    for (const playlist of playlists) {
        const { videos } = playlist;

        for (const video of videos) {
            const { id } = video;

            await Video.Update(id, {
                notify: 'N',
            });
        }
    }
};

const notify = async playlists => {
    const html = getTemplate(playlists);

    await MailService.sendMail({
        from: {
            name: process.env.MAIL_FROM_NAME,
            email: process.env.MAIL_FROM_EMAIL,
        },
        to: {
            name: process.env.MAIL_TO_NAME,
            email: process.env.MAIL_TO_EMAIL,
        },
        subject: '[YouTube] Novos Vídeos Publicados',
        html,
    });
};

const execute = async () => {
    const playlists = await getVideos();

    if (playlists.length === 0) {
        return;
    }

    await notify(playlists);

    await updateVideos(playlists);
};

module.exports = { execute };

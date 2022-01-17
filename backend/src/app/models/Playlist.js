const prisma = require('../libs/Prisma');

const { currentDateTimeWithLocalTimezone } = require('../utils/Date');

const PrepareFilters = params => {
    const { id } = params || {};

    let filters = {};

    if (id) {
        filters = Object.assign(filters, { id });
    }

    return { filters, filtered: Object.keys(filters).length > 0 };
};

const Find = async id => {
    return await prisma.playlist.findFirst({
        where: {
            id,
        },
    });
};

const FindAll = async params => {
    const { sort } = params || {};

    const { filters, filtered } = PrepareFilters(params);

    let queryParams = {
        orderBy: sort ? sort : { created_at: 'desc' },
    };

    if (filtered) {
        queryParams = Object.assign(queryParams, {
            where: filters,
        });
    }

    return await prisma.playlist.findMany({
        ...queryParams,
    });
};

const FindVideosForNotify = async () => {
    const videosForNotify = [];

    const playlists = await prisma.playlist.findMany({
        select: {
            title: true,
            url: true,
            videos: {
                select: {
                    id: true,
                    title: true,
                    url: true,
                    imageUrl: true,
                },
                where: {
                    notify: 'S',
                },
                orderBy: { sort: 'asc' },
            },
        },
        orderBy: { created_at: 'asc' },
    });

    if (!playlists) {
        return null;
    }

    for (const playlist of playlists) {
        const { videos } = playlist;

        if (videos.length === 0) {
            continue;
        }

        videos.map(video => {
            video.url = `https://www.youtube.com${video.url}`;

            return video;
        });

        videosForNotify.push(playlist);
    }

    return videosForNotify;
};

const Create = async ({ title, url }) => {
    return await prisma.playlist.create({
        data: {
            title,
            url,
            created_at: currentDateTimeWithLocalTimezone(),
        },
    });
};

const Update = async (id, { title }) => {
    const data = {
        updated_at: currentDateTimeWithLocalTimezone(),
    };

    if (title) {
        data.title = title;
    }

    return await prisma.playlist.update({
        data,
        where: {
            id,
        },
    });
};

const Delete = async id => {
    return await prisma.playlist.delete({
        where: {
            id,
        },
    });
};

module.exports = { Find, FindAll, FindVideosForNotify, Create, Update, Delete };

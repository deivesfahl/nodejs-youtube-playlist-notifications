const prisma = require('../libs/Prisma');

const { currentDateTimeWithLocalTimezone } = require('../utils/Date');

const GenerateNextSort = async playlistId => {
    const sort = await prisma.video.aggregate({
        _max: {
            sort: true,
        },
        where: {
            playlistId,
        },
    });

    return sort ? sort._max.sort + 1 : 1;
};

const PrepareFilters = params => {
    const { id, playlistId } = params || {};

    let filters = {};

    if (id) {
        filters = Object.assign(filters, { id });
    }

    if (playlistId) {
        filters = Object.assign(filters, { playlistId });
    }

    return { filters, filtered: Object.keys(filters).length > 0 };
};

const Find = async id => {
    return await prisma.video.findFirst({
        where: {
            id,
        },
        include: {
            playlist: {
                select: {
                    title: true,
                    url: true,
                },
            },
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

    return await prisma.video.findMany({
        ...queryParams,
        include: {
            playlist: {
                select: {
                    title: true,
                    url: true,
                },
            },
        },
    });
};

const FindByUrl = async url => {
    return await prisma.video.findFirst({
        where: {
            url,
        },
    });
};

const Create = async ({ title, url, imageUrl, notify, playlistId }) => {
    const sort = await GenerateNextSort(playlistId);

    return await prisma.video.create({
        data: {
            title,
            url,
            imageUrl,
            sort,
            notify,
            playlistId,
            created_at: currentDateTimeWithLocalTimezone(),
        },
    });
};

const Update = async (id, { title, url, imageUrl, notify }) => {
    const data = {
        updated_at: currentDateTimeWithLocalTimezone(),
    };

    if (title) {
        data.title = title;
    }

    if (url) {
        data.url = url;
    }

    if (imageUrl) {
        data.imageUrl = imageUrl;
    }

    if (notify) {
        data.notify = notify;
    }

    return await prisma.video.update({
        data,
        where: {
            id,
        },
    });
};

const Delete = async id => {
    return await prisma.video.delete({
        where: {
            id,
        },
    });
};

module.exports = { Find, FindAll, FindByUrl, Create, Update, Delete };

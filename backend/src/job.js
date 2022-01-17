require('dotenv').config({
    path: '../.env',
});

const CronJob = require('cron').CronJob;

const GetAndSavePlaylistVideosJob = require('./app/jobs/GetAndSavePlaylistVideosJob');
const NotifyNewVideosJob = require('./app/jobs/NotifyNewVideosJob');
const { currentDateTimeWithLocalTimezone } = require('./app/utils/Date');

const GetAndSavePlaylistVideos = async () => {
    console.log(currentDateTimeWithLocalTimezone(), 'Get and save playlist videos');

    await GetAndSavePlaylistVideosJob.execute();
};

const NotifyNewVideos = async () => {
    console.log(currentDateTimeWithLocalTimezone(), 'Notify new videos');

    await NotifyNewVideosJob.execute();
};

new CronJob(process.env.JOB_RUNTIME_SAVE_VIDEOS, GetAndSavePlaylistVideos, null, true, process.env.TIME_ZONE);
new CronJob(process.env.JOB_RUNTIME_NOTIFY_VIDEOS, NotifyNewVideos, null, true, process.env.TIME_ZONE);

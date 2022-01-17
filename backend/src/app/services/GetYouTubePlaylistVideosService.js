const puppeteer = require('puppeteer');

const Screen = require('../utils/Screen');

const getVideos = async url => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    await page.evaluate(Screen.scrollToBottom);
    await page.waitForTimeout(3000);

    const videos = await page.evaluate(() => {
        const videos = [];

        document.querySelectorAll('ytd-playlist-video-renderer').forEach((element, key) => {
            let title = element.querySelector('#video-title');
            let image = element.querySelector('#img');

            videos.push({
                id: key + 1,
                title: title.getAttribute('title'),
                url: title.getAttribute('href'),
                imageUrl: image.getAttribute('src'),
            });
        });

        return videos;
    });

    await browser.close();

    return videos;
};

module.exports = { getVideos };

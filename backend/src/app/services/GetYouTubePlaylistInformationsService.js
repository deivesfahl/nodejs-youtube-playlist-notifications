const puppeteer = require('puppeteer');

const getInformations = async url => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    const informations = await page.evaluate(() => {
        const sidebar = document.querySelector('ytd-playlist-sidebar-primary-info-renderer');

        const title = sidebar.querySelector('#title yt-formatted-string a').textContent;
        const quantityVideos = sidebar.querySelector('#stats > yt-formatted-string > span').textContent;

        return {
            title,
            quantityVideos,
        };
    });

    await browser.close();

    return informations;
};

module.exports = { getInformations };

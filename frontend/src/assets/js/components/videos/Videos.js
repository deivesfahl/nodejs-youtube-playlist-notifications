import Card from '../card/Card';
import CardSearch from '../card-search/CardSearch';

const Videos = (function () {
    const getHtmlEmptyState = () => {
        return `
            <tr class="table__row">
                <td class="table__cell" colspan="4">
                    <div class="emptyState">
                        <div class="emptyState__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
                                <path fill="none" d="M0 0h24v24H0z"/>
                                <path d="M2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM4 5v14h16V5H4zm6.622 3.415l4.879 3.252a.4.4 0 0 1 0 .666l-4.88 3.252a.4.4 0 0 1-.621-.332V8.747a.4.4 0 0 1 .622-.332z"/>
                            </svg>
                        </div>
                        <div class="emptyState__text">No videos found.</div>
                    </div>
                </td>
            </tr>
        `;
    };

    const getHtmlRows = videos => {
        let rows = '';

        for (const video of videos) {
            const { id, title, url, imageUrl, notify, playlist } = video;

            const notifyClass = notify === 'N' ? 'text-success' : 'text-muted';

            rows += `
                <tr class="table__row" data-id="${id}">
                    <td class="table__cell nowrap notified" data-value="${notify}">
                        <svg class="centered ${notifyClass}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-.997-4L6.76 11.757l1.414-1.414 2.829 2.829 5.656-5.657 1.415 1.414L11.003 16z"/>
                        </svg>
                    </td>
                    <td class="table__cell nowrap"><img class="rounded" src="${imageUrl}" alt="${title}"></td>
                    <td class="table__cell title" data-value="${title}"><a href="${url}" target="_blank">${title}</a></td>
                    <td class="table__cell playlist" data-value="${playlist.title}"><a href="${playlist.url}" target="_blank">${playlist.title}</a></td>
                </tr>
            `;
        }

        return rows;
    };

    const getHtmlTable = videos => {
        let rows = getHtmlRows(videos);

        if (rows === '') {
            rows = getHtmlEmptyState();
        }

        const table = `
            <table class="table table--striped table--hover" id="videosTable">
                <colgroup>
                    <col style="width: 5%;">
                    <col style="width: 5%;">
                    <col>
                    <col>
                </colgroup>
                <thead class="table__thead" id="videosTableThead">
                    <tr>
                        <th class="table__head table__head--sort nowrap" scope="col" data-sort="notified">
                            <div class="table__headColumn">
                                <div class="table__headColumnText">Notified</div>
                                <span class="table__headColumnIcon"></span>
                            </div>
                        </th>
                        <th class="table__head nowrap" scope="col">Cover</th>
                        <th class="table__head table__head--sort nowrap" scope="col" data-sort="title">
                            <div class="table__headColumn">
                                <div class="table__headColumnText">Title</div>
                                <span class="table__headColumnIcon"></span>
                            </div>
                        </th>
                        <th class="table__head table__head--sort nowrap" scope="col" data-sort="playlist">
                            <div class="table__headColumn">
                                <div class="table__headColumnText">Playlist</div>
                                <span class="table__headColumnIcon"></span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody class="table__tbody" id="videosTableTbody">
                    ${rows}
                </tbody>
            </table>
        `;

        return table;
    };

    const getHtml = videos => {
        const cardSearch = CardSearch.getHtml();

        const table = getHtmlTable(videos);

        const card = Card.getHtml({
            id: 'videosCard',
            header: {
                id: 'videosCardHeader',
                title: 'Videos',
            },
            footer: {
                id: 'videosCardFooter',
                content: `
                    <span class="pagination__info" id="videosPaginationInfo"></span>
                    <ul class="pagination"></ul>
                `,
            },
            extraContent: `
                ${cardSearch}
                ${table}
            `,
        });

        return card;
    };

    return {
        getHtml: videos => {
            return getHtml(videos);
        },
        getHtmlEmptyState: () => {
            return getHtmlEmptyState();
        },
    };
})();

export default Videos;

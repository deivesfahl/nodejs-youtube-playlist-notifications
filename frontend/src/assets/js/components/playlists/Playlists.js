import Card from '../card/Card';
import CardSearch from '../card-search/CardSearch';

const Playlists = (function () {
    const getHtmlEmptyState = () => {
        return `
            <tr class="table__row">
                <td class="table__cell" colspan="4">
                    <div class="emptyState">
                        <div class="emptyState__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
                                <path fill="none" d="M0 0H24V24H0z"/>
                                <path d="M22 18v2H2v-2h20zM2 3.5l8 5-8 5v-10zM22 11v2H12v-2h10zM4 7.108v2.784L6.226 8.5 4 7.108zM22 4v2H12V4h10z"/>
                            </svg>
                        </div>
                        <div class="emptyState__text">No playlist found.</div>
                    </div>
                </td>
            </tr>
        `;
    };

    const getHtmlRows = playlists => {
        let rows = '';

        for (const playlist of playlists) {
            const { id, title, url } = playlist;

            rows += `
                <tr class="table__row" data-id="${id}">
                    <td class="table__cell nowrap title" data-value="${title}"><a href="${url}" target="_blank">${title}</a></td>
                </tr>
            `;
        }

        return rows;
    };

    const getHtmlTable = playlists => {
        let rows = getHtmlRows(playlists);

        if (rows === '') {
            rows = getHtmlEmptyState();
        }

        const table = `
            <table class="table table--striped table--hover" id="playlistsTable">
                <colgroup>
                    <col style="width: 5%;">
                    <col>
                </colgroup>
                <thead class="table__thead" id="playlistsTableThead">
                    <tr>
                        <th class="table__head table__head--sort nowrap" scope="col" data-sort="title">
                            <div class="table__headColumn">
                                <div class="table__headColumnText">Title</div>
                                <span class="table__headColumnIcon"></span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody class="table__tbody" id="playlistsTableTbody">
                    ${rows}
                </tbody>
            </table>
        `;

        return table;
    };

    const getHtml = playlists => {
        const cardSearch = CardSearch.getHtml();

        const table = getHtmlTable(playlists);

        const card = Card.getHtml({
            id: 'playlistsCard',
            header: {
                id: 'playlistsCardHeader',
                title: 'Playlists',
            },
            footer: {
                id: 'playlistsCardFooter',
                content: `
                    <span class="pagination__info" id="playlistsPaginationInfo"></span>
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
        getHtml: playlists => {
            return getHtml(playlists);
        },
        getHtmlEmptyState: () => {
            return getHtmlEmptyState();
        },
    };
})();

export default Playlists;

import List from 'list.js';

const Grid = (function () {
    const HIDE_CLASS = 'display-none';
    const GRID_LIST_CLASS = 'table__tbody';
    const GRID_SORT_CLASS = 'table__head--sort';
    const GRID_SEARCH_CLASS = 'formControl--search';
    const GRID_PAGINATION_CLASS = 'pagination';
    const GRID_PAGINATION_ITEM_DISABLED_CLASS = 'disabled';

    const emptyState = ({ list, onEmptyState }) => {
        const { matchingItems } = list;

        if (matchingItems.length > 0) {
            return;
        }

        if (typeof onEmptyState === 'function') {
            onEmptyState(list);
        }
    };

    const paginationTrigger = () => {
        const paginations = document.querySelectorAll(`.${GRID_PAGINATION_CLASS}`);

        paginations.forEach(pagination => {
            const items = pagination.querySelectorAll(`li:not(.${GRID_PAGINATION_ITEM_DISABLED_CLASS}) > a`);

            items.forEach(item => {
                item.addEventListener('click', event => {
                    event.preventDefault();
                });
            });
        });
    };

    const paginationInit = ({ list, paginationInfo }) => {
        const { i: current, matchingItems, page } = list;

        const paginationInfoElement = document.querySelector(paginationInfo);

        if (!paginationInfoElement) {
            return;
        }

        let total = matchingItems.length;

        if (total === 0) {
            paginationInfoElement.innerHTML = '';

            return;
        }

        let to = current + Number(page) - 1;

        if (total < to) {
            to = total;
        }

        paginationInfoElement.innerHTML = `Showing ${current} to ${to} of ${total} entries`;

        setTimeout(function () {
            paginationTrigger();
        }, 0);
    };

    const searchStart = paginationContainer => {
        document.querySelector(paginationContainer).classList.remove(HIDE_CLASS);
    };

    const searchComplete = ({ list, paginationContainer, onEmptyState }) => {
        const { matchingItems } = list;

        if (matchingItems.length === 1) {
            const { elm: element } = matchingItems[0];

            if (!element.dataset.id) {
                document.querySelector(paginationContainer).classList.add(HIDE_CLASS);

                return;
            }
        }

        if (matchingItems.length > 0) {
            return;
        }

        if (typeof onEmptyState === 'function') {
            onEmptyState(list);
        }

        document.querySelector(paginationContainer).classList.add(HIDE_CLASS);
    };

    const sortStartAndComplete = ({ list, onEmptyState }) => {
        emptyState({ list, onEmptyState });
    };

    const gridInit = ({ grid, paginationContainer, paginationInfo }) => {
        const { matchingItems } = grid;

        if (matchingItems.length === 1) {
            const { elm } = matchingItems[0];

            if (elm.dataset.id) {
                return;
            }

            document.querySelector(paginationContainer).classList.add(HIDE_CLASS);
        }

        paginationInit({ list: grid, paginationInfo });
    };

    const init = (element, options) => {
        let { columns, page, paginationContainer, paginationInfo, onEmptyState } = options;

        page = !page ? 5 : page;

        const grid = new List(element, {
            valueNames: columns,
            listClass: GRID_LIST_CLASS,
            sortClass: GRID_SORT_CLASS,
            searchClass: GRID_SEARCH_CLASS,
            page,
            pagination: {
                left: 1,
                right: 1,
            },
        });

        grid.on('updated', list => {
            paginationInit({ list, paginationInfo });
        });

        grid.on('searchStart', () => {
            searchStart(paginationContainer);
        });

        grid.on('searchComplete', list => {
            searchComplete({ list, paginationContainer, onEmptyState });
        });

        grid.on('sortStart', list => {
            sortStartAndComplete({ list, onEmptyState });
        });

        grid.on('sortComplete', list => {
            sortStartAndComplete({ list, onEmptyState });
        });

        gridInit({ grid, paginationContainer, paginationInfo });

        return grid;
    };

    return {
        init: (element, options) => {
            return init(element, options);
        },
    };
})();

export default Grid;

const CardSearch = (function () {
    const CARD_FILTER_CLASS = 'card__filter';

    const getHtml = () => {
        return `
            <div class="${CARD_FILTER_CLASS}">
                <form>
                    <input class="formControl formControl--search" placeholder="Search...">
                </form>
            </div>
        `;
    };

    return {
        getHtml: () => {
            return getHtml();
        },
    };
})();

export default CardSearch;

const Card = (function () {
    const CARD_CLASS = 'card';
    const CARD_HEADER_CLASS = 'card__header';
    const CARD_HEADER_TITLE_CLASS = 'card__headerTitle';
    const CARD_BODY_CLASS = 'card__body';
    const CARD_FOOTER_CLASS = 'card__footer';

    const getHtmlHeader = header => {
        const { id, title } = header;

        return `
            <div class="${CARD_HEADER_CLASS}" id="${id}">
                <h4 class="${CARD_HEADER_TITLE_CLASS}">${title}</h4>
            </div>
        `;
    };

    const getHtmlBody = body => {
        const { id, content } = body;

        return `
            <div class="${CARD_BODY_CLASS}" id="${id}">
                ${content}
            </div>
        `;
    };

    const getHtmlFooter = footer => {
        const { id, content } = footer;

        return `
            <div class="${CARD_FOOTER_CLASS}" id="${id}">
                ${content}
            </div>
        `;
    };

    const getHtml = ({ id, header, body, footer, extraContent }) => {
        let htmlHeader = header ? getHtmlHeader(header) : '';
        let htmlBody = body ? getHtmlBody(body) : '';
        let htmlFooter = footer ? getHtmlFooter(footer) : '';
        let htmlExtraContent = extraContent ?? '';

        return `
            <div class="${CARD_CLASS}" id="${id}">
                ${htmlHeader}
                ${htmlBody}
                ${htmlExtraContent}
                ${htmlFooter}
            </div>
        `;
    };

    return {
        getHtml: ({ id, header, body, footer, extraContent }) => {
            return getHtml({ id, header, body, footer, extraContent });
        },
    };
})();

export default Card;

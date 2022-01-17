const ColorScheme = (function () {
    const LOGO_LIGHT = '/images/logo-dark.png';

    const LOGO_DARK = '/images/logo-light.png';

    const SVG_ICON_LIGHT = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/>
        </svg>
    `;

    const SVG_ICON_DARK = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12z"/>
        </svg>
    `;

    const getPrefersColorScheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const getCurrentTheme = () => {
        const theme = localStorage.getItem('theme');

        if (!theme) {
            return '';
        }

        return theme;
    };

    const setTheme = ({ theme, logo, changeTheme }) => {
        setThemeAttributeFromHtmlTag(theme);

        setColorFromMetaTag(theme);

        setThemeInLocalStorage(theme);

        setLogo(logo);

        setChangeThemeButtonIcon(changeTheme.button, changeTheme.buttonActiveClass);

        highlightSelectedTheme(changeTheme.menu, changeTheme.menuItemActiveClass);
    };

    const setThemeAttributeFromHtmlTag = theme => {
        const html = document.querySelector('html');

        if (!theme) {
            theme = getPrefersColorScheme();
        }

        html.dataset.theme = theme;
    };

    const setColorFromMetaTag = theme => {
        const metaMsTileColor = document.querySelector('meta[name="msapplication-TileColor"]');
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');

        if (!theme) {
            theme = getPrefersColorScheme();
        }

        let color = '#f5f8fa';

        if (theme === 'dark') {
            color = '#202124';
        }

        metaMsTileColor.setAttribute('content', color);
        metaThemeColor.setAttribute('content', color);
    };

    const setThemeInLocalStorage = theme => {
        if (!theme) {
            localStorage.removeItem('theme');

            return;
        }

        localStorage.setItem('theme', theme);
    };

    const setLogo = logo => {
        const currentTheme = getCurrentTheme();

        switch (currentTheme) {
            case 'light':
                logo.setAttribute('src', LOGO_DARK);
                break;
            case 'dark':
                logo.setAttribute('src', LOGO_LIGHT);
                break;
            default:
                logo.setAttribute('src', getPrefersColorScheme() === 'light' ? LOGO_DARK : LOGO_LIGHT);
                break;
        }
    };

    const setChangeThemeButtonIcon = (element, className) => {
        const currentTheme = getCurrentTheme();

        switch (currentTheme) {
            case 'light':
                element.innerHTML = SVG_ICON_LIGHT;
                break;
            case 'dark':
                element.innerHTML = SVG_ICON_DARK;
                break;
            default:
                element.innerHTML = getPrefersColorScheme() === 'light' ? SVG_ICON_LIGHT : SVG_ICON_DARK;
                break;
        }

        highlightChangeThemeButtonIcon(element, currentTheme, className);
    };

    const highlightChangeThemeButtonIcon = (element, theme, className) => {
        if (theme) {
            element.classList.add(className);
            return;
        }

        element.classList.remove(className);
    };

    const highlightSelectedTheme = (menu, menuItemActiveClass) => {
        const currentTheme = getCurrentTheme();
        const menuItems = menu.querySelectorAll('[data-theme]');
        const selectedTheme = [...menuItems].filter(element => element.dataset.theme === currentTheme);

        menuItems.forEach(element => element.classList.remove(menuItemActiveClass));

        selectedTheme[0].classList.add(menuItemActiveClass);
    };

    const registerChangeThemeEvent = ({ logo, changeTheme }) => {
        const { menu } = changeTheme;
        const menuItems = menu.querySelectorAll('[data-theme]');

        menuItems.forEach(element => {
            element.addEventListener('click', event => {
                event.preventDefault();

                const theme = element.dataset.theme;

                setTheme({ theme, logo, changeTheme });
            });
        });
    };

    const init = ({ logo, changeTheme }) => {
        const currentTheme = getCurrentTheme();

        setTheme({ theme: currentTheme, logo, changeTheme });

        registerChangeThemeEvent({ logo, changeTheme });
    };

    return {
        init: ({ logo, changeTheme }) => {
            init({ logo, changeTheme });
        },
    };
})();

export default ColorScheme;

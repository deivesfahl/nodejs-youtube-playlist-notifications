import ColorScheme from './components/color-scheme/ColorScheme';
import Dropdown from './components/dropdown/Dropdown';
import Grid from './components/grid/Grid';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Playlists from './components/playlists/Playlists';
import Videos from './components/videos/Videos';
import Http from './utils/Http';

import '../images/icons/android-icon-192x192.png';
import '../images/icons/apple-icon-114x114.png';
import '../images/icons/apple-icon-120x120.png';
import '../images/icons/apple-icon-144x144.png';
import '../images/icons/apple-icon-152x152.png';
import '../images/icons/apple-icon-180x180.png';
import '../images/icons/apple-icon-57x57.png';
import '../images/icons/apple-icon-60x60.png';
import '../images/icons/apple-icon-72x72.png';
import '../images/icons/apple-icon-76x76.png';
import '../images/icons/favicon-16x16.png';
import '../images/icons/favicon-32x32.png';
import '../images/icons/favicon-96x96.png';
import '../images/icons/favicon.ico';
import '../images/icons/ms-icon-144x144.png';
import '../images/logo-light.png';
import '../images/logo-dark.png';

const hideLoading = () => {
    const body = document.querySelector('body');

    setTimeout(() => body.classList.remove('isLoading'), 800);
};

const getVideos = async () => {
    const { data } = await Http.get('/api/videos');

    return data ?? [];
};

const getPlaylists = async () => {
    const { data } = await Http.get('/api/playlists');

    return data ?? [];
};

const handleColorScheme = () => {
    const logo = document.querySelector('#layoutHeaderLogo');
    const changeThemeButton = document.querySelector('#headerChangeTheme');
    const changeThemeMenu = document.querySelector('#headerChangeThemeDropdown');

    ColorScheme.init({
        logo,
        changeTheme: {
            button: changeThemeButton,
            buttonActiveClass: 'layoutHeader__toolbarLink--active',
            menu: changeThemeMenu,
            menuItemActiveClass: 'dropdownMenu__item--active',
        },
    });
};

const handleDropdown = () => {
    Dropdown.init();
};

const handleGrid = cards => {
    for (const card of cards) {
        const { reference, options } = card;

        Grid.init(`${reference}Card`, {
            columns: options.columns,
            paginationContainer: `#${reference}CardFooter`,
            paginationInfo: `#${reference}PaginationInfo`,
            onEmptyState: list => {
                list.list.innerHTML = options.htmlEmptyState;
            },
        });
    }
};

const handleRender = async () => {
    const app = document.querySelector('#app');

    const videos = await getVideos();
    const playlists = await getPlaylists();

    app.innerHTML = `
        <div class="container">
            ${Header.getHtml()}
            <main>
                ${Videos.getHtml(videos)}
                ${Playlists.getHtml(playlists)}
            </main>
            ${Footer.getHtml()}

            <div class="loading"></div>
        </div>
    `;
};

const init = async () => {
    await handleRender();

    handleColorScheme();

    handleDropdown();

    handleGrid([
        {
            reference: 'videos',
            options: {
                columns: [
                    {
                        attr: 'data-value',
                        name: 'notified',
                    },
                    {
                        attr: 'data-value',
                        name: 'title',
                    },
                    {
                        attr: 'data-value',
                        name: 'playlist',
                    },
                ],
                htmlEmptyState: Videos.getHtmlEmptyState(),
            },
        },
        {
            reference: 'playlists',
            options: {
                columns: [
                    {
                        attr: 'data-value',
                        name: 'title',
                    },
                ],
                htmlEmptyState: Playlists.getHtmlEmptyState(),
            },
        },
    ]);

    hideLoading();
};

document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();

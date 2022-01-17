const Dropdown = (function () {
    const DROPDOWN_MENU_ACTIVE_CLASS = 'dropdownMenu--active';

    const open = element => {
        let dropdown = element.nextElementSibling;

        element.setAttribute('aria-expanded', 'true');

        dropdown?.classList.add(DROPDOWN_MENU_ACTIVE_CLASS);
    };

    const close = element => {
        let dropdown = element.nextElementSibling;

        element.setAttribute('aria-expanded', 'false');

        dropdown?.classList.remove(DROPDOWN_MENU_ACTIVE_CLASS);
    };

    const init = () => {
        let dropdowns = document.querySelectorAll('[data-toggle="dropdown"]');

        dropdowns.forEach(element => {
            element.addEventListener('click', event => {
                event.preventDefault();

                let isOpen = element.getAttribute('aria-expanded');

                if (isOpen === 'true') {
                    close(element);

                    return;
                }

                open(element);
            });
        });

        document.addEventListener('click', event => {
            let dropdowns = document.querySelectorAll('[data-toggle="dropdown"]');

            dropdowns.forEach(element => {
                let target = event.target;
                let targetParentElement = target.closest('[data-toggle="dropdown"]');

                if (element != targetParentElement) {
                    close(element);
                }
            });
        });
    };

    return {
        init: () => {
            init();
        },
        open: element => {
            open(element);
        },
        close: element => {
            close(element);
        },
    };
})();

export default Dropdown;

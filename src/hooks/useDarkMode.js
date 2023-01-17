export function useDarkMode () {
    const button = document.querySelector(".dark-light-btn");
    const dark = {
        value: getThemeMode("dark")
    };

    const toggle = () => {
        dark.value = !dark.value;
        setStyle();
    }

    const setStyle = () => {
        const el = button.firstElementChild;
        el.classList.remove("l");
        el.classList.remove("r");
        el.firstElementChild.remove();
        el.innerHTML = `<i class="fa-solid fa-${dark.value ? "moon" : "sun"}"></i>`;
        document.querySelector("html").setAttribute("data-theme", dark.value ? "dark" : "light");
        queueMicrotask(() => {
            el.classList.add(dark.value ? "r" : "l");
        });
    }

    const mqlDark = window.matchMedia(`(prefers-color-scheme: dark)`);
    const mqlLight = window.matchMedia(`(prefers-color-scheme: light)`);

    mqlDark.onchange = (e) => {
        if (e.matches) {
            dark.value = true;
            setStyle();
        }
    }

    mqlLight.onchange = (e) => {
        if (e.matches) {
            dark.value = false;
            setStyle();
        }
    }

    setStyle();

    return {
        toggle
    }
}

/**
 * 
 * @param {string} mode 
 * @returns boolean
 */
export function getThemeMode (mode) {
    return window.matchMedia(`(prefers-color-scheme: ${mode})`).matches;
}
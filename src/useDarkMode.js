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
import { useHomePageData } from "./hooks/useHomePageData";
import { renderRepos, renderUser } from "./utils/render.js";
import { useDarkMode } from "./hooks/useDarkMode.js";
import "./styles/preload.scss";

const { useFetchRepolist, useFetchUserInfo } = useHomePageData();
const { userData, fetchUser } = useFetchUserInfo();
const { repolist, fetchGithubRepos } = useFetchRepolist();

fetchGithubRepos().then(() => renderRepos(repolist))
fetchUser().then(() => renderUser(userData));

const { toggle } = useDarkMode();
document.querySelector(".switch-mode-btn").addEventListener("click", toggle);
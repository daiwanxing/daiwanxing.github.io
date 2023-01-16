import { useHomePageData } from "./useHomePageData.js";
import { renderRepos, renderUser } from "./render.js";
import { useDarkMode } from "./useDarkMode.js";

const { useFetchRepolist, useFetchUserInfo } = useHomePageData();

const { userData, fetchUser } = useFetchUserInfo();
const { repolist, fetchGithubRepos } = useFetchRepolist();

fetchGithubRepos().then(() => renderRepos(repolist))

fetchUser().then(() => renderUser(userData));

const { toggle } = useDarkMode();
document.querySelector(".switch-mode-btn").addEventListener("click", toggle);
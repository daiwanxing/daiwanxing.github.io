import { useHomePageData } from "./useHomePageData.js";
import { renderRepos, renderUser } from "./render.js";

const { useFetchRepolist, useFetchUserInfo } = useHomePageData();

const { userData, fetchUser } = useFetchUserInfo();
const { repolist, fetchGithubRepos } = useFetchRepolist();

fetchGithubRepos().then(() => renderRepos(repolist))

fetchUser().then(() => renderUser(userData));
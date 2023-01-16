import { ACCESS_TOKEN } from "./consts.js";
import { Octokit } from "https://cdn.skypack.dev/octokit";

export function useHomePageData() {
  function useFetchRepolist() {
    const repolist = [];

    const fetchGithubRepos = async function () {
      const result = await fetch(
        "https://api.github.com/users/daiwanxing/repos",
        {
          method: "get",
        }
      );
      const parsedJson = await result.json();

      if (Array.isArray(parsedJson)) {
        repolist.push(
          ...parsedJson
            .filter((d) => !d.fork && d.language)
            .sort((cur, next) => next.stargazers_count - cur.stargazers_count)
        );
      }
    };

    return {
      fetchGithubRepos,
      repolist,
    };
  }

  function useFetchUserInfo() {
    const userData = {};

    const fetchUser = async () => {
      const octokit = new Octokit({
        auth: ACCESS_TOKEN,
      });

      const { data } = await octokit.request("GET /users/daiwanxing", {
        username: "daiwanxing",
      });

      Object.assign(userData, data);
    };

    return {
        userData,
        fetchUser,
    };
  }

  return {
    useFetchRepolist,
    useFetchUserInfo,
  };
}

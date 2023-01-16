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
      const result = await fetch("https://api.github.com/users/daiwanxing")
      const parsedJson = await result.json();
      Object.assign(userData, parsedJson);
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

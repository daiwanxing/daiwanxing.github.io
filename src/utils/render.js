import enLang from "../lang/en";
import zhCNLang from "../lang/zh-cn";

const languageThemeColor = {
  vue: "#44bd87",
  javascript: "#f0db4f",
  react: "#087ea4",
  html: "rgb(255,87,34)",
  css: "rgb(0,106,177)",
};

export const renderRepos = function (repos) {
  const repoContainer = document.querySelector(".repo-list");
  const miniDoc = document.createDocumentFragment();

  const repoItems = repos.map((item) => {
    return document.createRange().createContextualFragment(
      `
                  <li>
                      <div>
                          <span><i class="fa-solid fa-book"></i></span>
                          <a href="${item.html_url}" target="_blank">${
        item.name
      }</a>
                      </div>
                      <p class="repo-describe">${item.description || "-"}</p>
                      <div class="repo-thumbnail">
                          <span><i style="color: ${
                            languageThemeColor[
                              item.language.toLocaleLowerCase()
                            ]
                          }"></i>
                          ${item.language}
                          </span>
                          <span>
                                <i class="fa-solid fa-star"></i>
                                ${item.stargazers_count}
                            </span>
                          <span>
                              <i class="fa-solid fa-code-fork"></i>${
                                item.forks_count
                              }
                            </span>
                      </div>
                  </li>
              `
    );
  });

  const childrens = repoContainer.children;
  [...childrens].forEach((d) => d.remove());

  miniDoc.append(...repoItems);
  repoContainer.append(miniDoc);
};

export function renderUser(userData) {
  const asideNode = document.querySelector("aside .user-detail");
  const miniDoc = document.createDocumentFragment();

  miniDoc.appendChild(
    document.createRange().createContextualFragment(`
    <figure>
      <img src="${userData.avatar_url}" />
      <figcaption>
        <h2>${userData.name}</h2>
      </figcaption>
      <p>${userData.bio}</p>
    </figure>
  `)
  );

  const child = asideNode.firstElementChild;
  asideNode.removeChild(child);
  asideNode.appendChild(miniDoc);
}

/**
 * 
 * @param {"zh-cn" | "en"} lang 
 */
export function renderLang(lang) {
  const sections = document.querySelectorAll("section");
  const language = lang === "zh-cn" ? zhCNLang : enLang;

  sections.forEach((d, index) => {
    const langContent =
      index === 0
        ? language["partOne"]
        : index === 1
        ? language["partTwo"]
        : language["partThree"];

    d.querySelector("h1").innerText = langContent["title"];
    d.querySelector(".sub-title").innerText = langContent["subTitle"];

    if (index === 0) {
      d.querySelectorAll("p:not(p.sub-title)").forEach(node => node.remove());
      const miniDoc = document.createDocumentFragment();
      language["partOne"].content.forEach(text => {
        const p = document.createElement("p");
        p.innerText = text;
        miniDoc.appendChild(p);
      });
      d.querySelector(".content-wrapper").appendChild(miniDoc);
    }
  });
}
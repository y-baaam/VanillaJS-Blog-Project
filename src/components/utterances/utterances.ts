export default function utterances(repo: string) {
  const script = document.createElement("script");
  script.src = "https://utteranc.es/client.js";
  script.async = true;
  script.setAttribute("repo", repo);
  script.setAttribute("issue-term", "pathname");
  script.setAttribute("label", "guest-book");
  script.setAttribute("theme", "photon-dark");
  script.crossOrigin = "anonymous";

  const container = document.getElementById("utterances-container");

  if (container) {
    container.appendChild(script);
  } else {
    console.error("utterances-container not found");
  }
}

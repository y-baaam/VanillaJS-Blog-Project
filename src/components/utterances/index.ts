export default function utterances(
  repo: string,
  label = "guest-book",
  containerId = "utterances-container"
) {
  const script = document.createElement("script");
  script.src = "https://utteranc.es/client.js";
  script.async = true;
  script.setAttribute("repo", repo);
  script.setAttribute("issue-term", "pathname");
  script.setAttribute("label", label);
  script.setAttribute("theme", "photon-dark");
  script.crossOrigin = "anonymous";

  const container = document.getElementById(containerId);

  if (container) {
    container.appendChild(script);
  } else {
    console.error(`${containerId} not found`);
  }
}

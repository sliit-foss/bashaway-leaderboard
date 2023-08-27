export const githubOrgLink = "https://github.com/sliit-foss";
export const repositoryLink = "https://github.com/sliit-foss/bashaway-leadeboard";
export const sliitFossMainWebsite = "https://sliitfoss.org";

export let portalURL = "https://portal.bashaway.sliitfoss.org";

if (import.meta.env.VITE_APP_ENV !== "production") {
  portalURL = portalURL.replace("portal.", `leaderboard.${import.meta.env.VITE_APP_ENV}.`);
}

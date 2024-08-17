export const computePastLeaderboardDataPath = ({ page, filters, sorts, round, ghostLegion, year }) => {
  const round2Path = ghostLegion == true ? "/ghost-legion" : "/final";
  const path = `${year}/round${round}${round == 1 ? "" : round2Path}`;
  return path;
};

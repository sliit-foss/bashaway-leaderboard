import ScoreBoard from "@/components/home/score-board";
import { useFetchPastLeaderboardsQuery } from "@/store/api";

const HallOfFame = () => {
  const useFetchData = (params) => useFetchPastLeaderboardsQuery({ ...params, year: 2025 });

  return (
    <ScoreBoard
      pageTitle={"Hall of Fame | Bashaway"}
      title={"Hall of Fame 2025"}
      subTitle={" A tribute to legendary warriors who once marched amongst us with unwavering valour"}
      useFetchData={useFetchData}
    />
  );
};

export default HallOfFame;

import ScoreBoard from "@/components/home/score-board";
import { useFetchPastLeaderboardsQuery } from "@/store/api";

const HallOfFame = () => {
  return (
    <ScoreBoard
      pageTitle={"Hall of Fame | Bashaway"}
      title={"Hall of Fame 2023"}
      subTitle={" A tribute to legendary warriors who once marched amongst us with unwavering valour"}
      useFetchData={useFetchPastLeaderboardsQuery}
    />
  );
};

export default HallOfFame;

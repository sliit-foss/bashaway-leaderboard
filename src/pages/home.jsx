import ScoreBoard from "@/components/home/score-board";
import { useFetchLeaderboardQuery } from "@/store/api";

const Home = () => {
  return (
    <ScoreBoard
      pageTitle={"Leaderboard | Bashaway"}
      title={"The Leaderboard"}
      subTitle={"A place where your true colors show off despite all the differences"}
      useFetchData={useFetchLeaderboardQuery}
    />
  );
};

export default Home;

import ScoreBoard from "@/components/home/score-board";
import { useFetchLeaderboardQuery } from "@/store/api";

const Home = () => {
  const useFetchData = (params) => useFetchLeaderboardQuery(params, { pollingInterval: 30000 });

  return (
    <ScoreBoard
      pageTitle={"Leaderboard | Bashaway"}
      title={"The Leaderboard"}
      subTitle={"A place where your true colors show off despite all the differences"}
      useFetchData={useFetchData}
    />
  );
};

export default Home;

import { useEffect, useState } from "react";

// TODO: add pagination
// TODO: add sorting
// TODO: add searcg
// TODO: explore the possibility of reusing The leaderboard API s response tranform function
const usePastData = ({ round, ghostLegion, year = 2023 }) => {
  const [pastData, setPastData] = useState({});

  useEffect(() => {
    const fetchPastLeaderboadData = async () => {
      let path = round == 1 ? "round1" : ghostLegion == true ? "ghost-legion" : "final";
      const data = (await import(`../../data/annual-leaderboard/${year}/${path}.json`)).default;
      //   console.log('Before mapping', data);
      const transformedData = data.data.map((item, index) => ({ ...item, place: index + 1 }));
      //   console.log('After mapping', data);
      setPastData(transformedData);
    };

    fetchPastLeaderboadData();
  }, [round, ghostLegion]);

  return pastData;
};

export default usePastData;

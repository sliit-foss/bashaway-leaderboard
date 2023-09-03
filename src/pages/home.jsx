/* eslint-disable no-unused-vars */
import { useState } from "react";
import { ScoreCardSkeleton } from "@/components";
import { ScoreCard } from "@/components/home";
import { filters as filterData, sorts as sortData } from "@/filters";
import { useTitle } from "@/hooks";
import { useFetchLeaderboardQuery } from "@/store/api";
import { AnimatedSwitcher, Filters, NoRecords, Pagination, Sorts } from "@sliit-foss/bashaway-ui/components";
import { Footnote, Title } from "@sliit-foss/bashaway-ui/typography";
import { computeFilterQuery, computeSortQuery } from "@sliit-foss/bashaway-ui/utils";

const Home = () => {
  useTitle("Leaderboard | Bashaway");
  const [_filters, setFilters] = useState(computeFilterQuery(filterData));
  const [_sorts, setSorts] = useState(computeSortQuery(sortData));

  const { data: scores, isFetching } = useFetchLeaderboardQuery();

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-6 mb-8 max-w-4xl">
        <div className="flex flex-col items-center gap-2 md:gap-1 mb-6 pointer-events-none">
          <Title className="tracking-normal">The Leaderboard</Title>
          <Footnote className="text-black/40 max-w-[500px] text-xl lg:text-center leading-6">
            A place where your true colors showed off despite all the differences
          </Footnote>
        </div>
        <div className="w-full flex justify-center items-center gap-6 mb-8">
          <Filters filters={filterData} setFilterQuery={setFilters} />
          <Sorts styles={{ root: "justify-end" }} sorts={sortData} setSortQuery={setSorts} />
        </div>
        <AnimatedSwitcher
          show={isFetching}
          className={`w-full flex flex-col gap-5`}
          component={<ScoreCardSkeleton />}
          alternateComponent={
            scores && scores.data.length ? (
              <>
                {scores.data.map((item, index) => (
                  <ScoreCard item={item} index={index} key={`score-card-${index}`} />
                ))}
              </>
            ) : (
              <div className="h-full flex flex-1 items-center">
                <NoRecords text="No leaders at the moment" />
              </div>
            )
          }
        />
        <div className="w-full flex justify-center items-center mt-6 mb-2">
          <Pagination
            currentPage={1}
            // onPageChange={(newPage) => setPage(newPage)}
            totalPages={1}
          />
        </div>
      </div>
    </>
  );
};

export default Home;

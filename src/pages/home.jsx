import { useEffect, useState } from "react";
import { ScoreCardSkeleton } from "@/components";
import { ScoreCard } from "@/components/home";
import { filters as filterData, sorts as sortData } from "@/filters";
import { useTitle } from "@/hooks";
import { useFetchLeaderboardQuery } from "@/store/api";
import { AnimatedSwitcher, Filters, NoRecords, Pagination, Sorts } from "@sliit-foss/bashaway-ui/components";
import { Footnote, Title } from "@sliit-foss/bashaway-ui/typography";
import { computeFilterQuery, computeSortQuery } from "@sliit-foss/bashaway-ui/utils";

const Home = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(computeFilterQuery(filterData));
  const [sorts, setSorts] = useState(computeSortQuery(sortData));

  const { data: scores, isFetching } = useFetchLeaderboardQuery({ page, filters, sorts });

  useTitle("Leaderboard | Bashaway");

  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [filters, sorts]);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-6 mb-8 max-w-4xl">
        <div className="flex flex-col items-center gap-2 md:gap-1 mb-6 pointer-events-none">
          <Title className="tracking-normal">The Leader</Title>
          <Footnote className="text-black/40 max-w-[500px] text-xl lg:text-center leading-6">
            A place where your true colors show off despite all the differences
          </Footnote>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
          <Filters filters={filterData} setFilterQuery={setFilters} styles={{ filter: "md:w-3/4" }} />
          <Sorts
            styles={{ root: "justify-end", sort: "justify-center md:justify-start" }}
            sorts={sortData}
            setSortQuery={setSorts}
          />
        </div>
        <AnimatedSwitcher
          show={isFetching}
          className={`w-full flex flex-col gap-5 min-h-[150px] xl:min-h-[250px] 2xl:min-h-[350px]`}
          component={<ScoreCardSkeleton />}
          alternateComponent={
            scores?.data?.docs?.length ? (
              <>
                {scores.data.docs.map((item, index) => (
                  <ScoreCard item={item} key={`score-card-${index}`} />
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
            currentPage={page}
            onPageChange={(newPage) => setPage(newPage)}
            totalPages={scores?.data?.totalPages}
          />
        </div>
      </div>
    </>
  );
};

export default Home;

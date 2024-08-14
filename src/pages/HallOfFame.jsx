import { useEffect, useState } from "react";
import Select from "react-select";
import { twMerge } from "tailwind-merge";
import { ScoreCardSkeleton } from "@/components";
import { ScoreCard } from "@/components/home";
import { filters as filterData, sorts as sortData } from "@/filters";
import { useTitle } from "@/hooks";
import {
  AnimatedSwitcher,
  Filters,
  NoRecords,
  Pagination,
  Sorts,
  TwinSwitch
} from "@sliit-foss/bashaway-ui/components";
import { useGhostLegion, useRound } from "@sliit-foss/bashaway-ui/hooks";
import { Ghost } from "@sliit-foss/bashaway-ui/icons";
import { Footnote, Title } from "@sliit-foss/bashaway-ui/typography";
import { computeFilterQuery, computeSortQuery } from "@sliit-foss/bashaway-ui/utils";

const yearOptions = [
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" }
];

const ITEMS_PER_PAGE = 10; // Define the number of items per page

const HallOfFame = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(computeFilterQuery(filterData));
  const [sorts, setSorts] = useState(computeSortQuery(sortData));
  const [year, setYear] = useState("2023"); // Initial year value
  const [scores, setScores] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  const { rounds, round, roundKey, onRoundChange } = useRound();
  const { ghostLegion, toggleGhostLegion } = useGhostLegion();

  const handleYearChange = (selectedOption) => {
    setYear(selectedOption.value);
  };

  const loadScores = async (year, roundKey) => {
    setIsFetching(true);
    setError(null); // Reset error state
    try {
      const data = await import(`@/utils/data/${year}/round.json`);
      console.log("Loaded data:", data.default);

      let formattedRoundKey = null;
      const normalizedRoundKey = roundKey.toLowerCase(); // Normalize roundKey to lowercase

      if (normalizedRoundKey === "round 01") {
        formattedRoundKey = "1";
      } else if (normalizedRoundKey === "final") {
        formattedRoundKey = "2";
      }

      if (formattedRoundKey && data.default[formattedRoundKey]) {
        setScores(data.default[formattedRoundKey]);
      } else {
        setScores([]);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setError("Failed to load data. Please try again later.");
      setScores([]);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    loadScores(year, roundKey);
    if (page !== 1) setPage(1);
  }, [filters, sorts, round, ghostLegion, year, roundKey]);

  useTitle("The Hall of Fame | Bashaway");

  // Calculate the scores to display based on the current page
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedScores = scores.slice(startIndex, endIndex);

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-6 mb-8 max-w-4xl">
        <div className="flex flex-col items-center gap-2 md:gap-1 mb-2">
          <Title className="tracking-normal pointer-events-none">The Hall of Fame</Title>
          <Footnote className="text-black/40 max-w-[500px] text-xl lg:text-center leading-6 pointer-events-none">
            A place where your true colors show off despite all the differences
          </Footnote>
          <div className="mb-4">
            <Select
              options={yearOptions}
              defaultValue={yearOptions.find((option) => option.value === year)}
              onChange={handleYearChange}
              className="w-40"
            />
          </div>
          <TwinSwitch values={rounds} className="mt-5" onChange={onRoundChange} selectedValue={roundKey} />
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <Filters filters={filterData} setFilterQuery={setFilters} styles={{ root: "w-auto", filter: "md:w-full" }} />
          <div className="flex flex-wrap justify-center items-center gap-y-3 gap-x-8" onClick={toggleGhostLegion}>
            <div
              className={twMerge(
                "group flex justify-center items-center gap-3.5 transform translate-y-[1.5px] cursor-pointer transition-all duration-medium",
                round === 2 ? "opacity-100 h-10 md:h-auto" : "opacity-0 h-0 md:h-auto"
              )}
            >
              <span className="text-md text-black/70 group-hover:text-black/90 font-semibold transition-all duration-medium">
                Ghost Legion
              </span>
              <Ghost
                className={twMerge(
                  "w-[1.4rem] h-[1.4rem] fill-current transition-all duration-medium",
                  ghostLegion ? "text-[#f00]" : "text-black/60 group-hover:text-[#f00]"
                )}
              />
            </div>
            <Sorts
              styles={{ root: "w-auto justify-end gap-8", sort: "justify-center md:justify-start w-full md:w-full" }}
              sorts={sortData}
              setSortQuery={setSorts}
            />
          </div>
        </div>
        <AnimatedSwitcher
          show={isFetching}
          className={`w-full flex flex-col gap-5 min-h-[150px] xl:min-h-[250px] 2xl:min-h-[350px]`}
          component={<ScoreCardSkeleton />}
          alternateComponent={
            error ? (
              <div className="h-full flex flex-1 items-center">
                <div className="text-red-500">{error}</div>
              </div>
            ) : displayedScores.length ? (
              <>
                {displayedScores.map((item, index) => (
                  <ScoreCard
                    item={{ ...item, index: startIndex + index + 1 }}
                    round={round}
                    key={`score-card-${index}`}
                  />
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
            totalPages={Math.ceil(scores.length / ITEMS_PER_PAGE)} // Calculate total pages
          />
        </div>
      </div>
    </>
  );
};

export default HallOfFame;

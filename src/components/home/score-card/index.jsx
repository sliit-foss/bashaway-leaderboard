import { GraduationCap } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Body, Body2, Footnote, Title } from "@sliit-foss/bashaway-ui/typography";

const topThreeGradient = (position) => {
  if (position === 1) return "bg-gradient-to-r from-[#FF107B]/[.12] to-[#F99A2A]/[.12] border-[#ff0000]/10";
  else if (position === 2) return "bg-gradient-to-r from-[#FF107B]/[.08] to-[#F99A2A]/[.08] border-[#ff0000]/10";
  else if (position === 3) return "bg-gradient-to-r from-[#FF107B]/[.04] to-[#F99A2A]/[.04] border-[#ff0000]/10";
  return "";
};

export { default as ScoreCardSkeleton } from "./skeleton";

export const ScoreCard = ({ item, ...props }) => {
  return (
    <div
      className={twMerge(
        `flex flex-wrap group gap-5 sm:gap-6 px-5 sm:px-6 py-5 rounded-2xl border border-black/10 cursor-default justify-between items-center ${topThreeGradient(
          item.place
        )}`,
        [1, 2, 3].includes(item.place) && "border-black/[0.075]"
      )}
      {...props}
    >
      <div className="flex gap-5 sm:gap-6 items-center">
        <div
          className={twMerge(
            `w-14 sm:w-16 h-14 sm:h-16 rounded-2xl outline outline-1 outline-black/[0.125] flex justify-center items-center filter group-hover:brightness-[1.25] transition-all duration-medium`,
            [1, 2, 3].includes(item.place) &&
              "bg-gradient-to-tr from-[#f90000] to-[#FF881A] text-white outline-transparent"
          )}
        >
          <Title className="font-medium">{item.place}</Title>
        </div>
        <div className="flex flex-col items-start gap-1 max-w-xl">
          <Body className="font-inter font-semibold break-all line-clamp-1 leading-[1.3] group-hover:tracking-[0.15px] transition-all duration-medium">
            {item.name}
          </Body>
          <div className="flex gap-[6px] items-center opacity-40 -translate-y-0.5">
            <GraduationCap strokeWidth={1.5} />
            <Footnote className="text-[14.25px] sm:text-[15px]">{item.university}</Footnote>
          </div>
        </div>
      </div>
      <div
        className={twMerge(
          "px-4 sm:px-5 py-1.5 sm:py-3 rounded-full border border-black/10 min-w-[116px] w-full sm:w-auto bg-white flex justify-center items-center",
          item.place === 1 && "border-white",
          item.place === 2 && "border-black/[0.04]",
          item.place === 3 && "border-black/[0.05]"
        )}
      >
        <Body2>{item.score}</Body2>
      </div>
    </div>
  );
};

export default ScoreCard;

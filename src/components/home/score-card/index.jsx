import { GraduationCap } from "lucide-react";
import { Body, Body2, Footnote, Title } from "@sliit-foss/bashaway-ui/typography";

const topThreeGradient = (position) => {
  if (position === 0) return "bg-gradient-to-r from-[#FF107B]/[.12] to-[#F99A2A]/[.12] border-[#ff0000]/10";
  else if (position === 1) return "bg-gradient-to-r from-[#FF107B]/[.08] to-[#F99A2A]/[.08] border-[#ff0000]/10";
  else if (position === 2) return "bg-gradient-to-r from-[#FF107B]/[.04] to-[#F99A2A]/[.04] border-[#ff0000]/10";
  return "";
};

export { default as ScoreCardSkeleton } from "./skeleton";

export const ScoreCard = ({ item, index, ...props }) => {
  return (
    <div
      className={`flex gap-6 px-6 py-5 rounded-2xl border border-black/10 justify-between items-center ${topThreeGradient(
        index
      )}`}
      {...props}
    >
      <div className="flex gap-6 items-center">
        <div
          className={`w-16 h-16 rounded-2xl border border-black/10 flex justify-center items-center ${
            index === 0 || index === 1 || index === 2 ? "bg-gradient-to-tr from-[#f90000] to-[#FF881A] text-white" : ""
          }`}
        >
          <Title className="font-medium">{index + 1}</Title>
        </div>
        <div className="flex flex-col gap-1">
          <Body className="font-inter font-semibold leading-none">{item.name}</Body>
          <div className="flex gap-[6px] items-center opacity-40">
            <GraduationCap strokeWidth={1.5} />
            <Footnote>{item.university}</Footnote>
          </div>
        </div>
      </div>
      <div className="px-5 py-3 rounded-full border border-black/10 min-w-[116px] bg-white flex justify-center items-center">
        <Body2>{item.score.toFixed(2)}</Body2>
      </div>
    </div>
  );
};

export default ScoreCard;

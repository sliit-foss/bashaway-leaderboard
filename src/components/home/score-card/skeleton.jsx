import { Skeleton } from "@sliit-foss/bashaway-ui/components";

const ScoreCardSkeleton = () => {
  return Array.from({ length: 4 }).map((_, i) => (
    <Skeleton key={i} className="px-6 py-5 rounded-2xl flex flex-wrap w-full justify-between items-center" single>
      <div className="flex gap-6 items-center">
        <Skeleton shade="dark" className="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl" />
        <div className="flex flex-col gap-1">
          <Skeleton shade="dark" className="h-[24px] w-28 mb-[5px]" />
          <Skeleton shade="dark" className="h-[18px] w-[72px] rounded-2xl" />
        </div>
      </div>
      <Skeleton
        shade="dark"
        containerClassName="min-w-[116px] w-full sm:w-auto"
        className="px-5 py-1.5 sm:py-3 rounded-full w-full h-12 sm:h-14 mt-4 sm:mt-0"
      />
    </Skeleton>
  ));
};

export default ScoreCardSkeleton;

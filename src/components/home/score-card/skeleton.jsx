import { Skeleton } from "@sliit-foss/bashaway-ui/components";

const ScoreCardSkeleton = () => {
  return Array.from({ length: 4 }).map((_, i) => (
    <Skeleton key={i} className="px-6 py-5 rounded-2xl flex w-full justify-between items-center">
      <div className="flex gap-6 items-center">
        <Skeleton shade="dark" className="w-[64px] h-[64px] rounded-2xl" />
        <div className="flex flex-col gap-1">
          <Skeleton shade="dark" className="h-[24px] w-24 mb-[5px]" />
          <Skeleton shade="dark" className="h-[18px] w-[72px] rounded-2xl" />
        </div>
      </div>
      <Skeleton shade="dark" className="px-5 py-3 rounded-full min-w-[116px] h-12" />
    </Skeleton>
  ));
};

export default ScoreCardSkeleton;

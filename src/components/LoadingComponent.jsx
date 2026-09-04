import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingComponent = () => {
  return (
    <div className="flex flex-col">
      <div className="h-5 w-full "></div>
      <div>
        <Skeleton className="w-full h-237.5 mt-5" />
      </div>
      <div className="w-full mt-13 px-30">
        <Skeleton className="w-full h-12.5" />
      </div>
      <div className="flex gap-8 px-30 mt-10">
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
      </div>
      <div className="flex gap-8 px-30 mt-10">
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
      </div>
      <div className="w-full mt-13 px-30">
        <Skeleton className="w-full h-12.5" />
      </div>
      <div className="flex gap-8 px-30 mt-10">
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
      </div>
      <div className="flex gap-8 px-30 mt-10">
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
        <Skeleton className="w-full h-150" />
      </div>
    </div>
  );
};

export default LoadingComponent;

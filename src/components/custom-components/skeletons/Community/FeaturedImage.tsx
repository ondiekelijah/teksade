import { Skeleton } from "@mantine/core";

function ImageSkeleton() {
  return (
    <div className="h-full w-full">
      <Skeleton width="100%" height="100%" className="rounded-lg" />
    </div>
  );
}

export default ImageSkeleton;

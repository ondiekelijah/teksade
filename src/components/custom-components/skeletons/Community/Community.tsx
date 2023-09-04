import { Skeleton } from "@mantine/core";
import ImageSkeleton from "./FeaturedImage";

function CommunitySkeleton() {
  return (
    <div className="py-10">
      {/* Top info: Community name, focus area, and location */}
      <div className="mb-6 flex flex-col space-y-5">
        <div className="flex items-center space-x-2 text-2xl font-semibold md:text-2xl">
          <Skeleton height={32} width="60%" radius="xl" />
          <Skeleton height={24} width={24} circle />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton height={16} width={16} circle />
          <Skeleton height={16} width="40%" radius="xl" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton height={16} width={16} circle />
          <Skeleton height={16} width="80%" radius="xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-x-20">
        {/* Image */}
        <ImageSkeleton />
        {/* Description */}
        <div className="order-2 space-y-10 lg:order-3">
          <div className="flex justify-between pt-5">
            <Skeleton height={40} width="150px" radius="xl" />
            <div className="flex items-center space-x-2">
              <Skeleton height={16} width="24px" radius="xl" />
              <Skeleton height={40} width="40px" radius="xl" />
            </div>
          </div>
          <Skeleton height={16} mt={6} width="90%" radius="xl" />
          <Skeleton height={16} mt={6} width="70%" radius="xl" />
          <Skeleton height={16} mt={6} width="80%" radius="xl" />
        </div>

        {/* Right side content */}
        <div className="order-3 space-y-5 lg:order-2">
          <div className="flex items-center space-x-4 lg:items-end">
            <Skeleton height={32} width="150px" radius="xl" />
            <Skeleton height={32} width="150px" radius="xl" />
          </div>
          <Skeleton height={50} mt={6} width="150px" radius="xl" />
          <Skeleton height={16} mt={6} width="80px" radius="xl" />
          <div className="mt-6 flex space-x-2">
            <Skeleton height={50} width={50} circle />
            <Skeleton height={50} width={50} circle />
            <Skeleton height={50} width={50} circle />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunitySkeleton;

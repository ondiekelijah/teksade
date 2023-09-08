import React from "react";
import { Skeleton } from "@mantine/core";

interface CommunityCardSkeletonProps {
  isEditing?: boolean;
  showTags?: boolean;
}

function CommunityCardSkeleton({ isEditing = false, showTags = false }: CommunityCardSkeletonProps) {
  return (
    <div className="rounded-lg border p-4 shadow">
      {/* Image */}
      <div className="mb-4 h-56 w-full">
        <Skeleton width="100%" height="100%" className="rounded-lg" />
      </div>

      {/* Location with icon */}
      <div className="mb-4 flex items-center space-x-2">
        <Skeleton height={16} width={16} circle />
        <Skeleton height={16} width="40%" radius="xl" />
      </div>

      {/* Title and Icon */}
      <div className="mb-4 flex items-center justify-between space-x-2 text-2xl font-semibold md:text-2xl">
        <Skeleton height={32} width="60%" radius="xl" />
        <Skeleton height={24} width={24} circle />
      </div>

      {/* Optional Action buttons */}
      {isEditing && (
        <div className="mt-4 flex justify-between">
          <Skeleton width="35%" height="32px" radius="xl" />
          <Skeleton width="35%" height="32px" radius="xl" />
        </div>
      )}

      {/* Tags */}
      {showTags && (
        <div className="flex flex-wrap items-center space-x-1 space-y-1">
          <Skeleton width="20%" height="22px" radius="xl" />
          <Skeleton width="20%" height="22px" radius="xl" />
          <Skeleton width="20%" height="22px" radius="xl" />
          <Skeleton width="20%" height="22px" radius="xl" />
          <Skeleton width="20%" height="22px" radius="xl" />
        </div>
      )}
    </div>
  );
}

export default CommunityCardSkeleton;

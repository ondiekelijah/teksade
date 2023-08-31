import { Skeleton } from '@mantine/core';

function CommunitySkeleton() {
  return (
    <div className="order-2 space-y-5 lg:order-1">
      {/* Header with title and tooltip */}
      <div className="mt-4 flex flex-col gap-4">
        <Skeleton height={32} radius="xl" />
        <Skeleton height={16} width="60%" radius="xl" />
      </div>

      {/* Members and Location Information */}
      <div className="flex items-center space-x-4 text-sm font-medium">
        <Skeleton height={16} width="80px" radius="xl" className="flex items-center" />
        <Skeleton height={16} width="120px" radius="xl" className="flex items-center" />
        <Skeleton height={16} width="50px" radius="xl" className="flex items-center" />
      </div>

      {/* Join Community or Profile Button */}
      <Skeleton height={40} width="150px" mt={6} radius="xl" />

      {/* Description */}
      <Skeleton height={16} mt={6} width="90%" radius="xl" />
      <Skeleton height={16} mt={6} width="70%" radius="xl" />
      <Skeleton height={16} mt={6} width="80%" radius="xl" />

      {/* SocialLinks and Technologies */}
      <Skeleton height={32} mt={6} width="150px" radius="xl" />
      <Skeleton height={32} mt={6} width="150px" radius="xl" />

      {/* MemberCard for creator */}
      <Skeleton height={50} mt={6} width="150px" radius="xl" />

      {/* Members */}
      <Skeleton height={16} mt={6} width="80px" radius="xl" />
      <div className="flex mt={6}">
        <Skeleton height={50} width={50} circle className="mr-2" />
        <Skeleton height={50} width={50} circle className="mr-2" />
        <Skeleton height={50} width={50} circle className="mr-2" />
      </div>
    </div>
  );
}

export default CommunitySkeleton;

import { UploadCloud } from "@/profile/components/ui/UploadCloud";
import { ComponentProps } from "react";

type MediaSkeletonProps = ComponentProps<"div"> & {
  message: string;
};

export const MediaSkeleton = ({ message, ...props }: MediaSkeletonProps) => {
  return (
    <div {...props}>
      <UploadCloud />
      <p>{message}</p>
    </div>
  );
};

import BannerUploader from "@/profile/components/BannerUploader";

interface ImageUploadProps {
  onImageUpload: (file: File | null, imageUrl: string | null) => void;
}

const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {
  return (
    <div className="h-full w-fit">
      <BannerUploader
        onImageUpload={onImageUpload}
        className="flex w-full flex-col items-center gap-7"
      />
    </div>
  );
};

export default ImageUpload;

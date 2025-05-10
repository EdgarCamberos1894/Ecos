import BannerUploader from "../../../BannerUploader";

interface ImageUploadProps {
  onImageUpload: (file: File | null, imageUrl: string | null) => void;
}

const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {
  return (
    <div className="h-full w-fit">
      <BannerUploader onImageUpload={onImageUpload} />
    </div>
  );
};

export default ImageUpload;

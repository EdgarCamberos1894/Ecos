import { type SearchResult } from "../types/search-normalize-data";
import defaultImage from "@/assets/image.webp";

interface SearchCardProps {
  result: SearchResult;
  onSelect?: (result: SearchResult) => void;
}

const SearchCard = ({ result, onSelect }: SearchCardProps) => {
  return (
    <div
      tabIndex={0}
      onMouseDown={() => onSelect?.(result)}
      className="hover:bg-ecos-base-2 flex cursor-pointer items-center gap-3 bg-white p-3"
    >
      <img
        src={result.photoUrl ?? defaultImage}
        alt={result.stageName ?? ""}
        className="size-15 rounded-full object-cover"
      />

      <div className="text-ecos-blue">
        <h4 className="m-0 font-bold">{result.stageName}</h4>
        <p className="m-0 text-sm">{result.genre}</p>

        {result.type === "musician" && (
          <p className="text-ecos-input-placeholder line-clamp-2 text-xs">{result.description}</p>
        )}

        {result.type === "song" && (
          <p className="text-ecos-input-placeholder text-xs">🎵 {result.title}</p>
        )}
      </div>
    </div>
  );
};

export default SearchCard;

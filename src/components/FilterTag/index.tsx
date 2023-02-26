interface TagProps {
  cityName: string;
  removeTag: (cityName: string) => void;
}

const FilterTag = ({ cityName, removeTag }: TagProps) => {
  return (
    <div className="flex items-center justify-between gap-x-2
    rounded-full bg-indigo-600 py-2 px-3
    text-xs text-white">
      {cityName}
      <button aria-label="close banner" onClick={() => removeTag(cityName)}>
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default FilterTag;

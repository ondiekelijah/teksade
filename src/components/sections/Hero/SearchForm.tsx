import { Button } from "@/components/Button";
import { useEffect, useState } from "react";

const items = ["GDG Nairobi", "Lux Tech Academy", "Flutter Nairobi"];

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    let index = 0;
    let interval = setInterval(() => {
      if (!isDirty) {
        let value = items[index >= items.length ? (index = 0) : index];
        setQuery(value);
      }
      index++;
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [isDirty]);

  return (
    <form
      className="group"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div
        id="form-control"
        className="flex items-center overflow-hidden rounded-full bg-white shadow-md group-focus-within:ring-2 group-focus-within:ring-indigo-400 group-focus-within:ring-offset-2 group-focus-within:ring-offset-transparent"
      >
        <span className="pointer-events-none block px-2 text-slate-400 group-focus-within:text-indigo-800">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          className="w-full appearance-none border-transparent p-2 text-xl leading-6 text-slate-900 placeholder-slate-400 focus:border-transparent focus:ring-0"
          type="text"
          aria-label="Search input"
          placeholder="Search for a community"
          onClick={() => {
            if (!isDirty) {
              setIsDirty(true);
              setQuery("");
            }
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="hidden h-11 shrink-0 bg-indigo-600 px-2 font-semibold text-white transition-colors duration-500 ease-in-out hover:bg-indigo-700 sm:block"
        >
          Discover Now
        </button>
      </div>
      <Button size="lg" type="submit" className="mt-8 sm:hidden">
        Discover Now
      </Button>
    </form>
  );
};

export default SearchForm;
import { useState, useEffect } from "react";
// import "boxicons";
import Events from "../mock-data/Events.json";
import { CommunityCards } from "@/components/sections/CommunityCards";

// Create the required typescript type defs

const Communities = () => {
  const [events, setEvents] = useState([]);
  const [searchBarVal, setSearchBarVal] = useState("");
  const [order, setOrder] = useState("asc");
  const [toggleState, setToggleState] = useState(false);
  const [dropCityVal, setDropCityVal] = useState("");
  const [dropPriceVal, setDropPriceVal] = useState("");

  // find all cities for the select menu
  const cities = [...new Set(Events.map((event) => event.city))];

  const tags = [
    "Android",
    "Angular",
    "Artificial Intelligence",
    "Blockchain",
    "C#",
    "C++",
    "CSS",
    "Data Science",
    "DevOps",
    "Django",
    "Elixir",
    "Flutter",
    "Go",
    "GraphQL",
    "HTML",
    "iOS",
    "Java",
    "JavaScript",
    "Kotlin",
    "Laravel",
    "Machine Learning",
    "Node.js",
    "PHP",
    "Python",
    "React",
    "React Native",
    "Ruby",
    "Rust",
    "Salesforce",
    "Scala",
    "Swift",
    "TypeScript",
    "Vue.js",
    "Web Development",
    "WordPress",
  ];

  // UseEffect to fetch the events from the json file
  useEffect(() => {
    setEvents(Events as never[]);
    }, []);

  // Function to handle the custom filters
  const handleFilters = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Filter to filter with city name and price range, if searchBarVal is empty, use dropCityVal and dropPriceVal
    // let filteredEvents = Events.filter((event) => {
    //   const [min, max] = dropPriceVal.split("-");

    //   const minPrice = parseInt(min, 10);
    //   const maxPrice = parseInt(max, 10);

    //   if (searchBarVal === "" && dropPriceVal !== "") {
    //     return (
    //       event.city.toLowerCase().includes(dropCityVal.toLowerCase()) &&
    //       parseInt(event.minPrice, 10) >= minPrice &&
    //       parseInt(event.minPrice, 10) <= maxPrice
    //     );
    //   }

    //   if (searchBarVal !== "" && dropPriceVal !== "") {
    //     return (
    //       event.city.toLowerCase().includes(searchBarVal.toLowerCase()) &&
    //       parseInt(event.minPrice, 10) >= minPrice &&
    //       parseInt(event.minPrice, 10) <= maxPrice
    //     );
    //   }
    //   // if dropCityVal is not empty
    //   if (dropCityVal !== "") {
    //     return event.city.toLowerCase().includes(dropCityVal.toLowerCase());
    //   }
    //   // if searchBarVal is not empty
    //   if (searchBarVal !== "") {
    //     return event.city.toLowerCase().includes(searchBarVal.toLowerCase());
    //   }
    //   // if all filters are empty, return all events
    //   if (searchBarVal === "" && dropCityVal === "" && dropPriceVal === "") {
    //     return event;
    //   }
    //   // If searchBarVal is not empty, use searchBarVal and dropPriceVal
    //   return (
    //     event.city.toLowerCase().includes(searchBarVal.toLowerCase()) &&
    //     parseInt(event.minPrice, 10) >= minPrice &&
    //     parseInt(event.minPrice, 10) <= maxPrice
    //   );
    // });

    //   setEvents(filteredEvents as never[]);

    // setEvents(filteredEvents as never[]);

  };

  // Handle search via toggle
  const handleToggle = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    // if (toggleState === false) {
    //   // show all events with the lowest price out of all the events
    //   const filteredEvents = Events.filter((event) => {
    //     return (
    //       event.minPrice === Math.min(...Events.map((event) => event.minPrice))
    //     );
    //   });
    //     setEvents(filteredEvents as never[]);

    //   setToggleState(true);
    // } else {
    //   // show all events
    //   setEvents(Events);
    //   setToggleState(false);
    // }
  };

  // Reset all filters and show all events
  const handleReset = () => {
    // setEvents(Events);
    // setSearchBarVal("");
    // setDropCityVal("");
    // setDropPriceVal("");
    // // get toggle by classname and uncheck it
    // const toggle = document.querySelector(".toggle");
    // toggle.checked = false;
    // setToggleState(false);
  };

  // Sorting
  const handleCityOrder = () => {
    // if (order === "asc") {
    //   const sortedEvents = [...events].sort((a, b) =>
    //     a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
    //   );
    //   setEvents(sortedEvents);
    //   setOrder("desc");
    // }

    // if (order === "desc") {
    //   const sortedEvents = [...events].sort((a, b) =>
    //     a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
    //   );
    //   setEvents(sortedEvents);
    //   setOrder("asc");
    // }
  };

  const handlePriceOrder = () => {
    // if (order === "asc") {
    //   const sortedEvents = [...events].sort((a, b) => a[col] - b[col]);
    //   setEvents(sortedEvents);
    //   setOrder("desc");
    // }

    // if (order === "desc") {
    //   const sortedEvents = [...events].sort((a, b) => b[col] - a[col]);
    //   setEvents(sortedEvents);
    //   setOrder("asc");
    // }
  };

  return (
    <div className="overflow-x-auto relative py-6 px-4 sm:p-6 md:py-10 md:px-8">
      <form
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-4
      md:space-x-4 md:mr-4 mr-0 font-base"
      >
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            id="voice-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-[9px]  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search community by name, tech, or location"
            value={searchBarVal}
            onChange={(e) => setSearchBarVal(e.target.value)}
          />
        </div>
        <select
          id="countries"
          // value={dropCityVal}
          // onChange={(e) => setDropCityVal(e.target.value)}
          // onClick={handleFilters}
          className="bg-gray-50 border border-gray-300 
          text-gray-900 text-sm rounded-lg focus:ring-blue-500
           focus:border-blue-500 block 
           md:w-[20%] w-[full] p-2 dark:bg-gray-700 
           dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
           dark:focus:ring-blue-500 dark:focus:border-blue-500
            md:mt-0 mt-2"
        >
          {/* <option defaultValue>City</option> */}
          <option>Country</option>

          {cities.map((city, index) => (
            <option value={city} key={index}>{city}</option>
          ))}
        </select>

        <select
          id="prices"
          value={dropPriceVal}
          onChange={(e) => setDropPriceVal(e.target.value)}
          // onClick={handleFilters}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
          focus:border-blue-500 block 
          md:w-[20%] w-[full] p-2 dark:bg-gray-700 
          dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
          dark:focus:ring-blue-500 dark:focus:border-blue-500
           md:mt-0 mt-2"
        >
          <option>Topic</option>
          {/* <option defaultValue>Price</option> */}

          {tags.map((tag, index) => (
            <option value={tag} key={index}>{tag}</option>
          ))}
        </select>

        <label
          htmlFor="default-toggle"
          className="inline-flex relative content-center cursor-pointer 
          md:w-[25%] w-[full] md:mt-0 mt-2"
        >
          <input
            type="checkbox"
            id="default-toggle"
            className="sr-only peer toggle"
            // onClick={handleToggle}
          />
          <div
            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
           peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer 
           dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white
            after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
            after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
            after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          />
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            All
          </span>
          {/* <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Min price
          </span> */}
        </label>

        <button
          type="button"
          // onClick={handleReset}
          className="py-2 text-sm font-medium
          text-white bg-blue-700 rounded-full border
           border-blue-700 hover:bg-blue-800 focus:ring-4 
           focus:outline-none focus:ring-blue-300 dark:bg-blue-600 
           dark:hover:bg-blue-700 dark:focus:ring-blue-800
           md:w-[15%] w-[full] md:mt-0 mt-2
           "
        >
          Clear
        </button>
      </form>

      {/* <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-sm sm:rounded-lg">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-2 py-3">#</th>
            <th scope="col" className="py-3 px-6">
              Id
            </th>
            <th scope="col" className="py-3 px-6">
              Name
            </th>
            <th scope="col" className="py-3 px-6">
              <div className="flex items-center">
                <span className="mr-2">City</span>
                <span
                  className="mr-2 cursor-pointer"
                  onClick={() => handleCityOrder("city")}
                >
                  <box-icon name="sort-alt-2"></box-icon>
                </span>
              </div>
            </th>
            <th scope="col" className="py-3 px-6">
              <div className="flex items-center">
                <span className="mr-2">Min Price</span>
                <span
                  className="mr-2 cursor-pointer"
                  onClick={() => handlePriceOrder("minPrice")}
                >
                  <box-icon name="sort-alt-2"></box-icon>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events
              .filter((event) => {
                return searchBarVal.toLowerCase() === ""
                  ? event
                  : event.city
                      .toLowerCase()
                      .includes(searchBarVal.toLowerCase());
              })
              .map((event) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={event.id}
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {events.indexOf(event) + 1}
                  </th>
                  <td className="py-3 px-6">{event.id}</td>
                  <th className="py-3 px-6">{event.name}</th>
                  <td className="py-3 px-6">{event.city}</td>
                  <td className="py-3 px-6">{event.minPrice}</td>
                </tr>
              ))
          ) : (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="py-3 px-6">No events found</td>
            </tr>
          )}
        </tbody>
      </table> */}
          <CommunityCards />

    </div>


  );
}

export default Communities;
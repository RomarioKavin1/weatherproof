import React, { useState } from "react";
import axios from "axios";

interface Suggestion {
  display_name: string;
  lat: string;
  lon: string;
}

interface SearchLocProps {
  onLocationSelect: (location: { lat: string; lon: string }) => void;
}

function SearchLoc({ onLocationSelect }: SearchLocProps) {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await axios.get(
        `https://geocode.maps.co/search?q=${query}&api_key=665492c3e9ab5577925637qsj05b493`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);

    if (input.length > 4) {
      fetchSuggestions(input);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setQuery(suggestion.display_name);
    onLocationSelect({ lat: suggestion.lat, lon: suggestion.lon });
    setSuggestions([]);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex flex-col">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Search..."
        />
        {suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 top-full bg-white border border-gray-300 mt-1 rounded shadow-lg z-30">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="cursor-pointer p-2 hover:bg-gray-200"
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchLoc;

import React from "react";

const Searchbar = ({ onChange, value }) => {
  return (
    <div className="flex justify-center w-1/2 sm:col-span-2">
      <div className="mt-1 sm:border-gray-200 relative w-full rounded-md shadow-sm">
        <input
          id="search"
          value={value}
          placeholder="Pesquisar..."
          onChange={onChange}
          className="inputText"
        />
      </div>
    </div>
  );
};

export default Searchbar;
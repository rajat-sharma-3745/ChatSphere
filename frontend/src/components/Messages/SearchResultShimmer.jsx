import React from "react";

const SearchResultShimmer = () => {
  const Item = () => (
    <div className="p-3 rounded-lg animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  );

  return (
    <div className="flex flex-col gap-3">
      <Item />
      <Item />
      <Item />
      <Item />
    </div>
  );
};

export default SearchResultShimmer;

"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const getColors = async (pageParam: number) => {
  return axios
    .get(`http://localhost:3004/colors?_limit=2&_page=${pageParam}`)
    .then(res => res.data);
};

type Color = {
  id: number;
  label: string;
};

const RQInfiniteQueries = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const {
    isLoading,
    isFetching,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Color[], Error>(
    ["colors", pageNumber],
    ({ pageParam = 1 }) => getColors(pageParam),
    {
      getNextPageParam: (_lastPage, allPages) => {
        if (allPages.length < 4) {
          return allPages.length + 1;
        }
        return false;
      },
    }
  );

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <p>RQInfiniteQueries</p>
      <div className="pl-6">
        {data.pages.map((group, i) => (
          <div key={i}>
            {group.map(color => (
              <div key={color.id}>
                {color.id}. {color.label}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* buttons  */}
      <div className="flex gap-4 pt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
        >
          Load more
        </button>
      </div>
      {isFetching && isFetchingNextPage ? <p>Loading...</p> : null}
    </div>
  );
};

export default RQInfiniteQueries;

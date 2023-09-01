"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const getColors = async (pageNumber: number) => {
  return axios
    .get(`http://localhost:3004/colors?_limit=2&_page=${pageNumber}`)
    .then(res => res.data);
};

type Color = {
  id: number;
  label: string;
};

const RQPaginatedQueries = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading,isFetching, isError, error, data } = useQuery<Color[], Error>(
    ["colors", pageNumber],
    () => getColors(pageNumber), {
      keepPreviousData: true
    }
  );

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <p>RQPaginatedQueries</p>
      <div className="pl-6">
        {data.map(color => (
          <div key={color.id}>
            {color.id}. {color.label}
          </div>
        ))}
      </div>
      {/* buttons  */}
      <div className="flex gap-4 pt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageNumber === 4}
        >
          Next
        </button>
      </div>
      {isFetching ? <p>Loading...</p> : null}
    </div>
  );
};

export default RQPaginatedQueries;

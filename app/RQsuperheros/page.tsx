"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const RQSuperheros = () => {
  const getSuperHeros = async () =>
    axios
      .get("http://localhost:3004/superheros")
      .then(res => res.data as [{ id: string; name: string }]);

  type Heros = [{ id: string; name: string }];

  const { data,refetch, isLoading, isInitialLoading, isError, error } = useQuery<Heros, Error>(
    ["super-heros"],
    getSuperHeros, {
      // cacheTime: 5000, // 5 seconds caches the data
      // staleTime: 10000, // 10 seconds waits 10 seconds before refetching
      // refetchOnMount: true, // refetch when the component mounts
      // refetchOnWindowFocus: true, // refetch when the window is in focus
      // refetchInterval: 2000, // refetch every 2 seconds on window focus
      // refetchIntervalInBackground: true, // refetch in the background every 2 seconds
      enabled: false, // if false, the query will not execute
    }
  );

  if (isInitialLoading ) return <p>Loading...</p>;

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <div>RQSuperheros</div>
      <button onClick={() => refetch()}>Get superheros</button>
      <ul className="pl-8 pt-3 list-disc">
        {data?.map(item => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </>
  );
};

export default RQSuperheros;

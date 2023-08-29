"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const RQSuperheros = () => {
  const onSuccess = (data: any) => {
    console.log("Performing onSuccess handler, data", data);
  };

  const onError = (data: any) => {
    console.log("Performing onError handler, data", data);
  };

  const getSuperHeros = async () =>
    axios
      .get("http://localhost:3004/superheros")
      .then(res => res.data as [{ id: string; name: string }]);

  type Heros = [{ id: string; name: string }];

  type HerosNames = string[];

  const { data, refetch, isInitialLoading, isError, error } = useQuery<
    any,
    Error
  >(["super-heros"], getSuperHeros, {
    // cacheTime: 5000, // 5 seconds caches the data
    // staleTime: 10000, // 10 seconds waits 10 seconds before refetching
    // refetchOnMount: true, // refetch when the component mounts
    // refetchOnWindowFocus: true, // refetch when the window is in focus
    // refetchInterval: 2000, // refetch every 2 seconds on window focus
    // refetchIntervalInBackground: true, // refetch in the background every 2 seconds
    // enabled: false, // if false, the query will not execute
    // onSuccess, // call back function after success of the query
    // onError, // call back function after error of the query
    select: (data: Heros) => data.map(item => item.name), // select the data you want to return
  });

  if (isInitialLoading) return <p>Loading...</p>;

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <div>RQSuperheros</div>
      <button onClick={() => refetch()}>Get superheros</button>
      <ul className="pl-8 pt-3 list-disc">
        {data?.map((item: string) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default RQSuperheros;

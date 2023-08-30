"use client";

import { useSuperHerosData } from "@/hooks/useSuperHerosData";

const RQSuperheros = () => {
  const onSuccess = (data: any) => {
    console.log("Performing onSuccess handler, data", data);
  };

  const onError = (data: any) => {
    console.log("Performing onError handler, data", data);
  };

  const { data, refetch, isInitialLoading, isError, error } = useSuperHerosData(
    onSuccess,
    onError
  );

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

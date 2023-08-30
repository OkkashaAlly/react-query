"use client";

import { useSuperHerosData } from "@/hooks/useSuperHerosData";
import Link from "next/link";

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
        {data?.map((item) => (
          <li key={item.id}>
            <Link href={`/RQsuperheros/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RQSuperheros;

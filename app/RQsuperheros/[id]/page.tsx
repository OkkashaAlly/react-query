"use client"

import { useSuperHeroData } from "../../../hooks/useSuperHeroData";

const SuperHeroDetailsPage = ({ params }: { params: { id: number } }) => {
  const { data, refetch, isInitialLoading, isError, error } = useSuperHeroData(
    params.id
  );

  if (isInitialLoading) return <p>Loading...</p>;

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p>SuperHeroDetailsPage</p>
      {data && (
        <p>
          {data.name} - {data.superpower}
        </p>
      )}
    </div>
  );
};

export default SuperHeroDetailsPage;

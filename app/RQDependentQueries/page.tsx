"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getUserByEmail = async (email: string) => {
  return axios
    .get(`http://localhost:3004/users/${email}`)
    .then(res => res.data);
};

const getChannelById = async (id: string) => {
  return axios
    .get(`http://localhost:3004/channels/${id}`)
    .then(res => res.data);
};

const RQDependentQueries = () => {
  const userEmail = "okkasha@gmail.com";
  const { data: user } = useQuery(["user", userEmail], () =>
    getUserByEmail(userEmail)
  );

  const channelId = user?.channelId;

  const { data: channel } = useQuery(
    ["channel", channelId],
    () => getChannelById(channelId),
    {
      enabled: !!channelId,
    }
  );

  return <div>RQDependentQueries</div>;
};

export default RQDependentQueries;

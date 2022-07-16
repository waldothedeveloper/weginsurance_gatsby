import useSWR from "swr";

export const useGetAndDeleteConversations = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(`/api/read_multiple_conversations`, fetcher);

  return { data, error };
};

import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "@sliit-foss/bashaway-ui";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASHAWAY_BE_URL
});

const baseQueryWithToast = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    toast({
      variant: "destructive",
      title: result.error.data.message
    });
  }
  return result;
};

export default baseQueryWithToast;

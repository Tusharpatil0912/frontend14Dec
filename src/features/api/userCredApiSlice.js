import { USER_CREDS } from "../../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCred: builder.query({
      query: (credId) => ({
        url: `${USER_CREDS}/resources/${credId}`,
      }),
      providesTags: (result, error, credId) => [{ type: "Cred", id: credId }],
    }),

    getAllCreds: builder.query({
      query: (category) => ({
        url: `${USER_CREDS}/${category}/resources`,
      }),

      providesTags: [{ type: "Creds", id: "LIST" }],
    }),

    createCred: builder.mutation({
      query: (creds) => ({
        url: `${USER_CREDS}`,
        method: "POST",
        body: creds,
      }),
      invalidatesTags: [{ type: "Creds", id: "LIST" }],
    }),

    updateCred: builder.mutation({
      query: ({ creds, credId }) => ({
        url: `${USER_CREDS}/${credId}`,
        method: "PUT",
        body: creds,
      }),

      invalidatesTags: (result, error, { credId }) => [
        { type: "Cred", id: credId },
      ],
    }),
    deleteCred: builder.mutation({
      query: (credId) => ({
        url: `${USER_CREDS}/${credId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Creds", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllCredsQuery,
  useGetCredQuery,
  useCreateCredMutation,
  useUpdateCredMutation,
  useDeleteCredMutation,
} = usersApiSlice;

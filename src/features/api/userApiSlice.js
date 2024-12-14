import { USERS_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (creds) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: creds,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          setTimeout(() => {
            dispatch(
              usersApiSlice.util.invalidateTags([{ type: "User", id: "ME" }])
            );
          }, 700); // 0.7 second delay
        } catch (error) {
          console.error("Error validating 'me' after login:", error);
        }
      },
    }),
    register: builder.mutation({
      query: (creds) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: creds,
      }),
    }),
    verify: builder.mutation({
      query: (creds) => ({
        url: `${USERS_URL}/verify`,
        method: "POST",
        body: creds,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          setTimeout(() => {
            dispatch(
              usersApiSlice.util.invalidateTags([{ type: "User", id: "ME" }])
            );
          }, 700); // 0.7 second delay
        } catch (error) {
          console.error("Error validating 'me' after verification:", error);
        }
      },
    }),
    code: builder.mutation({
      query: (creds) => ({
        url: `${USERS_URL}/verify/send`,
        method: "POST",
        body: creds,
      }),
    }),
    forgotPass: builder.mutation({
      query: (creds) => ({
        url: `${USERS_URL}/forgot-password`,
        method: "POST",
        body: creds,
      }),
    }),
    forgotResetPass: builder.mutation({
      query: (creds) => ({
        url: `${USERS_URL}/forgot-reset-password`,
        method: "POST",
        body: creds,
      }),
    }),
    verifyCode: builder.mutation({
      query: (creds) => ({
        url: `${USERS_URL}/verify/code`,
        method: "POST",
        body: creds,
      }),
    }),
    me: builder.query({
      query: () => ({
        url: `${USERS_URL}/me`,
      }),
      providesTags: [{ type: "User", id: "ME" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useCodeMutation,
  useForgotPassMutation,
  useForgotResetPassMutation,
  useVerifyCodeMutation,
  useMeQuery,
} = usersApiSlice;
usersApiSlice;

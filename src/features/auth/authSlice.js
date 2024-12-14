import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loginIdEmail: null,
  loginIdUsername: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
    },
    setloginId: (state, action) => {
      state.loginIdEmail = action.payload.email;
      state.loginIdUsername = action.payload.username;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loginIdEmail = null;
      state.loginIdUsername = null;
    },
  },
});

export const { setCredentials, setloginId, logout } = authSlice.actions;

export default authSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   verificationEmail: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       const { user, token } = action.payload;
//       state.user = {
//         ...user,
//         accountId:
//           user.accountId ||
//           `SS${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
//         avatar:
//           user.avatar ||
//           "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100",
//       };
//       state.token = token;
//       state.isAuthenticated = true;
//     },
//     setVerificationEmail: (state, action) => {
//       state.verificationEmail = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.verificationEmail = null;

//       // Clear cookies
//       document.cookie.split(";").forEach((cookie) => {
//         const eqPos = cookie.indexOf("=");
//         const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
//         document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
//       });
//     },
//   },
// });

// export const { setCredentials, setVerificationEmail, logout } =
//   authSlice.actions;

// export default authSlice.reducer;

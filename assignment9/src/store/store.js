import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, type: null, isLoggedIn: false },
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.type = action.payload.type;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.type = null;
      state.isLoggedIn = false;
    },
  },
});

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: { jobs: [], loading: false },
  reducers: {
    setJobs(state, action) {
      state.jobs = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export const { setJobs, setLoading } = jobsSlice.actions;

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    jobs: jobsSlice.reducer,
  },
});

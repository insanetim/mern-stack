import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload
      state.token = accessToken
    },
    logOut: state => {
      state.token = null
    },
  },
  selectors: {
    selectCurrentToken: state => state.token,
  },
})

export const { setCredentials, logOut } = authSlice.actions

export const { selectCurrentToken } = authSlice.selectors

export default authSlice.reducer

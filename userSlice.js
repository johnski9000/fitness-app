import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    // You can initialize the user state here
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      // This reducer sets the user data in the state
      state.user = action.payload;
    },
    clearUser: (state) => {
      // This reducer clears the user data from the state
      state.user = null;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer

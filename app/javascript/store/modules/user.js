import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: undefined
  },
  reducers: {
    sign_in: (state, user) => {
      state.value = user.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { sign_in } = userSlice.actions

export default userSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: undefined
  },
  reducers: {
    sign_in: (state, user) => {
      state.value = user.payload;
    },
    sign_out: (state) => {
      state.value = undefined;
    }
  },
})

// Action creators are generated for each case reducer function
export const { sign_in, sign_out } = userSlice.actions

export default userSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    background: ''
  },
  reducers: {
    background: (state, background) => {
      state.background = background.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { background } = chatSlice.actions

export default chatSlice.reducer
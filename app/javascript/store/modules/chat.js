import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    background: '',
    notification: undefined
  },
  reducers: {
    background: (state, background) => {
      state.background = background.payload
    },
    notification: (state, notification) => {
      state.notification = notification.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { background, notification } = chatSlice.actions

export default chatSlice.reducer
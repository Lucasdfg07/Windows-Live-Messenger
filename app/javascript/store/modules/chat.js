import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    background: '',
    notification: undefined,
    emoji: undefined
  },
  reducers: {
    background: (state, background) => {
      state.background = background.payload
    },
    notification: (state, notification) => {
      state.notification = notification.payload
    },
    emoji: (state, emoji) => {
      state.emoji = emoji.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { background, notification, emoji, videos_array } = chatSlice.actions

export default chatSlice.reducer
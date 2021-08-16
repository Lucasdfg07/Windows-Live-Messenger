import { createSlice } from '@reduxjs/toolkit'

export const componentSlice = createSlice({
  name: 'component',
  initialState: {
    sign_in: false,
    sign_up: false,
    list_user: false,
    chat: { value: false, partner: {} }
  },
  reducers: {
    sign_in_screen_state: (state) => {
        state.sign_in = true
        state.sign_up = false
    },
    sign_up_screen_state: (state) => {
        state.sign_up = true
        state.sign_in = false
    },
    list_user_screen_state: (state) => {
      state.list_user = true
      state.chat = { value: false, partner: {} }
    },
    chat_screen_state: (state, user) => {
      state.list_user = false
      state.chat = { value: true, partner: user.payload }
    },
    close_components_state: (state) => {
      state.sign_in = false
      state.sign_up = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  sign_in_screen_state, 
  sign_up_screen_state, 
  close_components_state,
  list_user_screen_state,
  chat_screen_state } = componentSlice.actions

export default componentSlice.reducer
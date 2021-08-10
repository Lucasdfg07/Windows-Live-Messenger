import { createSlice } from '@reduxjs/toolkit'

export const msnClickSlice = createSlice({
  name: 'screen',
  initialState: {
    value: false,
    minimized: false,
    maximized: false
  },
  reducers: {
    open: (state) => {
      state.value = true
    },
    close: (state) => {
      state.value = false
    },
    minimize: (state) => {
      state.minimized = true
    },
    open_minimized: (state) => {
      state.minimized = false
    },
    maximize: (state) => {
      state.maximized = true
    },
    close_maximize: (state) => {
      state.maximized = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { open, close, minimize, open_minimized, maximize, close_maximize } = msnClickSlice.actions

export default msnClickSlice.reducer
import {configureStore} from '@reduxjs/toolkit';

import msnScreenReducer from './modules/msn_screen';

export default configureStore({
    reducer: {
        msnScreen: msnScreenReducer,
    },
})
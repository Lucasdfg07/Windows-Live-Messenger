import {configureStore} from '@reduxjs/toolkit';

import msnScreenReducer from './modules/msn_screen';
import userReducer from './modules/user';
import componentReducer from './modules/components';

export default configureStore({
    reducer: {
        msnScreen: msnScreenReducer,
        user: userReducer,
        component: componentReducer
    },
})
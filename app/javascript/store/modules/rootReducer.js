import { combineReducers } from 'redux';

import msnScreenReducer from './msn_screen';
import userReducer from './user';
import componentReducer from './components';

export default combineReducers({
    msnScreen: msnScreenReducer,
    user: userReducer,
    component: componentReducer
})
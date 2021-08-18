import { combineReducers } from 'redux';

import msnScreenReducer from './msn_screen';
import userReducer from './user';
import componentReducer from './components';
import chatReducer from './chat';

export default combineReducers({
    msnScreen: msnScreenReducer,
    user: userReducer,
    component: componentReducer,
    chat: chatReducer
})
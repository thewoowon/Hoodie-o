import { combineReducers } from "redux";
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from './auth';
import board from './board';
import studio from './studio';

const persistConfig = {
    key : "root",
    storage,
    whitelist:["auth"]
};

export const rootReducer = combineReducers({
    auth,
    board,
    studio
});

export default persistReducer(persistConfig,rootReducer);

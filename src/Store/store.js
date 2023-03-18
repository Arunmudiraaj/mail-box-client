import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth'
import mailsReducer from './mails'
const store = configureStore({
    reducer: {
        authentication : authReducer,
        mails : mailsReducer
    }
})

export default store
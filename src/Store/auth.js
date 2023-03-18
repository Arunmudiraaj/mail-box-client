import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : 'authentication',
    initialState : {token : localStorage.getItem('token'), email : localStorage.getItem('email')},
    reducers : {
        login(state,action){
            state.token = action.payload.token
            state.email = action.payload.email
            localStorage.setItem('token',action.payload.token)
            localStorage.setItem('email',action.payload.email)
        },

        logout(state){
            state.token = ''
            state.email = ''
            localStorage.setItem('token', '')
            localStorage.setItem('email', '')
        }
    }
    
})

export default authSlice.reducer
export const authActions = authSlice.actions
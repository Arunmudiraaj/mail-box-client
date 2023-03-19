import { createSlice } from "@reduxjs/toolkit";

const mailsSlice = createSlice({
    name: 'mails',
    initialState : {
        sent : {}
    },
    reducers: {
        mailSent(state,action){
            state.sent.push(action.payload)
            console.log(action.payload, 'got pushed')

        },
        initializeMails(state,action){
            state = action.payload
            console.log(`initialized state with ${action.payload}`)
        }
    }
    
})

export default mailsSlice.reducer
export const mailsActions = mailsSlice.actions
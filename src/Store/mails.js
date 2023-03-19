import { createSlice } from "@reduxjs/toolkit";

const mailsSlice = createSlice({
    name: 'mails',
    initialState : {
        inbox : {},
        sent : {}
    },
    reducers: {
        mailSent(state,action){
            state.sent[action.payload.id] = action.payload.mail
            console.log(action.payload, 'got pushed')

        },
        mailRead(state,action){
            state.inbox[action.payload.id] = {...action.payload.mail, read : true}
            console.log(action.payload, 'read')

        },
        initializeInbox(state,action){
            state.inbox = action.payload

        },
        initializeSent(state, action){
            state.sent = action.payload
        }
    }
    
})

export default mailsSlice.reducer
export const mailsActions = mailsSlice.actions
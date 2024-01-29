import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currenUser: null,
    error:null,
    loading:false
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
            state.error=null
        },
        signInSuccess:(state,actions)=>{
            state.currenUser=actions.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,actions)=>{
            state.loading=false;
            state.error=actions.payload
        }
    }

})

// Action creators are generated for each case reducer function
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions

export default userSlice.reducer
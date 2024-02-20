import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currenUser: null,
    error:null,
    loading:false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
            state.error=null
        },
        signInSuccess:(state,action)=>{
            state.currenUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        
        upDateStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        upDateSuccess:(state,action)=>{
            state.currenUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        upDateFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
    }

})

// Action creators are generated for each case reducer function
export const { signInStart, signInSuccess, signInFailure , upDateStart ,upDateSuccess,upDateFailure} = userSlice.actions

export default userSlice.reducer
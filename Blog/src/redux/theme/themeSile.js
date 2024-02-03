import { createSlice } from '@reduxjs/toolkit'


const initialState = { theme: 'light' } 


const  themeSlien =createSlice({
    name:'theme',
    initialState,
    reducers:{
        toggleTheme:(state)=>{
            state.theme=state.theme === 'light'?'dark':'light';
        }
    }
})

export const {toggleTheme} = themeSlien.actions;
export default themeSlien.reducer;
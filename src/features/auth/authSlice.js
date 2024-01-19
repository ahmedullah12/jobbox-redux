import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    role: '',
    isloading: true,
    isError: false,
    error: '',
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    
});


export default authSlice.reducer;
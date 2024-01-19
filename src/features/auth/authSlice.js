import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const initialState = {
    email: '',
    role: '',
    isLoading: true,
    isError: false,
    error: '',
};

export const createUser = createAsyncThunk("auth/createUser", async({email, password}) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.email;
});
export const loginUser = createAsyncThunk("auth/loginUser", async({email, password}) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.email;
});
export const googlelogin = createAsyncThunk("auth/googlelogin", async() => {
    const googleProvider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth, googleProvider);
    return data.user.email;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.email = ""
        },
        setUser: (state, {payload}) => {
            state.email = payload;
            state.isLoading = false;
        }, 
        resetError: (state) => {
            state.isError = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.isLoading =  true;
            state.isError = false;
            state.error = '';
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.isLoading =  false;
            state.email = action.payload;
            state.isError = false;
            state.error = '';
        })
        .addCase(createUser.rejected, (state, action) => {
            state.isLoading =  false;
            state.email = '';
            state.isError = true;
            state.error = action.error.message;
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading =  true;
            state.isError = false;
            state.error = '';
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading =  false;
            state.email = action.payload;
            state.isError = false;
            state.error = '';
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading =  false;
            state.email = '';
            state.isError = true;
            state.error = action.error.message;
        })
        .addCase(googlelogin.pending, (state) => {
            state.isLoading =  true;
            state.isError = false;
            state.error = '';
        })
        .addCase(googlelogin.fulfilled, (state, action) => {
            state.isLoading =  false;
            state.email = action.payload;
            state.isError = false;
            state.error = '';
        })
        .addCase(googlelogin.rejected, (state, action) => {
            state.isLoading =  false;
            state.email = '';
            state.isError = true;
            state.error = action.error.message;
        })
    }
});

export const { logout, setUser, resetError } = authSlice.actions

export default authSlice.reducer;
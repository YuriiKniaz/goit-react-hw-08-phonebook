import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { signUpRequest, logInRequest, setToken, requestRefreshUser, logOutRequest  } from "./requestOperations";


export const signUpThunk = createAsyncThunk(
    'auth/signup',
    async (authData, thunkAPI) => {
        try {
            const response = await signUpRequest(authData);
            
            return response;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
export const logInThunk = createAsyncThunk(
    'auth/login',
    async (authData, thunkAPI) => {
        try {
            const response = await logInRequest(authData);
            
            return response;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
export const refreshThunk = createAsyncThunk(
    'auth/refresh',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const token = state.auth.token;

        try {
            setToken(token);
            const response = await requestRefreshUser();
            
            return response;
        }
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
    {
        condition: (_, thunkAPI) => {
            const state = thunkAPI.getState();
            const token = state.auth.token;
            if (!token) return false;
            return true;
        }
    }
)
export const logOutThunk = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await logOutRequest();
            return;
        }
        catch(error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


const INITIAL_STATE = {
    token: null,
    user: {
        email: null,
        name:null
    },
    isLogedIn: false,
    isLoading: false,
    isError: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    extraReducers: builder => builder
        
        .addCase(signUpThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLogedIn = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        })
        
        .addCase(logInThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLogedIn = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        })
        
        .addCase(refreshThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLogedIn = true;
            state.user = action.payload;
        })
        .addCase(logOutThunk.fulfilled, () => {
            return INITIAL_STATE;
        })
        
        .addMatcher(isAnyOf(
            logInThunk.pending,
            signUpThunk.pending,
            logOutThunk.pending,
            refreshThunk.pending
        ),
            (state) => {
                state.isLoading = true;
                state.isError = null;
            })
        .addMatcher(isAnyOf(
        logInThunk.rejected,
            signUpThunk.rejected,
            logOutThunk.rejected,
            refreshThunk.rejected
        ),
            (state,action) => {
                state.isLoading = false;
                state.isError = action.payload;
            }
    )
})

export const authReducer = authSlice.reducer;
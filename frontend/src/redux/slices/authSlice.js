import { API_PATHS } from "../../utils/apiPaths"
import { axiosInstance } from "../../utils/axiosInstance"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const login = createAsyncThunk(
    'api/auth/login',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${API_PATHS.AUTH.LOGIN}`, formData)
            return response.data
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
)

export const signup = createAsyncThunk(
    'api/auth/signup',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${API_PATHS.AUTH.REGISTER}`, formData)
            return response.data
        } catch (err) {
            return rejectWithValue(err.response.data)

        }
    }
)

export const getUserProfile = createAsyncThunk(
    'api/auth/profile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${API_PATHS.AUTH.GET_PROFILE}`)
            return response.data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const logout = createAsyncThunk(
    'api/auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGOUT)
            return response.data
        } catch (err) {
            return rejectWithValue(err.response.data)

        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
        authenticating : false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.
            addCase(login.pending, (state) => {
                state.loading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(signup.pending, (state) => {
                state.loading = true
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getUserProfile.pending, (state) => {
                state.authenticating = true
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.authenticating = false
                state.user = action.payload
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.authenticating = false
                state.error = action.payload
            })
            .addCase(logout.pending, (state) => {
                state.loading = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false
                state.user = null
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default authSlice.reducer
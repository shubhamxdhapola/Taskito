import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

export const getAllUsers = createAsyncThunk(
    'api/admin/users',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${API_PATHS.USERS.GET_ALL_USERS}`)
            return response.data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const adminUsersSlice = createSlice({
    name: 'adminUsers',
    initialState: {
        users: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default adminUsersSlice.reducer
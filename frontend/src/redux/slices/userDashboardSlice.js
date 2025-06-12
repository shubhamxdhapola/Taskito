import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'

export const getUserDashboardData = createAsyncThunk(
    'api/user/dashboard',
    async (_, { rejecetWithValue }) => {
        try {
            const response = await axiosInstance.get(API_PATHS.TASKS.GET_USER_DASHBOARD_DATA)
            return response.data
        } catch (err) {
            return rejecetWithValue(err.response.data)
        }
    }
)

const userDashboardSlice = createSlice({
    name: 'userDashboard',
    initialState: {
        dashboardData: null,
        pieChartData: null,
        barChartData: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserDashboardData.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserDashboardData.fulfilled, (state, action) => {
                state.loading = false
                state.dashboardData = action.payload
            })
            .addCase(getUserDashboardData.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default userDashboardSlice.reducer
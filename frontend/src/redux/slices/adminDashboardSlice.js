import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'

export const getAdminDashboardData = createAsyncThunk(
    'api/admin/dashboard',
    async(_, {rejecetWithValue}) => {
        try {
            const response = await axiosInstance.get(`${API_PATHS.TASKS.GET_DASHBOARD_DATA}`)
            return response.data
        } catch (err) {
            return rejecetWithValue(err.response.data)
        }
    }
)

const adminDashboardSlice = createSlice({
    name : 'adminDashboard',
    initialState : {
        dashboardData : null,
        pieChartData : null,
        barChartData : null,
        loading : false,
        error : null
    },
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(getAdminDashboardData.pending, (state) => {
                state.loading = true
            })
            .addCase(getAdminDashboardData.fulfilled, (state, action) => {
                state.loading = false
                state.dashboardData = action.payload
            })
            .addCase(getAdminDashboardData.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default adminDashboardSlice.reducer
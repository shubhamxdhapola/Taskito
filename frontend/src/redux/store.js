import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import uploadReducer from './slices/uploadSlice'
import adminDashboardReducer from './slices/adminDashboardSlice'
import adminUsersReducer from './slices/adminUsersSlice'
import userDashboardReducer from "./slices/userDashboardSlice";
import tasksSliceReducer from './slices/tasksSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        upload: uploadReducer,
        adminDashboard: adminDashboardReducer,
        adminUsers: adminUsersReducer,
        userDashboard: userDashboardReducer,
        tasks : tasksSliceReducer
    }
})

export default store
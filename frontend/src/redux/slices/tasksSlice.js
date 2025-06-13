import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

export const getTasks = createAsyncThunk(
    'api/admin/tasks',
    async (status, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, { params: status })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const createTask = createAsyncThunk(
    'api/admin/create-task',
    async (task, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, task)
            return response.data.task

        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateTask = createAsyncThunk(
    'api/admin/update-task',
    async ({ task, taskId }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                API_PATHS.TASKS.UPDATE_TASK(taskId), task
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteTask = createAsyncThunk(
    'api/admin/delete-task',
    async (taskId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(
                API_PATHS.TASKS.DELETE_TASK(taskId)
            )
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateTodoCheckList = createAsyncThunk(
    'api/admin/update-todo',
    async ({ taskId, todoChecklist }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId),
                { todoChecklist }
            )
            return { ...response.data, status: response.status }
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        loading: false,
        error: null,
        allTasks: [],
        updatingTodoList: false,
        statusSummary: {},
        deleteTaskLoading: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.pending, (state) => {
                state.loading = true
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state.loading = false
                state.allTasks = action.payload.tasks
                state.statusSummary = action.payload.statusSummary
            })
            .addCase(getTasks.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(createTask.pending, (state) => {
                state.loading = true
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false
                state.allTasks.push(action.payload)
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(updateTask.pending, (state) => {
                state.loading = true
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false
                const index = state.allTasks.findIndex(
                    (task) => task._id === action.payload._id
                )
                if (index !== -1) {
                    state.allTasks[index] = action.payload
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(deleteTask.pending, (state) => {
                state.deleteTaskLoading = true
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.deleteTaskLoading = false
                state.allTasks = state.allTasks.filter(
                    (task) => task._id !== action.payload._id
                )
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.deleteTaskLoading = false
                state.error = action.payload
            })
            .addCase(updateTodoCheckList.pending, (state) => {
                state.updatingTodoList = true
            })
            .addCase(updateTodoCheckList.fulfilled, (state, action) => {
                state.updatingTodoList = false
                const index = state.allTasks.findIndex(
                    (task) => task._id === action.payload.task._id
                )
                if (index !== -1) {
                    state.allTasks[index] = action.payload
                }
            })
    }
})

export default tasksSlice.reducer
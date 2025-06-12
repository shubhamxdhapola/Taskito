import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

export const uploadImage = createAsyncThunk(
    'api/upload',
    async (image, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${API_PATHS.IMAGE.UPLOAD_IMAGE}`, image, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            return response.data.profileImageUrl
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const uploadSlice = createSlice({
    name: 'upload',
    initialState: {
        profileImageUrl: null,
        uploading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadImage.pending, (state) => {
                state.uploading = true
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                state.uploading = false
                state.profileImageUrl = action.payload
            })
            .addCase(uploadImage.rejected, (state, action) => {
                state.uploading = false
                state.error = action.payload
            })
    }
})

export default uploadSlice.reducer
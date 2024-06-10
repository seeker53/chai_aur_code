import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import appwriteService from '../appwrite/config';

export const uploadFile = createAsyncThunk('files/uploadFile', async (file) => {
    const response = await appwriteService.uploadFile(file);
    if (response) {
        return response;
    }
    throw new Error("Failed to upload file");
})

export const deleteFile = createAsyncThunk('files/deleteFile', async (fileId) => {
    const response = await appwriteService.deleteFile(fileId);
    if (response) {
        return fileId;
    }
    throw new Error("Failed to delete file");
})

const initialState = {
    files : [],
    status : 'idle',
    error : null,
}

const fileSlice = createSlice({
    name:'files',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(uploadFile.pending,(state)=>{
            state.status = 'loading';
        })
        .addCase(uploadFile.fulfilled,(state,action)=>{
            state.status = 'succeeded';
            state.files.push(action.payload);
        })
        .addCase(uploadFile.rejected,(state,action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(deleteFile.pending,(state)=>{
            state.status = 'loading';
        })
        .addCase(deleteFile.fulfilled,(state,action)=>{
            state.status = 'succeeded';
            state.files = state.files.filter((file)=> file.$id !== action.payload);
        })
        .addCase(deleteFile.rejected,(state,action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});

export default fileSlice.reducer;
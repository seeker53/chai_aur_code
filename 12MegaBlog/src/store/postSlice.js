import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import appwriteService from '../appwrite/config';

// Thunks for async operations

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await appwriteService.getPosts();
    if (response) {
        return response.documents; // Returning the list of documents
    }
    throw new Error("Failed to fetch posts");
});

export const fetchPost = createAsyncThunk('posts/fetchPost', async (slug) => {
    const response = await appwriteService.getPost(slug);
    if (response) {
        return response;
    }
    throw new Error("Failed to fetch post");
});

export const createPost = createAsyncThunk('posts/createPost', async (post) => {
    const response = await appwriteService.createPost(post);
    if (response) {
        return response;
    }
    throw new Error("Failed to create post");
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ slug, post }) => {
    const response = await appwriteService.updatePost(slug, post);
    if (response) {
        return response;
    }
    throw new Error("Failed to update post");
});

export const deletePost = createAsyncThunk('posts/deletePost', async (slug) => {
    const response = await appwriteService.deletePost(slug);
    if (response) {
        return slug; // Return slug to identify the deleted post
    }
    throw new Error("Failed to delete post");
});

// Initial state

const initialState = {
    posts: [],
    currentPost: null,
    status: 'idle',
    error: null,
};

// postSlice

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchPost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentPost = action.payload;
            })
            .addCase(fetchPost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const index = state.posts.findIndex(post => post.$id === action.payload.$id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.$id !== action.payload);
            });
    },
});

export default postSlice.reducer;

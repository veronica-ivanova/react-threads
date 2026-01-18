import type { Post } from "../types";
import { api } from "./api";

export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createPost: builder.mutation<Post, {content: string}>({
            query: (postData) => ({
                url: '/posts',
                method: 'POST', 
                body: postData
            })
        }),
        getAllPosts: builder.query<Post[], void>({
            query: () => ({
                url: '/posts',
                method: 'GET'
            }),
            providesTags: ['Posts'],
        }),
        getPostById: builder.query<Post, string>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'GET'
            }),
            providesTags: (_r, _e, id) => [{ type: 'Post', id}]
        }),
        deletePost: builder.mutation<void, string>({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (_r, _e, postId ) => [
                "Posts",
                { type: "Post", id: postId },
            ],
        })
    })
})

export const {
    useCreatePostMutation,
    useGetAllPostsQuery,
    useGetPostByIdQuery,
    useDeletePostMutation,
    useLazyGetAllPostsQuery,
    useLazyGetPostByIdQuery
} =postApi;

export const {
    endpoints: { createPost, getAllPosts, getPostById, deletePost }
} = postApi;
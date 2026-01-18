import type { Like } from "../types";
import { api } from "./api";

export const likesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        likePost: builder.mutation<Like, { postId: string }>({
            query: (body) => ({
                url: '/likes',
                method: 'POST', 
                body: body
            }),
            invalidatesTags: (_r, _e, { postId }) => [
                "Posts",
                { type: "Post", id: postId },
            ],
        }),

        unlikePost: builder.mutation<void, string>({
            query: (postId) => ({
                url: `/likes/${postId}`,
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
    useLikePostMutation,
    useUnlikePostMutation
} = likesApi

export const {
    endpoints: {likePost, unlikePost}
} = likesApi
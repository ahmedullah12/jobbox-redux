import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        postJob: builder.mutation({
            query: (data) => ({
                url: '/job',
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Jobs"]
        }),
        apply: builder.mutation({
            query: (data) => ({
                url: '/apply',
                method: "PATCH",
                body: data,
            }),
        }),
        getJob: builder.query({
            query: () => ({
                url: '/jobs',
            }),
            providesTags: ["Jobs"]
        }),
        getSingleJob: builder.query({
            query: (id) => ({
                url: `/job/${id}`
            })
        })
    })
});

export const {usePostJobMutation, useGetJobQuery, useGetSingleJobQuery, useApplyMutation} = jobApi;
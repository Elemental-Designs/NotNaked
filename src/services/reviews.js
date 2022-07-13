/* eslint-disable import/extensions */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_KEY } from '../config/config.js';

export const reviewsApi = createApi({
  reducerPath: 'reviewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews',
    prepareHeaders(headers) {
      headers.set('Authorization', API_KEY);
      return headers;
    },
  }),
  tagTypes: ['Reviews'],
  endpoints: (builder) => ({
    getAllReviewsByProductId: builder.query({
      query: (productId /* sort = 'relevant' */) => `?product_id=${productId}`,
      providesTags: ['Reviews'],
    }),
    getReviewMetadata: builder.query({
      query: (productId) => `/meta?product_id=${productId}`,
    }),
    addAReview: builder.mutation({
      query: (productId, formInput) => ({
        url: '',
        method: 'POST',
        body: formInput,
      }),
      invalidatesTags: ['Reviews'],
    }),
    addHelpfulCount: builder.mutation({
      query: (reviewId) => ({
        url: `/${reviewId}/helpful`,
        method: 'PUT',
      }),
      invalidatesTags: ['Reviews'],
    }),
    reportReview: builder.mutation({
      query: (reviewId) => ({
        url: `/${reviewId}/report`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useGetAllReviewsByProductIdQuery,
  useGetReviewMetadataQuery,
  useAddAReviewMutation,
  useAddHelpfulCountMutation,
  useReportReviewMutation,
} = reviewsApi;
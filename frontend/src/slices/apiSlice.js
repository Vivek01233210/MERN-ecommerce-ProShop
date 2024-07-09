import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
const baseURL = process.env.API_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: baseURL,
});

export const apiSlice = createApi({
    baseQuery, 
    tagTypes: ['Product', 'Order', 'User'],
    endpoints: (builder) => ({}),
});
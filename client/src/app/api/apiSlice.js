import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3500'
    : 'https://mern-stack-insanetim.onrender.com'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Note', 'User'],
  endpoints: builder => ({}),
})

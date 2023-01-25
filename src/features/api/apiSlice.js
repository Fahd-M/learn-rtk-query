// Where we create methods to interact with API (replaces axios)
// Pulls code out of component logic and into a separate apiSlice 

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// this is specific to react (can use rtk query and redux without react also) 

export const apiSlice = createApi({
    reducerPath: 'path', // this is default
    baseQuery: fetchBaseQuery({ baseUrl: 'http://http://localhost:3500' }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({ //pass in builder then define methods to interact with API
        getTodos: builder.query({  
            query: () => '/todos', //query method is anonymous fx that passes the '/todos' that would be attached to base url
                                    // then will request all todos with an http GET method
            transformResponse: res => res.sort((a,b) => b.id - a.id),                        
            providesTags: ['Todos'] // Provides tag of todos to invalidate todos Cache when using the mutations below
        }),
        //next method
        addTodo: builder.mutation({ //mutating the data, not just requesting or querying it.
            query: (todo) => ({ // keyword query still used. todo passed in because it needs a new todo
                url: '/todos', //specify url here
                method: 'POST', 
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({ 
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation({ // only need ID (vs Update needed id and the todo itself)
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Todos']
        }),

    })
})

//NOTE: RTK Query creates custom hooks based on methods we provide (ex. getTodos)
export const { useGetTodosQuery, useUpdateTodoMutation, useAddTodoMutation, useDeleteTodoMutation }  = apiSlice

// Before able to use custom hook we go back to index.js or app.js to do context provider equivalent (provide slice to app)
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localstorage
const user = JSON.parse(localStorage.getItem('user')
)

const initialState = {
   //If there is a user, use it. If not, be null.
   user: user ? user : null,
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: '',
}

// createAsyncThunk - Register new user
export const register = createAsyncThunk(
   'auth/register', 
async(user, thunkAPI) => {
   try {
      return await authService.register(user)
   } catch (error) {
      const message = 
      (error.response && 
         error.response.data && 
         error.response.data.message)
         ||
      error.message || 
      error.toString()

      return thunkAPI.rejectWithValue(message)
      }
   }
)

// createAsyncThunk - Login user
export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
   console.log(user)
   }
)

// Logout user
export const logout = createAsyncThunk('auth/logout', async() => {
   await authService.logout()
})

export const authSlice = createSlice ({
   name: 'auth',
   initialState,
   reducers: {
      reset: (state) => {
         state.isLoading = false
         state.isError = false
         state.isSuccess = false
         state.message = ''
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(register.pending, (state) => {
            state.isLoading = true
         })
         //if it is fulfilled
         .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
         })
         //if it is rejected
         .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
         })
         .addCase(logout.fulfilled, (state) => {
            state.user = null 
         })
   },
})

export const {reset} = authSlice.actions
export default authSlice.reducer
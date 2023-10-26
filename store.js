import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import the userSlice reducer

export default configureStore({
  reducer: {
    user: userReducer, // Add the user reducer to your store configuration
    // Add other reducers if needed
  },
});

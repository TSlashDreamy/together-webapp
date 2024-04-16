import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

interface UserState {
  currentUser: User | null;
  userLoggedIn: boolean;
  isEmailUser: boolean;
  isGoogleUser: boolean;
  loading: boolean;
}

const initialState: UserState = {
  currentUser: null,
  userLoggedIn: false,
  isEmailUser: false,
  isGoogleUser: false,
  loading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
      state.userLoggedIn = !!action.payload;
      state.isEmailUser = !!action.payload?.providerData.some(p => p.providerId === 'password');
      // TODO: configure google login
      // state.isGoogleUser = !!action.payload?.providerData.some(p => p.providerId === 'google.com');
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    }
  },
});

export const { setUser, setLoading } = userSlice.actions;
export default userSlice.reducer;

import { create } from 'zustand';

import { createUserSlice, type UserSliceState } from './userSlice';

const useStore = create<UserSliceState>((...a) => ({
  ...createUserSlice(...a),
}));

export default useStore;

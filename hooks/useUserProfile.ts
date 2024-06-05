import * as React from 'react';
import { useLocalSearchParams } from 'expo-router';

import useStore from '@/store';
import * as API from '@/api/user';
import type { User } from '@/typings/User';

export default function useUserProfile() {
  const { user: userID } = useLocalSearchParams();
  
  const { me, users, addUser } = useStore();

  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    const id = typeof userID === 'string' ? userID : me;
    if (users[id]) {
      setUser(users[id]);
    } else {
      API.getUserInfo(id).then((userData) => {
        addUser(id, userData);
        setUser(userData);
      });
    }
  }, [userID, addUser]);

  return user;
}

import { Text, View, StyleSheet } from 'react-native';
import { formatDistanceToNowStrict } from 'date-fns';

import Avatar from '@/components/MomentAvatar';
import Action from '@/components/MomentAction';
import Gallery from '@/components/MomentGallery';

import { useThemeColor } from '@/hooks/useThemeColor';
import type { Moment } from '@/typings/Moment';

export default function({
  user,
  content,
  photos = [],
  createdAt,
  onImagePress,
}: Moment & { onImagePress: (i: number) => void }) {
  return (
    <View style={[styles.container, { borderBottomColor: useThemeColor({}, 'divider') }]}>
      <Avatar url={user.avatar} id={user.id} />
      <View style={styles.contentWrapper}>
        <Text>
          <Text style={styles.name}>{user.name}</Text>
          {content && (<Text style={{ color: useThemeColor({}, 'text') }}>{'\n'}{content}</Text>)}
        </Text>
        <Gallery photos={photos} onImagePress={onImagePress} />
        <View style={styles.commentWrapper}>
          <Text style={styles.time}>{formatDistanceToNowStrict(createdAt)} ago</Text>
          <Action />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
  },
  contentWrapper: {
    flex: 1,
    gap: 10,
  },
  name: {
    color: '#0a7ea4',
    fontWeight: 'bold',
  },
  commentWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    color: '#9e9e9e',
  },
});

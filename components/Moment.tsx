import { Image, Text, View, StyleSheet, useColorScheme } from 'react-native';
import { formatDistanceToNowStrict } from 'date-fns';

import Action from '@/components/MomentAction';
import Gallery from '@/components/MomentGallery';

import type { Moment } from '@/typings/Moment';

import { AVATAR_SIZE } from '@/constants/Moments';

const TEXT_COLOR = { light: '#000', dark: '#fff' };

export default function({
  user,
  content,
  photos = [],
  createdAt,
  onImagePress,
}: Moment & { onImagePress: (i: number) => void }) {
  const colorScheme = useColorScheme() ?? 'light';
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={styles.contentWrapper}>
        <Text>
          <Text style={styles.name}>{user.name}</Text>
          {content && (<Text style={{ color: TEXT_COLOR[colorScheme] }}>{'\n'}{content}</Text>)}
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
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: 5,
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

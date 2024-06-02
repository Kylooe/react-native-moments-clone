import { FlatList, Image, Text, View, StyleSheet } from 'react-native';

import Action from '@/components/MomementAction';

import type { Moment } from '@/typings/Moment';

export default function({
  user,
  content,
  photos = [],
  time,
}: Moment) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={styles.contentWrapper}>
        <View>
          <Text style={styles.name}>{user.name}</Text>
          {content && (<Text>{content}</Text>)}
        </View>
        {photos.length === 1 ? (
          <Image source={{ uri: photos[0].thumbnail }} style={styles.photo} />
        ) : (
          <View style={styles.photos}>
            <FlatList
              data={photos}
              renderItem={({ item }) => (
                <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              )}
            />
          </View>
        )}
        <View style={styles.commentWrapper}>
          <Text style={styles.time}>{time}</Text>
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
    width: 40,
    height: 40,
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
  photo: {
    width: '66%',
    height: 180,
  },
  photos: {
    flex:1,
    flexWrap: 'wrap',
    alignItems: 'stretch',
    gap: 5,
  },
  thumbnail: {
    flex: 1,
    // minWidth: ,
  },
  commentWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    color: '#ccc',
  },
});

import * as React from 'react';
import { Modal, StyleSheet, View, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import type { Photo } from '@/typings/Moment';

type Props = {
  photos: Photo[];
  initialPage: number;
  visible: boolean;
  hide: () => void;
}

export default function({ photos, initialPage, visible, hide }: Props) {
  const [list, setList] = React.useState<Photo[]>();

  React.useEffect(() => {
    photos.forEach((photo, i) => {
      Image.getSize(photo.thumbnail, (width, height) => {
        const aspectRatio = width / height;
        setList((prev) => [...(prev || []).slice(0, i), { ...photo, aspectRatio }, ...(prev || []).slice(i)]);
      });
    });
  }, [photos]);

  const tap = Gesture.Tap().maxDuration(250).onEnd((e) => {
    hide();
  });

  if (!list) return;
  return (
    <Modal visible={visible}>
      <GestureHandlerRootView style={styles.container}>
        <GestureDetector gesture={tap}>
          <PagerView initialPage={initialPage} style={styles.track}>
            {list.map((photo) => (
              <View key={photo.id} collapsable={false}>
                <Image source={{ uri: photo.thumbnail }} style={[styles.image, { aspectRatio: photo.aspectRatio }]} />
              </View>
            ))}
          </PagerView>
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
  },
  track: {
    height: '50%',
  },
  image: {
    width: '100%',
    height: undefined,
  }
});
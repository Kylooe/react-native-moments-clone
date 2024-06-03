import * as React from 'react';
import { Image, View, Pressable, StyleSheet } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';

import type { Moment } from '@/typings/Moment';

const GAP = 5;

export default function({ photos, onImagePress }: {
  photos: Moment['photos'],
  onImagePress: (i: number) => void
}) {
  const [aspectRatio, setAspectRatio] = React.useState<number>(1);
  const [size, setSize] = React.useState<number>();
  const getThumbnailSize = React.useCallback((e: LayoutChangeEvent) => {
    const isFourSquares = photos?.length === 4
    const width = e.nativeEvent.layout.width;
    const thumbnailWidth = (width - (isFourSquares ? GAP : GAP * 2)) / (isFourSquares ? 2 : 3);
    return setSize(thumbnailWidth);
  }, []);

  React.useEffect(() => {
    if (photos?.length === 1) {
      Image.getSize(photos[0].thumbnail, (width, height) => {
        const aspectRatio = width / height;
        setSize(aspectRatio >= 1 ? width : height);
        setAspectRatio(aspectRatio);
      });
    }
  }, [photos]);

  if (!photos?.length) return;
  return photos.length === 1 ? (
    <Pressable onPress={() => onImagePress(0)}>
      <Image
        source={{ uri: photos[0].thumbnail }}
        style={[
          styles.photo,
          {
            width: aspectRatio >= 1 ? size : undefined,
            height: aspectRatio >= 1 ? undefined : size,
            aspectRatio,
          }
        ]}
      />
    </Pressable>
  ) : (
    <View
      style={[styles.photos, { width: photos.length === 4 ? '66%' : '100%' }]}
      onLayout={getThumbnailSize}
    >
      {photos.map((photo, index) => (
        <Pressable key={photo.id} onPress={() => onImagePress(index)}>
          <Image source={{ uri: photo.thumbnail }} style={{ width: size, height: size }} />
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  photo: {
    maxWidth: '66%',
    maxHeight: 240,
  },
  photos: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  }
});

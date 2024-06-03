import * as React from 'react';
import { FlatList, Image, View, StyleSheet } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';

import type { Moment } from '@/typings/Moment';

const GAP = 5;

export default function({ photos }: { photos: Moment['photos'] }) {
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
  ) : (
    <View
      style={{ width: photos.length === 4 ? '66%' : '100%' }}
      onLayout={getThumbnailSize}
    >
      <FlatList
        data={photos}
        numColumns={photos?.length === 4 ? 2 : 3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.thumbnail }} style={{ width: size, height: size }} />
        )}
        columnWrapperStyle={{ gap: GAP, marginBottom: GAP }}
        style={{ marginBottom: -GAP }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  photo: {
    maxWidth: '66%',
    maxHeight: 240,
  },
});

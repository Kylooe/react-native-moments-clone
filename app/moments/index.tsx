import * as React from 'react';
import { FlatList } from 'react-native';

import { default as MomentItem } from '@/components/Moment';
import MediaViewer from '@/components/MediaViewer';

import type { Moment } from '@/typings/Moment';

import { list as data } from '@/constants/Moments';

export default function Moments() {

  const [photosFullScreen, setPhotosFullScreen] = React.useState<Moment['photos']>([]);
  const [targetPhotoIndex, setTargetPhotoIndex] = React.useState(-1);
  const [isMediaActive, setIsMediaActive] = React.useState(false);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <MomentItem
          user={item.user}
          content={item.content}
          photos={item.photos}
          createdAt={item.createdAt}
          onImagePress={(i) => {
            // if (Platform.OS === 'android' || Platform.OS === 'ios') {
            //   setPhotosFullScreen(item.photos);
            //   setTargetPhotoIndex(i);
            //   setStatusBarHidden(true);
            //   setIsMediaActive(true);
            // }
          }}
        />
      )}
    />
  )
}

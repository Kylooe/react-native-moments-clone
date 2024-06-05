import * as React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import type { StyleProp, ImageStyle } from 'react-native';
import { router } from 'expo-router';

import { AVATAR_SIZE } from '@/constants/Moments';

type Size = keyof typeof AVATAR_SIZE;
type Props = {
  size?: Size;
  id?: string;
  url?: string;
  style?: StyleProp<ImageStyle>;
}

export default function({ url, id, size = 'default', style }: Props) {
  const redirect = React.useCallback(() => {

  }, []);

  return (
    <Pressable onPress={redirect}>
      <Image
        source={{ uri: url }}
        style={[style, (styles as Record<Size, any>)[size]]}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create(Object.keys(AVATAR_SIZE).reduce((result, size) => ({
  ...result,
  [size]: {
    width: AVATAR_SIZE[size as Size].size,
    height: AVATAR_SIZE[size as Size].size,
    borderRadius: AVATAR_SIZE[size as Size].radius,
  }
}), {}));
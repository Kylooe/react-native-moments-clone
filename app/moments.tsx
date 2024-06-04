import * as React from 'react';
import { FlatList, Image, Text, View, StyleSheet, useColorScheme, Platform } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { setStatusBarHidden } from 'expo-status-bar';
import Icon from '@expo/vector-icons/FontAwesome6';

import { ThemedView } from '@/components/ThemedView';
import MomentCreator from '@/components/MomentCreator';
import { default as MomentItem } from '@/components/Moment';
import MediaViewer from '@/components/MediaViewer';

import type { Moment } from '@/typings/Moment';

import { list as data } from '@/constants/Moments';

const BANNER_HEIGHT = 270;
const AVATAR_HEIGHT = 70;
const AVATAR_OFFSET = 20;
const HEADER_HEIGHT = 48;
const HEADER_BG = { light: '#ededed', dark: '#000' };

const bannerImage = require('@/assets/images/partial-react-logo.png');
const avatar = require('@/assets/images/react-logo.png');

export default function Moments() {
  const colorScheme = useColorScheme() ?? 'light';
  
  const { top: STATUSBAR_HEIGHT } = useSafeAreaInsets();
  const SCROLL_THRESHOLD = React.useMemo(() => BANNER_HEIGHT - HEADER_HEIGHT - STATUSBAR_HEIGHT, [STATUSBAR_HEIGHT]);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const bgColor = scrollOffset.value > SCROLL_THRESHOLD ? HEADER_BG[colorScheme] : 'transparent';
    const iconOpacity = interpolate(
      scrollOffset.value,
      [BANNER_HEIGHT + AVATAR_OFFSET - AVATAR_HEIGHT - HEADER_HEIGHT - STATUSBAR_HEIGHT, SCROLL_THRESHOLD, BANNER_HEIGHT + AVATAR_OFFSET - HEADER_HEIGHT - STATUSBAR_HEIGHT],
      [1, 0, 1],
      'clamp'
    );
    return {
      backgroundColor: bgColor,
      opacity: iconOpacity,
    };
  });
  const animatedIconStyle = useAnimatedStyle(() => {
    const color = scrollOffset.value > SCROLL_THRESHOLD ? '#000' : '#fff';
    return { color };
  });

  const [photosFullScreen, setPhotosFullScreen] = React.useState<Moment['photos']>([]);
  const [targetPhotoIndex, setTargetPhotoIndex] = React.useState(-1);
  const [isMediaActive, setIsMediaActive] = React.useState(false);

  return (
    <ThemedView style={styles.container}>
      <Animated.View style={[styles.header, animatedHeaderStyle, { paddingTop: STATUSBAR_HEIGHT }]}>
        <Animated.Text style={[styles.btn, animatedIconStyle]} onPress={() => router.back()}>
          <Icon name="chevron-left" size={20} />
        </Animated.Text>
        <MomentCreator>
          <Animated.Text style={[styles.btn, colorScheme === 'light' ? animatedIconStyle : { color: '#fff' }]}>
            <Icon name="camera" size={20} />
          </Animated.Text>
        </MomentCreator>
      </Animated.View>

      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} style={{ height: '100%', overflow: 'scroll' }}>
        <View style={styles.profile}>
          <ThemedView>
            <Image source={bannerImage} style={styles.banner} />
          </ThemedView>
          <View style={styles.info}>
            <Text style={styles.name}>用户名 username</Text>
            <Image source={avatar} style={styles.avatar} />
          </View>
        </View>

        <FlatList
          data={data}
          renderItem={({ item }) => (
            <MomentItem
              user={item.user}
              content={item.content}
              photos={item.photos}
              createdAt={item.createdAt}
              onImagePress={(i) => {
                setPhotosFullScreen(item.photos);
                setTargetPhotoIndex(i);
                setStatusBarHidden(true);
                setIsMediaActive(true);
              }}
            />
          )}
        />
      </Animated.ScrollView>

      {(Platform.OS === 'android' || Platform.OS === 'ios') && (<MediaViewer
        visible={isMediaActive}
        photos={photosFullScreen || []}
        initialPage={targetPhotoIndex}
        hide={() => {
          setIsMediaActive(false);
          setStatusBarHidden(false);
        }}
      />)}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    overflow: 'hidden',
  },
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  btn: {
    width: HEADER_HEIGHT,
    lineHeight: HEADER_HEIGHT,
    textAlign: 'center',
  },
  banner: {
    height: BANNER_HEIGHT,
    width: '100%',

    backgroundColor: '#aaa'
  },
  profile: {
    position: 'relative',
    marginBottom: 50,
  },
  info: {
    position: 'absolute',
    bottom: 0,
    right: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    gap: 10,
  },
  name: {
    paddingBottom: 10,
    color: '#fff',
    fontSize: 18,
  },
  avatar: {
    position: 'relative',
    top: AVATAR_OFFSET,
    width: AVATAR_HEIGHT,
    height: AVATAR_HEIGHT,
    borderRadius: 10,
    backgroundColor: '#000',
  }
});

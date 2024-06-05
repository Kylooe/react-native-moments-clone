
import * as React from 'react';
import { useColorScheme, Image, Text, View, StyleSheet, type TextProps } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  type AnimatedProps,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, Slot, useLocalSearchParams } from 'expo-router';
import Icon from '@expo/vector-icons/FontAwesome6';

import useUserProfile from '@/hooks/useUserProfile';
import { ThemedView } from '@/components/ThemedView';
import MomentCreator from '@/components/MomentCreator';
import MomentAvatar from '@/components/MomentAvatar';

const BANNER_HEIGHT = 270;
const AVATAR_HEIGHT = 70;
const AVATAR_OFFSET = 20;
const HEADER_HEIGHT = 48;
const HEADER_BG = { light: '#ededed', dark: '#000' };

function HeaderIcon({ name, animatedStyle, ...rest }: {
  name: string;
  animatedStyle: Record<string, string | number>;
} & AnimatedProps<TextProps>) {
  const colorScheme = useColorScheme() ?? 'light';
  return (
    <Animated.Text
      {...rest}
      style={[styles.btn, colorScheme === 'light' ? animatedStyle : { color: '#fff' }]}
    >
      <Icon name={name} size={20} />
    </Animated.Text>
  )
}

export default function MomentsLayout() {
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

  const { user: userID } = useLocalSearchParams();
  const user = useUserProfile();

  return (
    <ThemedView style={styles.container}>
      <Animated.View style={[styles.header, animatedHeaderStyle, { paddingTop: STATUSBAR_HEIGHT }]}>
        <HeaderIcon name="chevron-left" animatedStyle={animatedIconStyle} onPress={() => router.back()} />
        {!userID ? (
          <MomentCreator>
            <HeaderIcon name="camera" animatedStyle={animatedIconStyle} />
          </MomentCreator>
        ) : (
          user?.id === userID && (
            <HeaderIcon name="chevron-left" animatedStyle={animatedIconStyle} onPress={() => router.push('/messages')} />
          )
        )}
      </Animated.View>

      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} style={{ height: '100%', overflow: 'scroll' }}>
        <View style={styles.profile}>
          <ThemedView>
            <Image source={{ uri: user?.banner }} style={styles.banner} />
          </ThemedView>
          <View style={styles.info}>
            <Text style={styles.name}>{ user?.name }</Text>
            <MomentAvatar size="large" url={user?.avatar} id={user?.id} style={styles.avatar} />
          </View>
        </View>

        <Slot />
      </Animated.ScrollView>
    </ThemedView>
  );
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
  }
});

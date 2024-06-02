import * as React from 'react';
import { Image, Text, View, StyleSheet, useColorScheme } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import Icon from '@expo/vector-icons/FontAwesome6';

import { ThemedView } from '@/components/ThemedView';

const BANNER_HEIGHT = 270;
const AVATAR_HEIGHT = 70;
const AVATAR_OFFSET = 20;
const HEADER_HEIGHT = 48;
const HEADER_BG = { light: '190, 190, 190', dark: '90, 90, 90' };

const bannerImage = require('@/assets/images/partial-react-logo.png');
const avatar = require('@/assets/images/react-logo.png');

export default function Moments() {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const animatedStyle = useAnimatedStyle(() => {
    const bgOpacity = scrollOffset.value > BANNER_HEIGHT - HEADER_HEIGHT ? 1 : 0;
    const iconOpacity = interpolate(scrollOffset.value, [BANNER_HEIGHT + AVATAR_OFFSET - AVATAR_HEIGHT - HEADER_HEIGHT, BANNER_HEIGHT - HEADER_HEIGHT, BANNER_HEIGHT + AVATAR_OFFSET - HEADER_HEIGHT], [1, 0, 1], 'clamp');
    return {
      backgroundColor: `rgba(${HEADER_BG[colorScheme]}, ${bgOpacity})`,
      opacity: iconOpacity,
    };
  });

  const iconColor = useDerivedValue(() => scrollOffset.value > BANNER_HEIGHT ? '#000' : '#fff');
  const HeaderIcon = Animated.createAnimatedComponent(React.forwardRef(({ name }: { name: string }, ref: React.LegacyRef<View>) => (
    <Icon.Button ref={ref} name={name} size={20} color={iconColor.value} backgroundColor="rgba(0,0,0,0)" iconStyle={{ margin: 10 }} />
  )));

  const statusTheme = useDerivedValue(() => scrollOffset.value > BANNER_HEIGHT ? 'dark' : 'light');

  return (
    <View style={styles.container}>
      <StatusBar style={statusTheme.value} />
      <Animated.View style={[styles.header, animatedStyle]}>
        <HeaderIcon name="chevron-left" />
        <HeaderIcon name="camera" />
      </Animated.View>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <View style={styles.profile}>
          <ThemedView>
            <Image source={bannerImage} style={styles.banner} />
          </ThemedView>
          <View style={styles.info}>
            <Text style={styles.name}>用户名 username</Text>
            <Image source={avatar} style={styles.avatar} />
          </View>
        </View>

        <View>
          <Text style={{ height: 1000 }}>lalalalalalala</Text>
        </View>
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    overflow: 'hidden',
  },
  header: {
    height: HEADER_HEIGHT,
    position: 'absolute',
    top: 0,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
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
    // fontWeight: 500,
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

import * as React from 'react';
import type { PropsWithChildren } from 'react';
import { Modal, View, Pressable, StyleSheet, Text } from 'react-native';
import type { PressableProps, StyleProp, TextStyle } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

const OPTION_HEIGHT = 48;

const Option = ({ text, style, ...rest }: {
  text: string,
  style?: StyleProp<TextStyle>,
} & PressableProps) => (
  <Pressable {...rest}>
    <Text style={[
      styles.btn, 
      {
        color: useThemeColor({}, 'text'),
        borderBottomColor: useThemeColor({}, 'divider')
      },
      style
    ]}
  >
    {text}
  </Text>
  </Pressable>
)

export default function({ children }: PropsWithChildren) {
  const [isOptionsActive, setIsOptionsActive] = React.useState(false);

  return (
    <View>
      <Pressable onPress={() => setIsOptionsActive(true)}>
        {children}
      </Pressable>

      <Modal transparent={true} visible={isOptionsActive}>
        <Pressable style={styles.bg} onPress={() => setIsOptionsActive(false)} />
        <View style={[styles.wrapper, { backgroundColor: useThemeColor({}, 'background') }]}>
          <Option text="拍摄" style={{ borderBottomWidth: 1 }} />
          <Option text="从相册选择" style={{ borderBottomWidth: 10 }} />
          <Option text="取消" style={{ borderBottomWidth: 1 }} onPress={() => setIsOptionsActive(false)} />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  btn: {
    lineHeight: OPTION_HEIGHT,
    textAlign: 'center',
    borderBottomWidth: 1,
  },
  bg: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
});

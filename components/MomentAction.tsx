import { useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';

import Icon from '@expo/vector-icons/Feather';

export default function() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View>
      <Pressable
        style={styles.trigger}
        onPress={() => setIsOpen((value) => !value)}
      >
        <Icon
          name="more-horizontal"
          size={18}
          color="#0a7ea4"
        />
      </Pressable>
      {isOpen && (
        <View style={styles.actions}>
          <Icon.Button name="heart" size={18} color="#fff" backgroundColor="#4c4c4c" style={styles.btn}>赞</Icon.Button>
          <Icon.Button name="message-square" size={18} color="#fff" backgroundColor="#4c4c4c" style={styles.btn}>评论</Icon.Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: {
    paddingHorizontal: 5,
    backgroundColor: '#efefef',
    borderRadius: 3,
  },
  actions: {
    position: 'absolute',
    right: 35,
    top: -8,
    flexDirection: 'row',
    backgroundColor: '#4c4c4c',
    borderRadius: 5,
  },
  btn: {
    width: 80,
    justifyContent: 'center',
  }
});

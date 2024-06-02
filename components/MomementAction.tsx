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
    padding: 5,
    backgroundColor: '#333',
    borderRadius: 2,
  }
});

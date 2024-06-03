import { View, StyleSheet } from 'react-native';

import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Link href="/moments" style={styles.link}>朋友圈 {'>'}</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  link: {
    color: '#0a7ea4',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
});

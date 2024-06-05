import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function Page() {
  const { user } = useLocalSearchParams();

  return (
    <View>
      
    </View>
  );
}
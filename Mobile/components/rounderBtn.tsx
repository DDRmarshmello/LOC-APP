import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useColorScheme } from "~/lib/useColorScheme";

type RoundBtnProps = {
  icon: typeof Ionicons.defaultProps;
  text: string;
  onPress?: () => void;
};

const RoundBtn = ({ icon, text, onPress }: RoundBtnProps) => {
  const { isDarkColorScheme } = useColorScheme();
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View className='bg-gray-300 dark:bg-gray-500' style={styles.circle}>
        <Ionicons name={icon} size={30} color={isDarkColorScheme ? "white" : "dark"} />
      </View>
      <Text className='text-black dark:text-white' style={styles.label}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default RoundBtn;

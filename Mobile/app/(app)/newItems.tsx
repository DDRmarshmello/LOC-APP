import { useColorScheme } from "~/lib/useColorScheme";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function Screen() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <ScrollView className="bg-white dark:bg-gray-800">
      <View className="w-full h-full">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          className="h-full w-full absolute"
          style={{ bottom: 0 }}
          source={require("../../assets/images/background.png")}
        />

        <View style={{ top: 70 }}>
          <Animated.Text
            entering={FadeInUp.delay(400).duration(1000).springify()}
            className="text-black dark:text-white text-center font-bold"
            style={{ fontSize: 50 }}
          >
            Geo App
          </Animated.Text>
        </View>

        <View className="mx-5 bg-white" style={{ bottom:210, marginTop:400 }}>
          <Text>Holaaaa</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  balance: {
    fontSize: 50,
    fontWeight: "bold",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 20,
    marginBottom: 10,
  },
  currency: {
    fontSize: 20,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 16,
    gap: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

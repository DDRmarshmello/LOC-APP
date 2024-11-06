import * as React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import RoundBtn from "~/components/rounderBtn";
import { useColorScheme } from "~/lib/useColorScheme";
import Feather from "@expo/vector-icons/Feather";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { router } from "expo-router";


interface dt {
  id: number;
  date: string;
  Location: string;
  Person: string;
}
const DATA: dt[] = [
  {
    id: 1,
    date: "2024-01-01 06:00 P.M.",
    Location: "100010101010",
    Person: "Angel Dilone",
  },
  {
    id: 2,
    date: "2024-01-01 06:00 P.M.",
    Location: "100010101010",
    Person: "Angel Dilone",
  },
  {
    id: 3,
    date: "2024-01-01 06:00 P.M.",
    Location: "100010101010",
    Person: "Angel Dilone",
  },
  {
    id: 4,
    date: "2024-01-01 06:00 P.M.",
    Location: "100010101010",
    Person: "Angel Dilone",
  },
  {
    id: 5,
    date: "2024-01-01 06:00 P.M.",
    Location: "100010101010",
    Person: "Angel Dilone",
  },
];

export default function Screen() {
  const { isDarkColorScheme } = useColorScheme();
  return (
    <ScrollView className="bg-white dark:bg-gray-800">
      <Animated.Image
      entering={FadeInUp.delay(200).duration(1000).springify()}
        className="h-full w-full absolute"
        style={{ bottom: 130 }}
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

      <View className="mt-64" style={styles.actionRow}>
        <RoundBtn icon={"add"} text={"Nuevo"} onPress={()=>router.push("/newItems")}/>
        <RoundBtn icon={"refresh"} text={"Recargar"} />
        <RoundBtn icon={"list"} text={"Detalle"} />
      </View>

      <Text className="text-black dark:text-white" style={styles.sectionHeader}>
        Registros
      </Text>
      <View style={styles.transactions} className="bg-gray-400 ">
        {DATA.length === 0 && (
          <Text style={{ padding: 14 }}>No registros yet</Text>
        )}
        {DATA.map((Data) => (
          <View
            key={Data.id}
            style={{ flexDirection: "row", alignItems: "center", gap: 16 }}
          >
            <View
              className="bg-gray-300 dark:bg-gray-500"
              style={styles.circle}
            >
              <Feather
                name="align-justify"
                size={24}
                color={isDarkColorScheme ? "white" : "dark"}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: "400" }}>{Data.Person}</Text>
              <Text style={{ color: Colors.gray, fontSize: 12 }}>
                {Data.date.toLocaleString()}
              </Text>
            </View>
            <Text>{Data.Location}</Text>
          </View>
        ))}
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

const Colors = {
  primary: "#3D38ED",
  primaryMuted: "#C9C8FA",
  background: "#F5F5F5",
  dark: "#141518",
  gray: "#626D77",
  lightGray: "#D8DCE2",
};

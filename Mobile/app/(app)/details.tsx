import * as React from "react";
import {
  View,
  ScrollView,
  StatusBar,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  FlatList,
  Platform,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useLocalSearchParams } from "expo-router"
import { useAuth } from "~/services/AuthContext";
import { IMAGES_URL } from "~/lib/constants";
export default function Screen() {

  const { id } = useLocalSearchParams();
  const { userInfo } = useAuth();
  console.log(id)

  const details = userInfo?.eventRegisters.find(x => x.id?.toString() ===id)

  const photo = [
    {
      id: 1,
      name: "Montañas al amanecer",
      url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    },
    {
      id: 2,
      name: "Playa con palmeras",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
      id: 3,
      name: "Bosque en otoño",
      url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    },
    {
      id: 4,
      name: "Ciudad de noche",
      url: "https://images.unsplash.com/photo-1533553761409-df8db232d936",
    },
    {
      id: 5,
      name: "Dunas en el desierto",
      url: "https://images.unsplash.com/photo-1519181245277-cffeb31da2a5",
    },
  ];

  const openMap = (latitude: string, longitude: string) => {
    const destination = `${latitude},${longitude}`;

    let url = "";
    if (Platform.OS === "ios") {
      // Usar Apple Maps o Google Maps en iOS
      url = `http://maps.apple.com/?daddr=${destination}`;
    } else {
      // Usar Google Maps en Android
      url = `google.navigation:q=${destination}`;
    }

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert("Error", "No se pudo abrir la aplicación de mapas.");
        }
      })
      .catch((err) =>
        Alert.alert("Error", "No se pudo abrir la aplicación de mapas.")
      );
  };

  return (
    <View className="bg-white h-full w-full dark:bg-gray-800">
      <ScrollView>
        <StatusBar barStyle={"light-content"} />
        <Image
          className="h-full w-full absolute"
          style={{ bottom: "25%" }}
          source={require("../../assets/images/background.png")}
        />

        <View className="flex items-center" style={{ top: 90 }}>
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-white font-bold tracking-wider text-5xl"
          >
            Geo App
          </Animated.Text>
        </View>
        <View className="h-full w-full flex justify-around pt-60 pb-10">
          <View className="flex items-center mx-4">
            <Animated.View
              entering={FadeInDown.duration(1000).springify()}
              className="p-2 rounded-2xl w-full mb-3"
            >
              <Text className="text-black dark:text-white text-3xl font-bold">
                Nombre/empresa
              </Text>
              <Text className="text-black dark:text-white text-2xl">
                {details?.nombre_empresa}
              </Text>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.duration(1000).springify()}
              className="p-2 rounded-2xl w-full mb-3"
            >
              <Text className="text-black dark:text-white text-3xl font-bold">
                Cedula/Rnc
              </Text>
              <Text className="text-black dark:text-white text-2xl">
                {details?.cedula_rnc}
              </Text>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.duration(1000).springify()}
              className="p-2 rounded-2xl w-full mb-3"
            >
              <TouchableOpacity onPress={() => openMap("18.4861", "-69.9312")}>
                <Text className="text-black dark:text-white text-3xl font-bold">
                  Locación
                </Text>
                <Text className="text-black dark:text-white text-2xl">
                  {details?.latitud + " " + details?.longitud}
                </Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.duration(1000).springify()}
              className="p-2 rounded-2xl w-full mb-3"
            >
              <Text className="text-black dark:text-white text-3xl font-bold">
                Descripción
              </Text>
              <Text className="text-black dark:text-white text-2xl">
                {details?.description}
              </Text>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.duration(1000).springify()}
              className="p-2 rounded-2xl w-full mb-3"
            >
              <Text className="text-black dark:text-white text-3xl font-bold">
                Notas
              </Text>
              <Text className="text-black dark:text-white text-2xl">
                {details?.notas}
              </Text>
            </Animated.View>

            <FlatList
              data={details?.images}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View className="w-60 h-60 mt-8 bg-gray-300 rounded-xl mr-3">
                  <Image
                    source={{ uri:IMAGES_URL + item.description + ".jpg" }}
                    className="w-full h-full rounded-xl mr-3"
                  />
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

import * as React from "react";
import {
  View,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Text } from "~/components/ui/text";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import Feather from "@expo/vector-icons/Feather";
import { usePhotoContext } from "~/services/PhotoContext";
import { useEventContext } from "~/services/EventContext";
import { router } from "expo-router";
import { uploadPhotos } from "~/services/FormServices";
import { useState, useEffect } from "react";
import { EventRegister } from "~/lib/Types";
import { useAuth } from "~/services/AuthContext";
import * as Location from "expo-location";
import { useColorScheme } from "~/lib/useColorScheme";

export default function Screen() {
  const { isDarkColorScheme } = useColorScheme();

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  const { user } = useAuth();
  const { event, setEvent } = useEventContext(); /* {
    username: user?.username ?? "",
    usernameId: user?.id ?? 0,
    description: "",
    cedula_rnc: "",
    latitud: location?.coords.latitude.toString() ?? "",
    longitud: location?.coords.longitude.toString() ?? "",
    notas: "",
    nombre_empresa: "",
  }); */

  const { photos, removePhoto, resetPhotos } = usePhotoContext();

  const handleChange = (name: keyof EventRegister, value: string) => {
    setEvent((prevData) => ({
      ...prevData,
      [name]: value,
      latitud: location?.coords.latitude.toString() ?? "",
      longitud: location?.coords.longitude.toString() ?? "",
      username: user?.username ?? "",
      usernameId: user?.id ?? 0,
    }));
  };

  const handleSave = async () => {
    let response = await uploadPhotos(photos, JSON.stringify(event));
    if (response) {
      resetPhotos();
      setEvent({
        username: "",
        usernameId: 0,
        description: "",
        cedula_rnc: "",
        latitud: "",
        longitud: "",
        notas: "",
        nombre_empresa: "",
      });

      router.replace("/(app)");
    }
  };

  if (!location) {
    return (
      <SafeAreaView
        style={[styles.container, styles.horizontal]}
        className="bg-white dark:bg-gray-800"
      >
        <ActivityIndicator
          size="large"
          color={isDarkColorScheme ? "#fafafa" : "#0284c7"}
        />
      </SafeAreaView>
    );
  }

  return (
    <View className="bg-white h-full w-full dark:bg-gray-800">
      <ScrollView>
        <StatusBar barStyle={"light-content"} />
        <Image
          className="h-full w-full absolute"
          style={photos.length === 0 ? { bottom: "15%" } : { bottom: "22%" }}
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
              className="bg-black/5  dark:bg-white p-2 rounded-2xl w-full mb-3"
            >
              <TextInput
                placeholder="Nombre/Empresa"
                placeholderTextColor={"gray"}
                value={event.nombre_empresa}
                onChangeText={(value) => handleChange("nombre_empresa", value)}
              />
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              className="bg-black/5 dark:bg-white p-2 rounded-2xl w-full mb-3"
            >
              <TextInput
                placeholder="Cedula/RNC"
                placeholderTextColor={"gray"}
                value={event.cedula_rnc}
                onChangeText={(value) => handleChange("cedula_rnc", value)}
              />
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              className="bg-black/5 dark:bg-white p-2 rounded-2xl w-full mb-3"
            >
              <TextInput
                placeholder="Descripcion"
                placeholderTextColor={"gray"}
                value={event.description ?? undefined}
                onChangeText={(value) => handleChange("description", value)}
              />
            </Animated.View>
            <Animated.View
              entering={FadeInDown.delay(200).duration(1000).springify()}
              className="bg-black/5 dark:bg-white p-2 rounded-2xl w-full mb-3"
            >
              <TextInput
                placeholder="Notas Extra"
                placeholderTextColor={"gray"}
                value={event.notas ?? undefined}
                onChangeText={(value) => handleChange("notas", value)}
              />
            </Animated.View>

            <TouchableOpacity
              onPress={() => {
                router.replace("/cam");
              }}
            >
              <Animated.View
                entering={FadeInDown.delay(400).duration(1000).springify()}
                className="my-5"
              >
                <Feather name="camera" size={24} color="white" />
              </Animated.View>
            </TouchableOpacity>

            <FlatList
              data={photos}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View className="w-60 h-60 mt-8 bg-gray-300 rounded-xl mr-3">
                  <Image
                    source={{ uri: item }}
                    className="w-full h-full rounded-xl mr-3"
                  />

                  {/* Icono de X para eliminar la foto */}
                  <TouchableOpacity
                    onPress={() => removePhoto(index)} // Llama a la función para eliminar la foto */
                    className="absolute top-2 right-2 bg-white p-2 rounded-full"
                  >
                    <Feather name="x" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              )}
            />

            <Animated.View
              entering={FadeInDown.delay(400).duration(1000).springify()}
              className="w-full justify-center items-center mt-8"
            >
              <TouchableOpacity
                onPress={handleSave}
                className="w-40 bg-sky-400 p-4 rounded-2xl"
              >
                <Text className="text-xl font-bold text-white text-center">
                  Guardar
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

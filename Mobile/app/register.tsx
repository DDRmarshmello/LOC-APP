import * as React from "react";
import {
  View,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text } from "~/components/ui/text";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
import { Link } from "expo-router";
import { useState } from "react";
import { RegisterUser } from "~/lib/Types";
import { useAuth } from "~/services/AuthContext";

export default function Screen() {
  const [userData, setUserData] = useState<RegisterUser>({
    username: "",
    email: "",
    password: "",
  });
  const { register } = useAuth();

  const handleChange = (name: keyof RegisterUser, value: string) => {
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    await register(userData); // Utiliza el método login del contexto
  };

  return (
    <View className="bg-white h-full w-full dark:bg-gray-800">
      <StatusBar barStyle={"light-content"} />
      <Image
        className="h-full w-full absolute"
        source={require("../assets/images/background.png")}
      />

      <View className="flex-row justify-around w-full absolute">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          className="h-[225] w-[90]"
          source={require("../assets/images/light.png")}
        />
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify()}
          className="h-[160] w-[65]"
          source={require("../assets/images/light.png")}
        />
      </View>

      <View className="h-full w-full flex justify-around pt-64 pb-10">
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-white font-bold tracking-wider text-5xl"
          >
            Register
          </Animated.Text>
        </View>

        {/* Form */}
        <View className="flex items-center mx-4">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-black/5 dark:bg-white p-5 rounded-2xl w-full mb-3"
          >
            <TextInput placeholder="Username" placeholderTextColor={"gray"} />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-black/5 p-5 dark:bg-white rounded-2xl w-full mb-3"
          >
            <TextInput placeholder="Email" placeholderTextColor={"gray"} />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="bg-black/5 p-5 dark:bg-white rounded-2xl w-full mb-3"
          >
            <TextInput
              placeholder="Contraseña"
              placeholderTextColor={"gray"}
              secureTextEntry
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="w-full"
          >
            <TouchableOpacity className="w-full bg-sky-400 p-4 rounded-2xl">
              <Text className="text-xl font-bold text-white text-center">
                Registrarse
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="flex-row justify-center my-4"
          >
            <Text className="text-black dark:text-white">Tienes cuenta ? </Text>
            <TouchableOpacity>
              <Link href="/login">
                <Text className="text-sky-600">Iniciar Sesión</Text>
              </Link>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

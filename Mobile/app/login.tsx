import * as React from "react";
import { useState } from "react";
import {
  View,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LoginUser } from "~/lib/Types";
import { Text } from "~/components/ui/text";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Link } from "expo-router";
import { useAuth } from "~/services/AuthContext";
import { router } from 'expo-router';

export default function Screen() {
  const { login, error, isLoading } = useAuth();
  const [userData, setUserData] = useState<LoginUser>({
    username: "",
    PasswordHash: "",
  });

  const handleChange = (name: keyof LoginUser, value: string) => {
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    await login(userData); // Utiliza el método login del contexto
  };

  return (
    <View className="bg-white h-full w-full dark:bg-gray-800">
      <StatusBar barStyle={"light-content"} />
      <Image
        className="h-full w-full absolute"
        source={require("../assets/images/background.png")}
      />

      {/* Ligths */}

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

      <View className="h-full w-full flex justify-around pt-52 pb-10">
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="text-white font-bold tracking-wider text-5xl"
          >
            Login
          </Animated.Text>
        </View>

        {/* Form */}
        <View className="flex items-center mx-4">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className="bg-black/5  dark:bg-white p-5 rounded-2xl w-full mb-3"
          >
            <TextInput
              placeholder="Username"
              value={userData.username}
              onChangeText={(value) => handleChange("username", value)}
              placeholderTextColor={"gray"}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className="bg-black/5 dark:bg-white p-5 rounded-2xl w-full mb-3"
          >
            <TextInput
              placeholder="Password"
              placeholderTextColor={"gray"}
              secureTextEntry
              value={userData.PasswordHash}
              onChangeText={(value) => handleChange("PasswordHash", value)}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="w-full"
          >
            <TouchableOpacity
              className="w-full bg-sky-400 p-4 rounded-2xl"
              onPress={() => {
                handleLogin();
                // Navigate after signing in. You may want to tweak this to ensure sign-in is
                // successful before navigating.
                router.replace("/");
              }}
            >
              <Text className="text-xl font-bold text-white text-center">
                Iniciar Sesión
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="flex-row justify-center my-4"
          >
            <Text className="text-black dark:text-white">
              No tienes cuenta ?{" "}
            </Text>
            <TouchableOpacity>
              <Link href="/register">
                <Text className="text-sky-600">Crear Cuenta</Text>
              </Link>
            </TouchableOpacity>
          </Animated.View>

          {error && <Text className="text-black dark:text-white">{error}</Text>}
        </View>
      </View>
    </View>
  );
}

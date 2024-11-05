import * as React from "react";
import { useState, useEffect } from "react";
import { View, Image, StatusBar, TextInput, TouchableOpacity } from "react-native";
import { LoginUser } from "~/lib/Types";
import { Text } from "~/components/ui/text";
import Animated, {FadeIn, FadeInDown, FadeInUp, FadeOut} from "react-native-reanimated";import { Link } from "expo-router";


export default function Screen() {
    const [userData, setUserData] = useState<LoginUser>({ username: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <View className="bg-white h-full w-full dark:bg-gray-800">
        <StatusBar barStyle={"light-content"}/>
        <Image className="h-full w-full absolute" source={require('../assets/images/background.png')}/>

        {/* Ligths */}

        <View className="flex-row justify-around w-full absolute">
            <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()} className="h-[225] w-[90]" source={require('../assets/images/light.png')}/>
            <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()} className="h-[160] w-[65]" source={require('../assets/images/light.png')}/>
        </View>


        <View className="h-full w-full flex justify-around pt-52 pb-10">
            
            <View className="flex items-center"> 
                <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-5xl">Login</Animated.Text>
            </View>

            {/* Form */}
            <View className="flex items-center mx-4">

                <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5  dark:bg-white p-5 rounded-2xl w-full mb-3">
                    <TextInput placeholder="Email" placeholderTextColor={'gray'}/>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 dark:bg-white p-5 rounded-2xl w-full mb-3">
                    <TextInput placeholder="Password" placeholderTextColor={'gray'} secureTextEntry/>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="w-full">
                    <TouchableOpacity className="w-full bg-sky-400 p-4 rounded-2xl">
                        <Text className="text-xl font-bold text-white text-center">Iniciar Sesión</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="flex-row justify-center my-4">
                    <Text className="text-black dark:text-white">No tienes cuenta ? </Text>
                    <TouchableOpacity>
                        <Link href="/register">
                            <Text className="text-sky-600">Crear Cuenta</Text>
                        </Link>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    </View>
  );
}

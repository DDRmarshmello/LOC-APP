import * as React from "react";
import { View } from "react-native";
import 
 Animated, {
  FadeInUp,
  FadeOutDown,
  LayoutAnimationConfig,
} from "react-native-reanimated";
import { Info, Camera } from "~/lib/icons/Info";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Progress } from "~/components/ui/progress";
import { Text } from "~/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Link } from "expo-router";

const GITHUB_AVATAR_URI =
  "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg";

export default function Screen() {

  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30 ">
      <Card className="w-full max-w-sm p-6 rounded-2xl">
        <CardHeader className="items-center">
          <CardTitle className="text-2xl font-bold text-center">
            Datos del Evento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <View className="flex-col justify-center gap-3">
          <Text className="text-lg">Nombre Completo</Text>
              <Input
                className="w-full"
                placeholder="Escribe tu nombre completo..."
                aria-labelledby="inputLabel"
                aria-errormessage="inputError"
              />

              <Text className="text-lg">Cedula</Text>
              <Input
                keyboardType="numeric"
                className="w-full"
                placeholder="Escribe tu cédula..."
                aria-labelledby="inputLabel"
                aria-errormessage="inputError"
              />

              <Text className="text-lg">Correo</Text>
              <Input
                keyboardType="email-address"
                className="w-full"
                placeholder="Escribe tu correo..."
                aria-labelledby="inputLabel"
                aria-errormessage="inputError"
              />

              <Text className="text-lg">Celular</Text>
              <Input
                keyboardType="phone-pad"
                className="w-full"
                placeholder="Escribe tu número de celular..."
                aria-labelledby="inputLabel"
                aria-errormessage="inputError"
              />
            <View className="justify-center items-center">
              <Link href="/cam">
                <Camera size={40} strokeWidth={1.5} className='w-5 h-5 text-foreground/70' />
              </Link>
            </View>
          </View>


        </CardContent>
        <CardFooter className="flex-col gap-3 pb-0">
          <Button
            variant="outline"
            className="shadow shadow-foreground/5"
          >
            <Text>Save</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
}

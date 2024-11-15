import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { usePhotoContext } from "~/services/PhotoContext";
import { Camera } from "~/lib/icons/Info";
import { router } from "expo-router";

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const { addPhoto } = usePhotoContext();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={(ref) => setCameraRef(ref)}
      >
        <TouchableWithoutFeedback
          onPress={async () => {
            if (cameraRef) {
              const photoData = await cameraRef.takePictureAsync();
              addPhoto(photoData.uri);
              router.replace('/newItems');
            }
          }}
        >
          <View className="absolute bottom-20 self-center">
            <Camera
              size={40}
              strokeWidth={1.5}
              className="w-5 h-5 text-foreground/70"
            />
          </View>
        </TouchableWithoutFeedback>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  preview: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "white",
  },
});

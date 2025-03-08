import { ThemedText } from "@/components/ThemedText";
import { Redirect, useRouter } from "expo-router";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

export default function HomeScreen() {
  const { hasPermission } = useCameraPermission();
  const microphonePermission = Camera.getMicrophonePermissionStatus();
  const redirectToPermissions =
    !hasPermission || microphonePermission == "not-determined";

  const device = useCameraDevice("front");
  const router = useRouter;

  if (redirectToPermissions) return <Redirect href={"/permissions"} />;
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 2, borderRadius: 10, overflow: "hidden" }}>
          <Camera style={{ flex: 1 }} device={device} isActive />
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.7 }}>
            <ThemedText>Max FPS : {device?.formats[0].maxFps}</ThemedText>
            <ThemedText>
              Width : {device?.formats[0].photoWidth}
              Height : {device?.formats[0].photoHeight}
            </ThemedText>
            <ThemedText>Camera: {device?.name}</ThemedText>
          </View>
          <View style={{ flex: 0.7 }}></View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

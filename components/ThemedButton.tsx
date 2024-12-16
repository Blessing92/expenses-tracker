import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import {
  OpaqueColorValue,
  Platform,
  Pressable,
  StyleSheet,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

type IconButtonProps = {
  name: string;
  textColor?: string;
  iconName?: IconSymbolName;
  color: string | OpaqueColorValue;
  onPress: () => void;
};

export default function ThemedButton({
  name,
  iconName,
  color,
  textColor,
  onPress,
}: IconButtonProps) {
  return (
    <ThemedView style={styles.buttonContainer}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        onPress={onPress}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        <ThemedView style={[styles.innerContainer, { backgroundColor: color }]}>
          <ThemedText style={[styles.buttonText, { color: textColor }]}>
            {name}
          </ThemedText>
          {iconName && <IconSymbol name={iconName} color={color} size={30} />}
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    height: 50,
    overflow: Platform.OS === "android" ? "hidden" : "hidden",
  },
  pressed: {
    opacity: 0.7,
  },
  button: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
  },
});

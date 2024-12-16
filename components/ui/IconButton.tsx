import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import { OpaqueColorValue, Pressable, StyleSheet } from "react-native";

type IconButtonProps = {
  iconName: IconSymbolName;
  color: string | OpaqueColorValue;
  onPress: () => void;
};

export default function IconButton({
  iconName,
  color,
  onPress,
}: IconButtonProps) {
  return (
    <Pressable
      android_ripple={{ color: "#ccc" }}
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <IconSymbol name={iconName} color={color} size={30} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});

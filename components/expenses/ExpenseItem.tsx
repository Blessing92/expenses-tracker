import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Platform, Pressable, StyleSheet } from "react-native";
import { formattedDate } from "@/utils/utils";

type ExpenseItemProps = {
  expenseItem: Expense;
  onPress: () => void;
};

export default function ExpenseItem({
  expenseItem,
  onPress,
}: ExpenseItemProps) {
  return (
    <ThemedView style={styles.mainContainer}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      >
        <ThemedView style={styles.cardContainer}>
          <ThemedView>
            <ThemedText style={styles.textExpense}>
              {expenseItem.title}
            </ThemedText>
            <ThemedText>{formattedDate(expenseItem.date)}</ThemedText>
          </ThemedView>
          <ThemedView style={styles.costContainer}>
            <ThemedText style={styles.textCost}>
              {expenseItem.amount}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginVertical: 10,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#c1c1c1",
    padding: 20,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  costContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#b3cef4",
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#b3cef4",
  },
  textExpense: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  textCost: {
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  button: {
    flex: 1,
  },
});

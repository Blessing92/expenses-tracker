import { useContext, useState } from "react";
import ExpenseContext from "@/store/expenseContext";
import { router, useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, TextInput } from "react-native";
import ThemedButton from "@/components/ThemedButton";
import { Colors } from "@/constants/Colors";
import IconButton from "@/components/ui/IconButton";

export default function Edit() {
  const { expenses, updateExpense, deleteExpense } = useContext(ExpenseContext);
  const { expenseId } = useLocalSearchParams();

  if (!expenseId) {
    return (
      <ThemedView>
        <ThemedText>No expense selected!</ThemedText>
      </ThemedView>
    );
  }

  const expenseToEdit = expenses.find((expense) => expense.id === expenseId);

  if (!expenseToEdit) {
    return (
      <ThemedView>
        <ThemedText>Expense not found!</ThemedText>
      </ThemedView>
    );
  }

  const [expenseName, setExpenseName] = useState<string>(expenseToEdit.title);
  const [amount, setAmount] = useState<number>(expenseToEdit.amount);

  function updateExpenseHandler() {
    if (expenseName.length === 0) {
      return;
    }

    updateExpense(expenseToEdit!.id, expenseName, amount);

    router.back();
  }

  function cancelHandler() {
    router.back();
  }

  function deleteExpenseHandler() {
    deleteExpense(expenseToEdit!.id);
    router.back();
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.textInputContainer}>
        <ThemedText style={styles.inputLabel}>Expense</ThemedText>
        <TextInput
          style={styles.textInput}
          placeholder="Enter name"
          value={expenseName}
          onChangeText={(newExpense) => setExpenseName(newExpense)}
        />
      </ThemedView>
      <ThemedView style={styles.textInputContainer}>
        <ThemedText style={styles.inputLabel}>Amount</ThemedText>
        <TextInput
          style={styles.textInput}
          placeholder="Enter amount"
          value={amount.toString()}
          keyboardType="numeric"
          onChangeText={(amount) => setAmount(parseFloat(amount))}
        />
      </ThemedView>
      <ThemedView style={styles.buttonContainer}>
        <ThemedButton
          name="Cancel"
          textColor="black"
          color={Colors.button.cancel}
          onPress={cancelHandler}
        />
        <ThemedButton
          name="Update"
          color="#383893"
          textColor="white"
          onPress={updateExpenseHandler}
        />
      </ThemedView>
      <ThemedView style={styles.horizontalLine}>
        <IconButton
          iconName="xmark.bin.circle"
          color={Colors.button.delete}
          onPress={deleteExpenseHandler}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
    marginBottom: 15,
  },
  textInputContainer: {
    marginBottom: 15,
  },
  textInput: {
    height: 45,
    padding: 6,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 18,
    borderColor: "#ccc",
    color: "#454545",
  },
  inputLabel: {
    color: "#434343",
    marginBottom: 5,
  },
  horizontalLine: {
    marginVertical: 15,
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
});

import { Alert, StyleSheet, TextInput } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import ThemedButton from "@/components/ThemedButton";
import { Colors } from "@/constants/Colors";
import { useContext, useState } from "react";
import ExpenseContext from "@/store/expenseContext";
import { generateUniqueId } from "@/utils/utils";
import { ThemedText } from "@/components/ThemedText";
import { router, useLocalSearchParams } from "expo-router";
import IconButton from "@/components/ui/IconButton";

type Values = {
  value: string;
  isValid: boolean;
};

type InputType = {
  amount: Values;
  date: Values;
  description: Values;
};

export default function Modal() {
  const { expenses, addExpense, deleteExpense } = useContext(ExpenseContext);
  const { expenseId } = useLocalSearchParams();

  const expenseToEdit = expenses.find((expense) => expense.id === expenseId);

  const [inputValues, setInputValues] = useState<InputType>({
    amount: {
      value:
        expenseId && expenseToEdit?.amount !== undefined
          ? expenseToEdit.amount.toString()
          : "",
      isValid: true,
    },
    date: {
      value:
        expenseId && expenseToEdit?.date !== undefined
          ? new Date(expenseToEdit.date).toISOString().split("T")[0]
          : "",
      isValid: true,
    },
    description: {
      value:
        expenseId && expenseToEdit?.title !== undefined
          ? expenseToEdit.title
          : "",
      isValid: true,
    },
  });

  function inputChangeHandler(
    inputIdentifier: keyof InputType,
    enteredValue: string,
  ) {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: { isValid: true, value: enteredValue },
      };
    });
  }

  function submitExpenseHandler() {
    const { amount, date, description } = inputValues;

    const amountIsValid =
      !isNaN(parseFloat(amount.value)) && parseFloat(amount.value) > 0;
    const dateIsValid = date.value.toString() !== "Invalid Date";
    const descriptionIsValid = description.value.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputValues((currentInputValues) => ({
        amount: { ...currentInputValues.amount, isValid: amountIsValid },
        date: { ...currentInputValues.date, isValid: dateIsValid },
        description: {
          ...currentInputValues.description,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }

    const newExpense = {
      id: generateUniqueId(),
      title: description.value,
      amount: parseFloat(amount.value),
      date: new Date(date.value),
    };

    addExpense(newExpense);
    setInputValues({
      amount: { value: "", isValid: false },
      date: { value: "", isValid: false },
      description: { value: "", isValid: false },
    });

    router.back();
  }

  function cancelHandler() {
    router.back();
  }

  function deleteExpenseHandler() {
    deleteExpense(expenseToEdit!.id);
    router.back();
  }

  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Your expense</ThemedText>
      <ThemedView style={styles.inputsRow}>
        <ThemedView style={styles.textInputContainer}>
          <ThemedText style={styles.inputLabel}>Amount</ThemedText>
          <TextInput
            style={[
              styles.textInput,
              !inputValues.amount.isValid && { borderColor: "red" },
            ]}
            placeholder="Enter amount"
            value={inputValues.amount.value}
            keyboardType="decimal-pad"
            onChangeText={(value) => inputChangeHandler("amount", value)}
          />
        </ThemedView>
        <ThemedView style={styles.textInputContainer}>
          <ThemedText style={styles.inputLabel}>Date</ThemedText>
          <TextInput
            style={[
              styles.textInput,
              !inputValues.date.isValid && { borderColor: "red" },
            ]}
            placeholder="YYYY-MM-DD"
            value={inputValues.date.value}
            maxLength={10}
            onChangeText={(value) => inputChangeHandler("date", value)}
          />
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.descriptionContainer}>
        <ThemedText style={styles.inputLabel}>Description</ThemedText>
        <TextInput
          style={[
            styles.textInput,
            styles.inputMultiline,
            !inputValues.date.isValid && { borderColor: "red" },
          ]}
          placeholder="Description"
          value={inputValues.description.value}
          multiline={true}
          onChangeText={(value) => inputChangeHandler("description", value)}
        />
      </ThemedView>

      {formIsInvalid && (
        <ThemedText style={styles.errorText}>Invalid inputs!</ThemedText>
      )}

      <ThemedView style={styles.buttonContainer}>
        <ThemedButton
          name="Cancel"
          textColor="black"
          color={Colors.button.cancel}
          onPress={cancelHandler}
        />
        <ThemedButton
          name="Add"
          color="#383893"
          textColor="white"
          onPress={submitExpenseHandler}
        />
      </ThemedView>
      {expenseId && (
        <ThemedView style={styles.horizontalLine}>
          <IconButton
            iconName="xmark.bin.circle"
            color={Colors.button.delete}
            onPress={deleteExpenseHandler}
          />
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#10105a",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  buttonContainer: {
    flex: 1,
    gap: 15,
    marginTop: 20,
    marginHorizontal: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInputContainer: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  descriptionContainer: {
    marginBottom: 10,
    marginHorizontal: 6,
  },
  textInput: {
    padding: 6,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    borderColor: "#ccc",
    color: "#454545",
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  inputLabel: {
    color: "#434343",
    marginBottom: 5,
    fontSize: 16,
  },
  horizontalLine: {
    flex: 1,
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    color: "#a60303",
    margin: 8,
  },
});

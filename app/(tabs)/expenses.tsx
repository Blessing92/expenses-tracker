import { FlatList, Platform, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, router, useNavigation } from "expo-router";
import { useContext, useLayoutEffect } from "react";
import ExpenseItem from "@/components/expenses/ExpenseItem";
import ExpenseContext from "@/store/expenseContext";

export default function ExpensesScreen() {
  const navigation = useNavigation();
  const { expenses } = useContext(ExpenseContext);

  function handler(item: Expense) {
    router.push(`/modal?expenseId=${item.id}`);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <Link style={styles.link} href={{ pathname: "/modal" }}>
            +
          </Link>
        </View>
      ),
    });
  }, [navigation]);

  const totalCost = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  if (expenses.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.expenseHeader}>
          <ThemedText style={styles.text}>Total</ThemedText>
          <ThemedText style={styles.text}>${totalCost}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.noExpenseContainer}>
          <ThemedText style={styles.noExpenseText}>No expenses!</ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }
  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <ExpenseItem expenseItem={item} onPress={() => handler(item)} />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <ThemedView style={styles.expenseHeader}>
            <ThemedText style={styles.text}>Total</ThemedText>
            <ThemedText style={styles.text}>${totalCost}</ThemedText>
          </ThemedView>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  expenseHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#3b60a3",
    padding: 10,
    backgroundColor: "#3b60a3",
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
  headerRightContainer: {
    marginHorizontal: 15,
    marginTop: Platform.OS === "android" ? 15 : 0,
  },
  link: {
    flex: 1,
    fontSize: 28,
    color: "#0f69d8",
  },
  noExpenseContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noExpenseText: {
    fontWeight: "medium",
    fontSize: 20,
  },
});

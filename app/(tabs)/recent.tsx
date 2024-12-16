import { StyleSheet, View, FlatList } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link, useNavigation } from "expo-router";
import { useContext, useLayoutEffect } from "react";
import ExpenseContext from "@/store/expenseContext";
import ExpenseItem from "@/components/expenses/ExpenseItem";
import { getLast7DaysExpenses } from "@/utils/utils";

export default function TabTwoScreen() {
  const { expenses } = useContext(ExpenseContext);
  const navigation = useNavigation();

  function handler() {}

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
  }, []);

  const last7DaysExpenses = getLast7DaysExpenses(expenses);
  const totalCost = last7DaysExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={({ item }) => (
          <ExpenseItem expenseItem={item} onPress={handler} />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <ThemedView style={styles.expenseHeader}>
            <ThemedText style={styles.text}>Last 7 Days</ThemedText>
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
    marginRight: 15,
  },
  link: {
    fontSize: 24,
    color: "#0f69d8",
  },
});

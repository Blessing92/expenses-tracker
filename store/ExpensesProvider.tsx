import { ReactNode, useMemo, useState } from "react";
import ExpenseContext from "@/store/expenseContext";

export function ExpensesProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  function addExpense(newExpense: Expense) {
    setExpenses((currentExpenses) => [...currentExpenses, newExpense]);
  }

  function deleteExpense(id: string) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id),
    );
  }

  function updateExpense(id: string, title: string, amount: number) {
    setExpenses((currentExpense) =>
      currentExpense.map((expense) =>
        expense.id === id ? { ...expense, title, amount } : expense,
      ),
    );
  }

  const expensesContextValues = useMemo(
    () => ({
      expenses,
      addExpense,
      deleteExpense,
      updateExpense,
    }),
    [expenses],
  );

  return (
    <ExpenseContext.Provider value={expensesContextValues}>
      {children}
    </ExpenseContext.Provider>
  );
}

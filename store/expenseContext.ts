import { createContext } from "react";

type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (newExpense: Expense) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, title: string, amount: number) => void;
};

const ExpenseContext = createContext<ExpenseContextType>(
  {} as ExpenseContextType,
);

export default ExpenseContext;

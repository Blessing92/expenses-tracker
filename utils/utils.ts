export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
};

export const formattedDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const getLast7DaysExpenses = (expenses: Expense[]) => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);

  sevenDaysAgo.setDate(today.getDate() - 7);

  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= sevenDaysAgo && expenseDate <= today;
  });
};

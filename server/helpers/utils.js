export function calculateSavedChange(transactions) {
  return transactions.reduce((acc, item) => {
    if (item.amount > 0) {
      return acc + (Math.ceil(item.amount) - item.amount);
    }
    return acc;
  }, 0);
}

export function filterTransactions(transactions) {
  return transactions.filter(({ amount, name }) => {
    if (amount > 0 && Math.ceil(amount) - amount !== 0 && !name.toUpperCase().includes("BLUECENT")) {
      return true;
    }
    return false;
  });
}

export function splitTransactions(transactions, lastContribDate) {
  let active = [];
  let contributed = [];
  transactions.forEach(item => {
    if (moment(item.date, "YYYY-MM-DD").isBefore(lastContribDate)) {
      contributed.push(item);
    } else {
      active.push(item);
    }
  });
  return { active, contributed };
}

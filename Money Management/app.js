let money = {
  income: 0,
  expense: 0,
  saving: 0,
  transHistory: [],
};

// Select All Dom Element
let addMoney = document.getElementById("addMoney");
let transactionType = document.getElementById("transactionType");
let amount = document.getElementById("amount");
let description = document.getElementById("description");
document.addEventListener("DOMContentLoaded", () => {
  transactionHistory();
});

addMoney.addEventListener("submit", (e) => {
  e.preventDefault();
  manageMoney(transactionType.value, +amount.value, description.value);
  transactionHistory();
  amount.value = "";
  description.value = "";
});

// Add income and expense
function manageMoney(transactionType, amount, description) {
  let transaction = {
    date: new Date().toLocaleDateString(),
    type: transactionType,
    amount,
    description,
  };
  if (transactionType === "income") {
    money.transHistory.push(transaction);
    money.income += amount;
    document.getElementById("income").textContent = `${money.income} BDT`;
  }
  if (transactionType === "expense") {
    let checkExp = money.expense;
    let checkInc = money.income;
    if (checkInc - (checkExp += amount) < 0) {
      alert("You Don't have anough money for expense");
    } else {
      money.transHistory.push(transaction);
      money.expense += amount;
      document.getElementById("expense").textContent = `${money.expense} BDT`;
    }
  }
  money.saving = money.income - money.expense;
  document.getElementById("saving").textContent = `${money.saving} BDT`;
}

// Show transaction history
function transactionHistory() {
  if (money.transHistory.length === 0) {
    document.getElementById("history").innerHTML =
      "<h3 class='text-xl p-4'>Transaction History is Empty</h3>";
  } else {
    document.getElementById("history").innerHTML =""
    money.transHistory.forEach((history) => {
      document.getElementById("history").innerHTML += ` <tr>
                            <td class="px-6 py-4 whitespace-nowrap">${
                              history.date
                            }</td>
                            <td class="px-6 py-4 whitespace-nowrap font-semibold">${
                              history.type.toUpperCase()
                            }</td>
                            <td class="px-6 py-4 whitespace-nowrap ${
                              history.type === "income"
                                ? "text-green-600"
                                : "text-red-600"
                            }">${history.amount} BDT</td>
                            <td class="px-6 py-4 whitespace-nowrap">${
                              history.description
                            }</td>
                        </tr>
                        `;
    });
  }
}

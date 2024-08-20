<template>
  <div class="funds-manager">
    <h1>资金管理</h1>
    <div class="controls">
      <form @submit.prevent="addTransaction" class="add-form">
        <input v-model="transactionDescription" placeholder="描述" />
        <input v-model.number="transactionAmount" type="number" placeholder="金额" />
        <button type="submit">{{ editingIndex === null ? '添加' : '更新' }}</button>
      </form>
      <input v-model="searchQuery" placeholder="搜索" class="search-input" />
    </div>
    <ul>
      <li v-for="(transaction, index) in filteredTransactions" :key="index">
        <span>{{ transaction.description }} - {{ transaction.amount | currency }}</span>
        <div class="actions">
          <button @click="editTransaction(index)" class="edit">编辑</button>
          <button @click="removeTransaction(index)" class="delete">删除</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transactionDescription: '',
      transactionAmount: null,
      searchQuery: '',
      transactions: [],
      editingIndex: null
    };
  },
  computed: {
    filteredTransactions() {
      const query = this.searchQuery.toLowerCase();
      return this.transactions.filter(transaction =>
        transaction.description.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    addTransaction() {
      if (this.transactionDescription.trim() && this.transactionAmount != null) {
        const newTransaction = {
          description: this.transactionDescription.trim(),
          amount: this.transactionAmount
        };

        if (this.editingIndex !== null) {
          this.transactions[this.editingIndex] = newTransaction;
          this.editingIndex = null;
        } else {
          this.transactions.push(newTransaction);
        }

        this.transactionDescription = '';
        this.transactionAmount = null;
      }
    },
    removeTransaction(index) {
      this.transactions.splice(index, 1);
    },
    editTransaction(index) {
      this.editingIndex = index;
      this.transactionDescription = this.transactions[index].description;
      this.transactionAmount = this.transactions[index].amount;
    }
  },
  filters: {
    currency(value) {
      if (!value) return '0.00';
      return `$${value.toFixed(2)}`;
    }
  }
};
</script>

<style scoped>
.funds-manager {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f4f7f6;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  font-size: 2.2rem;
  margin-bottom: 20px;
  text-align: center;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.add-form {
  display: flex;
  gap: 10px;
}

input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 1rem;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  padding: 10px 15px;
  border-radius: 6px;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #0056b3;
}

button:active {
  transform: scale(0.98);
}

button.edit {
  background-color: #28a745;
}

button.edit:hover {
  background-color: #218838;
}

button.delete {
  background-color: #dc3545;
}

button.delete:hover {
  background-color: #c82333;
}

.search-input {
  border: 1px solid #007bff;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.actions {
  display: flex;
  gap: 8px;
}
</style>

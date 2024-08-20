<template>
  <div class="marketing-page">
    <h1>营销页面</h1>
    <div class="controls">
      <form @submit.prevent="addInfo" class="add-form">
        <input v-model="newInfo" placeholder="输入信息" />
        <button type="submit">{{ editingIndex === null ? '添加信息' : '更新信息' }}</button>
      </form>
      <input v-model="searchQuery" placeholder="搜索信息" class="search-input" />
    </div>
    <ul>
      <li v-for="(info, index) in filteredInfoList" :key="index">
        <span>{{ info }}</span>
        <div class="buttons">
          <button @click="editInfo(index)" class="edit">编辑</button>
          <button @click="removeInfo(index)" class="delete">删除</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newInfo: '',
      searchQuery: '',
      infoList: [],
      editingIndex: null
    };
  },
  computed: {
    filteredInfoList() {
      const query = this.searchQuery.toLowerCase();
      return this.infoList.filter(info => info.toLowerCase().includes(query));
    }
  },
  methods: {
    addInfo() {
      if (this.newInfo.trim()) {
        if (this.editingIndex !== null) {
          this.infoList[this.editingIndex] = this.newInfo.trim();
          this.editingIndex = null;
        } else {
          this.infoList.push(this.newInfo.trim());
        }
        this.newInfo = '';
      }
    },
    removeInfo(index) {
      this.infoList.splice(index, 1);
    },
    editInfo(index) {
      this.editingIndex = index;
      this.newInfo = this.infoList[index];
    }
  }
};
</script>

<style scoped>
.marketing-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f0f4f8; /* Light background color */
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.controls {
  display: flex;
  flex-direction: column;
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
  font-size: 16px;
  flex-grow: 1;
}

button {
  padding: 10px 15px;
  border-radius: 6px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  transform: scale(1.05);
}

button:active {
  background-color: #0056b3;
  transform: scale(0.98);
}

button.add {
  background-color: #007bff;
  color: white;
}

button.add:hover {
  background-color: #0056b3;
}

button.edit {
  background-color: #28a745;
  color: white;
}

button.edit:hover {
  background-color: #218838;
}

button.delete {
  background-color: #dc3545;
  color: white;
}

button.delete:hover {
  background-color: #c82333;
}

.search-input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #007bff;
  font-size: 16px;
  margin-top: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

span {
  flex-grow: 1;
  font-size: 16px;
  color: #555;
}

.buttons {
  display: flex;
  gap: 10px;
}
</style>

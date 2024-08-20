<template>
  <div class="order-management">
    <header class="page-header">
      <h1>订单管理</h1>
      <p class="breadcrumb">订单列表</p>
    </header>

    <!-- 添加图片 -->
    <div class="image-container">
      <img src="../dashboard/img/c.png" alt="订单管理图片" class="header-image" />
    </div>

    <div class="controls">
      <input v-model="searchQuery" placeholder="搜索订单..." class="search-input" />
      <button @click="showAddOrderModal = true" class="btn btn-success">添加订单</button>
    </div>

    <!-- 删除成功提示框 -->
    <div v-if="deleteSuccess" class="alert alert-success">
      订单删除成功！
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>订单号</th>
            <th>客户姓名</th>
            <th>商品名称</th>
            <th>商品数量</th>
            <th>订单金额</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredOrders.length === 0">
            <td :colspan="6" class="no-data">暂无订单</td>
          </tr>
          <tr v-for="order in filteredOrders" :key="order.orderId">
            <td>{{ order.orderId }}</td>
            <td>{{ order.customerName }}</td>
            <td>{{ order.tradeName }}</td>
            <td>{{ order.number }}</td>
            <td>{{ order.amount }}</td>
            <td>
              <button class="btn btn-warning btn-sm" @click="editOrder(order)">修改</button>
              <button class="btn btn-danger btn-sm" @click="deleteOrder(order.orderId)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 添加订单弹出框 -->
    <div v-if="showAddOrderModal" class="modal">
      <div class="modal-content">
        <h2>添加订单</h2>
        <form @submit.prevent="addOrder">
          <label for="customerName">客户姓名:</label>
          <input v-model="order.customerName" id="customerName" type="text" required />
          
          <label for="tradeName">商品名称:</label>
          <input v-model="order.tradeName" id="tradeName" type="text" required />
          
          <label for="number">商品数量:</label>
          <input v-model="order.number" id="number" type="number" min="1" required />
          
          <label for="amount">订单金额:</label>
          <input v-model="order.amount" id="amount" type="number" required />

          <button type="submit" class="btn btn-success">添加订单</button>
          <button type="button" @click="closeAddOrderModal" class="btn btn-secondary">关闭</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      orders: [],
      showAddOrderModal: false,
      order: { // 确保初始化时包含所有属性
        customerName: '',
        tradeName: '',
        number: '',
        amount: ''
      },
      searchQuery: '',
      deleteSuccess: false,
    };
  },
  computed: {
    filteredOrders() {
      return this.orders.filter(order => {
        if (!order) return false; // 检查order是否为null或undefined
        const { customerName, tradeName, orderId } = order;
        return (
          (customerName && customerName.includes(this.searchQuery)) ||
          (tradeName && tradeName.includes(this.searchQuery)) ||
          (orderId && orderId.toString().includes(this.searchQuery))
        );
      });
    }
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await axios.get('http://localhost:8081/order/orderList');
        this.orders = response.data.data;
      } catch (error) {
        console.error('获取订单数据失败:', error);
      }
    },
    async addOrder() {
      if (!this.order) {
        console.error('order对象不存在');
        return;
      }
      try {
        const response = await axios.post('http://localhost:8081/order/orderAdd', {
          customerName: this.order.customerName,
          tradeName: this.order.tradeName,
          number: this.order.number,
          amount: this.order.amount
        });
        this.orders.push(response.data.data); // 假设服务器返回新添加的订单
        this.showAddOrderModal = false;
        this.order = { customerName: '', tradeName: '', number: '', amount: '' };
        alert('订单添加成功');
      } catch (error) {
        console.error('添加订单失败:', error);
      }
    },
    async deleteOrder(orderId) {
      try {
        await axios.delete(`http://localhost:8081/order/orderDelete/${orderId}`);
        this.orders = this.orders.filter(order => order.orderId !== orderId);
        this.deleteSuccess = true;
        setTimeout(() => {
          this.deleteSuccess = false;
        }, 3000);
      } catch (error) {
        console.error('删除订单失败:', error);
      }
    },
    closeAddOrderModal() {
      this.showAddOrderModal = false;
      this.order = { customerName: '', tradeName: '', number: '', amount: '' }; // 清空表单数据
    }
  },
  mounted() {
    this.fetchOrders();
  }
};
</script>

<style scoped>
.order-management {
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.page-header {
  text-align: center;
  margin-bottom: 20px;
}

.page-header h1 {
  font-size: 2.4rem;
  color: #333;
}

.page-header .breadcrumb {
  font-size: 1.1rem;
  color: #666;
}

/* 新增图片样式 */
.image-container {
  text-align: center;
  margin-bottom: 15px;
}

.header-image {
  max-width: 100%;
  height: auto;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.search-input {
  padding: 10px;
  font-size: 16px;
  width: 250px;
  border: 2px solid #4CAF50;
  border-radius: 4px;
}

.btn {
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-warning {
  background-color: #ffc107;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.table-container {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th, table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

table th {
  background-color: #4CAF50;
  color: #fff;
}

table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.no-data {
  text-align: center;
  color: #999;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #c69c9c;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.modal-content h2 {
  margin-top: 0;
}

.modal-content form {
  display: flex;
  flex-direction: column;
}

.modal-content form label {
  margin-bottom: 5px;
}

.modal-content form input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #0d8997;
  border-radius: 4px;
}
.alert {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid transparent;
  border-radius: 4px;
}
.alert-success {
  color: #3c763d;
  background-color: #dff0d8;
  border-color: #d6e9c6;
}
</style>
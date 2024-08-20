<template>
  <div id="app" class="app-container">
    <div class="side-image left-image">
      <img src="../dashboard/img/b.png" alt="Left Image">
    </div>
    <div class="container">
      <header class="page-header">
        <h1>后台首页</h1>
        <p class="breadcrumb">会员列表</p>
      </header>

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <div class="d-flex justify-content-center align-items-center w-100">
            <input type="text" class="form-control search-input-short" placeholder="输入添加内容" v-model="title2">
            <button type="button" class="btn btn-success add-button" @click="showForm = true">
              添加会员
            </button>
          </div>
          <div class="collapse navbar-collapse justify-content-center" id="navbar-collapse">
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  高级搜索
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Separated link</a>
                </div>
              </li>
            </ul>
            <form class="form-inline justify-content-center">
              <input type="text" class="form-control search-input-long" placeholder="手机号/邮箱/会员昵称" v-model="title">
              <button type="button" class="btn btn-primary search-button" @click="ordertype = 1">
                搜索
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div v-if="showForm" class="form-container">
        <h2>添加会员</h2>
        <form @submit.prevent="addMember">
          <div class="form-group">
            <label for="name">姓名</label>
            <input type="text" id="name" v-model="member.name" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="time">注册时间</label>
            <input type="text" id="time" v-model="member.time" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="level">等级</label>
            <input type="text" id="level" v-model="member.level" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-primary" @click="memberAdd">提交</button>
          <button type="button" class="btn btn-secondary" @click="showForm = false">取消</button>
        </form>
      </div>

      <div class="table-container">
        <h2>会员列表</h2>
        <table class="table table-hover table-striped table-bordered">
          <thead>
            <tr>
              <th>序号</th>
              <th>会员</th>
              <th>会员等级</th>
              <th>注册时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in newuser" :key="item.memberId">
              <td>{{ index + 1 }}</td>
              <td>
                <div class="user-info">{{ item.memberName }}</div>
                <div class="user-id">用户ID: {{ item.memberId }}</div>
              </td>
              <td>{{ item.memberLevel }}</td>
              <td>{{ item.memberTime }}</td>
              <td>
                <button class="btn btn-warning btn-sm" @click="edit(item.id)">
                  修改
                </button>
                <button class="btn btn-danger btn-sm" @click="delMember(index, item.memberId)">
                  删除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="side-image right-image">
      <img src="../dashboard/img/a.png" alt="Right Image">
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      member: {
        id: '',
        name: '',
        level: '',
        time: '',
        status: ''
      },
      list: [],
      title: '',
      ordertype: 0,
      title2: '',
      showForm: false,
    };
  },
  methods: {
    delMember(index, id) {
      axios.delete(`http://localhost:8081/member/memberDelete/${id}`) // 替换为实际的 API 端点
        .then(response => {
          console.log('删除成功:', response.data);
          this.list.splice(index, 1);
          alert('删除成功');
        })
        .catch(error => {
          alert('删除失败');
          console.error('删除失败:', error);
        });
    },
    memberAdd() {
      axios.post('http://localhost:8081/member/memberAdd', {
        memberLevel: this.member.level,
        memberTime: this.member.time,
        memberName: this.member.name,
      }) // 替换为实际的 API 端点
        .then(response => {
          console.log('添加成功:', response.data);
          this.list.push({ ...this.member });
          this.resetMember();
          alert('添加成功');
        })
        .catch(error => {
          alert('添加失败');
          console.error('添加失败:', error);
        });
    },
    edit(id) {
      alert(`编辑会员 ID: ${id}`);
    },
    resetMember() {
      this.member = {
        name: '',
        time: '',
        level: ''
      };
    }
  },
  computed: {
    newuser() {
      if (this.ordertype === 1 && this.title !== '') {
        return this.list.filter(item => item.name.includes(this.title));
      }
      return this.list;
    }
  },
  mounted() {
    axios.get('http://localhost:8081/member/memberList') // 替换为实际的 API 端点
      .then(response => {
        this.list = response.data.data;
      })
      .catch(error => {
        console.error('获取会员数据失败:', error);
      });
  }
}
</script>

<style scoped>
.app-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: #f7f7f7;
}

.side-image {
  flex: 0 0 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}

.side-image img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.container {
  flex: 1;
  width: 90%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

.navbar {
  width: 100%;
  margin-bottom: 20px;
}

.d-flex {
  display: flex;
}

.justify-content-center {
  justify-content: center;
}

.align-items-center {
  align-items: center;
}

.search-input-short {
  width: 200px;
  border-radius: 6px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-right: 15px;
}

.search-input-long {
  width: 300px;
  border-radius: 6px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-right: 15px;
}

.add-button {
  background-color: #28a745;
  color: white;
  border-radius: 6px;
  padding: 10px 20px;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #218838;
}

.table-container {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.table {
  margin: 0;
  border-collapse: collapse;
  width: 100%;
}

.table thead {
  position: sticky;
  top: 0;
  background-color: #f0f0f0;
}

.table th,
.table td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
}

.table th {
  background-color: #e9ecef;
  color: #333;
}

.table tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

.table tbody tr:hover {
  background-color: #f1f1f1;
}

.user-info {
  font-weight: bold;
}

.user-id {
  color: #777;
}

.search-button {
  background-color: #007bff;
  color: white;
  border-radius: 6px;
  padding: 10px 20px;
  border: none;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #0056b3;
}

.btn {
  margin: 0 5px;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-warning:hover {
  background-color: #e0a800;
  border-color: #d39e00;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

.form-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 100%;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
</style>
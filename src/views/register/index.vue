<template>
    <div class="register-container">
      <h1>注册</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">姓名</label>
          <input type="text" v-model="name" id="name" required />
        </div>
        <div class="form-group">
          <label for="phone">手机号</label>
          <input type="tel" v-model="phone" id="phone" required />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit">注册</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        name: '',
        phone: '',
        password: ''
      };
    },
    methods: {
      handleSubmit() {
        const userData = {
        username: this.name,
        phoneNumber: this.phone,
        password: this.password
      };




      axios.post('http://localhost:8081/register/registerAdd', userData,{headers: {'Content-Type': 'application/json'}})
        .then(response => {
          alert('注册成功');
          console.log('注册成功:', response.data);
        })
        .catch(error => {
          alert('注册失败');
          console.error('注册失败:', error);
        });
      }
    }
  };
  </script>
  <style scoped>
  .register-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #2571b3; /* 淡蓝色背景 */
    font-family: 'Arial', sans-serif;
  }
  
  h1 {
    color: #007acc; /* 深蓝色标题 */
    margin-bottom: 20px;
  }
  
  form {
    background: #ffffff; /* 白色表单背景 */
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    color: #333;
  }
  
  input[type="text"],
  input[type="tel"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #007acc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #007acc; /* 按钮蓝色 */
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #005f99; /* 按钮悬停深蓝色 */
  }
  </style>
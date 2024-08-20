<template>
    <div class="store-info">
      <h2>{{ store.name }}</h2>
      <p>地址: {{ store.address }}</p>
      <p>营业时间: {{ store.hours }}</p>
      <h4>特色服务:</h4>
      <ul>
        <li v-for="(service, index) in store.services" :key="index">{{ service }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      store: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .store-info {
    background: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .store-info h2 {
    color: #006064;
    margin-bottom: 10px;
  }
  
  .store-info p {
    font-size: 14px;
    color: #004d40;
  }
  
  .store-info ul {
    list-style-type: none;
    padding: 0;
  }
  
  .store-info li {
    background: #e0f2f1;
    margin: 5px 0;
    padding: 10px;
    border-radius: 4px;
  }
  </style>
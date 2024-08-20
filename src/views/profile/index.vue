<template>
    <div class="personal-intro">
      <el-row class="demo-avatar demo-basic">
        <el-col :span="12">
          <div class="sub-title">用户头像：</div>
          <div class="demo-basic--circle">
            <div class="block">
              <el-avatar :size="150" :src="circleUrl"></el-avatar>
            </div>
          </div>
        </el-col>
      </el-row>
  
      <h1>{{ name }}</h1>
      <p>{{ bio }}</p>
  
      <h3>技能</h3>
      <ul class="skills-list">
        <li v-for="(skill, index) in skills" :key="index">{{ skill }}</li>
      </ul>
  
      <h3>联系信息</h3>
      <el-row>
        <el-col :span="8">电话: {{ contact.phone }}</el-col>
        <el-col :span="8">邮箱: {{ contact.email }}</el-col>
        <el-col :span="8">地址: {{ contact.address }}</el-col>
      </el-row>
  
      <h3>项目展示</h3>
      <ul class="projects-list">
        <li v-for="(project, index) in projects" :key="index">
          <h4>{{ project.name }}</h4>
          <p>{{ project.description }}</p>
        </li>
      </ul>
  
      <h3>门店介绍</h3>
      <store-info :store="store"></store-info>
  
      <h3>店铺特色</h3>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="一致性 Consistency" name="1">
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
          <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
        <el-collapse-item title="反馈 Feedback" name="2">
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
        <el-collapse-item title="效率 Efficiency" name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
          <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </el-collapse-item>
        <el-collapse-item title="可控 Controllability" name="4">
          <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
          <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
        </el-collapse-item>
        <el-collapse-item title="店铺特色 Store Features" name="5">
          <div>特色服务：我们提供独家的咖啡豆磨制服务，确保每杯咖啡都新鲜醇香。</div>
          <div>便捷购物：自助结账系统，让购物更加快捷，无需排队。</div>
          <div>舒适环境：店内设计简约现代，配备免费Wi-Fi，适合工作与休闲。</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </template>
  
  <script>
  import StoreInfo from '@/layout/components/StoreInfo.vue'; // 假设你将门店介绍的组件命名为 StoreInfo.vue
  
  export default {
    components: {
      StoreInfo,
    },
    data() {
      return {
        circleUrl:"../dashboard/img/666.jpg", // 确保图片路径正确
        name: '春江潮水连海平',
        bio: '澎湃超级连锁店店长',
        skills: ['技能1', '技能2', '技能3'],
        contact: {
          phone: '123-456-7890',
          email: 'example@example.com',
          address: '中国，北京',
        },
        projects: [
          {
            name: '项目1',
            description: '这是项目1的简短描述。',
          },
          {
            name: '项目2',
            description: '这是项目2的简短描述。',
          },
        ],
        store: {
          name: '澎湃超级连锁店',
          address: '中国，北京，XX路100号',
          hours: '9:00 AM - 9:00 PM',
          services: ['快递服务', '咖啡厅', '自助结账'],
        },
        activeName: '1'
      };
    },
  };
  </script>
  
  <style scoped>
  .personal-intro {
    font-family: Arial, sans-serif;
    margin: 20px;
    background: linear-gradient(135deg, #e0f7fa, #80deea, #a7ffeb);
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    color: #004d40;
  }
  
  .personal-intro h1 {
    color: #004d40;
    margin-bottom: 10px;
    text-shadow: 2px 2px #00796b;
  }
  
  .personal-intro p {
    font-size: 16px;
    color: #004d40;
    margin-bottom: 20px;
  }
  
  .skills-list, .projects-list {
    list-style-type: none;
    padding: 0;
  }
  
  .skills-list li, .projects-list li {
    background: linear-gradient(135deg, #b2ebf2, #81d4fa);
    margin: 5px 0;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background 0.3s ease;
  }
  
  .skills-list li:hover, .projects-list li:hover {
    background: linear-gradient(135deg, #81d4fa, #29b6f6);
  }
  
  .projects-list li {
    margin-bottom: 15px;
  }
  
  h3 {
    margin-top: 30px;
    color: #004d40;
    border-left: 5px solid #00796b;
    padding-left: 10px;
    text-shadow: 1px 1px #006064;
  }
  
  .el-row {
    margin-bottom: 15px;
  }
  
  .el-col {
    color: #00796b;
    font-weight: bold;
  }
  
  .el-avatar {
    border: 2px solid #00796b;
  }
  </style>
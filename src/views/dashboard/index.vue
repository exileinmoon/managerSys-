<template>
  <div class="dashboard-container">
    <div class="background">
      <div class="overlay"></div>
      <div class="welcome-content">
        <img src="../dashboard/img/welcome.jpg" class="large-image" alt="" />
        <div class="dashboard-text">
          欢迎来到
          <span @click="openMap" class="link">澎湃</span>
          新门店管理系统
        </div>
        <el-divider></el-divider>
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              门店零售 Retail Store<i class="header-icon el-icon-info" />
            </template>
            <div>
              添加/编辑商品：创建新商品或更新现有商品的信息，如名称、描述、价格、库存量等。
              <img src="../dashboard/img/store.jpg" class="collapse-image" alt="Retail Store" />
            </div>
          </el-collapse-item>
          <el-collapse-item title="电玩 Video Games">
            <div>
              控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
              <img src="../dashboard/img/game.jpg" class="collapse-image" alt="Video Games" />
            </div>
          </el-collapse-item>
          <el-collapse-item title="美食 Gourmet Food">
            <div>
              简化流程：设计简洁直观的操作流程；
              <img src="../dashboard/img/food.jpg" class="collapse-image" alt="Gourmet Food" />
            </div>
          </el-collapse-item>
          <el-collapse-item title="供应链 Courier Service">
            <div>
              用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
              <img src="../dashboard/img/kd.jpg" class="collapse-image" alt="Courier Service" @click="navigateToLogistics" />
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  methods: {
    openMap() {
      const url = `https://api.map.baidu.com/marker?location=30.700305,111.310649&title=三峡大学&content=三峡大学&output=html&src=yourAppName`;
      window.open(url, '_blank');
    },
    navigateToLogistics() {
      this.$router.push({ name: '物流管理' });
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #e0f7fa, #80deea);
  min-height: 100vh;
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  .background {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('/path-to-your-image.jpg');
    background-size: cover;
    background-position: center;

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5); // 半透明遮罩层
    }
  }

  .welcome-content {
    position: relative;
    z-index: 1;
    background: rgba(255, 255, 255, 0.8); // 半透明的白色背景
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    animation: fadeIn 1s ease-in-out;

    .dashboard-text {
      font-size: 36px;
      font-weight: bold;
      color: #00796b;
      text-align: center;
      margin-bottom: 20px;

      .link {
        color: #00796b;
        cursor: pointer;
        text-decoration: underline;

        &:hover {
          color: #004d40;
        }
      }
    }
  }

  .large-image {
  width: 75%;
  height: auto;
  display: block; /* 确保图片是块级元素 */
  margin: 0 auto; /* 上下边距为0，左右边距自动居中 */
  border-radius: 8px;
}

  .collapse-image {
    width: 100%;
    height: auto;
    margin-top: 15px;
    border-radius: 8px;
    cursor: pointer; /* 添加鼠标指针样式 */
  }
}

.header-icon {
  font-size: 20px;
  margin-left: 10px;
  color: #00acc1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
<template>
  <div class="dashboard-container">
    // eslint-disable-next-line vue/no-parsing-error
    <div class="dashboard-text">欢迎来到澎湃新门店管理系统 </div>
    <br>
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    <el-collapse accordion>
      <el-collapse-item>
        <template slot="title">
          一致性 Consistency<i class="header-icon el-icon-info" />
        </template>
        <div>添加/编辑商品：创建新商品或更新现有商品的信息，如名称、描述、价格、库存量等。
          删除商品：从系统中删除不再销售的商品。
          商品分类：组织商品到不同的类别或标签，方便用户浏览和搜索。
          库存管理：跟踪商品库存量，设置警告阈值以避免缺货。
          价格管理：设置商品价格、折扣、促销活动等。
          图片管理：上传和管理商品图片。
          报告与分析：生成销售报告、库存报告、热销商品分析等。
          批量操作：对多个商品进行批量编辑或删除操作</div>
      </el-collapse-item>
      <el-collapse-item title="反馈 Feedback">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>
      <el-collapse-item title="效率 Efficiency">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item title="可控 Controllability">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

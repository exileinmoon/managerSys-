<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1 class="title">商品管理v1.0</h1>
    </div>

    <!-- Add Goods Form -->
    <div class="form-warp">
      <h2 class="sub-title">添加商品</h2>
      <div class="content">
        商品编号：<input type="text" v-model="goods.id" placeholder=""><br>
        商品名称：<input type="text" v-model="goods.name" placeholder=""><br>
        商品价格：<input type="text" v-model="goods.price" placeholder=""><br>
        商品库存：<input type="text" v-model="goods.stock" placeholder=""><br>
        商品种类：
        <select v-model="goods.type">
          <option value="">--选择商品类型--</option>
          <option v-for="type in goodsType" :key="type">{{ type }}</option>
        </select>
      </div>
      <div class="form-btn">
        <button @click="addGoods">确认添加</button>
        <button @click="resetGoods">重置</button>
      </div>
    </div>

    <!-- Goods List -->
    <div class="table-warp">
      <h2 class="sub-title">商品列表</h2>
      <div class="content">
        <table border="1" align="center">
          <tr>
            <th>序号</th>
            <th>编号</th>
            <th>名称</th>
            <th>价格</th>
            <th>库存</th>
            <th>种类</th>
            <th>删除</th>
            <th>选择</th>
          </tr>
          <tr>
            <td :colspan="colNum" height="150px" v-show="goodsArray.length <= 0">
              暂无商品
            </td>
          </tr>
          <tr v-for="(item, index) in goodsArray" :key="item.id">
            <td>{{ index }}</td>
            <td>{{ item.goodId }}</td>
            <td>{{ item.goodName }}</td>
            <td>{{ item.goodPrice }}</td>
            <td style="display: flex">
              <a style="flex: 0.5" href="#" @click.prevent="decrementStock(index)">-</a>
              {{ item.goodStock }}
              <a style="flex: 0.5" href="#" @click.prevent="incrementStock(index)">+</a>
            </td>
            <td>{{ item.goodType }}</td>
            <td>
              <button @click="delGoods(index,item.goodId)">删除</button>
            </td>
            <td>
              <input type="checkbox" v-model="delArray" :value="index">
            </td>
          </tr>
        </table>
      </div>
      <div class="clear-btn">
        <a href="#" v-show="delArray.length > 0" @click.prevent="delSelected">删除选中商品</a>
        <a href="#" v-show="goodsArray.length > 0" @click.prevent="clearGoodsArray">清空全部商品</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      goods: {
        id: '',
        name: '',
        price: '',
        stock: '',
        type: '',
      },
      goodsType: ['电子产品', '服装', '食品', '家具', '玩具', '书籍', '运动器材','人机'], // 固定的七种商品类型
      goodsArray: [], // 商品列表
      delArray: [] // 要删除的商品索引
    };
  },
  methods: {
    addGoods() {
      axios.post('http://localhost:8081/goods/goodsAdd',{
        goodId: this.goods.id,
        goodName: this.goods.name,
        goodPrice: this.goods.price,
        goodStock: this.goods.stock,
        goodType: this.goods.type
        

      }) // 替换为实际的 API 端点
        .then(response => {
          console.log('添加成功:', response.data);
          this.goodsArray.push({ ...this.goods });
          this.resetGoods();
          alert('添加成功');
        })
        .catch(error => {
          alert('添加失败');
          console.error('添加失败:', error);
        });
        axios.get('http://localhost:8081/goods/goodsList') // 替换为实际的 API 端点
      .then(response => {
          this.goodsArray = response.data.data;
      })
      .catch(error => {
        console.error('获取商品数据失败:', error);
      });
    },
    delGoods(index, id) {
      axios.delete(`http://localhost:8081/goods/goodsDelete/${id}`) // 替换为实际的 API 端点
        .then(response => {
          console.log('删除成功:', response.data);
          this.goodsArray.splice(index, 1);
          alert('删除成功');
        })
        .catch(error => {
          alert('删除失败');
          console.error('删除失败:', error);
        });
    },
    clearGoodsArray() {
      this.goodsArray = [];
    },
    delSelected() {
      this.delArray.sort((a, b) => a - b);
      this.delArray.forEach((index) => {
        const item = this.goodsArray[index];
        if (item && item.id) {
          this.delGoods(index, item.id);
        }
      });
      this.delArray = [];
    },
    resetGoods() {
      this.goods = {
        id: '',
        name: '',
        price: '',
        stock: '',
        type: '',
      };
    },
    incrementStock(index) {
      this.goodsArray[index].stock++;
    },
    decrementStock(index) {
      if (this.goodsArray[index].stock > 0) {
        this.goodsArray[index].stock--;
      }
    }
  },
  mounted() {
    axios.get('http://localhost:8081/goods/goodsList') // 替换为实际的 API 端点
      .then(response => {
          this.goodsArray = response.data.data;
      })
      .catch(error => {
        console.error('获取商品数据失败:', error);
      });
  }
};
</script>

<style scoped>
  .container {
    margin: 0 auto;
    text-align: center;
    width: 1000px;
    border: 5px solid gray;
  }

  .logo {
    position: relative;
    top: 10px;
  }

  .header {
    border: 1px solid gray;
    margin: 20px;
  }

  .header .title {
    color: rgb(55, 75, 95);
    background: rgb(65, 180, 130);
  }

  .form-warp {
    border: 1px solid gray;
    margin: 20px;
    padding-bottom: 10px;
  }

  .form-warp .content {
    line-height: 35px;
  }

  .form-warp input {
    width: 150px;
    height: 18px;
  }

  .form-warp select {
    width: 154px;
    height: 24px;
  }

  .sub-title {
    color: rgb(142, 5, 1);
    background: rgb(124, 211, 122);
  }

  .table-warp {
    border: 1px solid rgb(163, 10, 10);
    margin: 20px;
    padding-bottom: 10px;
  }

  .table-warp th {
    width: 80px;
    background: rgb(69, 148, 116);
  }

  .table-warp a {
    text-decoration: none;
  }

  .clear-btn {
    text-align: right;
    padding-right: 10px;
  }

  .fontColor {
    color: gray;
    text-align: center;
  }

  .myBackgroundColor {
    background: rgb(51, 135, 99);
  }

  .myFontSize {
    font-size: 200px;
  }
</style>
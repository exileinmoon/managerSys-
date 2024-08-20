<template>
  <div class="logistics-manager">
    <!-- Existing content -->
    <h1>物流管理</h1>
    <div class="controls">
      <form @submit.prevent="addOrUpdateShipment" class="shipment-form">
        <input v-model="shipmentTrackingNumber" placeholder="追踪号码" required />
        <input v-model="shipmentStatus" placeholder="状态" required />
        <button type="submit">{{ editingIndex === null ? '添加' : '更新' }}</button>
      </form>
      <input v-model="searchQuery" placeholder="搜索" class="search-input" />
    </div>
    <ul>
      <li v-for="(shipment, index) in filteredShipments" :key="index">
        <div class="shipment-info">
          <span>追踪号码: {{ shipment.trackingNumber }}</span>
          <span>状态: {{ shipment.status }}</span>
        </div>
        <div class="actions">
          <button @click="editShipment(index)" class="edit">编辑</button>
          <button @click="removeShipment(index)" class="delete">删除</button>
        </div>
      </li>
    </ul>
    
    <!-- New section for the image grid -->
    <div class="image-grid">
      <div class="grid-item" v-for="(image, index) in images" :key="index">
        <a :href="image.link" target="_blank">
          <img :src="image.src" :alt="image.alt" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Existing data properties
      shipmentTrackingNumber: '',
      shipmentStatus: '',
      searchQuery: '',
      shipments: [],
      editingIndex: null,
      
      // New data property for images
      images: [
        { src: require('../courierService/img/bs.jpg'), alt: 'Image 1', link: 'https://www.800best.com/' },
        { src: require('../courierService/img/db.jpg'), alt: 'Image 2', link: 'https://www.deppon.com/' },
        { src: require('../courierService/img/download.jpg'), alt: 'Image 3', link: 'https://www.sf-express.com/chn/sc' },
        { src: require('../courierService/img/ems.jpg'), alt: 'Image 4', link: 'https://www.ems.com.cn/' },
        { src: require('../courierService/img/st.jpg'), alt: 'Image 5', link: 'https://www.sto.cn/pc' },
        { src: require('../courierService/img/yd.jpg'), alt: 'Image 6', link: 'http://www.yundaex.com/cn/index.php' },
        { src: require('../courierService/img/yt.jpg'), alt: 'Image 7', link: 'https://www.yto.net.cn/tracesimple.html/' },
        { src: require('../courierService/img/zt.jpeg'), alt: 'Image 8', link: 'https://www.zto.com/' }
      ]
    };
  },
  computed: {
    filteredShipments() {
      const query = this.searchQuery.toLowerCase();
      return this.shipments.filter(shipment =>
        shipment.trackingNumber.toLowerCase().includes(query) ||
        shipment.status.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    addOrUpdateShipment() {
      if (this.shipmentTrackingNumber.trim() && this.shipmentStatus.trim()) {
        const newShipment = {
          trackingNumber: this.shipmentTrackingNumber.trim(),
          status: this.shipmentStatus.trim()
        };

        if (this.editingIndex !== null) {
          this.shipments[this.editingIndex] = newShipment;
          this.editingIndex = null;
        } else {
          this.shipments.push(newShipment);
        }

        this.shipmentTrackingNumber = '';
        this.shipmentStatus = '';
      }
    },
    removeShipment(index) {
      this.shipments.splice(index, 1);
    },
    editShipment(index) {
      this.editingIndex = index;
      this.shipmentTrackingNumber = this.shipments[index].trackingNumber;
      this.shipmentStatus = this.shipments[index].status;
    }
  }
};
</script>

<style scoped>
.logistics-manager {
  /* Existing styles */
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  background-color: #f7f9fc;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.shipment-form {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

input {
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 1rem;
  flex: 1;
}

input:focus {
  border-color: #7694b4;
  outline: none;
}

button {
  padding: 12px 20px;
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
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #007bff;
  font-size: 1rem;
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

.shipment-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.actions {
  display: flex;
  gap: 8px;
}

/* New styles for the image grid */
.image-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 15px; /* 增加间距 */
  margin-top: 30px;
}

.grid-item {
  overflow: hidden;
  border-radius: 10px; /* 略微增加圆角 */
  transition: transform 0.3s ease;
  border: 3px solid #007bff; /* Decoration color */
  height: 200px; /* 调整高度 */
}

.grid-item:hover {
  transform: scale(1.05);
}

.grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.grid-item a {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
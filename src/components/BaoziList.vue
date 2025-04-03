<template>
  <div class="container">
    <h1 class="title">选择您的包子</h1>
    <div class="baozi-list">
      <div v-for="baozi in baoziList" :key="baozi.id" class="baozi-item">
        <img :src="baozi.image" :alt="baozi.name" class="baozi-image" />
        <h2>{{ baozi.name }}</h2>
        <p>{{ baozi.description }}</p>
        <p class="price">￥{{ baozi.price }}</p>
        <div class="actions">
          <button @click="decreaseQuantity(baozi)" :disabled="baozi.quantity === 0">-</button>
          <span>{{ baozi.quantity }}</span>
          <button @click="increaseQuantity(baozi)">+</button>
        </div>
      </div>
    </div>
    <div class="cart-summary">
      <h2>购物车</h2>
      <div v-for="baozi in filteredCartItems" :key="baozi.id" class="cart-item">
        <p>
          {{ baozi.name }} x {{ baozi.quantity }} = ￥{{ (baozi.quantity * baozi.price).toFixed(2) }}
          <button @click="decreaseQuantity(baozi)" :disabled="baozi.quantity === 0">-</button>
          <button @click="increaseQuantity(baozi)">+</button>
        </p>
      </div>
      <p class="total">总金额：￥{{ totalPrice }}</p>
      <button @click="checkout" :disabled="totalQuantity === 0" class="checkout-button">去结算</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      baoziList: [],
    };
  },
  computed: {
    totalQuantity() {
      return this.baoziList.reduce((sum, baozi) => sum + (baozi.quantity || 0), 0);
    },
    totalPrice() {
      return this.filteredCartItems
        .reduce((sum, baozi) => sum + baozi.quantity * baozi.price, 0)
        .toFixed(2); // Use filteredCartItems to calculate total price
    },
    filteredCartItems() {
      return this.baoziList.filter((baozi) => baozi.quantity > 0);
    },
  },
  methods: {
    async fetchBaoziList() {
      try {
        const response = await axios.get("http://localhost:8080/products");
        this.baoziList = response.data
          .filter((baozi) => baozi.isvalid) // 仅保留 isvalid 为 true 的商品
          .map((baozi) => ({
            ...baozi,
            price: parseFloat(baozi.price), // 确保价格是数字类型
            quantity: 0, // 初始化数量为 0
          }));
      } catch (error) {
        console.error("获取包子列表失败:", error);
        alert("无法加载包子列表，请稍后重试！");
      }
    },
    increaseQuantity(baozi) {
      baozi.quantity++;
    },
    decreaseQuantity(baozi) {
      if (baozi.quantity > 0) {
        baozi.quantity--;
      }
    },
    checkout() {
      alert("前往结算页面...");
    },
  },
  mounted() {
    this.fetchBaoziList();
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  text-align: center;
}
.baozi-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.baozi-item {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: #fff;
  transition: transform 0.2s;
}
.baozi-item:hover {
  transform: scale(1.05);
}
.baozi-image {
  width: 100%;
  height: auto;
  border-radius: 5px;
}
.price {
  font-weight: bold;
  color: #e74c3c;
  font-size: 18px;
}
.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.actions button {
  padding: 8px 15px;
  font-size: 18px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
.actions button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.cart-summary {
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: #fff;
  transition: transform 0.2s;
  text-align: left;
  align-self: center; /* Center align with baozi-list */
  margin-left: auto; /* Center horizontally */
  margin-right: auto; /* Center horizontally */
}
.cart-summary:hover {
  transform: scale(1.05);
}
.checkout-button {
  background: #ff5722;
  color: white;
  font-size: 24px;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}
.checkout-button:hover {
  background: #e64a19;
}
.checkout-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.cart-item {
  text-align: left;
  margin-bottom: 10px;
}
.total {
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
}
.cart-item p {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.cart-item button {
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
.cart-item button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
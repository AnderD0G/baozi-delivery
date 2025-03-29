<template>
  <div class="container">
    <h1 class="title">选择您的包子</h1>
    <div class="baozi-list">
      <div v-for="baozi in baoziList" :key="baozi.id" class="baozi-item">
        <img :src="'/images/' + baozi.image" :alt="baozi.name" class="baozi-image" />
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
      <p>总数：{{ totalQuantity }}</p>
      <p>总价：￥{{ totalPrice }}</p>
      <button @click="checkout" :disabled="totalQuantity === 0">去结算</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baoziList: [
        { id: 1, name: "鲜肉包", description: "多汁美味的鲜肉包", price: 5, image: "xianrou.jpeg", quantity: 0 },
        { id: 2, name: "素菜包", description: "健康美味的素菜包", price: 4, image: "sucai.jpeg", quantity: 0 },
        { id: 3, name: "豆沙包", description: "甜而不腻的豆沙包", price: 4.5, image: "dousha.jpeg", quantity: 0 }
      ]
    };
  },
  computed: {
    totalQuantity() {
      return this.baoziList.reduce((sum, baozi) => sum + baozi.quantity, 0);
    },
    totalPrice() {
      return this.baoziList.reduce((sum, baozi) => sum + baozi.quantity * baozi.price, 0).toFixed(2);
    }
  },
  methods: {
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
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
  text-align: center;
}
.baozi-list {
  display: flex;
  justify-content: center;
  gap: 20px;
}
.baozi-item {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  width: 200px;
}
.baozi-image {
  width: 100%;
  height: auto;
}
.price {
  font-weight: bold;
  color: #e74c3c;
}
.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.cart-summary {
  margin-top: 20px;
  padding: 10px;
  border-top: 2px solid #ddd;
}
</style>

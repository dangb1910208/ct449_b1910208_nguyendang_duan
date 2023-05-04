<template>
  <Header />

  <div class="container mt-3">
    <h2 class="text-center">GIỎ HÀNG CỦA BẠN</h2>
    <router-link to="/home"
      ><button class="btn btn-dark mt-2 mb-2 text-info">
        Quay về Trang Chủ
      </button></router-link
    >

    <table class="table text-center">
      <thead class="bg-dark text-warning" style="text-align: center">
        <th>STT</th>
        <th>Tên sản phẩm</th>
        <th>Hình ảnh</th>
        <th>Đơn giá</th>
        <th>Số lượng</th>
        <th>Thao tác</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data.cart" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td><img :src="item.img[0]" style="width: 30%" /></td>
          <td>
            {{
              item.price.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })
            }}
          </td>
          <td>
            <input
              style="width: 100%"
              aria-label="quantity"
              class="input-qty"
              min="1"
              name=""
              :value="item.soLuong"
              type="number"
              @input="item.soLuong = $event.target.value"
            />
          </td>
          <td>
            <img
              @click="deleteCart(item)"
              src="../assets/images/botao-apagar.png"
              style="width: 50%"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="price">
      <b class="text-warning">Tổng tiền:</b>
      {{
        total.toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        })
      }}
    </div>
  </div>
</template>

<style scoped>
table {
  font-size: 1.3rem;
}
.price {
  font-size: 1.4rem;
  text-align: right;
}
</style>
<script>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import axios from "axios";
import { computed, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
export default {
  components: {
    Footer,
    Header,
  },
  setup() {
    const soLuong = ref(1);
    const data = reactive({
      cart: [],
    });
    if (localStorage.getItem("cart") != null) {
      data.cart = JSON.parse(localStorage.getItem("cart"));
    }
    let sum = 0;
    const total = computed(() =>
      data.cart.reduce((a, b) => b.price * b.soluong + a, sum)
    );
    function deleteCart(item) {
      if (confirm("Bạn muốn xóa ra khỏi giỏ hàng không")) {
        for (var i = 0; i < data.cart.length; i++) {
          if (data.cart[i]._id == item._id) {
            data.cart.splice(i, 1);
          }
        }
        localStorage.setItem("cart", JSON.stringify(data.cart));
      }
    }
    function tangGiam(item) {
      for (var i = 0; i < data.cart.length; i++) {
        if (data.cart[i]._id == item._id) {
          data.cart[i].soluong = soLuong.value;
        }
      }
      localStorage.setItem("cart", JSON.stringify(data.cart));
    }
    return {
      tangGiam,
      data,
      total,
      deleteCart,
      soLuong,
    };
  },
};
</script>

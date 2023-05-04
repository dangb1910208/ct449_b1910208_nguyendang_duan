<template>
  <Header />
  <div class="container">
    <h3 class="text-center mt-5">THÔNG TIN CHI TIẾT SẢN PHẨM</h3>
    <div class="detail mb-5">
      <div v-if="data.product">
        <img
          v-for="(img, index) in data.product.img"
          :key="index"
          :src="data.product.img[index]"
          alt="hinh1"
        />
        <hr />
        <h5 class="text-center">{{ data.product.name }}</h5>
        <p class="text-center" v-if="data.product.price">
          Gía :
          {{
            data.product.price.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })
          }}
        </p>
        <p class="text-justify">Mô tả chi tiết: {{ data.product.desc }}</p>
        <div class="addCart text-center">
          <button
            @click="addToCart(data.product)"
            class="btn btn-success text-right mb-3"
          >
            Thêm <img src="../assets/images/carrinho1.png" />
          </button>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>
<style scoped>
.container .detail {
  border: 1px dotted grey;
  background: linear-gradient(to bottom, #f1d172, #ff9d00);
  border-radius: 5%;
}
.container .detail div {
  padding: 3%;
}
.container .detail div img {
  width: 50%;
}
.container .detail h5 {
  color: black;
  font-weight: bold;
  font-size: 1.5rem;
}
.container .detail p {
  color: black;
  font-size: 1.3rem;
  font-style: italic;
}
.container .detail .addCart button {
  color: black;
  font-weight: bold;
  background: linear-gradient(to bottom, #ffd000, #eeb377);
  width: 20%;
}
.container .detail .addCart button:hover {
  background: linear-gradient(to left, rgb(44, 187, 0), rgb(181, 232, 129));
}
.container .detail .addCart img {
  width: 25%;
}
</style>
<script>
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { reactive, ref } from "vue";
export default {
  components: {
    Footer,
    Header,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const data = reactive({
      product: {},
      cart: [],
    });
    const isChecked = ref(false);
    async function getProductById() {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${route.params.id}`
        );
        if (response.data.message != undefined) {
          router.push("/");
        }
        data.product = response.data;
      } catch (err) {}
    }
    getProductById();
    function addToCart(product) {
      product.soluong = 1;
      //Chưa đăng nhập không cho add to cart
      if (localStorage.getItem("token") == null) {
        alert("Bạn cần phải đăng nhập để thực hiện");
        return;
      }

      //Kiểm tra : Sự tồn tại của localStorage
      if (localStorage.getItem("cart") == null) {
        //Nếu localStorage chưa tồn tại
        //thêm product vào data.cart
        for (var i = 0; i < data.cart.length; i++) {
          if (product._id == data.cart[i]._id) {
            isChecked.value = true;
            break;
          }
          isChecked.value = false;
        }
        if (isChecked.value == true) {
          //Nếu product đã có trong cart thì không cho thêm vào ( xuất hiện thông báo)
          alert("Bạn đã thêm sản phẩm này vào giỏ hàng rồi");
        } else {
          //Nếu product chưa có trong cart thì cho thêm vào
          data.cart.push(product);
        }
      } else {
        //Nếu localStorage tồn tại rồi
        //Lấy dữ liệu từ localStorage hiện tại gán cho data.cart
        data.cart = JSON.parse(localStorage.getItem("cart"));
        //thêm product vào data.cart
        for (var i = 0; i < data.cart.length; i++) {
          if (product._id == data.cart[i]._id) {
            isChecked.value = true;
            break;
          }
          isChecked.value = false;
        }
        if (isChecked.value == true) {
          //Nếu product đã có trong cart thì không cho thêm vào ( xuất hiện thông báo)
          alert("Bạn đã thêm sản phẩm này vào giỏ hàng rồi");
        } else {
          //Nếu product chưa có trong cart thì cho thêm vào
          data.cart.push(product);
        }
      }
      localStorage.setItem("cart", JSON.stringify(data.cart));
      console.log(JSON.parse(localStorage.getItem("cart")));
    }
    return {
      addToCart,
      data,
    };
  },
};
</script>

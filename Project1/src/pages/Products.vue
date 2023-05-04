<template>
  <Header />
  <!-- Carousel -->
  <div id="demo" class="carousel slide" data-bs-ride="carousel">
    <!-- Indicators/dots -->
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#demo"
        data-bs-slide-to="0"
        class="active"
      ></button>
      <button
        type="button"
        data-bs-target="#demo"
        data-bs-slide-to="1"
      ></button>
      <button
        type="button"
        data-bs-target="#demo"
        data-bs-slide-to="2"
      ></button>
    </div>

    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="https://mcdn.wallpapersafari.com/medium/49/83/DBygPn.png"
          alt="Los Angeles"
          class="d-block"
          style="width: 100%; height: 800px"
        />
      </div>
      <div class="carousel-item">
        <img
          src="https://c0.wallpaperflare.com/preview/536/502/471/rolex-datejust-rolex-datejust-watch.jpg"
          alt="Chicago"
          class="d-block"
          style="width: 100%; height: 800px"
        />
      </div>
      <div class="carousel-item">
        <img
          src="https://cdn.wallpapersafari.com/28/67/P7mpn2.jpg"
          alt="New York"
          class="d-block"
          style="width: 100%; height: 800px"
        />
      </div>
    </div>

    <!-- Left and right controls/icons -->
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#demo"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon"></span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#demo"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon"></span>
    </button>
  </div>
  <div class="container">
    <div class="mt-5">
      <h3 class="font-weight-bold text-center text-light bg-dark mb-5">
        ≿———-❈❈❈ DANH SÁCH SẢN PHẨM ❈❈❈———-≾
      </h3>

      <div class="filter input-group mb-4">
        <span class="input-group-text">Tìm kiếm theo</span>
        <select name="" id="" v-model="selected">
          <option value="">Danh mục</option>
          <option v-for="c in data.categories" :key="c._id" :value="c._id">
            {{ c.name }}
          </option>
        </select>
      </div>
      <div class="text-center input-group mb-4">
        <span class="input-group-text">Tìm kiếm theo</span>
        <input
          class="form-control"
          style="width: 50%; height: 42.79px"
          type="text"
          v-model="searchText"
          placeholder="Tên sản phẩm"
        />
      </div>
      <div class="row">
        <div
          v-for="product in data.listProductsFilter"
          :key="product._id"
          class="col-sm-3"
        >
          <img :src="product.img[0]" />
          <h5 class="text-center">{{ product.name }}</h5>
          <p class="text-center">
            {{
              product.price.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })
            }}
          </p>
          <div class="addCart">
            <router-link :to="{ name: 'Detail', params: { id: product._id } }"
              ><button class="btn btn-success text-left mb-3">
                <img
                  src="../assets/images/opcao-de-interface-de-olho-aberto-visivel.png"
                />
                Chi tiết
              </button></router-link
            >

            <button
              @click="addToCart(product)"
              class="btn btn-success text-right mb-3"
            >
              Thêm <img src="../assets/images/carrinho1.png" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>
<style scoped>
marquee {
  width: 100%;
  font-weight: bold;
  font-style: italic;
  font-size: 1.5rem;
  background: #00f7ff;
}
.row .col-sm-3 {
  background: linear-gradient(to bottom, #ffffff, #ffffff);
  width: 23%;
  margin-right: 2%;
  margin-bottom: 2%;
  border-radius: 5%;
}
.row .col-sm-3 img {
  width: 100%;
}
.row .col-sm-3 h5 {
  color: black;
  font-weight: bold;
  font-size: 1.5rem;
}
.row .col-sm-3 p {
  color: black;
  font-weight: bold;
  font-size: 1.3rem;
  font-style: italic;
}
.row .col-sm-3 .addCart {
  text-align: center;
}
.row .col-sm-3 .addCart button {
  color: black;
  font-weight: bold;
  background: linear-gradient(to bottom, #ffd000, #eeb377);
  width: 45%;
}
.row .col-sm-3 .addCart button:first-child {
  margin-right: 1%;
}
.row .col-sm-3 .addCart button:last-child {
  margin-left: 1%;
}
.row .col-sm-3 .addCart button:hover {
  background: linear-gradient(to left, rgb(44, 187, 0), rgb(181, 232, 129));
}
.row .col-sm-3 .addCart img {
  width: 25%;
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
    const data = reactive({
      listProducts: [],
      listProductsFilter: [],
      cart: [],
      categories: [],
    });
    const route = useRoute();
    const isChecked = ref(false);
    const searchText = ref("");
    const selected = ref("");
    async function getAllCategories() {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        data.categories = response.data;
      } catch (err) {}
    }
    getAllCategories();
    async function getAllProducts() {
      try {
        const response = await axios.get("http://localhost:3000/products");
        data.listProducts = response.data;
      } catch (err) {}
    }
    getAllProducts();

    function addToCart(product) {
      product.soluong = 1;
      //Chưa đăng nhập không cho add to cart
      if (localStorage.getItem("token") == null) {
        alert("Bạn cần đăng nhập để thực hiện!");
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
          //Nếu product đã có trong cart thì không cho thêm vào (xuất hiện thông báo)
          alert("Sản phẩm đã có trong giỏ hàng!");
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
          alert("Sản phẩm đã có trong giỏ hàng!");
        } else {
          //Nếu product chưa có trong cart thì cho thêm vào

          data.cart.push(product);
        }
      }
      localStorage.setItem("cart", JSON.stringify(data.cart));
    }
    data.listProductsFilter = computed(() =>
      data.listProducts.filter((e) =>
        e.name.toLowerCase().includes(searchText.value.toLowerCase())
      )
    );
    watch(selected, () => {
      for (var i = 0; i < data.listProductsFilter.length; i++) {
        if (data.listProductsFilter[i].id_category != selected.value) {
          data.listProductsFilter.splice(i, 1);
        }
      }
    });
    return {
      selected,
      searchText,
      addToCart,
      data,
    };
  },
};
</script>

<template>
  <header class="tm-site-footer text-center">
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        ></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            style="width: 100%; justify-content: center"
            class="navbar-nav mr-auto"
          >
            <li class="nav-item active">
              <router-link to="/home">
                <a class="nav-link">Trang chủ</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/product">
                <a class="nav-link">Sản phẩm</a>
              </router-link>
            </li>
            <li class="nav-item" v-if="isLogin">
              <router-link to="/cart">
                <a class="nav-link">Giỏ hàng</a>
              </router-link>
            </li>
            <li class="nav-item" v-if="isLogin">
              <a class="nav-link" @click="logout">Đăng xuất</a>
            </li>
            <li class="nav-item" v-else>
              <router-link to="/login">
                <a class="nav-link">Đăng nhập</a>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const isLogin = ref(false);
    if (localStorage.getItem("token") != null) {
      isLogin.value = true;
    }
    function logout() {
      localStorage.clear();
      router.push("/login");
    }
    return {
      logout,
      isLogin,
    };
  },
};
</script>
<style scoped>
li a {
  font-size: large;
  text-decoration: none;
  cursor: pointer;
  font-weight: bold;
  color: rgb(205, 127, 18);
}
li a:hover {
  border-bottom: 1px solid black;
  color: rgb(205, 127, 18);
  background: black;
  transition-duration: 0.7s;
}
</style>

<template>
  <div class="background">
    <div class="shape"></div>
    <div class="shape"></div>
  </div>
  <form @submit.prevent="submit">
    <h3>Rolex Store <br />Đăng Ký</h3>
    <label>Họ tên</label>
    <input type="text" placeholder="Nhập họ tên" v-model="HoTen" />
    <label>Số điện thoại</label>
    <input type="text" placeholder="Nhập số diện thoại" v-model="SDT" />
    <label>Email</label>
    <input type="text" placeholder="Nhập Email" id="email" v-model="Email" />

    <label>Password</label>
    <input
      type="password"
      placeholder="Nhập mật khẩu"
      id="password"
      v-model="MatKhau"
    />

    <button type="submit">Đăng ký</button>
    <div v-if="isChecked" class="text-success" style="font-weight: bold">
      {{ message }}
    </div>
    <div v-else class="text-danger" style="font-weight: bold">
      {{ message }}
    </div>
    <div class="mt-4 mb-8 pb-lg-2 text-light">
      Bạn đã có tài khoản?
      <router-link to="/login"
        ><a class="text-light">Đăng nhập ngay</a></router-link
      >
    </div>
  </form>
</template>
<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const Email = ref("");
    const MatKhau = ref("");
    const HoTen = ref("");
    const SDT = ref("");
    const message = ref("");
    const isChecked = ref(true);
    async function submit() {
      try {
        const response = await axios.post(
          "http://localhost:3000/users/register",
          {
            email: Email.value,
            password: MatKhau.value,
            name: HoTen.value,
            phone: SDT.value,
          }
        );
        if (response.data.message == "Tồn tại rồi bạn ơi") {
          message.value = "Email tồn tại rồi!";
          isChecked.value = false;
        } else {
          message.value = "Đăng ký thành công!";
          isChecked.value = true;
        }
      } catch (e) {}
    }
    return {
      isChecked,
      message,
      submit,
      HoTen,
      SDT,
      Email,
      MatKhau,
    };
  },
};
</script>
<style media="screen">
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background-color: #080710;
}
.background {
  width: 430px;
  height: 520px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}
.background .shape {
  height: 200px;

  width: 200px;
  position: absolute;
  border-radius: 50%;
}
.shape:first-child {
  background: linear-gradient(#a38b00, #7cf5a8);
  left: -80px;
  top: -80px;
}
.shape:last-child {
  background: linear-gradient(to right, #ac2fff, #f04b19);
  right: -30px;
  bottom: -80px;
}
form {
  height: 760px;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 35px;
}
form * {
  font-family: "Poppins", sans-serif;
  color: #ffffff;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}
form h3 {
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
}

label {
  display: block;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
}
input {
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
}
::placeholder {
  color: #e5e5e5;
}
button {
  margin-top: 50px;
  width: 100%;
  background-color: #ffffff;
  color: #080710;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
}
.social {
  margin-top: 30px;
  display: flex;
}
.social div {
  background: red;
  width: 150px;
  border-radius: 3px;
  padding: 5px 10px 10px 5px;
  background-color: rgba(255, 255, 255, 0.27);
  color: #eaf0fb;
  text-align: center;
}
.social div:hover {
  background-color: rgba(255, 255, 255, 0.47);
}
.social .fb {
  margin-left: 25px;
}
.social i {
  margin-right: 4px;
}
</style>

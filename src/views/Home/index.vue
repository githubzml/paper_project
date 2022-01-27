<template>
  <div>home</div>
</template>

<script>
import { userinfo } from "@/api";
export default {
  name: "Home",
  mounted() {
    let token = sessionStorage.getItem("_tk");

    if (!token) {
      this.$router.push("/register");
      return;
    }
    // validLogin
    userinfo({ token }).then((res) => {
      console.log("res", res);
    });
  },
};
</script>

<style>
</style>
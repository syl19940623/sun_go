<template>
  <div class="welcomeOut">
    <img src="../assets/img/welcome.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "adminWelcome"
  }
</script>

<style lang="less" scoped>
  .welcomeOut{width: 100vw;height: 100vh;background-color: #fff;position: relative;
    img{height: 66%;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);}
  }
</style>
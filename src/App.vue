<template>
  <div id="app">
    <transition name="el-fade-in">
      <router-view :key="new Date().getTime()"/>
    </transition>
  </div>
</template>

<style lang="less">
  @import "./assets/css/base.css";
  @import "./assets/css/font-awesome.min.css";
  #app{min-height: 100vh;}
</style>

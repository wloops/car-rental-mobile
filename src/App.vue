<template>
  <div id="app">
    <keep-alive exclude="SelectModel,orders,myPage,confirmOrder" :max="10">
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="less"></style>

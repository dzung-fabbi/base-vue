<template>
  <div class="notification-copy">
    <div class="copy-success">
      {{ toastText }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    toastText: String
  }
};
</script>

<style lang="scss">
.my-page-content,
.my-page {
  .notification-copy {
    width: 100%;
    height: 31px;
    position: fixed;
    z-index: 999999;
    top: 15px;
    right: 0;
  }
  .copy-success {
    background: #3c7eef;
    width: 163px;
    height: 31px;
    color: #ffffff;
    border-radius: 15px;
    margin: auto;
    line-height: 31px;
  }
}
</style>

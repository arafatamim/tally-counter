<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/styles/_base.scss";

.wrapper {
  display: grid;
  // grid-template-areas: "x x x x";
  grid-auto-columns: 1fr;
  grid-gap: 10px;
  padding: 40px;
}
@media all and (max-width: 1690px) {
  .wrapper {
    grid-template-areas: "x x x x x";
  }
}
@media all and (max-width: 1366px) {
  .wrapper {
    grid-template-areas: "x x x x";
  }
}
@media all and (max-width: 980px) {
  .wrapper {
    grid-template-areas: "x x x";
  }
}
@media all and (max-width: 736px) {
  .wrapper {
    grid-template-areas: "x x";
    padding: 20px;
  }
}
@media all and (max-width: 480px) {
  .wrapper {
    grid-template-areas: "x";
    padding: 20px;
  }
}
</style>

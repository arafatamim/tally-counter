<template>
  <component :is="tag" :name="name" class="wrapper">
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: "div",
    },
    name: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/_base.scss";

.wrapper {
  --colNum: 1;
  display: grid;
  // grid-template-areas: "x x x x";
  grid-template-columns: repeat(var(--colNum), 1fr);
  grid-gap: 10px;
  padding: 40px;
}
@media all and (min-width: 1690px) {
  .wrapper {
    --colNum: 7;
  }
}
@media all and (max-width: 1690px) {
  .wrapper {
    // grid-template-areas: "x x x x x";
    --colNum: 5;
  }
}
@media all and (max-width: 1366px) {
  .wrapper {
    // grid-template-areas: "x x x x";
    --colNum: 4;
  }
}
@media all and (max-width: 980px) {
  .wrapper {
    // grid-template-areas: "x x x";
    --colNum: 3;
  }
}
@media all and (max-width: 736px) {
  .wrapper {
    // grid-template-areas: "x x";
    --colNum: 2;
    padding: 20px;
  }
}
@media all and (max-width: 480px) {
  .wrapper {
    // grid-template-areas: "x";
    --colNum: 1;
    padding: 20px;
  }
}
</style>

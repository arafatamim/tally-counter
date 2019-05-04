<template lang="pug">
  .titleBar
    #title {{name}}
</template>

<script>
export default {
  data() {
    return {
      name: "Tally Counter"
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_base.scss";

.titleBar {
  width: 100%;
  background-color: #222;
  position: sticky;
  top: 0px;
}
#title {
  font-size: 12pt;
  text-transform: uppercase;
  text-align: center;
  padding: 10px;
}
</style>

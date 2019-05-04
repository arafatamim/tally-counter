<template lang="pug">
  div
    .newcounter(@click="addCounter()")
      font-awesome-icon.addIcon(:icon="['far', 'plus-square']")
</template>

<script>
export default {
  data() {
    return {
      name: null,
      value: null
    };
  },
  methods: {
    addCounter() {
      this.$emit("addNewCounter");
      document.getElementsByClassName("newcounter")[0].scrollIntoView();
    }
  }
};
</script>

<style lang='scss'>
@import "@/styles/_base.scss";

.newcounter {
  background-color: transparent;
  border-radius: 15px;
  border: 5px dashed #555;
  box-sizing: border-box;
  height: 75px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  transition: border-color 0.1s;
  &:hover {
    border: 5px dashed #666;
    .addIcon {
      color: #666;
    }
  }
  &:active {
    border: 5px dashed #777;
    .addIcon {
      color: #777;
    }
  }
}
.addIcon {
  font-size: 25pt;
  color: #555;
  transition: color 0.1s;
}
</style>

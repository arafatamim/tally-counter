<template>
  <div>
    <div class="new-counter" @click="addCounter">
      <font-awesome-icon
        class="add-icon"
        :icon="['far', 'plus-square']"
      ></font-awesome-icon>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["add-new-counter"]);

function addCounter() {
  emit("add-new-counter");
}
</script>

<style lang="scss">
@import "../src/styles/_base.scss";

.new-counter {
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

  &:active {
    border: 5px dashed #777;
    .add-icon {
      color: #777;
    }
  }
}
.add-icon {
  font-size: 25pt;
  color: #555;
  transition: color 0.1s;
}
@media (hover: hover) {
  .new-counter {
    &:hover {
      border: 5px dashed #666;
      .add-icon {
        color: #666;
      }
    }
  }
}
</style>

<template>
  <div>
    <tippy arrow interactive="true" :delay="[350, 20]" duration="150">
      <template v-slot:trigger>
        <div
          class="counter"
          v-swipe="deleteCounter"
          ref="counter"
          name="showTip"
        >
          <div class="first">
            <button class="actions" @click="$emit('decCounter')">
              <font-awesome-icon
                :icon="['far', 'minus-square']"
              ></font-awesome-icon>
            </button>
          </div>
          <div class="second">
            <input
              class="name"
              onfocus="this.select()"
              placeholder="Something?"
              v-model="name"
            />
            <input class="value" onfocus="this.select()" v-model="value" />
          </div>
          <div class="third">
            <button class="actions" @click="$emit('incCounter')">
              <font-awesome-icon
                :icon="['far', 'plus-square']"
              ></font-awesome-icon>
            </button>
          </div>
        </div>
      </template>
      <font-awesome-icon
        :icon="['far', 'trash-alt']"
        @click="deleteCounter"
      ></font-awesome-icon>
    </tippy>
  </div>
</template>

<script>
export default {
  props: ["cName", "cVal"],
  computed: {
    name: {
      get() {
        return this.cName;
      },
      set(newValue) {
        this.$emit("setName", newValue);
      }
    },
    value: {
      get() {
        return this.cVal;
      },
      set(newValue) {
        this.$emit("setValue", newValue);
      }
    }
  },
  methods: {
    deleteCounter() {
      this.$emit("delCounter");
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/_base.scss";

.counter {
  background-color: #444;
  border-radius: 13px;
  border: 1px solid #222;
  height: 75px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 1px 1px 5px #222;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.first,
.third {
  font-size: 16pt;
}
.second {
  display: flex;
  flex-direction: column;
  text-align: center;
  .name {
    background: transparent;
    color: #ddd;
    border: none;
    text-align: center;
    width: 100px;
  }
  .value {
    background: transparent;
    color: #ddd;
    border: none;
    text-align: center;
    width: 100px;
    font-size: 16pt;
  }
}
.actions {
  color: $accent-colour;
  background: none;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  transition: background-color 0.1s;
  &:hover {
    background-color: #555;
    outline: none;
  }
  &:active {
    background-color: #666;
  }
}
</style>

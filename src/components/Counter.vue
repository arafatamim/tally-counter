
<template lang="pug">
  div
    .counter(v-swipe='onSwipeRight', ref='counter')
      .first
        button.actions(@click="$emit('decCounter')")
          font-awesome-icon(:icon="['far', 'minus-square']")
      .second
        input.name(onfocus="this.select()" placeholder="Something?" v-model="name")
        input.value(onfocus="this.select()" v-model="value")
      .third
        button.actions(@click="$emit('incCounter')")
          font-awesome-icon(:icon="['far', 'plus-square']")

</template>

<script>
export default {
    props: ["cName", "cVal"],
    data() {
        return {
            isGone: false
        };
    },
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
        onSwipeRight() {
            this.$emit("delCounter");
        }
    }
};
</script>

<style lang='scss'>
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
    //   justify-items: center;
    align-items: center;
    // transform: translateX(calc(var(--x, 0) * 1%));
    // opacity: var(--y, 1);
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

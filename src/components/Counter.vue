<template>
  <div>
    <div class="counter" ref="counter" name="showTip">
      <div
        class="del-icon"
        @click="deleteCounter"
        title="Delete"
        role="button"
      ></div>
      <div class="first">
        <button class="actions" @click="$emit('dec-counter')">
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
        <input
          class="value"
          type="number"
          :min="0"
          onfocus="this.select()"
          v-model="value"
        />
      </div>
      <div class="third">
        <button class="actions" @click="$emit('inc-counter')">
          <font-awesome-icon :icon="['far', 'plus-square']"></font-awesome-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, toRefs } from "vue";
export default {
  props: {
    cName: String,
    cVal: Number,
  },
  setup(props, { emit }) {
    const { cName, cVal } = toRefs(props);

    const name = computed({
      get: () => cName.value,
      set: newVal => emit("set-name", newVal),
    });
    const value = computed({
      get: () => cVal.value,
      set: newVal => emit("set-value", newVal),
    });

    function deleteCounter() {
      emit("del-counter");
    }

    return {
      name,
      value,
      deleteCounter,
    };
  },
};
</script>

<style lang="scss">
@import "@/styles/_base.scss";

.counter {
  z-index: 0;
  background-color: #444;
  border-radius: 13px;
  border: 1px solid #222;
  height: 75px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 1px 1px 5px #222;
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  &:hover > .del-icon {
    opacity: 1;
  }
}

.del-icon {
  top: 8px;
  right: 8px;
  border-radius: 50%;
  position: absolute;
  background: #aaa;
  vertical-align: middle;
  width: 7px;
  height: 7px;
  cursor: pointer;
  opacity: 0;
  transition: 0.2s transform, 0.2s opacity;
  &:hover {
    transform: scale(2);
    // background: uri('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#aaaaaa" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"/><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>') center no-repeat;
    background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIGljb24tdGFibGVyIGljb24tdGFibGVyLXgiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlPSIjYWFhYWFhIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPiAgPHBhdGggc3Ryb2tlPSJub25lIiBkPSJNMCAwaDI0djI0SDB6Ii8+ICA8bGluZSB4MT0iMTgiIHkxPSI2IiB4Mj0iNiIgeTI9IjE4IiAvPiAgPGxpbmUgeDE9IjYiIHkxPSI2IiB4Mj0iMTgiIHkyPSIxOCIgLz48L3N2Zz4=")
      center no-repeat;
  }
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
    border-radius: 3px;
    text-align: center;
    width: 100px;
    outline: none;
    box-sizing: border-box;
    transition: 0.1s all;
    &:focus {
      background: lighten($bg-colour, 15%);
    }
    &::selection {
      background: $accent-colour;
      color: $fg-colour;
    }
  }
  .value {
    background: transparent;
    color: #ddd;
    border: none;
    border-radius: 3px;
    text-align: center;
    width: 100px;
    font-size: 16pt;
    outline: none;
    box-sizing: border-box;
    transition: 0.1s all;
    &:focus {
      background: lighten($bg-colour, 15%);
    }
    &::selection {
      background: $accent-colour;
      color: $fg-colour;
    }
  }
}
.actions {
  color: $accent-colour;
  background: none;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  transition: all 0.1s;
  outline: none;
  &:active {
    background-color: #666;
  }
  &:focus {
    border: lighten($bg-colour, 15%) dashed 2px;
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
@media (hover: hover) {
  .actions {
    &:hover {
      background-color: #555;
    }
    &:active {
      background-color: #666;
    }
    &:focus {
      background-color: #555;
    }
  }
}
</style>

<template>
  <header class="title-bar">
    <div id="dummy"></div>
    <div id="title">{{ name }}</div>
    <font-awesome-icon
      role="button"
      aria-hidden="false"
      aria-label="Open Help Dialog"
      title="Open Help Dialog"
      id="icon"
      @click="togglePopup"
      :icon="['far', 'question-circle']"
    ></font-awesome-icon>

    <transition name="popup">
      <modal
        key="popup_modal"
        closeButton
        @close="togglePopup"
        :fixed="false"
        top="5px"
        right="5px"
        v-show="showPopup"
      >
        - Swipe to delete item on mobile
        <br />- Tap/click on the item name or value<br />
        to edit it manually
        <p>
          <strong>Shortcuts</strong><br />
          <code>Enter</code>
          - Add new counter
          <br />
          <code>&larr;&uarr;&rarr;&darr;</code> - Select counter
          <br />
          <code>Delete</code>
          - Delete counter
          <br />
          <code>+</code>/<code>-</code>
          - Increase/decrease counter
        </p>
        Simple and handy tally counter <br />Made with ❤️ by Tamim Arafat
        <br />
        <a
          href="https://github.com/arafatamim/tally-counter"
          rel="noopener"
          target="_blank"
          >Source on GitHub</a
        >
        <br />
        <br />
        <a
          href="https://ko-fi.com/Q5Q1TLM1"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            height="36"
            style="border: 0px; height: 36px"
            src="../assets/kofi3.png"
            border="0"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>
      </modal>
    </transition>
  </header>
</template>

<script>
import { ref } from "vue";
import Modal from "./Modal.vue";
export default {
  components: {
    Modal,
  },
  setup() {
    const name = "Tabs";
    const showPopup = ref(false);

    function togglePopup() {
      showPopup.value = !showPopup.value;
    }

    return {
      name,
      showPopup,
      togglePopup,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../src/styles/_base.scss";

.title-bar {
  width: 100%;
  background-color: #222;
  position: sticky;
  top: 0px;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px;
  user-select: none;
  z-index: 1;
}
#title {
  font-size: 12pt;
  text-transform: uppercase;
  text-align: center;
}
#icon {
  &:active {
    color: #fff;
  }
}
#info {
  transform-origin: top right;
  position: fixed;
  top: 5px;
  right: 5px;
  z-index: 999999;
  background: $bg-colour;
  color: $fg-colour;
  box-shadow: $box-shadow;
  padding: 15px;
  border-radius: 13px;
  border: 1px solid #222;
  a {
    color: $fg-colour;
    text-decoration-style: dashed;
  }
  #close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s cubic-bezier(1, 0, 0, 1); /* cubic-bezier(0.175, 0.885, 0.32, 1.275);*/
}
.popup-enter-from, .popup-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: scale(0);
  opacity: 0;
}
</style>

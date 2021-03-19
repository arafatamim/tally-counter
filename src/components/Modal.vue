<template>
  <div
    ref="infoRef"
    key="modal"
    class="info"
    :style="{
      position: fixed ? 'fixed' : 'absolute',
      top: top,
      right: right,
      bottom: bottom,
      transformOrigin: origin,
    }"
  >
    <font-awesome-icon
      role="button"
      title="Close Help Dialog"
      aria-label="Close Help Dialog"
      aria-hidden="false"
      v-if="closeButton"
      @click="$emit('close')"
      class="close"
      :icon="['far', 'times-circle']"
    ></font-awesome-icon>
    <slot></slot>
    <button
      v-if="enableExpanded"
      @click="toggleExpand"
      aria-label="Expand Options"
      class="expand-button rounded"
    >
      <svg
        v-if="expanded"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.6569 16.2427L19.0711 14.8285L12.0001 7.75739L4.92896 14.8285L6.34317 16.2427L12.0001 10.5858L17.6569 16.2427Z"
          fill="currentColor"
        />
      </svg>
      <svg
        v-else
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
          fill="currentColor"
        />
      </svg></button
    ><br />

    <slot name="expanded" v-if="enableExpanded && expanded"></slot>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  name: "Modal",
  props: {
    closeButton: Boolean,
    fixed: Boolean,
    top: String,
    right: String,
    bottom: String,
    origin: String,
    enableExpanded: Boolean,
  },
  setup(props) {
    const expanded = ref(false);

    function toggleExpand() {
      expanded.value = !expanded.value;
    }

    onMounted(() => {});

    return {
      expanded,
      toggleExpand,
    };
  },
};
</script>

<style lang="scss">
@import "../src/styles/_base.scss";

.info {
  transform-origin: top right;
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
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
.expand-button {
  width: 30px;
  height: 30px;
  padding: 0;
  vertical-align: middle;
  box-sizing: border-box;
}
.modal-move {
  transition: transform 0.3s ease;
}
</style>

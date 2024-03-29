<template>
  <Header />
  <Container>
    <transition-group name="list" @before-leave="beforeLeave">
      <Counter v-for="(counter, i) in counters" v-swipe-move="(el, e) => onSwipeMove(el, e)"
        v-swipe-stop="(el, e) => onSwipeStop(el, e, counter.id)" :counterName="counter.name"
        :counterValue="counter.value" :selected="selectMode && selectedCounter === i" :key="counter.id"
        @inc-counter="() => increaseCounter(i)" @dec-counter="() => decreaseCounter(i)"
        @set-name="setCounterName($event, counter)" @set-value="setCounterValue($event, counter)"
        @del-counter="() => deleteCounter(counter.id)" />
      <NewCounter @add-new-counter="addNewCounter" key="new_counter" />
      <div id="bottom-padding" :style="{ height: '70px' }" key="bottom_padding"></div>
    </transition-group>
  </Container>
  <transition name="scale">
    <Modal :closeButton="false" :fixed="true" rightEdge="20px" bottomEdge="20px" origin="bottom right"
      v-if="totalCounterValue > 0 || counters.length > 1" :enableExpanded="counters.length > 1">
      Total value: {{ totalCounterValue }}
      <template v-slot:expanded>
        <div>Number of counters: {{ counters.length }}</div>
        <div class="bottom-tools">
          <button v-if="counters.length >= 2 && totalCounterValue > 0" @click="sortAllCounters"
            aria-label="Sort All Counters">
            Sort all counters
          </button>
          <button @click="removeAllCounters" aria-label="Remove All Counters">
            Remove all counters
          </button>
          <button v-if="totalCounterValue !== 0" @click="resetAllCounters" aria-label="Reset All Counters">
            Reset all counters
          </button>
        </div>
      </template>
    </Modal>
  </transition>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import Header from "/@/components/Header.vue";
import Container from "/@/components/Container.vue";
import Counter from "/@/components/Counter.vue";
import NewCounter from "/@/components/NewCounter.vue";
import Modal from "/@/components/Modal.vue";
import { nanoid } from "nanoid";

function getWrapperColumns() {
  return parseInt(
    window
      .getComputedStyle(document.getElementsByClassName("wrapper")[0])
      .getPropertyValue("--colNum")
  );
}

/**
 * @typedef {Object} CounterObject
 * @property {string} id
 * @property {number} value
 * @property {string} name
 */

/** @type {import('vue').Ref<CounterObject[]>} */
const counters = ref([]);
const selectMode = ref(false);
const selectedCounter = ref(0);

const totalCounterValue = computed(() =>
  counters.value.reduce((prev, current) => {
    return prev + current.value;
  }, 0)
);

/** @type {NodeJS.Timeout} */
let selectModeTimeout;
function toggleSelectMode() {
  clearTimeout(selectModeTimeout);
  if (selectMode.value === false) {
    selectMode.value = true;
    return false;
  }
  selectModeTimeout = setTimeout(function () {
    selectMode.value = false;
  }, 2000);
  return true;
}

/**
 * @param {KeyboardEvent} e
 */
function keyboardListener(e) {
  if (e.key === "ArrowRight") {
    // If selectMode is not enabled,
    // do not change selected item
    if (!toggleSelectMode()) return;

    if (
      counters.value.length !== 0 &&
      selectedCounter.value !== counters.value.length - 1
    )
      selectedCounter.value += 1;
  }

  if (e.key === "ArrowLeft") {
    if (!toggleSelectMode()) return;
    if (counters.value.length !== 0 && selectedCounter.value !== 0)
      selectedCounter.value -= 1;
  }

  if (e.key === "ArrowDown") {
    if (!toggleSelectMode()) return;

    if (
      counters.value.length > 0 &&
      selectedCounter.value < counters.value.length - 1 &&
      !(selectedCounter.value + getWrapperColumns() >= counters.value.length)
    ) {
      selectedCounter.value += getWrapperColumns();
    }
  }

  if (e.key === "ArrowUp") {
    if (!toggleSelectMode()) return;

    if (counters.value.length > 0 && selectedCounter.value > 0 &&
      !(selectedCounter.value - getWrapperColumns() < 0)
    )
      selectedCounter.value -= getWrapperColumns();
  }

  if (e.key === "Enter") {
    addNewCounter();
  }
  if (e.key === "Delete") {
    if (!toggleSelectMode()) return;
    deleteCounter(counters.value[selectedCounter.value].id);
    updateSelectedCounterValue()
  }

  if (e.key === "+") {
    if (!toggleSelectMode()) return;
    increaseCounter(selectedCounter.value);
  }
  if (e.key === "-") {
    if (!toggleSelectMode()) return;
    decreaseCounter(selectedCounter.value);
  }
}

onMounted(() => {
  if (localStorage.getItem("items")) {
    counters.value = JSON.parse(localStorage.getItem("items"));
  }
  document.addEventListener("keyup", keyboardListener);
});
onUnmounted(() => {
  document.removeEventListener("keyup", keyboardListener);
});

watch(
  counters,
  () => {
    localStorage.setItem("items", JSON.stringify(counters.value));
  },
  { deep: true }
);

function addNewCounter() {
  const itemList = [
    "Apples",
    "Oranges",
    "Bananas",
    "Grapes",
    "Limes",
    "Peaches",
    "Berries",
    "Avocados",
  ];
  const randomItem = itemList[Math.floor(Math.random() * itemList.length)];

  counters.value.push({
    id: nanoid(4),
    name: randomItem,
    value: 0,
  });

  setTimeout(function () {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, 100);
}

/**
 * @param {string} id
 */
function deleteCounter(id) {
  // counters.value.splice(index, 1);
  counters.value = counters.value.filter((counter) => counter.id !== id);
}

/**
 * @param {number} index
 */
function increaseCounter(index) {
  const currentCounter = counters.value[index];
  currentCounter.value += 1;
}
/**
 * @param {number} index
 */
function decreaseCounter(index) {
  if (counters.value[index].value > 0) counters.value[index].value -= 1;
}

function removeAllCounters() {
  counters.value = [];
}
function resetAllCounters() {
  for (const counter of counters.value) {
    counter.value = 0;
  }
}

function sortAllCounters() {
  counters.value.sort((prev, next) =>
    prev.value > next.value ? -1 : prev.value === next.value ? 0 : 1
  );
}

/**
 * @param {string} payload
 * @param {CounterObject} item
 */
function setCounterName(payload, item) {
  item.name = payload;
}
/**
 * @param {string} payload
 * @param {CounterObject} item
 */
function setCounterValue(payload, item) {
  if (typeof parseInt(payload) == "number") {
    item.value = parseInt(payload);
  }
}

/**
 * @param {HTMLElement} el
 */
function beforeLeave(el) {
  if (el != null) {
    const { marginLeft, marginTop, width, height } =
      window.getComputedStyle(el);

    el.style.left = el.offsetLeft - parseFloat(marginLeft, 10) + "px";
    el.style.top = el.offsetTop - parseFloat(marginTop, 10) + "px";
    el.style.width = width;
    el.style.height = height;
  }
}

function updateSelectedCounterValue() {
  if (selectedCounter.value >= counters.value.length) {
    selectedCounter.value = counters.value.length - 1
  }
  if (selectedCounter.value < 0) {
    selectedCounter.value = 0
  }
}

const maxSwipeOffset = Math.min(200, window.innerWidth / 5);

/**
 * @param {HTMLElement} el
 * @param {CustomEvent} e
 */
function onSwipeMove(el, e) {
  const { offsetX } = e.detail;
  const p = Math.abs(offsetX) / maxSwipeOffset;
  el.style.transform = "translateX(" + offsetX + "px)";
  el.style.opacity = 1 - p;
}

/**
 * @param {HTMLElement} el
 * @param {CustomEvent} e
 * @param {string} id
 */
function onSwipeStop(el, e, id) {
  const { offsetX } = e.detail;
  el.style.transform = "";
  el.style.opacity = "";

  if (Math.abs(offsetX) >= maxSwipeOffset) {
    // removed
    el.style.opacity = 0;
    deleteCounter(id);
    updateSelectedCounterValue()
  } else {
    // not removed
    el.style.transition = "transform 300ms";
    setTimeout(() => void (el.style.transition = ""), 300);
  }
}
</script>

<style lang="scss">
@import "./styles/_base.scss";

body {
  background-color: $bg-colour;
  color: $fg-colour;
}

#app {
  font-family: $base-font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.list-move {
  transition: transform 0.3s ease;
}

.list-item {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.list-enter-active {
  transition: all 0.3s ease;
}

.list-leave-active {
  opacity: 0;
  position: absolute;
  transition: all 0.3s ease;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s cubic-bezier(1, 0, 0, 1);
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>

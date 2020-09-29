<template>
  <div id="app">
    <Header />
    <Container>
      <transition-group name="list" @before-leave="beforeLeave">
        <Counter
          ref="counterRef"
          v-for="counter in counters"
          :cName="counter.name"
          v-swipe="e => onSwipe(e, counter.id)"
          :cVal="counter.value"
          :key="counter.id"
          @inc-counter="counter.value++"
          @dec-counter="counter.value > 0 && counter.value--"
          @set-name="setCName($event, counter)"
          @set-value="setCValue($event, counter)"
          @del-counter="() => deleteCounter(counter.id)"
        />
        <NewCounter
          ref="newCounter"
          @add-new-counter="addNewCounter"
          key="new_counter"
        />
        <div
          id="bottom-padding"
          :style="{ height: '70px' }"
          key="bottom_padding"
        ></div>
      </transition-group>
    </Container>
    <transition name="scale">
      <Modal
        ref="modal"
        :closeButton="false"
        :fixed="true"
        right="20px"
        bottom="20px"
        origin="bottom right"
        v-if="totalCounterValue > 0 || counters.length > 1"
        :enableExpanded="counters.length > 1"
      >
        Total value: {{ totalCounterValue }}
        <template v-slot:expanded>
          Number of counters: {{ counters.length }}
        </template>
      </Modal>
    </transition>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import Header from "@/components/Header.vue";
import Container from "@/components/Container.vue";
import Counter from "@/components/Counter.vue";
import NewCounter from "@/components/NewCounter.vue";
import Modal from "@/components/Modal.vue";
import { nanoid } from "nanoid";

export default {
  components: {
    Header,
    Container,
    Counter,
    NewCounter,
    Modal,
  },
  setup() {
    const counters = ref([]);

    const totalCounterValue = computed(() =>
      counters.value.reduce((prev, current) => {
        return prev + current.value;
      }, 0)
    );

    onMounted(() => {
      if (localStorage.getItem("items")) {
        counters.value = JSON.parse(localStorage.getItem("items"));
      }
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

      setTimeout(function() {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }

    function deleteCounter(id) {
      // counters.value.splice(index, 1);
      counters.value = counters.value.filter(counter => counter.id !== id);
    }

    function setCName(payload, item) {
      item.name = payload;
    }
    function setCValue(payload, item) {
      if (typeof parseInt(payload) == "number") {
        item.value = parseInt(payload);
      }
    }

    function beforeLeave(el) {
      const { marginLeft, marginTop, width, height } = window.getComputedStyle(
        el
      );

      el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`;
      el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`;
      el.style.width = width;
      el.style.height = height;
    }

    function onSwipe(_, id) {
      // TODO: implement swipe animation
      deleteCounter(id);
    }

    return {
      counters,
      totalCounterValue,
      addNewCounter,
      deleteCounter,
      setCName,
      setCValue,
      beforeLeave,
      onSwipe,
    };
  },
};
</script>

<style lang="scss">
@import "@/styles/_base.scss";

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
  // opacity: 0;
  transition: all 0.3s ease;
}

.list-leave-active {
  position: absolute;
  transition: all 0.3s ease;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s cubic-bezier(1, 0, 0, 1); /* cubic-bezier(0.175, 0.885, 0.32, 1.275);*/
}
.scale-enter-from, .scale-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: scale(0);
  opacity: 0;
}
</style>

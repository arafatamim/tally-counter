<template>
  <div id="app">
    <Header />
    <Container tag="transition-group" name="list">
      <Counter
        v-for="(counter, i) in counters"
        :cName="counter.name"
        :cVal="counter.value"
        :key="counter._id"
        @inc-counter="counter.value++"
        @dec-counter="counter.value--"
        @set-name="setCName($event, counter)"
        @set-value="setCValue($event, counter)"
        @del-counter="() => deleteCounter(i)"
      />
      <NewCounter
        ref="newCounter"
        @add-new-counter="addNewCounter"
        key="new_counter"
      />
    </Container>
  </div>
</template>

<script>
import { onMounted, reactive, ref, watch } from "vue";
import Header from "@/components/Header.vue";
import Container from "@/components/Container.vue";
import Counter from "@/components/Counter.vue";
import NewCounter from "@/components/NewCounter.vue";
import { nanoid } from "nanoid";

export default {
  components: {
    Header,
    Container,
    Counter,
    NewCounter,
  },
  setup() {
    const counters = ref([]);

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
    function saveToStorage() {
      localStorage.setItem("items", JSON.stringify(counters.value));
    }

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
        _id: nanoid(4),
        name: randomItem,
        value: 0,
      });
    }

    function deleteCounter(index) {
      counters.value.splice(index, 1);
    }

    function setCName(payload, item) {
      item.name = payload;
    }
    function setCValue(payload, item) {
      if (typeof parseInt(payload) == "number") {
        item.value = parseInt(payload);
      }
    }

    return {
      counters,
      addNewCounter,
      deleteCounter,
      setCName,
      setCValue,
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
</style>

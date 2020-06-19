<template>
  <div id="app">
    <Header />
    <Container tag="transition-group" name="list">
      <Counter
        v-for="(counter, i) in counters"
        :cName="counter.name"
        :cVal="counter.value"
        :key="counter._id"
        @incCounter="counter.value++"
        @decCounter="counter.value--"
        @setName="setCName($event, counter)"
        @setValue="setCValue($event, counter)"
        @delCounter="deleteCounter(i)"
      />
      <NewCounter @addNewCounter="newCounter()" key="new_counter" />
    </Container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Container from "@/components/Container.vue";
import Counter from "@/components/Counter.vue";
import NewCounter from "@/components/NewCounter.vue";
import shortid from "shortid";
export default {
  components: {
    Header,
    Container,
    Counter,
    NewCounter
  },
  data: () => ({
    counters: []
  }),
  mounted() {
    if (localStorage.getItem("items")) {
      this.counters = JSON.parse(localStorage.getItem("items"));
    }
  },
  methods: {
    newCounter() {
      var itemList = [
        "Apples",
        "Oranges",
        "Bananas",
        "Grapes",
        "Limes",
        "Peaches",
        "Berries",
        "Avocados"
      ];
      var randomItem = itemList[Math.floor(Math.random() * itemList.length)];
      this.counters.push({
        _id: shortid.generate(),
        name: randomItem,
        value: 0
      });
    },
    deleteCounter(index) {
      this.counters.splice(index, 1);
    },
    setCName(payload, item) {
      item.name = payload;
    },
    setCValue(payload, item) {
      if (typeof parseInt(payload) == "number") {
        item.value = parseInt(payload);
      }
    }
  },
  watch: {
    counters: {
      handler() {
        localStorage.setItem("items", JSON.stringify(this.counters));
      },
      deep: true
    }
  }
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

.list-enter-active,
// .list-leave-active,
.list-move {
  transition: 300ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.list-enter {
  opacity: 0;
  transform: translateX(50px) scaleY(0.5);
}

.list-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.list-leave-active {
  position: absolute;
  width: calc(100% - 40px);
}

.list-leave-to {
  position: absolute;
  opacity: 0;
  // transform: scaleY(0);
  transform: translateX(30px);
  transform-origin: center top;
}
// .list-enter-active,
// .list-leave-active {
//     transition: all 1s;
// }
// .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
//     opacity: 0;
//     transform: translateY(30px);
// }
</style>

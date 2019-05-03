<template>
  <div id="app">
    <Header/>
    <Container>
      <Counter
        v-for="(counter, i) in counters"
        :cName.sync="counter.name"
        :cVal.sync="counter.value"
        :key="i"
        @incCounter="counter.value++"
        @decCounter="counter.value--"
        @setName="setCName($event, counter)"
        @setValue="setCValue($event, counter)"
        @delCounter="deleteCounter(i)"
      />

      <NewCounter @addNewCounter="newCounter()" key="nc"/>
    </Container>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Container from "@/components/Container.vue";
import Counter from "@/components/Counter.vue";
import NewCounter from "@/components/NewCounter.vue";

export default {
  components: {
    Header,
    Container,
    Counter,
    NewCounter
  },
  data: () => ({
    counters: [
      {
        name: "Cakes",
        value: 6
      },
      {
        name: "Rambutans",
        value: 7
      }
    ]
  }),
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
      var randomItem =
        itemList[Math.floor(Math.random() * itemList.length)] + "?";
      this.counters.push({
        name: randomItem,
        value: 0
      });
    },
    deleteCounter(index) {
      this.counters.splice(index, 1);
    },
    incCounter(i) {
      this.counters[i].value = this.counters[i].value + 1;
    },
    setCName(payload, item) {
      item.name = payload;
    },
    setCValue(payload, item) {
      if (typeof payload == "number") {
        item.value = parseInt(payload);
      }
    }
  }
};
</script>

<style lang='scss'>
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
.list-leave-active,
.list-move {
  transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
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
}

.list-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}
</style>
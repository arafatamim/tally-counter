<template>
    <div class="titleBar">
        <div id="dummy"></div>
        <div id="title">{{ name }}</div>
        <tippy arrow interactive="true" duration="150" trigger="click">
            <template v-slot:trigger>
                <font-awesome-icon id="icon" :icon="['far', 'question-circle']"></font-awesome-icon>
            </template>
            - Swipe to delete item on mobile
            <br>- Tap/click on the item name or value to edit it manually
            <br>
            <br>Simple and handy tally counter
            <br>Made with ❤️ by Tamim Arafat
            <br>
            <a href="https://github.com/arafatamim/tally-counter" target="_blank">Source on GitHub</a>
            <br>
            <br>
            <a href="https://ko-fi.com/Q5Q1TLM1" target="_blank">
                <img
                    height="36"
                    style="border:0px;height:36px;"
                    src="../assets/kofi3.png"
                    border="0"
                    alt="Buy Me a Coffee at ko-fi.com"
                >
            </a>
        </tippy>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: "Tally Counter"
        };
    }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_base.scss";

.titleBar {
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
</style>

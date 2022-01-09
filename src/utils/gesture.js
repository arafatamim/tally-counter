import { enableDragEvents } from "ezgesture";

/**
 * @type import("vue").Directive
 */
export const onSwipeMove = {
  beforeMount(el, binding) {
    enableDragEvents(el);
    if (typeof binding.value === "function") {
      el.addEventListener("ezgdragmove", (e) => binding.value(el, e));
    }
  },
};

/**
 * @type import("vue").Directive
 */
export const onSwipeStop = {
  beforeMount(el, binding) {
    enableDragEvents(el);
    if (typeof binding.value === "function") {
      el.addEventListener("ezgdragstop", (e) => binding.value(el, e));
    }
  },
};

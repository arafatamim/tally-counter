import Hammer from "hammerjs";
/**
 * @type import("vue").Directive
 */
export const swipe = {
  beforeMount(el, binding) {
    if (typeof binding.value === "function") {
      const mc = new Hammer(el);
      mc.get("swipe").set({ direction: Hammer.DIRECTION_HORIZONTAL });
      mc.on("swipe", binding.value);
    }
  },
};

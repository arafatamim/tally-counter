import gsap from "gsap";
/*
Pass in the elements (selector text or NodeList or Array), then a
function/callback that actually performs your DOM changes, and optionally a vars
object that contains any of the following properties to customize the transition:

 - duration [Number] - duration (in seconds) of each animation
 - stagger [Number | Object | Function] - amount to stagger the starting time of each animation. You may use advanced staggers too (see https://codepen.io/GreenSock/pen/jdawKx)
 - ease [Ease] - controls the easing of the animation. Like "power2.inOut", or "elastic", etc.
 - onComplete [Function] - a callback function that should be called when all the animation has completed.
 - delay [Number] - time (in seconds) that should elapse before any of the animations begin.

This function will return a Timeline containing all the animations.
*/
/**
 *
 * @param {*} elements
 * @param {Function} changeFunc
 * @param {gsap.TweenVars} vars
 */
export default function flip(elements, changeFunc, vars) {
  elements = gsap.utils.toArray(elements);
  vars = vars || {};
  let tl = gsap.timeline({
      onComplete: vars.onComplete,
      delay: vars.delay || 0,
    }),
    getDimensions = el => {
      let b = el.getBoundingClientRect(),
        getProp = gsap.getProperty(el);
      return {
        sx: getProp("scaleX"),
        sy: getProp("scaleY"),
        x: getProp("x"),
        y: getProp("y"),
        l: b.left,
        t: b.top,
        w: parseFloat(getProp("width", "px")),
        h: parseFloat(getProp("height", "px")),
        bw: b.width,
        bh: b.height,
        css: el.style.cssText,
        origin: getComputedStyle(el)
          .transformOrigin.split(" ")
          .map(parseFloat),
      };
    },
    before = elements.map(getDimensions),
    copy = {},
    p,
    after;
  elements.forEach(el => {
    el._flip && el._flip.progress(1);
    el._flip = tl;
  });
  changeFunc();
  after = elements.map(getDimensions);
  for (p in vars) {
    p !== "onComplete" &&
      p !== "delay" &&
      p !== "resize" &&
      (copy[p] = vars[p]);
  }
  if (vars.resize) {
    copy.x = i => after[i].x + (before[i].l - after[i].l);
    copy.y = i => after[i].y + (before[i].t - after[i].t);
    copy.width = i => before[i].w;
    copy.height = i => before[i].h;
  } else {
    copy.x = i =>
      after[i].x +
      (before[i].l - after[i].l) +
      ((before[i].bw / after[i].bw) * after[i].sx - after[i].sx) *
        after[i].origin[0];
    copy.y = i =>
      after[i].y +
      (before[i].t - after[i].t) +
      ((before[i].bh / after[i].bh) * after[i].sy - after[i].sy) *
        after[i].origin[1];
    copy.scaleX = i => after[i].sx * (before[i].bw / after[i].bw);
    copy.scaleY = i => after[i].sy * (before[i].bh / after[i].bh);
  }
  copy.onComplete = () =>
    elements.forEach((el, i) => (el.style.cssText = after[i].css));
  return tl.from(elements, copy);
}

/*
function flip(elements, changeFunc, vars) {
  elements = gsap.utils.toArray(elements);
  vars = vars || {};
  let tl = gsap.timeline({
    onComplete: vars.onComplete,
    delay: vars.delay || 0,
  });
  let bounds = elements.map(el => el.getBoundingClientRect());
  let copy = {};
  let p;
  elements.forEach(el => {
    el._flip && el._flip.progress(1);
    el._flip = tl;
  });
  changeFunc();
  for (p in vars) {
    p !== "onComplete" && p !== "delay" && (copy[p] = vars[p]);
  }
  copy.x = (i, element) =>
    "+=" + (bounds[i].left - element.getBoundingClientRect().left);
  copy.y = (i, element) =>
    "+=" + (bounds[i].top - element.getBoundingClientRect().top);
  return tl.from(elements, copy);
}

export default flip;
*/

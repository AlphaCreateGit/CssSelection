$(document).ready(function () {
  const testimonial = $(".testimonial");
  console.log(testimonial[0].offsetWidth);

  function getScrollAmount() {
    let racesWidth = testimonial[0].scrollWidth;
    return racesWidth - window.innerWidth + 200;
  }

  const tween = gsap.to(testimonial, {
    x: -getScrollAmount(),
    duration: 3,
    ease: "none",
  });

  ScrollTrigger.create({
    trigger: ".wrapper-testimonial",
    start: "top 10%",
    end: () => `+=${getScrollAmount()}`,
    pin: true,
    animation: tween,
    scrub: 1,
    invalidateOnRefresh: true,
    markers: true,
  });

  // gallery
  gsap.set(".photo:not(:first-child)", { opacity: 0, scale: 0.5 });
  const animation = gsap.to(".photo:not(:first-child)", {
    opacity: 1,
    scale: 1,
    duration: 1,
    stagger: 1,
  });
  ScrollTrigger.create({
    trigger: ".gallery",
    start: "top top",
    end: "bottom bottom",
    pin: ".right",
    animation: animation,
    scrub: true,
    markers: true,
  });
});

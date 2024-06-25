$(document).ready(function () {
  const testimonial = $(".testimonial");
  console.log(testimonial[0].offsetWidth);

  function getScrollAmount() {
    let racesWidth = testimonial[0].scrollWidth;
    return -(racesWidth - window.innerWidth);
  }

  const tween = gsap.to(testimonial, {
    x: getScrollAmount,
    duration: 3,
    ease: "none",
  });

  ScrollTrigger.create({
    trigger: ".wrapper-testimonial",
    start: "top 10%",
    end: () => `+=${getScrollAmount() * -1}`,
    pin: true,
    animation: tween,
    scrub: 1,
    invalidateOnRefresh: true,
    markers: true,
  });
});

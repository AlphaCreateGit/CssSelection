$(document).ready(function () {
  gsap.registerPlugin(ScrollTrigger);
  gsapBanner();
  gsapTestimonial();
  gsapGui();
  gsapGallery();
  gsapWink();
  splitText();
  ScrollTrigger.refresh();
});

function gsapBanner() {
  gsap.registerPlugin(ScrollTrigger);
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".wrapper",
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: true,
        // markers: true,
      },
    })
    .to(".image-container img", {
      scale: 2,
      z: 350,
      transformOrigin: "center center",
      ease: "power1.inOut",
    })
    .to(
      ".banner-hero",
      {
        scale: 1.1,
        transformOrigin: "center center",
        ease: "power1.inOut",
      },
      "<"
    );
}
function gsapTestimonial() {
  const wrapperTestimonials = $(".wrapper-testimonial");

  // Nếu có bất kỳ phần tử testimonial nào
  if (wrapperTestimonials.length > 0) {
    // Lặp qua từng phần tử wrapper
    wrapperTestimonials.each(function (index, wrapper) {
      const testimonial = $(wrapper).find(".testimonial");

      // Hàm để tính toán lượng cuộn cần thiết
      const getScrollAmount = () => {
        const racesWidth = testimonial[0].scrollWidth;
        return racesWidth - window.innerWidth + 200;
      };

      // Hàm để tạo tween animation cho testimonial
      const createTween = (testimonial, scrollAmount) => {
        return gsap.to(testimonial, {
          x: -scrollAmount,
          duration: 3,
          ease: "none",
        });
      };

      // Hàm để tạo ScrollTrigger cho phần tử wrapper
      const createScrollTrigger = (wrapper, tween, scrollAmount) => {
        ScrollTrigger.create({
          trigger: wrapper,
          start: "top 15%",
          end: `+=${scrollAmount}`,
          pin: true,
          animation: tween,
          scrub: 1,
          invalidateOnRefresh: true,
          // markers: true,
        });
      };

      // Tính toán lượng cuộn cần thiết
      const scrollAmount = getScrollAmount();
      // Tạo tween animation cho testimonial
      const tween = createTween(testimonial, scrollAmount);
      // Tạo ScrollTrigger cho phần tử wrapper
      createScrollTrigger(wrapper, tween, scrollAmount);
    });

    // Làm mới ScrollTrigger sau khi tất cả triggers đã được thiết lập
    ScrollTrigger.refresh();
  }
}

function gsapGui() {
  gsap.registerPlugin(ScrollTrigger);
  const outerHeight = $(".gui-section").outerHeight();

  gsap.to(".gui", {
    scrollTrigger: {
      trigger: ".gui",
      start: "top top",
      end: `+=${outerHeight}`,
      pin: true,
      scrub: true,
      // markers: true,
      // pinSpacing: false,
    },
  });

  gsap.to(".gui-wrapper", {
    clipPath: "polygon(35% 20%, 65% 20%, 65% 80%, 35% 80%)",
    scrollTrigger: {
      trigger: ".gui",
      start: "top top",
      scrub: true,
      ease: "bounce.out",
      duration: 1,
    },
  });

  const elements = [
    { selector: ".gui-bot-center", properties: { height: "100px" } },
    { selector: ".gui-top-center", properties: { height: "100px" } },
    { selector: ".gui-top-left", properties: { top: "0px" } },
    { selector: ".gui-top-right", properties: { top: "0px" } },
    {
      selector: ".gui-bottom-left",
      css: { height: "20%" },
      properties: { height: "calc(40% - 30px)" },
    },
    {
      selector: ".gui-bottom-right",
      css: { height: "20%" },
      properties: { height: "calc(40% - 30px)" },
    },
  ];

  elements.forEach((el) => {
    if (el.css) {
      $(el.selector).css(el.css);
    }

    gsap.to(el.selector, {
      ...el.properties,
      scrollTrigger: {
        trigger: ".gui",
        start: "top top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  });

  ScrollTrigger.refresh();
}
function gsapGallery() {
  // gallery
  $(".gallery-section").each(function (index, section) {
    const photos = $(section).find(".photo:not(:first-child)");
    const right = $(section).find(".right");
    const gallery = $(section).find(".gallery");

    gsap.set(photos, { opacity: 0, scale: 0 });

    // Tạo animation cho các ảnh
    const animation = gsap.to(photos, {
      opacity: 1,
      scale: 1,
      duration: 1,
      stagger: 1,
    });
    // // Thiết lập ban đầu cho các ảnh
    // gsap.set(photos, { opacity: 0, yPercent: 100 });

    // // Tạo animation cho các ảnh
    // let animation = gsap
    //   .timeline()
    //   .to(photos, {
    //     opacity: 1,
    //     yPercent: 0,
    //     duration: 2,
    //     stagger: 1,
    //     ease: "power2.out",
    //   })
    //   .to(photos, {
    //     autoAlpha: 0,
    //     duration: 2,
    //     stagger: 1,
    //     ease: "power2.out",
    //   });

    // Tạo ScrollTrigger cho từng section
    ScrollTrigger.create({
      trigger: gallery,
      start: "top top",
      end: "bottom bottom",
      pin: right,
      animation: animation,
      scrub: true,
      // markers: true,
    });
  });

  // Làm mới ScrollTrigger sau khi thiết lập
  ScrollTrigger.refresh();
}
function gsapWink() {
  gsap.registerPlugin(ScrollTrigger);
  const outerHeight = $(".wink-section").outerHeight();

  gsap.to(".wink-img", {
    scrollTrigger: {
      trigger: ".wink-img",
      start: "top top",
      end: `+=${outerHeight}`,
      pin: true,
      scrub: true,
      markers: true,
    },
  });

  gsap.to(".wink-wrapper", {
    clipPath: " polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)",
    scrollTrigger: {
      trigger: ".wink-img",
      start: "top top",
      scrub: true,
      ease: "bounce.out",
      duration: 1,
    },
  });

  ScrollTrigger.refresh();
}

// check scroll section id

// $(window).on("load", function () {
//   const hash = window.location.hash;
//   if (hash) {
//     const $targetElement = $(hash);
//     if ($targetElement.length > 0) {
//       const elementRect = $targetElement.get(0).getBoundingClientRect();
//       const absoluteElementTop =
//         elementRect.top + window.pageYOffset - 80;
//       console.log(absoluteElementTop);
//       $("html, body").animate(
//         {
//           scrollTop: absoluteElementTop,
//         },
//         "smooth"
//       );
//     }
//   }
// });

var swiperCards = new Swiper(".mySwiperCards", {
  effect: "cards",
  grabCursor: true,
  loop: true,
  speed: 400,
  simulateTouch: false, // Tắt chức năng kéo
  allowTouchMove: false, // Tắt chức năng di chuyển bằng cảm ứng
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  cardsEffect: {
    perSlideOffset: 10,
    perSlideRotate: 0,
    slideShadows: false,
    rotate: false,
  },
});

function splitText() {
  gsap.config({ trialWarn: false });
  console.clear();
  gsap.registerPlugin(ScrollTrigger, SplitType);
  const split = new SplitType(".text p", { type: "lines" });

  split.lines.forEach((target) => {
    gsap.to(target, {
      backgroundPositionX: 0,
      ease: "none",
      scrollTrigger: {
        trigger: target,
        markers: true,
        scrub: 1,
        start: "top center",
        end: "bottom center",
      },
    });
  });
}
// https://codepen.io/udovichenko/pen/LGeQae

// var interleaveOffset = 0.5;

// var swiper = new Swiper(".swiper-container", {
//   // Các tùy chọn chính
//   loop: true,
//   speed: 1000,
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },

// on: {
//   progress: function (swiper, progress) {
//     swiper.slides.forEach(function (slide, index) {
//       var slideProgress = slide.progress;
//       var innerOffset = swiper.width * interleaveOffset;
//       var innerTranslate = slideProgress * innerOffset;
//       console.log(slideProgress);
//       slide.querySelector(".slide-inner").style.transform =
//         "translate3d(" + innerTranslate + "px, 0, 0)";
//     });
//   },
//   touchStart: function (swiper) {
//     swiper.slides.forEach(function (slide) {
//       slide.style.transition = "";
//     });
//   },
//   setTransition: function (swiper, speed) {
//     swiper.slides.forEach(function (slide) {
//       slide.style.transition = speed + "ms";
//       slide.querySelector(".slide-inner").style.transition = speed + "ms";
//     });
//   },
// },
// });
// var interleaveOffset = 0.5;

// var swiperOptions = {
//   loop: true,
//   speed: 1000,
//   grabCursor: true,
//   watchSlidesProgress: true,
//   mousewheelControl: true,
//   keyboardControl: true,
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   autoplay: {
//     delay: 3500,
//     disableOnInteraction: true,
//   },
//   effect: "custom", // Đặt effect là 'custom'
//   transitionEffect: true, // Bật transition effect

//   on: {
//     transitionStart: function () {
//       var previousSlide = this.slides[this.previousIndex];
//       previousSlide.style.transform = "scale(1)";
//       previousSlide.style.zIndex = 0;
//     },
//     transitionEnd: function () {
//       var previousSlide = this.slides[this.previousIndex];
//       previousSlide.style.transform = "";
//       previousSlide.style.zIndex = "";
//     },
//   },
// };

var interleaveOffset = 0.5;

var swiper = new Swiper(".swiper-container", {
  loop: true,
  speed: 1000,
  grabCursor: true,
  watchSlidesProgress: true,
  mousewheelControl: true,
  keyboardControl: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    progress: function (swiper) {
      swiper.slides.forEach(function (slide) {
        var slideProgress = slide.progress || 0;
        var innerOffset = swiper.width * interleaveOffset;
        var innerTranslate = slideProgress * innerOffset;
        console.log(slide.progress);
        // Kiểm tra nếu innerTranslate không phải là NaN
        if (!isNaN(innerTranslate)) {
          var slideInner = slide.querySelector(".slide-inner");
          if (slideInner) {
            slideInner.style.transform =
              "translate3d(" + innerTranslate + "px, 0, 0)";
          }
        }
      });
    },
    touchStart: function (swiper) {
      swiper.slides.forEach(function (slide) {
        slide.style.transition = "";
      });
    },
    setTransition: function (swiper, speed) {
      swiper.slides.forEach(function (slide) {
        slide.style.transition = speed + "ms";
        var slideInner = slide.querySelector(".slide-inner");
        if (slideInner) {
          slideInner.style.transition = speed + "ms";
        }
      });
    },
  },
});

let typeSplit;

// Split the text up
function runSplit() {
  typeSplit = new SplitType(".split-word", {
    types: "lines, words",
  });
  $(".word").append("<div class='line-mask'></div>");
  createAnimation();
}

runSplit();

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Create staggered animation
function createAnimation() {
  let allMasks = $(".word")
    .map(function () {
      return $(this).find(".line-mask");
    })
    .get();

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".split-word",
      start: "top center",
      end: "bottom center",
      scrub: 1,
    },
  });

  tl.to(allMasks, {
    width: "0%",
    duration: 1,
    stagger: 0.5,
  });
}

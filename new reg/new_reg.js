let tl1 = gsap.timeline();
let tl2 = gsap.timeline();
let tl3 = gsap.timeline();

tl1.from(".info-box", {
  opacity: 0,
  delay: 0.2, 
  y: 0,
  x: -170,
  duration: 1.5,
  stagger: 0.1
});

tl3.from(".register-box", {
    delay: 1.5,
    opacity: 0,
    y: 0,
    x: 170,
    duration: 1.5,
    stagger: 0.1
});

tl2.from(".icons", {
    opacity: 0,
    y: 0,
    x: -100,
    duration: 1,
    stagger: 0.1
});  



gsap.to("h2", {
    opacity: 1,
    transform: "translateX(10%)",
    delay: 1,
    scrollTrigger: {
      trigger: ".container",
      scroller: "body",
      // markers: true,
      scrub: 2,
      pin: true,
    },
  });



  
  
  



const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

tl.to(".text", { y: "0%", duration: 1, stagger: 0.25, ease: "bounce" });
tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
tl.to(".intro", {y: "-100%", duration: 1}, "<0.5");
tl.from(".hero h1", {opacity: 0, duration: 1})
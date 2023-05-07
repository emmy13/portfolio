const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

tl.to(".text", { y: "0%", duration: 1, stagger: 0.25, ease: "bounce" });
tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
tl.to(".intro", {y: "-100%", duration: 1}, "<0.5");
tl.from(".hero h1", {opacity: 0, duration: 1, onComplete: animation})

let parallaxText = document.querySelector(".parallax-text"),
    activeParallaxIndex = 0,
    words = ["developer", "mandem", "undefined", "baller"],
    maxLengthWord = words.reduce((max, word) => max.length > word.length ? max : word, '').length,
    textHeight = 0,
    currentHeight = 0;


attachWords();
adjustHeight();

function animation() {
    let spans = document.querySelectorAll(".parallax-text span");
    let spanArr = [];
    for (let i = 0; i < spans.length; i++) spanArr.push(spans[i]);
    let shuffledArr = gsap.utils.shuffle(spanArr);
    
    gsap.to(shuffledArr, { duration: 1, y: -currentHeight, stagger: 0.2, delay: 1, ease: Expo.easeOut, onComplete: animation })

    if(currentHeight / textHeight == (words.length - 1)) currentHeight = 0; 
    else currentHeight+=textHeight
}

function attachWords() {
    let spans = [];
    for (let i = 0; i < maxLengthWord; i++) {
        let span = document.createElement("span");
        spans.push(span);
    }
    for (let i = 0; i < words.length; i++) {
        let word = words[i].split("");
        let spacing = Math.floor((maxLengthWord - word.length)/2)
        let backSpace = maxLengthWord - (spacing + word.length);
        let activeWord = 0;
        for (let j = 0; j < maxLengthWord; j++) {
            let para = document.createElement("p");
            if((j + 1) <= spacing || (maxLengthWord - (j + 1)) < backSpace) {
                para.innerHTML = "0";
                para.classList.add("off")
            } else {
                para.innerHTML = word[activeWord];
                para.dataset.text = word[activeWord];
                activeWord++;
            }
            spans[j].append(para)
        }
    }
    for (let i = 0; i < spans.length; i++) {
        parallaxText.append(spans[i])       
    }
}

function adjustHeight() {
    let para = document.querySelector(".parallax-text span p");
    textHeight = para.offsetHeight;
    console.log(para.offsetHeight);
    if(currentHeight < textHeight) currentHeight = textHeight;
    parallaxText.style.height = `${textHeight}px`
}
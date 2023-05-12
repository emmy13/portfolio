// const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

// tl.to(".text", { y: "0%", duration: 1, stagger: 0.25, ease: "bounce" });
// tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
// tl.to(".intro", {y: "-100%", duration: 1}, "<0.5");
// tl.from(".hero h1", {opacity: 0, duration: 1, onComplete: animation})

let parallaxText = document.querySelector(".parallax-text"),
    activeParallaxIndex = 0,
    words = ["a fullstack", "web developer", "a motivated", "programmer", "a co-operative", "team member"],
    maxLengthWord = words.reduce((max, word) => max.length > word.length ? max : word, '').length,
    textHeight = 0,
    currentHeight = 0,
    textPerLine = 2;


attachWords();
adjustHeight();
animation()

function animation() {
    let spans = document.querySelectorAll(".parallax-text span");
    let spanArr = [];
    for (let i = 0; i < spans.length; i++) spanArr.push(spans[i]);
    let shuffledArr = gsap.utils.shuffle(spanArr);

    gsap.to(shuffledArr, { duration: 1, y: -currentHeight, stagger: 0.2, delay: 2, ease: Expo.easeOut, onComplete: animation })
    if (currentHeight / textHeight == ((words.length / textPerLine) - 1)) currentHeight = 0;
    else currentHeight += textHeight;
}

function attachWords() {
    let spans = [];
    for (let i = 0; i < maxLengthWord; i++) {
        let span = document.createElement("span");
        spans.push(span);
    }
    for (let i = 0; i < words.length; i++) {
        let word = words[i].split("");
        let spacing = Math.floor((maxLengthWord - word.length) / 2)
        let backSpace = maxLengthWord - (spacing + word.length);
        let activeWord = 0;
        for (let j = 0; j < maxLengthWord; j++) {
            let para = document.createElement("p");
            if ((j + 1) <= spacing || (maxLengthWord - (j + 1)) < backSpace) {
                para.innerHTML = "0";
                para.classList.add("off")
            } else {
                if (word[activeWord] == " ") {
                    para.innerHTML = "0";
                    para.classList.add("off")
                } else {
                    para.innerHTML = word[activeWord];
                    // para.dataset.text = word[activeWord];
                }
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
    textHeight = para.offsetHeight * textPerLine;
    currentHeight = 0;
    parallaxText.style.height = `${textHeight}px`
}

//Skills
const skillsBox = document.querySelector(".skills--box-skills");
const skills = [
    {
        logo: 'html.png',
        color: 'rgba(230, 81, 0)',
        name: 'html 5',
        text: 'standard markup language for web pages',
        shadow: 'rgba(230, 81, 0, 0.15)'
    },
    {
        logo: 'css.png',
        color: 'rgb(2, 119, 189)',
        name: 'css 3',
        text: 'style sheet language for HTML documents',
        shadow: 'rgba(2, 119, 189, 0.15)'
    },
    {
        logo: 'js.png',
        color: 'rgb(255, 214, 0)',
        name: 'javascript',
        text: 'web programming language',
        shadow: 'rgba(255, 214, 0, 0.15)'
    },
    {
        logo: 'node.png',
        color: 'rgb(56, 142, 60)',
        name: 'node js',
        text: 'open source server environment',
        shadow: 'rgba(56, 142, 60, 0.15)'
    },
    {
        logo: 'express.png',
        color: 'rgb(33, 163, 102)',
        name: 'express js',
        text: 'backend node js framework',
        shadow: 'rgba(33, 163, 102, 0.15)'
    },
    {
        logo: 'sql.png',
        color: 'rgb(0, 121, 107)',
        name: 'MySQL',
        text: 'relational database management system',
        shadow: 'rgba(0, 121, 107, 0.15)'
    }
]

function attachSkills() {
    for (let i = 0; i < skills.length; i++) {
        let div = document.createElement("div");
        let divContent = `<div class="skills-logo">
                <img src="./resources/icons/${skills[i].logo}" alt="logo">
            </div>
            <h1 style="color: ${skills[i].color}">${skills[i].name}</h1>
            <p>${skills[i].text}</p>`;
        div.innerHTML = divContent;
        div.classList.add("skills-skill");
        div.style.border = `1px solid ${skills[i].color}`;
        div.style.boxShadow = `${skills[i].shadow} 0px 4px 24px`;

        skillsBox.append(div);
    }
}

function adjustSkills() {
    let gap = 30;
    let spacing = 0;
    const skillsSkill = document.querySelectorAll(".skills-skill");
    const skillWidth = skillsSkill[0].clientWidth + gap;
    for (let i = 0; i < skillsSkill.length; i++) {
        skillsSkill[i].style.transform = `translateX(${spacing}px)`;
        spacing+=skillWidth;
    }
}

attachSkills();
adjustSkills();

let windowWidth = window.innerWidth;
let resizeTimeout;

window.onresize = () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth !== windowWidth) {
            adjustHeight();
            windowWidth = window.innerWidth;
        }
    }, 300);
};
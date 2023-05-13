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
    textPerLine = 2,
    skillSpacing = [];

//Attach words, adjust height and animate
attachWords();
adjustHeight();
animation();

//Skills
const skillsBack = document.getElementById("skills-back");
const skillsNext = document.getElementById("skills-next");
const skillsBox = document.querySelector(".skills--box-skills");
const skills = [
    {
        logo: 'html.png',
        color: 'rgba(230, 81, 0)',
        name: 'html 5',
        text: 'standard markup language for web pages',
        shadow: 'rgba(230, 81, 0, 0.15)',
        content: 'This is a paragraph about HTML, the standard markup language used for creating web pages. HTML stands for Hypertext Markup Language, and it is the foundation upon which most websites are built. With HTML, web developers can create everything from simple static pages to complex, interactive web applications. '
    },
    {
        logo: 'css.png',
        color: 'rgb(2, 119, 189)',
        name: 'css 3',
        text: 'style sheet language for HTML documents',
        shadow: 'rgba(2, 119, 189, 0.15)',
        content: 'Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language. It is commonly used for styling web pages written in HTML and XHTML, but can also be applied to any kind of XML document.'
    },
    {
        logo: 'js.png',
        color: 'rgb(255, 214, 0)',
        name: 'javascript',
        text: 'web programming language',
        shadow: 'rgba(255, 214, 0, 0.15)',
        content: 'JavaScript (JS) is a programming language that allows developers to create dynamic, interactive web pages. JS can be used to add functionality, validate user input, manipulate HTML and CSS, and communicate with servers. JS is typically used alongside HTML and CSS to build websites and web applications.'
    },
    {
        logo: 'node.png',
        color: 'rgb(56, 142, 60)',
        name: 'node js',
        text: 'open source server environment',
        shadow: 'rgba(56, 142, 60, 0.15)',
        content: "Node.js is an open-source, cross-platform, JavaScript runtime environment built on Chrome's V8 JavaScript engine. It allows developers to run JavaScript code outside of a web browser, enabling server-side scripting and building server-side applications with JavaScript."
    },
    {
        logo: 'express.png',
        color: 'rgb(33, 163, 102)',
        name: 'express js',
        text: 'backend node js framework',
        shadow: 'rgba(33, 163, 102, 0.15)',
        content: 'Express.js is a web framework for Node.js that provides a simple and flexible set of features for building web applications and APIs. It is designed to be minimalist, unopinionated, and easy to use, and has become one of the most popular Node.js frameworks for building web applications.'
    },
    {
        logo: 'sql.png',
        color: 'rgb(0, 121, 107)',
        name: 'MySQL',
        text: 'relational database management system',
        shadow: 'rgba(0, 121, 107, 0.15)',
        content: 'MySQL is an open-source relational database management system (RDBMS) that uses Structured Query Language (SQL) to manage and manipulate data. It is widely used in web development to store and retrieve data for websites and applications. MySQL provides a scalable, reliable, and easy-to-use database solution for businesses of all sizes, from small startups to large enterprises.'
    }
]

//Attach skills and content to parent 
attachSkills();
attachPara();

//Skills Buttons
skillsNext.addEventListener("click", () => {
    //disable buttons
    disableBtns(true);

    //get active element
    const activeElement = document.querySelector('.skills-skill[data-status="active"]');

    //get siblings before and after
    let { siblingsBefore, siblingsAfter } = getAllSiblings(activeElement);
    let nextSibling = siblingsAfter.shift();
    let afterNextSibling = siblingsAfter.shift();

    const tl = gsap.timeline({
        defaults: {
            duration: 0.8,
            ease: Back.easeInOut
        }
    });

    if (siblingsBefore.length) gsap.to(siblingsBefore, { duration: 0, yPercent: 200, x: 0 });

    //start timeline
    tl.to(gsap.utils.shuffle(splitPara()), { duration: 0.5, stagger: 0.01, opacity: 0 })
    tl.to(activeElement, { yPercent: 200 })
    tl.to(nextSibling, { x: 0 }, "-=0.6");

    if (afterNextSibling) tl.to(afterNextSibling, { x: skillSpacing[0], onComplete: () => restructureSkills(true) }, "-=0.6");

    if (siblingsAfter.length) tl.to(siblingsAfter, { duration: 0, x: skillSpacing[1] });

    tl.call(() => {
        attachPara();
        disableBtns(false);
        changeSkillsState({ hasNextSibling: afterNextSibling, hasPrevSibling: true })
        gsap.fromTo(gsap.utils.shuffle(splitPara()), { opacity: 0 }, { duration: 0.5, stagger: 0.01, opacity: 1 })
    })
})

skillsBack.addEventListener("click", () => {
    //disable button
    disableBtns(true);

    //get active element
    const activeElement = document.querySelector('.skills-skill[data-status="active"]').previousElementSibling;

    //get siblings before and after
    let { siblingsBefore, siblingsAfter } = getAllSiblings(activeElement);
    let nextSibling = siblingsAfter.shift();

    const tl = gsap.timeline({
        defaults: {
            duration: 0.8,
            ease: Back.easeInOut
        }
    });

    if (siblingsBefore.length) gsap.to(siblingsBefore, { duration: 0, yPercent: 200, x: 0 });

    //start timeline
    tl.to(gsap.utils.shuffle(splitPara()), { duration: 0.5, stagger: 0.01, opacity: 0 })
    if (siblingsAfter.length) tl.to(siblingsAfter, { duration: 0.5, x: skillSpacing[1] });
    tl.to(nextSibling, { x: skillSpacing[0] }, "-=0.5")
        .to(activeElement, { yPercent: 0 }, "-=0.6")
        .call(() => {
            restructureSkills(false);
            attachPara();
            disableBtns(false);
            changeSkillsState({ hasNextSibling: true, hasPrevSibling: activeElement.previousElementSibling });
            gsap.fromTo(gsap.utils.shuffle(splitPara()), { opacity: 0 }, { duration: 0.5, stagger: 0.01, opacity: 1 })
        })
})

//Text Functions
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

//Skill Functions
function attachSkills() {
    skillsBack.classList.add("off")
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
    //adjust skills after attaching them
    adjustSkills();
}

function adjustSkills() {
    let gap = 30;
    let spacing = 0;
    const skillsSkill = document.querySelectorAll(".skills-skill");
    const skillWidth = skillsSkill[0].clientWidth + gap;

    //set active element
    skillsSkill[0].dataset.status = "active";

    for (let i = 0; i < skillsSkill.length; i++) {
        skillsSkill[i].style.transform = `translateX(${spacing}px)`;
        if (i > 1) continue
        spacing += skillWidth;
        skillSpacing.push(spacing);
    }
}

function attachPara() {
    const skillsPara = document.getElementById("skills-para");
    const activeElement = document.querySelector('.skills-skill[data-status="active"]');

    const name = activeElement.querySelector("h1").innerText;
    const obj = skills.find(skill => skill.name.toLowerCase() === name.toLowerCase());

    skillsPara.previousElementSibling.innerHTML = obj.name || "undefined";
    skillsPara.innerHTML = obj.content || 'No text mentioned';
}

function revertPara() {
    const skillsPara = document.getElementById("skills-para");
    if (skillsPara.querySelectorAll("span").length < 1) return;

    const text = [...document.querySelectorAll("#skills-para span")].map(node => node.textContent).join("");
    skillsPara.innerHTML = text;

    return
}

function splitPara() {
    let skillsPara = document.getElementById("skills-para");
    if (skillsPara.querySelectorAll("span").length > 0) {
        revertPara();
        skillsPara = document.getElementById("skills-para");
    }

    skillsPara.innerHTML = "<span>" + skillsPara.innerHTML.split(" ").join(" </span><span>") + "</span>";

    const skillsParaSpans = [...document.querySelectorAll("#skills-para span")];
    return skillsParaSpans;
}

function disableBtns(condition) {
    if (condition) {
        skillsBack.disabled = true;
        skillsNext.disabled = true;
        skillsNext.classList.add("load");
        skillsBack.classList.add("load");
    } else {
        skillsNext.disabled = false;
        skillsBack.disabled = false;
        skillsNext.classList.remove("load");
        skillsBack.classList.remove("load");
    }
}

function changeSkillsState(obj) {
    if (obj.hasNextSibling) skillsNext.classList.remove("off")
    else skillsNext.classList.add("off")
    if (obj.hasPrevSibling) skillsBack.classList.remove("off")
    else skillsBack.classList.add("off")
}

function restructureSkills(param) {
    const activeElement = document.querySelector('.skills-skill[data-status="active"]');

    let sibling = (param) ? activeElement.nextElementSibling : activeElement.previousElementSibling;

    if (sibling) {
        activeElement.removeAttribute('data-status');
        sibling.dataset.status = "active";
    }

}

function getAllSiblings(activeElement) {
    const siblingsBefore = [];
    const siblingsAfter = [];

    let sibling = activeElement.previousElementSibling;
    while (sibling) {
        siblingsBefore.push(sibling);
        sibling = sibling.previousElementSibling;
    }

    sibling = activeElement.nextElementSibling;
    while (sibling) {
        siblingsAfter.push(sibling);
        sibling = sibling.nextElementSibling;
    }

    return { siblingsBefore, siblingsAfter };
}

function getSiblings(activeElement) {
    const siblingBefore = activeElement.previousElementSibling;
    const siblingAfter = activeElement.nextElementSibling;

    return { siblingBefore, siblingAfter };
}

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
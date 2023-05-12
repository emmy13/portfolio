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
const skillsBack = document.getElementById("skills-back");
const skillsNext = document.getElementById("skills-next");
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

attachSkills();
adjustSkills();

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
            ease: Expo.easeInOut
        }
    });

    if (siblingsBefore.length) gsap.to(siblingsBefore, { duration: 0, yPercent: 200, x: 0 });

    //start timeline
    tl.to(activeElement, { yPercent: 200 })
    tl.to(nextSibling, { x: 0 }, "-=0.2");

    if (afterNextSibling) tl.to(afterNextSibling, { duration: 0.3, x: skillSpacing[0], onComplete: () => restructureSkills(true) });

    if (siblingsAfter.length) tl.to(siblingsAfter, { duration: 0, x: skillSpacing[1] });

    tl.call(() => {
        disableBtns(false);
        changeSkillsState({ hasNextSibling: afterNextSibling, hasPrevSibling: true })
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
            ease: Expo.easeInOut
        }
    });

    if (siblingsBefore.length) gsap.to(siblingsBefore, { duration: 0, yPercent: 200, x: 0 });

    //start timeline
    if (siblingsAfter.length) tl.to(siblingsAfter, { duration: 0.5, x: skillSpacing[1] });
    tl.to(nextSibling, { x: skillSpacing[0] })
        .to(activeElement, { yPercent: 0 }, "-=0.5")
        .call(() => {
            disableBtns(false);
            restructureSkills(false)
            changeSkillsState({ hasNextSibling: true, hasPrevSibling: activeElement.previousElementSibling })
        })
})


//Functions
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
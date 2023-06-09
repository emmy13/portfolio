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

//About
const aboutSliderBox = document.querySelector(".about-slider-box");
const about = [
    ['motivated', 'sharp', 'co-ordinated', 'heppy', 'caring', 'understanding'],
    ['frontend<br>developer', 'backend<br>developer', 'team<br>player', 'quick<br>learner', 'unstoppable<br>force', 'nice guy'],
    ['html & css', 'javascript', 'express', 'mysql', 'gsap', 'barba']
]

setupAbout();
setupAboutAnimation();

//About Functions
function setupAbout() {
    const setup = (i) => {
        let contents = ""
        let currentTexts = about[i];
        let slider = document.createElement("div");
        let sliderBox = document.createElement("div");
        let isActive = (i == 1) ? "active" : "";

        for (let j = 0; j < currentTexts.length; j++) contents += `<div class="about-slide ${isActive}">${currentTexts[j]}</div>`;

        sliderBox.classList.add("about-slide-box");
        sliderBox.innerHTML = contents;

        slider.classList.add("about-slider");
        slider.append(sliderBox);

        return slider;
    }

    let extra = (window.matchMedia("(min-width: 1020px)").matches) ? [0, 2] : [];

    for (let i = 0; i < about.length; i++) {
        let slider = setup(i);
        aboutSliderBox.append(slider);
    }

    for (const key in extra) {
        let slider = setup(extra[key]);
        if (extra[key]) aboutSliderBox.insertBefore(slider, aboutSliderBox.children[0])
        else aboutSliderBox.append(slider);
    }

}

function setupAboutAnimation() {
    const aboutSlider = document.querySelectorAll(".about-slider");
    for (let i = 0; i < aboutSlider.length; i++) {
        let direction = (i % 2 == 0) ? "to" : "fro";

        const slider = aboutSlider[i].querySelector(".about-slide-box");
        let sliderClone = slider.cloneNode(true);

        aboutSlider[i].append(sliderClone);

        slider.classList.add(direction);
        sliderClone.classList.add(direction);
    }
}

//Services
const mainServices = document.querySelector(".main-services");
const services = [
    {
        name: 'frontend web development',
        text: 'My customers have enjoyed the various styles I use in designing my websites, from minimalistic to dynamic, I have been gathering experience would greatly improve my frontend skills.',
        icon: 'brush',
        color: 'rgb(0, 189, 157)',
        opacity: 'rgba(0, 189, 157, 0.15)'
    },
    {
        name: 'backend web development',
        text: 'Backend is where my skills really lie as it requires critical thinking, I strive to develop fully functional website that meet my customers needs.',
        icon: 'brain',
        color: 'rgba(222, 54, 157, 1)',
        opacity: 'rgba(222, 54, 157, 0.15)'
    },
    {
        name: 'website hosting',
        text: 'Not all customers would like to go through the stress of finding the best service to host their website, luckily I am here to help take that pressure off your back.',
        icon: 'network-wired',
        color: 'rgba(116, 79, 198, 1)',
        opacity: 'rgba(116, 79, 198, 0.15)'
    },
    {
        name: 'website management',
        text: 'Reading another persons code is a truly tasking job not to mention upgrading it, I help my customers to maintain their already existing websites and even add or remove functionalities.',
        icon: 'computer',
        color: 'rgba(255, 124, 217, 1)',
        opacity: 'rgba(255, 124, 217, 0.15)'
    }
]

attachServices();

var flkty = new Flickity('.main-services', {
    // options
    prevNextButtons: false,
    pageDots: false,
    // autoPlay: true,
    pauseAutoPlayOnHover: false
});

//Services Functions
function attachServices() {
    for (let i = 0; i < services.length; i++) {
        let service = services[i];
        let div = document.createElement("div");

        let content = 
        `<div class="services-logo">
            <i class="fa-solid fa-${service.icon}"></i>
        </div>
        <div class="services-text">
            <h1>${service.name}</h1>
            <br>
            <p>${service.text}</p>
        </div>`;

        div.classList.add("services-cell");
        div.style.setProperty("--color", service.color);
        div.style.setProperty("--opacity", service.opacity);
        div.innerHTML = content;

        mainServices.append(div);
    }
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
        shadow: 'rgba(230, 81, 0, 0.15)',
        content: 'Hypertext Markup Language (HTML) weaves the digital tapestry of my creations, providing a solid foundation for my imaginative web projects. With HTML, I bring ideas to life, constructing captivating web pages and crafting seamless user experiences.'
    },
    {
        logo: 'css.png',
        color: 'rgb(2, 119, 189)',
        name: 'css 3',
        text: 'style sheet language for HTML documents',
        shadow: 'rgba(2, 119, 189, 0.15)',
        content: 'Cascading Style Sheets (CSS) dances at my fingertips, enabling me to paint vibrant visuals and breathe life into my designs. With CSS, I meticulously style and sculpt every element, transforming mere code into visually stunning masterpieces that leave a lasting impression.'
    },
    {
        logo: 'js.png',
        color: 'rgb(255, 214, 0)',
        name: 'javascript',
        text: 'web programming language',
        shadow: 'rgba(255, 214, 0, 0.15)',
        content: 'JavaScript (JS), the conductor of interactivity, empowers me to infuse my creations with dynamic functionalities and captivating user interactions. With JS, I add that extra spark, manipulating elements, validating inputs, and creating immersive web experiences that engage and delight visitors.'
    },
    {
        logo: 'node.png',
        color: 'rgb(56, 142, 60)',
        name: 'node js',
        text: 'open source server environment',
        shadow: 'rgba(56, 142, 60, 0.15)',
        content: "Node.js, my trusted ally in the realm of server-side scripting, harnesses the power of JavaScript beyond the confines of web browsers. Built on Chrome's V8 JavaScript engine, this open-source, cross-platform runtime environment empowers me to craft robust server-side applications with the familiar language of JavaScript."
    },
    {
        logo: 'express.png',
        color: 'rgb(33, 163, 102)',
        name: 'express js',
        text: 'backend node js framework',
        shadow: 'rgba(33, 163, 102, 0.15)',
        content: 'Express.js, the agile maestro of web frameworks for Node.js, offers a delightful canvas for crafting web applications and APIs. With its minimalist and unopinionated design, Express.js empowers me with a flexible toolkit, enabling me to build robust, scalable, and customized web solutions with ease.'
    },
    {
        logo: 'sql.png',
        color: 'rgb(0, 121, 107)',
        name: 'MySQL',
        text: 'relational database management system',
        shadow: 'rgba(0, 121, 107, 0.15)',
        content: 'MySQL has emerged as a steadfast partner, an open-source relational database management system (RDBMS) that fuels my web development journey. With its prowess in utilizing Structured Query Language (SQL), MySQL empowers me to effortlessly store, retrieve, and manipulate data, bringing life to my web applications.'
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
    tl.to(nextSibling, { x: 0, onComplete: () => restructureSkills(true) }, "-=0.6");

    if (afterNextSibling) tl.to(afterNextSibling, { x: skillSpacing[0] }, "-=0.6");

    if (siblingsAfter.length) tl.to(siblingsAfter, { duration: 0, x: skillSpacing[1] });

    tl.call(() => {
        changeSkillsState({ hasNextSibling: afterNextSibling, hasPrevSibling: true })
        attachPara();
        gsap.fromTo(gsap.utils.shuffle(splitPara()), { opacity: 0 }, { duration: 0.5, stagger: 0.01, opacity: 1 })
        setTimeout(() => {
            disableBtns(false)
        }, 600);
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
        div.style.border = `2px solid ${skills[i].color}`;
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

//Experience
var isClicked = false;
const experienceTest = document.querySelector(".experience-test");
const experienceHead = document.querySelector(".experience-head");
const experienceShow = document.querySelector(".experience-show");
const experienceLeftCont = document.querySelector(".experience-left-cont");
const experience = [
    {
        icon: "fa-solid fa-graduation-cap",
        name: "education",
        info: "babcock university",
        color: "rgba(0, 66, 130, 1)",
        opacity: "rgba(0, 66, 130, 0.2)",
        img: "bu.png",
        desc: "My journey in web development began during my time in school, where I immersed myself in the fundamentals of this exciting field. It all started in the 200-level 1st semester, where I dove into the world of web development with HTML and CSS.<br>Building upon this foundation, I eagerly advanced my skills in the 200-level 2nd semester by delving into MySQL."
    },
    {
        icon: "fa-solid fa-id-card-clip",
        name: "internship",
        info: " alusoft technologies",
        color: "rgba(186, 0, 77, 1)",
        opacity: "rgba(186, 0, 77, 0.2)",
        img: "alusoft.png",
        desc: "My passion for web development led me to further explore and refine my expertise at Alusoft Technologies. During this time, I revisited and strengthened my understanding of various web development concepts. I honed my skills in Bootstrap and dived into Express, empowering me to build robust and scalable web applications using JavaScript both on the client and server sides"
    },
    {
        info: 'my<br><span class="highlight">experience</span>',
        color: "white",
        img: "none",
        desc: "As a dedicated web developer, I constantly update my skills to stay current. With strong full-stack experience, I create efficient, user-friendly web applications. Although I'm an upcoming developer, I've gained valuable insights in the industry.<br>Here are some of my notable experiences in web development."
    }
]

//set experience text
experienceHead.querySelector("p").innerHTML = experience[experience.length - 1].desc;

//Global Paramaters
const experienceLength = experience.length - 1;
const transNum = 6;
const maxDuration = 2.5;
const stagger = 0.15;
var transDuration = ((maxDuration - stagger * (transNum - 1)) / transNum).toFixed(2);
let maxLength = 0;
let index = 0;

for (let i = 0; i < experience.length; i++) {
    if (experience[i].desc.length > maxLength) {
        maxLength = experience[i].desc.length;
        index = (i == experienceLength) ? 0 : i;
    }
}
//----------------------//

attachExperience();
attachTrans(transNum);
setHeight();

//Experience Functions
function setHeight() {
    const values = experience[index];
    const extra = (window.matchMedia("(max-width: 600px)").matches) ? 0 : 50;
    let content = `<img src="./resources/icons/${values.img}" alt="icon">
    <h1 style="color: ${values.color};">${values.info}</h1>
    <p>${values.desc}</p>`;
    experienceTest.innerHTML = content;

    experienceHead.style.minHeight = `${experienceTest.clientHeight + extra}px`
}

function attachExperience() {
    for (let i = 0; i < experienceLength; i++) {
        let div = document.createElement("div");
        let divContent = `<div class="experience-show-box op-cl" style="--color: ${experience[i].color}; --opacity: ${experience[i].opacity};">
                <i class="${experience[i].icon} op-cl"></i>
                <h1 class="op-cl">${experience[i].name}</h1>
            </div>`;

        div.classList.add("experience-show-cont", "op-cl")
        div.innerHTML = divContent;
        div.dataset.index = i;

        div.addEventListener("click", experienceClicked)

        experienceShow.append(div);
    }
}

function experienceClicked() {
    if (isClicked) return;

    attachExperienceText(this.dataset?.index);

    const boxes = document.querySelectorAll(".experience-show-cont").forEach((e) => e.classList.remove("active"));
    this.classList.add("active");
}

function attachTrans(num = 0) {
    for (let i = 0; i < num; i++) {
        let div = document.createElement("div");
        div.classList.add("experience-trans", "op-cl");
        div.style.width = `${(100 / num).toFixed(2)}%`;
        experienceLeftCont.append(div);
    }
}

function attachExperienceText(position = experienceLength, isHead = (position == experienceLength) ? true : false) {
    isClicked = true;
    experienceHead.dataset.index = position;

    let transArr = [];
    const values = experience[position];
    const tl = gsap.timeline({ defaults: { duration: transDuration } })
    document.querySelectorAll(".experience-trans").forEach((e) => transArr.push(e));

    let content = (isHead) ?
        `<div>
    <h1 style="color: ${values.color};">${values.info}</h1>
    <p>${values.desc}</p>
    </div`
        :
        `<div>
    <img src="./resources/icons/${values.img}" alt="icon">
    <h1 style="color: ${values.color};">${values.info}</h1>
    <p>${values.desc}</p>
    </div>`;

    transArr = gsap.utils.shuffle(transArr);

    tl.fromTo(transArr, { yPercent: 0, height: "0" }, { height: "100%", stagger: stagger })
        .call(() => experienceHead.innerHTML = content)
        .to(transArr, { yPercent: 100, stagger: stagger, onComplete: () => isClicked = false })
}

//Projects
const projectBox = document.querySelector(".projects-box");
const projectOverlay = document.querySelector(".projects-overlay");
const experienceSvg = document.querySelector(".experience-svg svg");
const projectShow = document.querySelectorAll(".projects-show");
const projectBoxOptions = document.querySelector(".projects-box-options");

const numOfProjectsShown = 3;
const scaleDrop = 0.1;
const projectInc = 10;
let activeProject = projectShow.length - 1;

projectPad();
setupProjects();
setupBtns();

//Project Functions
function switchProject() {
    let counter = 1;
    let scale = 1;
    let { index } = this.dataset;
    let project = projectShow[index];
    let { siblingsBefore, siblingsAfter } = getAllSiblings(project);
    const tl = gsap.timeline({
        defaults: {
            duration: 0.5,
            ease: Power1.out
        }
    });

    for (let i = 0; i < siblingsBefore.length; i++) {
        siblingsBefore[i].dataset.position = (counter * projectInc);
        siblingsBefore[i].dataset.scale = (scale -= scaleDrop);
        if (!(counter >= (numOfProjectsShown - 1))) counter++;
    }

    if (index > activeProject) {
        if (siblingsBefore.length) {
            siblingsBefore.reverse();
            for (let i = 0; i < siblingsBefore.length; i++) {
                tl.to(siblingsBefore[i], { y: `-${siblingsBefore[i].dataset.position}%`, scale: siblingsBefore[i].dataset.scale });
            }

        }
        tl.to(project, { y: 0, scale: 1 })
            .call(() => activeProject = index)
        if (siblingsAfter.length) tl.to(siblingsAfter.reverse(), { y: (projectBox.clientHeight), scale: 1, stagger: 0.2 })

    } else {
        if (siblingsAfter.length) tl.to(siblingsAfter.reverse(), { y: (projectBox.clientHeight), scale: 1, stagger: 0.2 })
        tl.to(project, { y: 0, scale: 1 })
            .call(() => activeProject = index)
        if (siblingsBefore.length) {
            for (let i = 0; i < siblingsBefore.length; i++) {
                tl.to(siblingsBefore[i], { y: `-${siblingsBefore[i].dataset.position}%`, scale: siblingsBefore[i].dataset.scale });
            }

        }
    }
}

function setupBtns() {
    const projectShow = document.querySelectorAll(".projects-show");
    for (let i = 0; i < projectShow.length; i++) {
        let btn = document.createElement("button");
        let content = `<p>${i + 1}</p>`;

        btn.classList.add("projects-box-options-show");
        btn.dataset.index = i;
        btn.innerHTML = content;
        btn.addEventListener("click", switchProject);

        projectBoxOptions.append(btn);
    }
}

function setupProjects() {
    let counter = 1;
    let scale = 1;
    let position = 0;
    for (let i = (projectShow.length - 1); i >= 0; i--) {
        gsap.set(projectShow[i], { scale, y: `-${position}%` })
        counter++;
        if (!(counter > numOfProjectsShown)) {
            scale -= scaleDrop;
            position += projectInc;
        };
    }
}

function projectPad() {
    projectOverlay.style.paddingTop = `${Math.ceil(experienceSvg.clientHeight)}px`;
}

//Contact
const form = document.getElementById("form-to-submit");
const formFields = form.querySelectorAll("input, textarea");
const formBtn = form.querySelector("button");
const contactSpan = document.querySelectorAll(".contact-show>span");

for (let i = 0; i < formFields.length; i++) {
    formFields[i].addEventListener("focus", function () {
        if (this.classList.contains("is-invalid")) this.classList.remove("is-invalid")
    })
}

for (let i = 0; i < contactSpan.length; i++) {
    contactSpan[i].addEventListener("click", function () {
        let type = capitalize(this.dataset.type);
        let value = this.querySelector("span").innerHTML;

        if (type.toLowerCase().includes("url")) value = `https://github.com/${value}`;

        navigator.clipboard.writeText(value)
            .then(() => attachAlert(`${type} copied successfully`, "success"))
            .catch((err) => attachAlert("Couldn't copy to clipboard", "error"))
    })
}

form.addEventListener("submit", function (e) {
    try {
        const url = "https://formspree.io/f/xayzgloq";
        const subject = this.dataset.subject;

        e.preventDefault();
        disableFormBtn();

        if (validateForm()) {
            attachAlert("Fields cannot be empty");
            disableFormBtn(false);
            return;
        }

        const formData = new FormData(this);

        fetch(url, {
            method: "POST",
            body: formDataToJson(formData, subject),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => {
                disableFormBtn(false);
                if (response.ok) {
                    for (let i = 0; i < formFields.length; i++) formFields[i].value = ""
                    attachAlert("Message sent successfully", "success");
                } else {
                    attachAlert("Couldn't connect to server, try again", "error");
                }
            })
            .catch(error => {
                disableFormBtn(false)
                attachAlert("Server unavailable", "error");
                console.log(error)
            })
    } catch (error) {
        attachAlert("Something went wrong", "error");
        console.log(error);
    }
})

//Contact Functions
function formDataToJson(formData, subject) {
    const dataObj = Object.fromEntries(formData);
    const data = {
        subject,
        ...dataObj
    };

    return JSON.stringify(data);
}

function disableFormBtn(condition = true) {
    if (condition) {
        formBtn.disabled = true;
        formBtn.innerHTML = "<span class='spinner'></span>";
    } else {
        formBtn.disabled = false;
        formBtn.innerHTML = "send";
    }
}

function validateForm() {
    let isEmpty = false;
    for (let i = 0; i < formFields.length; i++) {
        if (formFields[i].value.length < 1) {
            isEmpty = true;
            formFields[i].classList.add("is-invalid")
        }
    }

    return isEmpty;
}

function attachAlert(msg = "Empty Cell", type = "warning") {
    const tl = gsap.timeline({
        defaults: {
            duration: 1,

        }
    });
    const alertBox = document.querySelector(".alert-box");
    const alert = document.createElement("div");
    let icon = (type == "error") ? "xmark" :
        (type == "warning") ? "exclamation" : "check";

    let content = `<div class="icon">
            <i class="fa-solid fa-${icon}"></i>
        </div>
        <div class="text">
            <p>${msg}</p>
        </div>`;

    alert.classList.add("alert", type);
    alert.innerHTML = content;

    alertBox.insertBefore(alert, alertBox.children[0]);

    tl.fromTo(alert, { x: 100, opacity: 0 }, { x: 0, opacity: 1, ease: Elastic.easeOut })
        .to(alert, { y: -100, opacity: 0, delay: 2, ease: Back.easeIn })
        .call(() => alert.remove())

}

function capitalize(word = "") {
    if (!word.length) return undefined;
    let words = word.split(" ");
    for (let i = 0; i < words.length; i++) {
        let letter = words[i].split("").shift();
        words[i] = words[i].replace(letter, letter.toUpperCase())
    }

    word = words.join(" ");
    return word;
}

//Global Functions
document.addEventListener("click", (e) => {
    if (isClicked) return;
    closeAll(e);
});

function closeAll(e) {
    let element = e.target;

    if (!element.classList.contains("op-cl")) {
        if ((experienceHead.dataset?.index || experienceLength) == experienceLength) return

        isClicked = true;

        document.querySelectorAll(".experience-show-cont").forEach((e) => e.classList.remove("active"))

        attachExperienceText();
    } else return;
}

let windowWidth = window.innerWidth;
let resizeTimeout;

window.onresize = () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth !== windowWidth) {
            adjustHeight();
            setHeight();
            projectPad();
            windowWidth = window.innerWidth;
        }
    }, 300);
};
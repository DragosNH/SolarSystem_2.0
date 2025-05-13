import * as THREE from 'three';

const sideMenu = document.querySelector(".sidebar");
const menuBtn = document.querySelector(".menu-btn");
const content = document.querySelector(".content");
// -- Planets buttons --
const sunBtn = document.querySelector(".sunBtn");
const mercuryBtn = document.querySelector(".mercuryBtn");
const venusBtn = document.querySelector(".venusBtn");
const earthBtn = document.querySelector(".earthBtn");
const marsBtn = document.querySelector(".marsBtn");
const jupiterBtn = document.querySelector(".jupiterBtn");


// Planest infos 
let planetsInfos = [
    "The Sun's gravity holds the solar system together, keeping everything – from the biggest planets to the smallest particles of debris – in its orbit. The connection and interactions between the Sun and Earth drive the seasons, ocean currents, weather, climate, radiation belts and auroras. Though it is special to us, there are billions of stars like our Sun scattered across the Milky Way galaxy. The Sun has many names in many cultures. The Latin word for Sun is “sol,” which is the main adjective for all things Sun-related: solar.",
    "Mercury is the smallest planet in our solar system and the nearest to the Sun. Mercury is only slightly larger than Earth's Moon. It's the fastest planet, zipping around the Sun every 88 Earth days. Mercury is named for the swiftest of the ancient Roman gods.",
    "Venus is the second planet from the Sun, and the sixth largest planet. It’s the hottest planet in our solar system. Venus is a cloud-swaddled planet and our nearest planetary neighbor. It has a surface hot enough to melt lead.",
    "While Earth is only the fifth largest planet in the solar system, it is the only world in our solar system with liquid water on the surface. Just slightly larger than nearby Venus, Earth is the biggest of the four planets closest to the Sun, all of which are made of rock and metal. Earth is the only planet in the solar system whose English name does not come from Greek or Roman mythology. The name was taken from Old English and Germanic. It simply means \"the ground.\" There are, of course, many names for our planet in the thousands of languages spoken by the people of the third planet from the Sun.",
    "Mars is no place for the faint-hearted. It’s dry, rocky, and bitter cold. The fourth planet from the Sun, Mars, is one of Earth's two closest planetary neighbors (Venus is the other). Mars is one of the easiest planets to spot in the night sky — it looks like a bright red point of light.",
    "Jupiter is a world of extremes. It's the largest planet in our solar system – if it were a hollow shell, 1,000 Earths could fit inside. It's also the oldest planet, forming from the dust and gases left over from the Sun's formation 4.6 billion years ago. But it has the shortest day in the solar system, taking about 9.9 hours to spin around once on its axis.",

];

menuBtn.addEventListener("click", function () {
    if (sideMenu.style.width === "250px") {
        sideMenu.style.width = "70px";
        menuBtn.innerText = "Open";
        content.classList = "hiden";
    } else {
        sideMenu.style.width = "250px";
        menuBtn.innerText = "Close";
        setTimeout(() => {
            content.classList = "content";
        }, "300");
    }
});

document.addEventListener("click", function (e) {
    if (!sideMenu.contains(e.target)) {
        sideMenu.style.width = "70px";
        menuBtn.innerText = "Open";
        content.classList = "hiden";

    }
});


function showPlanet({ name, texturePath, radius, container, satelite }) {
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);

    const loader = new THREE.TextureLoader();
    const width = 450;
    const height = 100;

   
    // -- Scene --
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);
    camera.updateProjectionMatrix();

    // -- Renderer --
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // -- Planet --
    const geo = new THREE.SphereGeometry(radius, 32, 32);
    const mat = new THREE.MeshBasicMaterial({ map: loader.load(texturePath) });
    const planet = new THREE.Mesh(geo, mat);
    planet.name = name;
    scene.add(planet);

    // -- Satelite --
    if (satelite) {
        const satelliteGeo = new THREE.SphereGeometry(radius * 0.3, 32, 32);
        const satelliteMat = new THREE.MeshBasicMaterial({ map: loader.load(satelite.texturePath) });
        const satellite = new THREE.Mesh(satelliteGeo, satelliteMat);
        satellite.position.x = radius + 3;

        const planetPivot = new THREE.Object3D();
        planetPivot.add(satellite);
        scene.add(planetPivot);


        const animate = () => {
            planetPivot.rotation.y += 0.02;
            satellite.rotation.y += 0.01;

            requestAnimationFrame(animate);

        }

        animate();
    }

    const animate = () => {

        if (planet.name == "venus") {
            planet.rotation.y -= 0.01;
        } else {
            planet.rotation.y += 0.01;
        }
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    animate();
}


// ------------- Planets event listener --------------------

// --------- Sun ---------

sunBtn.addEventListener("click", function () {
    if (document.querySelector(".infoPage")) return;

    const infoPage = document.createElement("div");
    infoPage.classList = "infoPage";

    let closeCardBtn = document.createElement("button");
    closeCardBtn.classList = "close-card";
    closeCardBtn.innerText = "Close";

    let infoTitle = document.createElement("h2");
    infoTitle.classList = "info-title";
    infoTitle.innerText = "The Sun";

    let about = document.createElement("p");
    about.classList = "about-planet";
    about.innerText = planetsInfos[0];

    let funFactTitle = document.createElement("h3");
    funFactTitle.classList = "fun-fact-title";
    funFactTitle.innerText = "Fun fact:"

    let funFact = document.createElement("p");
    funFact.classList = "about-planet";
    funFact.innerText = "The Sun is so massive that it makes up about 99.86% of the entire mass of our solar system.";

    let aboutTitle = document.createElement("h3");
    aboutTitle.classList = "info-subtitle";
    aboutTitle.innerText = "About the sun:"
    infoPage.appendChild(infoTitle);
    showPlanet({
        name: "Sun",
        texturePath: "textures/sun.jpg",
        radius: 5,
        container: infoPage
    });

    infoPage.appendChild(aboutTitle);
    const scrollSection = document.createElement("div");
    scrollSection.classList = "scroll-section";

    scrollSection.appendChild(about);
    scrollSection.appendChild(funFactTitle);
    scrollSection.appendChild(funFact);
    
    infoPage.appendChild(scrollSection);
    infoPage.appendChild(closeCardBtn);

    closeCardBtn.addEventListener("click", function () {
        infoPage.remove();
    });


    document.body.appendChild(infoPage);

});

// --------- Mercury ---------

mercuryBtn.addEventListener("click", function () {
    if (document.querySelector(".infoPage")) return;

    const infoPage = document.createElement("div");
    infoPage.classList = "infoPage";

    let closeCardBtn = document.createElement("button");
    closeCardBtn.classList = "close-card";
    closeCardBtn.innerText = "Close";

    let infoTitle = document.createElement("h2");
    infoTitle.classList = "info-title";
    infoTitle.innerText = "Mercury";

    let about = document.createElement("p");
    about.classList = "about-planet";
    about.innerText = planetsInfos[1];

    let funFactTitle = document.createElement("h3");
    funFactTitle.classList = "fun-fact-title";
    funFactTitle.innerText = "Fun fact:"

    let funFact = document.createElement("p");
    funFact.classList = "about-planet";
    funFact.innerText = "Mercury takes 88 Earth days to orbit the Sun (that’s its year). But it takes about 176 Earth days for Mercury to complete one full rotation on its axis (a day)";

    let aboutTitle = document.createElement("h3");
    aboutTitle.classList = "info-subtitle";
    aboutTitle.innerText = "About the Mercury:"
    infoPage.appendChild(infoTitle);
    showPlanet({
        name: "Mercury",
        texturePath: "textures/mercury.jpg",
        radius: 5,
        container: infoPage
    });

    infoPage.appendChild(aboutTitle);
    const scrollSection = document.createElement("div");
    scrollSection.classList = "scroll-section";

    scrollSection.appendChild(about);
    scrollSection.appendChild(funFactTitle);
    scrollSection.appendChild(funFact);
    
    infoPage.appendChild(scrollSection);
    infoPage.appendChild(closeCardBtn);

    closeCardBtn.addEventListener("click", function () {
        infoPage.remove();
    });


    document.body.appendChild(infoPage);

});

// --------- Venus ---------

venusBtn.addEventListener("click", function () {
    if (document.querySelector(".infoPage")) return;

    const infoPage = document.createElement("div");
    infoPage.classList = "infoPage";

    let closeCardBtn = document.createElement("button");
    closeCardBtn.classList = "close-card";
    closeCardBtn.innerText = "Close";

    let infoTitle = document.createElement("h2");
    infoTitle.classList = "info-title";
    infoTitle.innerText = "Venus";

    let about = document.createElement("p");
    about.classList = "about-planet";
    about.innerText = planetsInfos[2];

    let funFactTitle = document.createElement("h3");
    funFactTitle.classList = "fun-fact-title";
    funFactTitle.innerText = "Fun fact:"

    let funFact = document.createElement("p");
    funFact.classList = "about-planet";
    funFact.innerText = "Venus spins in the opposite direction of most planets (including Earth) — this is called retrograde rotation.";

    let aboutTitle = document.createElement("h3");
    aboutTitle.classList = "info-subtitle";
    aboutTitle.innerText = "About the Venus:"
    infoPage.appendChild(infoTitle);
    showPlanet({
        name: "venus",
        texturePath: "textures/venus.jpg",
        radius: 5,
        container: infoPage
    });

    infoPage.appendChild(aboutTitle);
    const scrollSection = document.createElement("div");
    scrollSection.classList = "scroll-section";

    scrollSection.appendChild(about);
    scrollSection.appendChild(funFactTitle);
    scrollSection.appendChild(funFact);
    
    infoPage.appendChild(scrollSection);
    infoPage.appendChild(closeCardBtn);

    closeCardBtn.addEventListener("click", function () {
        infoPage.remove();
    });


    document.body.appendChild(infoPage);

});

// --------- Earth ---------

earthBtn.addEventListener("click", function () {
    if (document.querySelector(".infoPage")) return;

    const infoPage = document.createElement("div");
    infoPage.classList = "infoPage";

    let closeCardBtn = document.createElement("button");
    closeCardBtn.classList = "close-card";
    closeCardBtn.innerText = "Close";

    let infoTitle = document.createElement("h2");
    infoTitle.classList = "info-title";
    infoTitle.innerText = "Earth";

    let about = document.createElement("p");
    about.classList = "about-planet";
    about.innerText = planetsInfos[3];

    let funFactTitle = document.createElement("h3");
    funFactTitle.classList = "fun-fact-title";
    funFactTitle.innerText = "Fun fact:"

    let funFact = document.createElement("p");
    funFact.classList = "about-planet";
    funFact.innerText = "According to some scientific theories, early Earth may have been dominated by purple-hued microbes (like retinal-based organisms) instead of green plants. These microbes used a different light-absorbing pigment than chlorophyll — giving Earth a purplish tint before oxygen-producing organisms took over.";

    let aboutTitle = document.createElement("h3");
    aboutTitle.classList = "info-subtitle";
    aboutTitle.innerText = "About the Earth:"



    infoPage.appendChild(infoTitle);
    showPlanet({
        name: "earth",
        texturePath: "textures/earth.jpg",
        radius: 5,
        container: infoPage,
        satelite: {
            texturePath: "textures/moon.jpg"
        }
    });

    infoPage.appendChild(aboutTitle);

    const scrollSection = document.createElement("div");
    scrollSection.classList = "scroll-section";

    scrollSection.appendChild(about);
    scrollSection.appendChild(funFactTitle);
    scrollSection.appendChild(funFact);
    
    infoPage.appendChild(scrollSection);
    infoPage.appendChild(closeCardBtn);

    closeCardBtn.addEventListener("click", function () {
        infoPage.remove();
    });


    document.body.appendChild(infoPage);

});

// --------- Mars ---------

marsBtn.addEventListener("click", function () {
    if (document.querySelector(".infoPage")) return;

    const infoPage = document.createElement("div");
    infoPage.classList = "infoPage";

    let closeCardBtn = document.createElement("button");
    closeCardBtn.classList = "close-card";
    closeCardBtn.innerText = "Close";

    let infoTitle = document.createElement("h2");
    infoTitle.classList = "info-title";
    infoTitle.innerText = "Mars";

    let about = document.createElement("p");
    about.classList = "about-planet";
    about.innerText = planetsInfos[4];

    let funFactTitle = document.createElement("h3");
    funFactTitle.classList = "fun-fact-title";
    funFactTitle.innerText = "Fun fact:"

    let funFact = document.createElement("p");
    funFact.classList = "about-planet";
    funFact.innerText = "Despite being inhospitable to humans, robotic explorers — like NASA's Perseverance rover and Mars Reconnaissance Orbiter — serve as pathfinders to eventually get astronauts to the surface of the Red Planet.";

    let aboutTitle = document.createElement("h3");
    aboutTitle.classList = "info-subtitle";
    aboutTitle.innerText = "About Mars:"
    infoPage.appendChild(infoTitle);
    showPlanet({
        name: "mars",
        texturePath: "textures/mars.jpg",
        radius: 5,
        container: infoPage
    });

    infoPage.appendChild(aboutTitle);
    const scrollSection = document.createElement("div");
    scrollSection.classList = "scroll-section";

    scrollSection.appendChild(about);
    scrollSection.appendChild(funFactTitle);
    scrollSection.appendChild(funFact);
    
    infoPage.appendChild(scrollSection);
    infoPage.appendChild(closeCardBtn);

    closeCardBtn.addEventListener("click", function () {
        infoPage.remove();
    });


    document.body.appendChild(infoPage);

});

jupiterBtn.addEventListener("click", function () {
    if (document.querySelector(".infoPage")) return;

    const infoPage = document.createElement("div");
    infoPage.classList = "infoPage";

    let closeCardBtn = document.createElement("button");
    closeCardBtn.classList = "close-card";
    closeCardBtn.innerText = "Close";

    let infoTitle = document.createElement("h2");
    infoTitle.classList = "info-title";
    infoTitle.innerText = "Jupiter";

    let about = document.createElement("p");
    about.classList = "about-planet";
    about.innerText = planetsInfos[5];

    let funFactTitle = document.createElement("h3");
    funFactTitle.classList = "fun-fact-title";
    funFactTitle.innerText = "Fun fact:"

    let funFact = document.createElement("p");
    funFact.classList = "about-planet";
    funFact.innerText = "Despite being the largest planet, Jupiter rotates incredibly fast, making one full turn on its axis in less than half an Earth day. This rapid spin causes its noticeable bulge at the equator.";

    let aboutTitle = document.createElement("h3");
    aboutTitle.classList = "info-subtitle";
    aboutTitle.innerText = "About Jupiter:"
    infoPage.appendChild(infoTitle);
    showPlanet({
        name: "jupiter",
        texturePath: "textures/jupiter.jpg",
        radius: 5,
        container: infoPage
    });

    infoPage.appendChild(aboutTitle);
    const scrollSection = document.createElement("div");
    scrollSection.classList = "scroll-section";

    scrollSection.appendChild(about);
    scrollSection.appendChild(funFactTitle);
    scrollSection.appendChild(funFact);
    
    infoPage.appendChild(scrollSection);
    infoPage.appendChild(closeCardBtn);

    closeCardBtn.addEventListener("click", function () {
        infoPage.remove();
    });


    document.body.appendChild(infoPage);

});
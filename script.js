import * as THREE from 'three';

const sideMenu = document.querySelector(".sidebar");
const menuBtn = document.querySelector(".menu-btn");
const content = document.querySelector(".content");
// -- Planets buttons --
const sunBtn = document.querySelector(".sunBtn");
const mercuryBtn = document.querySelector(".mercuryBtn");
const venusBtn = document.querySelector(".venusBtn");


// Planest infos 
let planetsInfos = [
    "The Sun's gravity holds the solar system together, keeping everything – from the biggest planets to the smallest particles of debris – in its orbit. The connection and interactions between the Sun and Earth drive the seasons, ocean currents, weather, climate, radiation belts and auroras. Though it is special to us, there are billions of stars like our Sun scattered across the Milky Way galaxy. The Sun has many names in many cultures. The Latin word for Sun is “sol,” which is the main adjective for all things Sun-related: solar.",
    "Mercury is the smallest planet in our solar system and the nearest to the Sun. Mercury is only slightly larger than Earth's Moon. It's the fastest planet, zipping around the Sun every 88 Earth days. Mercury is named for the swiftest of the ancient Roman gods.",
    "Venus is the second planet from the Sun, and the sixth largest planet. It’s the hottest planet in our solar system. Venus is a cloud-swaddled planet and our nearest planetary neighbor. It has a surface hot enough to melt lead.",
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
    const width = 150;
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
        satellite.position.x = radius + 1;

        const planetPivot = new THREE.Object3D();
        planetPivot.add(satellite);
        scene.add(planetPivot);

        // Inside animate:
        planetPivot.rotation.y += 0.02;
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
    infoPage.appendChild(about);
    infoPage.appendChild(funFactTitle);
    infoPage.appendChild(funFact);
    infoPage.appendChild(closeCardBtn);

    closeCardBtn.addEventListener("click", function () {
        infoPage.remove();
    });


    document.body.appendChild(infoPage);

});

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
    infoPage.appendChild(about);
    infoPage.appendChild(funFactTitle);
    infoPage.appendChild(funFact);
    infoPage.appendChild(closeCardBtn);

    closeCardBtn.addEventListener("click", function () {
        infoPage.remove();
    });


    document.body.appendChild(infoPage);

});


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
    infoPage.appendChild(about);
    infoPage.appendChild(funFactTitle);
    infoPage.appendChild(funFact);
    infoPage.appendChild(closeCardBtn);

    closeCardBtn.addEventListener("click", function () {
        infoPage.remove();
    });


    document.body.appendChild(infoPage);

});

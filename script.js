import * as THREE from 'three';

const sideMenu = document.querySelector(".sidebar");
const menuBtn = document.querySelector(".menu-btn");
const content = document.querySelector(".content");
// -- Planets buttons --
const sunBtn = document.querySelector(".sunBtn");

let planetsInfos = [
    "The Sun's gravity holds the solar system together, keeping everything – from the biggest planets to the smallest particles of debris – in its orbit. The connection and interactions between the Sun and Earth drive the seasons, ocean currents, weather, climate, radiation belts and auroras. Though it is special to us, there are billions of stars like our Sun scattered across the Milky Way galaxy. The Sun has many names in many cultures. The Latin word for Sun is “sol,” which is the main adjective for all things Sun-related: solar.",

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


function showPlanet({ name, texturePath, radius, container }) {
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

    const animate = () => {
        planet.rotation.y += 0.01;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    animate();
}


sunBtn.addEventListener("click", function () {
     if (document.querySelector(".infoPage")) return;

    const infoPage = document.createElement("div");
    infoPage.classList = "infoPage";

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

    document.body.appendChild(infoPage);



});


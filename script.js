import * as THREE from 'three';

const sideMenu = document.querySelector(".sidebar");
const menuBtn = document.querySelector(".menu-btn");
const content = document.querySelector(".content");
// -- Planets buttons --
const sunBtn = document.querySelector(".sunBtn");

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
    const infoPage = document.createElement("div");
    infoPage.classList = "infoPage";

    let infoTitle = document.createElement("h2");
    infoTitle.classList = "info-title";
    infoTitle.innerText = "The Sun";

    infoPage.appendChild(infoTitle);

    document.body.appendChild(infoPage);

    showPlanet({
        name: "Sun",
        texturePath: "textures/sun.jpg",
        radius: 5,
        container: infoPage
    });
});


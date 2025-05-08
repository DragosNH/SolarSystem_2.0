import * as THREE from 'three';

const sideMenu = document.querySelector(".sidebar");
const menuBtn = document.querySelector(".menu-btn");
const content = document.querySelector(".content");
// -- Planets buttons --
const sunBtn = document.querySelector(".sunBtn");

menuBtn.addEventListener("click", function(){
    if (sideMenu.style.width === "250px"){
        sideMenu.style.width = "70px";
        menuBtn.innerText = "Open";
        content.classList = "hiden";
    } else{
        sideMenu.style.width = "250px";
        menuBtn.innerText = "Close";
        setTimeout(() => {
            content.classList = "content";
        }, "300");
    }
});

document.addEventListener("click", function(e){
    if(!sideMenu.contains(e.target)){
        sideMenu.style.width = "70px";
        menuBtn.innerText = "Open";
    }
});


function showPlanet({name, texturePath, radius}){
    
}

sunBtn.addEventListener("click", function(){
    const infoPage = document.createElement("div");
    infoPage.classList = "infoPage";

    let infoTitle = document.createElement("h2");
    infoTitle.innerText = "The Sun";

    infoPage.appendChild(infoTitle);

    document.body.appendChild(infoPage);
});


const sideMenu = document.querySelector(".sidebar");
const menuBtn = document.querySelector(".menu-btn");

menuBtn.addEventListener("click", function(){
    if (sideMenu.style.width === "250px"){
        sideMenu.style.width = "70px";
        menuBtn.innerText = "Open";
    } else{
        sideMenu.style.width = "250px";
        menuBtn.innerText = "Close";
    }
});


;
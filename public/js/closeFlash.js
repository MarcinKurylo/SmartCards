const flash = document.querySelector(".flash")
if (flash){
    document.querySelector(".flash-close").addEventListener("click", e => {
        e.preventDefault
        flash.style.display = "none"
    })
}
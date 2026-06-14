function setOrderType(button){

    document
        .querySelectorAll(".otype-btn")
        .forEach(btn=>{
            btn.classList.remove("active");
        });

    button.classList.add("active");
}
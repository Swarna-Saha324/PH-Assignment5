// 1. Card-ke clickable korar jonno cursor pointer add korun
issueCard.classList.add("cursor-pointer");

// 2. Click event listener add korun
issueCard.addEventListener("click", () => {
    // Modal-er content-gulo dynamic-vabe change korun
    const modal = document.getElementById("my_modal_5");
    
    // Modal-er vitorer text update kora (Optional but recommended)
    modal.querySelector("h3").innerText = issue.title;
    modal.querySelector("p.py-4").innerText = issue.description;

    // Finally, DaisyUI modal-ti show korun
    modal.showModal();
});
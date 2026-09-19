function showSideBar() {
    const sidebar = document.querySelector(".sidebar");

    if (sidebar) {
        sidebar.classList.add("open");
    }
}

function hideSideBar() {
    const sidebar = document.querySelector(".sidebar");

    if (sidebar) {
        sidebar.classList.remove("open");
    }
}

function logout() {
    localStorage.removeItem("picverseSession");
    window.location.replace("login.html");
}

document.addEventListener("DOMContentLoaded", function () {
    const sidebarLinks = document.querySelectorAll(".sidebar a");
    const logoutButtons = document.querySelectorAll("[data-logout]");

    sidebarLinks.forEach(function (link) {
        link.addEventListener("click", hideSideBar);
    });

    logoutButtons.forEach(function (button) {
        button.addEventListener("click", logout);
    });
});
(function protectPage() {
    const session = localStorage.getItem("picverseSession");

    if (!session) {
        window.location.replace("login.html");
    }
})();
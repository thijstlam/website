document.addEventListener("DOMContentLoaded", () => {
    const contentDiv = document.getElementById("content");
    const navLinks = document.querySelectorAll("nav a");

    // Function to load a page
    const loadPage = async (page) => {
        try {
            const response = await fetch(`/pages/${page}.html`);
            if (!response.ok) throw new Error("Page not found");
            const html = await response.text();
            contentDiv.innerHTML = html;
        } catch (error) {
            const response = await fetch(`/pages/not-found.html`);
            const html = await response.text();
            contentDiv.innerHTML = html;
        }
    };

    // Handle click events on navigation links
    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const pageName = link.getAttribute("href").substring(1);
            history.pushState({ page: pageName }, "", `/${pageName}`);
            loadPage(pageName);
        });
    });

    // Handle back/forward navigation
    window.addEventListener("popstate", (event) => {
        if (event.state && event.state.page) {
            loadPage(event.state.page);
        } else {
            loadPage("home"); // Default to home if no state
        }
    });

    // Load initial page
    const initialPage = window.location.pathname.substring(1) || "home";
    loadPage(initialPage);
});

document.addEventListener("DOMContentLoaded", function () {
    // Select nav-bar links and field-group elements
    const navLinks =
        document.querySelectorAll("#nav-bar a");
    const fieldGroups =
        document.querySelectorAll(".field-group");

    // Add event listeners for each nav-link
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            // Remove 'hidden' class from the selected field-group and add it to the others
            const fieldId =
                e.target.getAttribute("data-field");
            fieldGroups.forEach((group) => {
                if (group.id === fieldId) {
                    group.classList.remove("hidden");
                } else {
                    group.classList.add("hidden");
                }
            });
        });
    });
});

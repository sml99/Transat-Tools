document.addEventListener("DOMContentLoaded", function () {
    // Select nav-bar links and field-group elements
    const navLinks = document.querySelectorAll("#nav-bar li");
    const fieldGroups = document.querySelectorAll(".field-group");

    // Add event listeners for each nav-link
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            // Remove 'hidden' class from the selected field-group and add it to the others
            const fieldId = e.target.getAttribute("data-field");
            fieldGroups.forEach((group) => {
                if (group.id === fieldId) {
                    group.classList.remove("hidden");
                } else {
                    group.classList.add("hidden");
                }
            });
        });
    });

    var animateButton = function (e) {
        e.preventDefault;
        //reset animation
        e.target.classList.remove("animate");

        e.target.classList.add("animate");
        setTimeout(function () {
            e.target.classList.remove("animate");
        }, 700);
    };

    var bubblyButtons = document.getElementsByClassName("bubbly-button");

    for (var i = 0; i < bubblyButtons.length; i++) {
        bubblyButtons[i].addEventListener("click", animateButton, false);
    }
});

document.addEventListener("DOMContentLoaded", function(event) {

    // get variable options
    const etToggle = document.getElementById('et-toggle');
    const etoToggle = document.getElementById('eto-toggle');
    /*
    const prToggle = document.getElementById('pr-toggle');
    const ndviToggle = document.getElementById('ndvi-toggle');
    */

    // check for variable change
    if (etToggle && etoToggle) {
        // set default
        window.VARIABLE = 'et'
        
        // toggle chart to 
        etToggle.addEventListener('click', () => {
            window.VARIABLE = 'et'
        });

        etoToggle.addEventListener('click', () => {
            window.VARIABLE = 'eto'
        });
        /*
        prToggle.addEventListener('click', () => {
            window.variable = 'pr'
        });
        ndviToggle.addEventListener('click', () => {
            window.variable = 'ndvi'
        });
        */
    };

    const showNavbar = (toggleId, navId, bodyId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId),
            bodypd = document.getElementById(bodyId)

        // Validate that all variables exist
        if (toggle && nav && bodypd) {
            toggle.addEventListener('click', () => {
                // show navbar
                nav.classList.toggle('show')
                // change icon
                toggle.classList.toggle('bx-x')
                // add padding to body
                bodypd.classList.toggle('body-pd')
            })
        };
    };

    showNavbar('header-toggle', 'nav-bar', 'body-pd')

    /*===== LINK ACTIVE =====*/
    const linkColor = document.querySelectorAll('.nav_link')

    function colorLink() {
        if (linkColor) {
            linkColor.forEach(l => l.classList.remove('active'))
            this.classList.add('active')
        }
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink))

    // Your code to run since DOM is loaded and ready
});
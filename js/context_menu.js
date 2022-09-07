const contextMenu = document.querySelector(".wrapper"),
shareMenu = contextMenu.querySelector(".share-menu");

window.addEventListener("contextmenu", e => {

 
    // get variable options
    const etToggle = document.getElementById('et-toggle');
    const etoToggle = document.getElementById('eto-toggle');
    const etofToggle = document.getElementById('etof-toggle');
    const prToggle = document.getElementById('pr-toggle');
    const ndviToggle = document.getElementById('ndvi-toggle');

    // get interval options
    const dailyToggle = document.getElementById('daily-toggle');
    const monthlyToggle = document.getElementById('monthly-toggle');
 
    // check for variable change
    etToggle.addEventListener('click', () => {
        // set global variable to et
        window.VARIABLE = 'et'          
    });
    etoToggle.addEventListener('click', () => {
        // set global variable to et0
        window.VARIABLE = 'eto'          
    });
    etofToggle.addEventListener('click', () => {
        // set global variable to etof
        window.VARIABLE = 'etof'          
    });
    prToggle.addEventListener('click', () => {
        // set global variable to pr
        window.VARIABLE = 'pr'          
    });
    ndviToggle.addEventListener('click', () => {
        // set global variable to et
        window.VARIABLE = 'ndvi'          
    });

    // check for interval change
    dailyToggle.addEventListener('click', () => {
        // set global interval to daily
        window.INTERVAL = 'daily'          
    });
    monthlyToggle.addEventListener('click', () => {
        // set global interval to monthly
        window.INTERVAL = 'monthly'          
    });

    e.preventDefault();
    let x = e.offsetX, y = e.offsetY,
    winWidth = window.innerWidth,
    winHeight = window.innerHeight,
    cmWidth = contextMenu.offsetWidth,
    cmHeight = contextMenu.offsetHeight;

    if(x > (winWidth - cmWidth - shareMenu.offsetWidth)) {
        shareMenu.style.left = "-200px";
    } else {
        shareMenu.style.left = "";
        shareMenu.style.right = "-200px";
    }

    x = x > winWidth - cmWidth ? winWidth - cmWidth - 5 : x;
    y = y > winHeight - cmHeight ? winHeight - cmHeight - 5 : y;
    
    contextMenu.style.left = `${x}px`;
    contextMenu.style.top = `${y}px`;
    contextMenu.style.visibility = "visible";
});

document.addEventListener("click", () => contextMenu.style.visibility = "hidden");
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

    // get start month toggle
    const februaryToggle = document.getElementById('february-toggle');
    const marchToggle = document.getElementById('march-toggle');
    const aprilToggle = document.getElementById('april-toggle');
    const mayToggle = document.getElementById('may-toggle');
    const juneToggle = document.getElementById('june-toggle');
 
    // check for variable change
    etToggle.addEventListener('click', () => {
        // set global variable to et
        window.VARIABLE = 'et'   
        
        // remove other active variables
        etoToggle.classList.remove("active2"); 
        etofToggle.classList.remove("active2"); 
        prToggle.classList.remove("active2"); 
        ndviToggle.classList.remove("active2"); 
        
        // add active status
        etToggle.classList.add("active2"); 
    });

    etoToggle.addEventListener('click', () => {
        // set global variable to et0
        window.VARIABLE = 'eto'  

        // remove other active variables
        etToggle.classList.remove("active2"); 
        etofToggle.classList.remove("active2"); 
        prToggle.classList.remove("active2"); 
        ndviToggle.classList.remove("active2"); 
        
        // add active status
        etoToggle.classList.add("active2"); 
    });

    etofToggle.addEventListener('click', () => {
        // set global variable to etof
        window.VARIABLE = 'etof'  

        // remove other active variables
        etToggle.classList.remove("active2"); 
        etoToggle.classList.remove("active2");  
        prToggle.classList.remove("active2"); 
        ndviToggle.classList.remove("active2"); 
        
        // add active status  
        etofToggle.classList.add("active2");      
    });

    prToggle.addEventListener('click', () => {
        // set global variable to pr
        window.VARIABLE = 'pr'   
        
        // remove other active variables
        etToggle.classList.remove("active2"); 
        etoToggle.classList.remove("active2"); 
        etofToggle.classList.remove("active2"); 
        ndviToggle.classList.remove("active2"); 
        
        // add active status
        prToggle.classList.add("active2");       
    });

    ndviToggle.addEventListener('click', () => {
        // set global variable to ndvi
        window.VARIABLE = 'ndvi'   
        
        // remove other active variables
        etToggle.classList.remove("active2"); 
        etoToggle.classList.remove("active2"); 
        etofToggle.classList.remove("active2"); 
        prToggle.classList.remove("active2"); 
        
        // add active status
        ndviToggle.classList.add("active2");       
    });

    // check for interval change
    dailyToggle.addEventListener('click', () => {
        // set global interval to daily
        window.INTERVAL = 'daily'  
        
        // remove other active variables
        monthlyToggle.classList.remove("active2"); 

        // add active status
        dailyToggle.classList.add("active2");         
    });
    
    monthlyToggle.addEventListener('click', () => {
        // set global interval to monthly
        window.INTERVAL = 'monthly'  
        // remove other active variables
        dailyToggle.classList.remove("active2"); 
        
        // add active status
        monthlyToggle.classList.add("active2");          
    });

    // check for month start change
    februaryToggle.addEventListener('click', () => {
        // set global month to 2
        window.MONTH = 2;  
        
        // remove other active variables
        marchToggle.classList.remove("active2");
        aprilToggle.classList.remove("active2");
        mayToggle.classList.remove("active2");
        juneToggle.classList.remove("active2");
       
        // add active status
        februaryToggle.classList.add("active2"); 
    });

    marchToggle.addEventListener('click', () => {
        /// set global month to 3
        window.MONTH = 3;  
        
        // remove other active variables
        februaryToggle.classList.remove("active2");
        aprilToggle.classList.remove("active2");
        mayToggle.classList.remove("active2");
        juneToggle.classList.remove("active2");
       
        // add active status
        marchToggle.classList.add("active2"); 
    });

    aprilToggle.addEventListener('click', () => {
        // set global month to 4
        window.MONTH = 4; 
        
        // remove other active variables
        februaryToggle.classList.remove("active2");
        marchToggle.classList.remove("active2");
        mayToggle.classList.remove("active2");
        juneToggle.classList.remove("active2");
       
        // add active status
        aprilToggle.classList.add("active2"); 
    });

    mayToggle.addEventListener('click', () => {
        // set global month to 5
        window.MONTH = 5; 
        
        // remove other active variables
        februaryToggle.classList.remove("active2");
        marchToggle.classList.remove("active2");
        aprilToggle.classList.remove("active2");
        juneToggle.classList.remove("active2");
       
        // add active status
        mayToggle.classList.add("active2"); 
    });

    juneToggle.addEventListener('click', () => {
        // set global month to 6
        window.MONTH = 6; 
        
        // remove other active variables
        februaryToggle.classList.remove("active2");
        marchToggle.classList.remove("active2");
        aprilToggle.classList.remove("active2");
        maytoggle.classList.remove("active2");
       
        // add active status
        juneToggle.classList.add("active2"); 
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
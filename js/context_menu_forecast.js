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
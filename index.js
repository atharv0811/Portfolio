let tablinks = document.getElementsByClassName("tab-links");
let tabcontents = document.getElementsByClassName("tab-contents");
let sidemenu = document.getElementById("sidemenu");

let opentab = (tabname) => {
    for (tablink of tablinks) {
        tablink.classList.remove("active-links");
    }

    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }

    event.currentTarget.classList.add("active-links");

    document.getElementById(tabname).classList.add("active-tab");
}

let openmenu = () => {
    sidemenu.style.right = "0";
}

let closemenu = () => {
    sidemenu.style.right = "-200px";
}

// Contact form script for sendign the message to google sheet
const scriptURL = 'https://script.google.com/macros/s/AKfycbz1oMMvD_SFl9VHlUOwtyL2nyje55XbQL7RHYrQGwAhxgAzypvxGsJFAjNlXcYEWNbT7w/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message sent successfully"
            setTimeout(() => {
                msg.innerHTML = ""
            }, 5000);
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
})
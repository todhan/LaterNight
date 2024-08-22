/*
Background Images
*/
const backgroundImages = ["https://ice.frostsky.com/2024/03/30/e4bafa41d4b5fc78e2a6a43e22f57dd1.gif", "https://ice.frostsky.com/2024/03/30/04532a0617776405ce745ed611a1eb74.gif", "https://ice.frostsky.com/2024/03/30/282e33a25df9d0eb3636c76a080cc321.gif", "https://ice.frostsky.com/2024/03/30/73323b56ef071b84e52e26bdb9652fb7.gif", "https://ice.frostsky.com/2024/03/30/4770d353204ec4e5d084d4c0adc5cff2.gif", "https://ice.frostsky.com/2024/03/30/943f9223d16bf83e10ccb6172ec64969.gif", "https://ice.frostsky.com/2024/03/30/5cb05d9c6cf9429be91f04ea7052e9c3.gif", "https://ice.frostsky.com/2024/03/30/3dd62fcd813063053f66effaa46cdf28.gif", "https://ice.frostsky.com/2024/03/30/f74607d29fc5ab43e59e7dde084bc3a4.gif", "https://ice.frostsky.com/2024/03/30/4cdd79ff4dcb6e8c3f2519c42ad939a9.gif"];

function preloadImage(url) {
    return new Promise((resolve,reject)=>{
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
    }
    )
}

async function changeBackgroundImage() {
    try {
        const backgroundImagesIndex = Math.floor(Math.random() * backgroundImages.length);
        await preloadImage(backgroundImages[backgroundImagesIndex]);
        document.body.style.backgroundImage = `url(${backgroundImages[backgroundImagesIndex]})`;
    } catch (error) {
        console.error("Failed to load background image:", error);
    }
}

function setNextMidnightTimeout() {
    const now = new Date();
    const nextMidnight = new Date(now.getFullYear(),now.getMonth(),now.getDate() + 1,0,0,0,0);
    const timeUntilNextMidnight = nextMidnight - now;

    // Set a timeout to change the background image at the next midnight
    setTimeout(()=>{
        changeBackgroundImage();
        setInterval(changeBackgroundImage, 86400000);
        // Change every 24 hours thereafter
    }
    , timeUntilNextMidnight);
}

function initializeBackgroundChange() {
    changeBackgroundImage();
    // Change immediately
    setNextMidnightTimeout();
    // Schedule next change at midnight
}

initializeBackgroundChange();

/*
Click the logo to reload the page
*/
const logoLink = document.querySelector('.logo');
var logo = document.querySelector('.logo');
logo.addEventListener('click', function() {
    location.reload();
})

/*
Late night reminder
*/
function displayMessage() {
    const now = new Date();
    const hours = now.getHours();

    const existingLink = document.getElementById("nightReminderLink");

    if (hours >= 0 && hours <= 5) {
        if (!existingLink) {
            const link = document.createElement("a");
            link.href = "http://www.hitoradio.com/newweb/onair_n_ajax.php";
            link.textContent = "🌛 夜深了";
            link.target = "_blank";
            link.classList.add("reminder");
            link.id = "nightReminderLink";
            document.body.appendChild(link);
        }
    } else {
        if (existingLink) {
            existingLink.parentNode.removeChild(existingLink);
        }
    }
}

// Call displayMessage function once after the page has finished loading
window.addEventListener('load', function() {
    displayMessage();
    setInterval(displayMessage, 60000);
    // Check time every minute
})

/*
Middle mouse button scrolling or touchpad sliding
*/
// Get button and content area elements
const buttons = document.querySelectorAll('.sites button');
const contentDivs = document.querySelectorAll('.con');

showContent(0);
// Initially display the content corresponding to the first button

// Add a mouse wheel event listener
document.addEventListener('wheel', handleMouseWheel, {
    passive: false
})

let currentIndex = 0;
// Define the index of the currently displayed content
let isScrolling = false;

function handleMouseWheel(event) {
    if (isScrolling)
        return;

    isScrolling = true;
    setTimeout(()=>{
        isScrolling = false;
    }
    , 100)

    const delta = event.deltaY;
    if (delta > 0) {
        currentIndex = (currentIndex + 1) % contentDivs.length;
        // Scroll down, switch to the next content
    } else {
        currentIndex = (currentIndex - 1 + contentDivs.length) % contentDivs.length;
        // Scroll up, switch to the previous content
    }

    showContent(currentIndex);
    // Display the corresponding content

    event.preventDefault();
    // Prevent the default behavior of the scroll event
}

function showContent(index) {
    // Hide all content areas
    contentDivs.forEach((div)=>{
        div.style.display = 'none';
    }
    )

    contentDivs[index].style.display = 'block';
    // Display the corresponding content area

    // Update button styles
    buttons.forEach((button,i)=>{
        if (i === index) {
            button.classList.add('current');
        } else {
            button.classList.remove('current');
        }
    }
    )
}

/*
Get websites data
*/
async function fetchData() {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
}

function appendListItems(listId, data) {
    const list = document.getElementById(listId);

    data.forEach(item=>{
        const listItem = createListItem(item.link, item.imageSrc, item.text);
        list.appendChild(listItem);
    }
    )
}

function createListItem(link, imageSrc, text) {
    const listItem = document.createElement('li');
    const linkElement = document.createElement('a');
    const imageElement = document.createElement('img');
    const textElement = document.createElement('span');

    linkElement.href = link;
    linkElement.target = '_blank';
    imageElement.src = imageSrc;
    textElement.textContent = text;
    textElement.classList.add('text');

    linkElement.appendChild(imageElement);
    linkElement.appendChild(textElement);
    listItem.appendChild(linkElement);

    return listItem;
}

// Fetch the data and append list items once the data is retrieved
fetchData().then(data=>{
    appendListItems('tools-list', data.toolsData);
    appendListItems('information-list', data.informationData);
    appendListItems('entertainment-list', data.entertainmentData);
    appendListItems('others-list', data.othersData);
}
)

/*
Shortcuts
*/
const shortcuts = {
    78: ["https://www.notion.so/login"],
    71: ["https://github.com/login"],
    32: ["https://chat.openai.com/"],
    68: ["https://movie.douban.com/mine?status=wish"],
    89: ["https://www.youtube.com/?gl=US"],
    66: ["https://www.bilibili.com/"],
    83: ["https://open.spotify.com/"],
    80: ["https://podcasts.apple.com/cn/home"]
};

let isNotesFocused = false;

const notesTextarea1 = document.getElementById("notes");
notesTextarea1.addEventListener("focus", ()=>{
    isNotesFocused = true;
}
)

notesTextarea1.addEventListener("blur", ()=>{
    isNotesFocused = false;
}
)

document.addEventListener("keydown", function(event) {
    if (!isNotesFocused && shortcuts[event.keyCode]) {
        const urls = shortcuts[event.keyCode];
        window.open(urls[0], "_blank");
    }
})

/*
Switch the tabs
*/
const btnArr = document.getElementsByTagName("button");
const divArr = document.getElementsByClassName("con");
for (let i = 0; i < btnArr.length; i++) {
    btnArr[i].index = i;
    btnArr[i].onmouseover = function() {
        for (let j = 0; j < btnArr.length; j++) {
            btnArr[j].className = "";
            divArr[j].style.display = "none"
        }
        this.className = "current";
        divArr[this.index].style.display = "block";
    }
}

/*
Save the notes
*/
const notesTextarea = document.getElementById("notes");

document.addEventListener("DOMContentLoaded", function() {
    const savedContent = localStorage.getItem("notesContent");
    if (savedContent != null) {
        notesTextarea.value = savedContent;
    }

    notesTextarea.addEventListener("keyup", function() {
        const data = notesTextarea.value;
        localStorage.setItem("notesContent", data);
    })
})

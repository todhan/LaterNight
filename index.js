/*
Random background pictures
*/
const bgArr = ["https://s2.ax1x.com/2020/03/01/36o3uD.gif", "https://s2.ax1x.com/2020/03/01/36oN4I.gif", "https://s2.ax1x.com/2020/03/01/36osbQ.gif", "https://s2.ax1x.com/2020/03/01/36orDg.gif", "https://s2.ax1x.com/2020/03/01/36TcLD.gif", "https://s2.ax1x.com/2020/03/01/36TyQK.gif", "https://s2.ax1x.com/2020/03/01/36TDRx.gif", "https://s2.ax1x.com/2020/03/01/36TRdH.gif", "https://s1.ax1x.com/2020/03/20/86BbqJ.gif", "https://i.mji.rip/2023/07/28/82f2ede6fd7b120ea783be716605a7c5.gif"];

function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = url;
  });
}

// Preload the image before setting it as the background
const bgIndex = Math.floor(Math.random() * bgArr.length);
preloadImage(bgArr[bgIndex])
.then(() => {
  document.body.style.backgroundImage = `url(${bgArr[bgIndex]})`;
})
.catch((error) => {
  console.error("Failed to load background image:", error);
});

/*
Click the logo reload website
*/
const logoLink = document.querySelector('.logo');
var logo = document.querySelector('.logo');
logo.addEventListener('click', function () {
  location.reload();
});

/*
Late night reminder
*/
function displayMessage() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  if (hours >= 0 && hours < 6) {
    const link = document.createElement("a");
    link.href = "https://music.163.com/#/song?id=29600147";
    link.textContent = "夜深了";
    link.target = "_blank";
    link.classList.add("hint");
    link.id = "nightLink";
    // Add a unique id

    // Check if an element with id "nightLink" already exists
    const existingLink = document.getElementById("nightLink");
    if (!existingLink) {
      document.body.appendChild(link);
    }
  } else {
    const existingLink = document.getElementById("nightLink");
    if (existingLink) {
      // If an element with id "nightLink" exists, remove it from the DOM
      existingLink.parentNode.removeChild(existingLink);
    }
  }
}

// Call displayMessage function once after the page has finished loading
window.addEventListener('load', function () {
  displayMessage();
  // Check time every minute
  setInterval(displayMessage, 60000);
});

/*
Switch the tabs
*/
const btnArr = document.getElementsByTagName("button");
const divArr = document.getElementsByClassName("con");
for (let i = 0; i < btnArr.length; i++) {
  btnArr[i].index = i;
  btnArr[i].onmouseover = function () {
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
const d = document;
// Check browser support
if (typeof (Storage) !== "undefined") {
  d.addEventListener("DOMContentLoaded", function () {
    const savedContent = localStorage.getItem("notesContent");
    if (savedContent != null) {
      d.getElementById("notes").value = savedContent;
    }

    d.getElementById("notes").onkeyup = function () {
      const data = d.getElementById("notes").value;
      localStorage.setItem("notesContent", data);
    }
  });
} else {
  document.getElementById("result").innerHTML = "你这个浏览器不支持 Web Storage";
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

  data.forEach(item => {
    const listItem = createListItem(item.link, item.imageSrc, item.text);
    list.appendChild(listItem);
  });
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
fetchData().then(data => {
  appendListItems('tools-list', data.toolsData);
  appendListItems('news-list', data.newsData);
  appendListItems('entertainment-list', data.entertainmentData);
  appendListItems('reference-list', data.referenceData);
});

/*
Shortcuts
*/
// Add event listener for key press
document.addEventListener("keydown", function(event) {
  // Check if the pressed key is "1" (keyCode 49)
  if (event.keyCode === 49) {
    // Open websites in a new tab
    window.open("https://www.notion.so/login", "_blank");
  } else if (event.keyCode === 32) {
    // Check if the pressed key is the spacebar (keyCode 32)
    window.open("https://chat.openai.com/", "_blank");
  }
});

/*
Middle mouse button scrolling or touch pad sliding
*/
// 获取按钮和内容区域元素
const buttons = document.querySelectorAll('.sites button');
const contentDivs = document.querySelectorAll('.con');

// 初始显示第一个按钮对应的内容
showContent(0);

// 添加鼠标滚轮事件监听器
document.addEventListener('wheel', handleMouseWheel, { passive: false });

// 定义当前显示内容的索引
let currentIndex = 0;
let isScrolling = false;

function handleMouseWheel(event) {
  if (isScrolling) return;

  isScrolling = true;
  setTimeout(() => {
    isScrolling = false;
  }, 100);

  const delta = event.deltaY;
  if (delta > 0) {
    // 向下滚动，切换到下一个内容
    currentIndex = (currentIndex + 1) % contentDivs.length;
  } else {
    // 向上滚动，切换到上一个内容
    currentIndex = (currentIndex - 1 + contentDivs.length) % contentDivs.length;
  }

  // 显示对应的内容
  showContent(currentIndex);

  // 阻止滚动事件的默认行为
  event.preventDefault();
}

function showContent(index) {
  // 隐藏所有内容区域
  contentDivs.forEach((div) => {
    div.style.display = 'none';
  });

  // 显示对应的内容区域
  contentDivs[index].style.display = 'block';

  // 更新按钮样式
  buttons.forEach((button, i) => {
    if (i === index) {
      button.classList.add('current');
    } else {
      button.classList.remove('current');
    }
  });
}

var d = new Date();
var hour = d.getHours();
if (hour > 0 && hour < 5) {
    document.getElementsByClassName("hint")[0].style.display = "block";
}

// Random pics
var bgArr = ["https://s2.ax1x.com/2020/03/01/36o3uD.gif", "https://s2.ax1x.com/2020/03/01/36oN4I.gif", "https://s2.ax1x.com/2020/03/01/36osbQ.gif", "https://s2.ax1x.com/2020/03/01/36orDg.gif", "https://s2.ax1x.com/2020/03/01/36TcLD.gif", "https://s6.jpg.cm/2022/05/14/LM5w0t.gif", "https://s2.ax1x.com/2020/03/01/36TyQK.gif", "https://s2.ax1x.com/2020/03/01/36TDRx.gif", "https://s2.ax1x.com/2020/03/01/36TRdH.gif", "https://s2.ax1x.com/2020/03/01/36T4JI.gif", "https://s1.ax1x.com/2020/03/20/86BbqJ.gif"];
var bgIndex = Math.floor((Math.random() * bgArr.length));
document.body.style.backgroundImage = "url(" + bgArr[bgIndex] + ")";

// Switch the Tabs
var btnArr = document.getElementsByTagName("button");
var divArr = document.getElementsByClassName("con");
for (var i = 0; i < btnArr.length; i++) {
    btnArr[i].index = i;
    btnArr[i].onmouseover = function () {
        for (var j = 0; j < btnArr.length; j++) {
            btnArr[j].className = "";
            divArr[j].style.display = "none"
        }
        this.className = "current";
        divArr[this.index].style.display = "block";
    }
}

// Save the notes
var d = document;
// Check browser support
if (typeof (Storage) !== "undefined") {
    d.addEventListener("DOMContentLoaded", function () {
        var savedContent = localStorage.getItem("notesContent");
        if (savedContent != null) {
            d.getElementById("notes").value = savedContent;
        }

        d.getElementById("notes").onkeyup = function () {
            var data = d.getElementById("notes").value;
            localStorage.setItem("notesContent", data);
        }
    });
} else {
    document.getElementById("result").innerHTML = "你这个浏览器不支持 Web Storage";
}

// Shortcuts
function keyCode(event) {
    var value = event.keyCode;
    if (value == 49) {
        window.open("https://www.notion.so/login");
    } else if (value == 50) {
        window.open("https://www.figma.com/login");
    } else if (value == 51) {
        window.open("https://docs.qq.com/desktop/");
    } else if (value == 52) {
        window.open("https://weread.qq.com/#login");
    }
}
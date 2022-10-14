var d = new Date();
var hour = d.getHours();
if (hour > 0 && hour < 5) {
    document.getElementsByClassName("hint")[0].style.display = "block";
}

// Random pics
var bgarr = ["https://s2.ax1x.com/2020/03/01/36o3uD.gif", "https://s2.ax1x.com/2020/03/01/36oN4I.gif", "https://s2.ax1x.com/2020/03/01/36osbQ.gif", "https://s2.ax1x.com/2020/03/01/36orDg.gif", "https://s2.ax1x.com/2020/03/01/36TcLD.gif", "https://s6.jpg.cm/2022/05/14/LM5w0t.gif", "https://s2.ax1x.com/2020/03/01/36TyQK.gif", "https://s2.ax1x.com/2020/03/01/36TDRx.gif", "https://s2.ax1x.com/2020/03/01/36TRdH.gif", "https://s2.ax1x.com/2020/03/01/36T4JI.gif", "https://s1.ax1x.com/2020/03/20/86BbqJ.gif"];
var bgindex = Math.floor((Math.random() * bgarr.length));
document.body.style.backgroundImage = "url(" + bgarr[bgindex] + ")";

// 首先要获得所有的按钮
var box = document.getElementsByClassName('sites')[0];
var btns = document.getElementsByTagName('button');
var divs = box.getElementsByTagName('div');
for (var i = 0; i < btns.length; i++) {
    var btn = btns[i];
    btn.index = i;
    // 给每个按钮添加一个自定义属性，用来存储当前的索引
    btn.onmouseover = function () {

        for (var j = 0; j < btns.length; j++) {
            btns[j].className = '';
        }
        this.className = 'current';
        for (var k = 0; k < divs.length; k++) {
            divs[k].style.display = 'none';
        }
        divs[this.index].style.display = 'block';
    }
}

// Save the notes
var d = document;
// Check browser support
if (typeof (Storage) !== "undefined") {
    d.addEventListener('DOMContentLoaded', function () {
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
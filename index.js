// Save the notes
var d = document;
// Check browser support
if (typeof (Storage) !== "undefined") {
    d.addEventListener('DOMContentLoaded', function() {
        var savedContent = localStorage.getItem("notesContent");
        if (savedContent != null) {
            d.getElementById("notes").value = savedContent;
        }

        d.getElementById("notes").onkeyup = function() {
            var data = d.getElementById("notes").value;
            localStorage.setItem("notesContent", data);
        }
    });
} else {
    document.getElementById("result").innerHTML = "你这个浏览器不支持 Web Storage";
}

var test;
$(document).ready( function(){
	test =function {
			//Random pics
var images = [
	"https://i.loli.net/2019/03/15/5c8b0f6cb01ee.gif",
	"https://i.loli.net/2019/03/15/5c8b0f568cacb.gif",
	"https://i.loli.net/2019/03/15/5c8b0f60854a2.gif",
	"https://i.loli.net/2019/03/15/5c8b0f624b2c4.gif",
	"https://i.loli.net/2019/03/15/5c8b0f67acc24.gif",
	"https://i.loli.net/2019/03/15/5c8b0f6b80e17.gif",
	"https://i.loli.net/2019/03/15/5c8b0f6c11f2b.gif",
	"https://i.loli.net/2019/03/15/5c8b116108485.gif",
	"https://i.loli.net/2019/04/07/5ca8ecbc9ac19.gif",
	"https://i.loli.net/2019/04/07/5ca8ecd2e96d9.gif",
	"https://i.loli.net/2019/04/07/5ca8ecd332e33.gif",
	"https://i.loli.net/2019/04/07/5ca8f253cf17f.gif",
	"https://i.loli.net/2019/04/07/5ca8f358438d5.gif"
	];
var url = Math.floor(Math.random() * images.length);
document.getElementById('img').src = images[url];
	}

} );
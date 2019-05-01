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
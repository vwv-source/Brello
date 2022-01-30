import 'https://code.jquery.com/jquery-3.6.0.min.js'

//----------Firebase-------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getDatabase, ref, set, push, update, get, remove } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD_ULAP4zC6CZ9SqJvV83aYLzsg6r88INw",
  authDomain: "brello-c3fa5.firebaseapp.com",
  databaseURL: "https://brello-c3fa5-default-rtdb.firebaseio.com",
  projectId: "brello-c3fa5",
  storageBucket: "brello-c3fa5.appspot.com",
  messagingSenderId: "713480802328",
  appId: "1:713480802328:web:e8a7873f06f830b70bb36d",
  measurementId: "G-86SCQ66RRZ"
};

const app = initializeApp(firebaseConfig);
//----------Firebase-------------

//----------QRCode---------------
var QR_CODE = new QRCode("qrcode", {
    width: 150,
    height: 150,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.M,
});
//----------QRCode---------------

$("span2").html(window.location.origin+"/HTML/boardpage.html?id="+getParameterByName('id'))
QR_CODE.makeCode(window.location.origin+"/HTML/boardpage.html?id="+getParameterByName('id'))

$(document).on('click', '#bgimgsubmit', function(){
    const board = ref(getDatabase(), 'boards/'+getParameterByName('id'))
    const boardimg = ref(getDatabase(), 'boards/'+getParameterByName('id')+'/bgimglink')
    if($("#bgimginput").text() == 'none'){
        set(boardimg, null)
        return
    }
    update(board, {
        bgimglink:$("#bgimginput").text()
    })
})

$(document).on('click', '#colorsubmit', function(){
    const board = ref(getDatabase(), 'boards/'+getParameterByName('id'))
    const boardcolor = ref(getDatabase(), 'boards/'+getParameterByName('id')+'/bgcolor')
    if($(".colorChoose").val() == 'none'){
        set(boardcolor, null)
        return
    }
    update(board, {
        bgcolor:$(".colorChoose").val()
    })
})

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
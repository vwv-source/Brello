const boardinputtitle = document.querySelector("#boardinputtitle")
const boardinputdesc = document.querySelector("#boardinputdesc")
const createbutton = document.querySelector("#createbutton")
const largeboardcontainer = document.querySelector(".largeboardcontainer")
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

$(document).on('click', '#deletebutton', function(){
    const boardid = ref(getDatabase(), 'boards/'+$(this).parent().attr('id'))
    set(boardid, null)
    $(this).parent().remove()
});

$(document).on('click', '#editbutton', function(){
    $(this).parent().find('span1,span2').each(function(){
        if(this.hasAttribute('contenteditable')){
            this.removeAttribute('contenteditable')
            var boardtitle = ref(getDatabase(), 'boards/'+$(this).parent().attr('id')+'/boardtitle')
            var boarddesc = ref(getDatabase(), 'boards/'+$(this).parent().attr('id')+'/boarddesc')

            set(boardtitle, $(this).parent().find('span1').html())
            set(boarddesc, $(this).parent().find('span2').html())
        }
        else{
            this.setAttribute('contenteditable', '')
        }
    })
})

$(document).on('click', '#openbutton', function(){
    window.location.href = "../HTML/boardpage.html?id="+$(this).parent().attr('id')
});

createbutton.addEventListener("click", submitFunc);

boardsload()

function submitFunc(){
    event.preventDefault();
    const id = guidGenerator()
    const boards = ref(getDatabase(), 'boards')
    update(boards, 
    {
            [id]:{
                boardtitle:boardinputtitle.innerHTML,
                boarddesc:boardinputdesc.innerHTML
            }
    })
    $(".largeboardcontainer").append(`<div class="boardcontainer" id="${id}"><span1>${boardinputtitle.innerHTML}</span1><br><br><span2>${boardinputdesc.innerHTML}</span2><br><br><button class="boardinputbutton" id="openbutton" type="button">⇱</button><button class="boardinputbutton" id="editbutton" type="button">✎</button><button class="boardinputbutton" id="deletebutton" type="button">X</button></div>`)
}

function boardsload(){
    const boards = ref(getDatabase(), 'boards')
    get(boards).then((snapshot) => {
        snapshot.forEach((element) => {
            var readelement = element.val()
            $(".largeboardcontainer").append(`<div class="boardcontainer" id="${element.key}" style="background-color: ${readelement.bgcolor}; background-image: url('${readelement.bgimglink}')"><span1>${readelement.boardtitle}</span1><br><br><span2>${readelement.boarddesc}</span2><br><br><button class="boardinputbutton" id="openbutton" type="button">⇱</button><button class="boardinputbutton" id="editbutton" type="button">✎</button><button class="boardinputbutton" id="deletebutton" type="button">X</button></div>`)
        })
    })
}

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}


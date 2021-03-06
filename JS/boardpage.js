const listinputtitle = document.querySelector("#listinputtitle")
const listinputdesc = document.querySelector("#listinputdesc")
const createbutton = document.querySelector("#createbutton")
const deletebutton = document.querySelector("#deletebutton")
const openbutton = document.querySelector("#openbutton")
const body = document.body;
const largelistcontainer = document.querySelector(".largelistcontainer")
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

loader();

$(document).on('click', '.settingsbutton', function(){
    window.location.href = "../HTML/settingspage.html?id="+getParameterByName('id')
});

$(document).on('click', '#createcardbutton', function(){
    $($(this).parent().find('.cardarea')).append(`<span1 class="listinput" id="cardtitle">${$(this).parent().find("#cardtitleinput").text()}</span1>`)
    const boardid = ref(getDatabase(), 'boards/'+getParameterByName('id')+'/lists/'+$(this).parent().attr('id'))
    get(boardid).then((snapshot) => {
        var readablesnapshot = snapshot.val();
        if(!readablesnapshot){
            readablesnapshot = [1];
        }
        update(boardid, {
            [Object.keys(readablesnapshot).length]:{
                name:$(this).parent().find("#cardtitleinput").text(),
            }
        })
    })
});

$(document).on('click', '#deletebutton', function(){
    const boardid = ref(getDatabase(), 'boards/'+getParameterByName('id')+'/lists/'+$(this).parent().attr('id'))
    set(boardid, null)
    $(this).parent().remove()
});

$(document).on('click', '#editbutton', function(){
    var id = $(this).parent().attr('id');
    var cardnum = 1;
    const boardid = ref(getDatabase(), 'boards/'+getParameterByName('id')+'/lists/'+id)
    $(this).parent().find('.cardarea').find("span1").each(function(){
        get(boardid).then((snapshot) => { 
            if(this.hasAttribute('contenteditable')){
                this.removeAttribute('contenteditable')
                var readablesnapshot = Object.keys(snapshot).length - 1;
                console.log(cardnum)

                update(boardid, {
                    [cardnum]:{
                        name:this.innerHTML
                    }
                })
                    
                if(!this.innerHTML){
                    this.remove()
                }

                cardnum += 1;
            }
            else{
                this.setAttribute('contenteditable', '')
                set(boardid, {name:snapshot.val().name})
            }
        })
    })
})

createbutton.addEventListener("click", submitFunc);

function submitFunc(){
    event.preventDefault();
    const boardlist = ref(getDatabase(), 'boards/'+getParameterByName('id')+'/lists')
    get(boardlist).then((snapshot) => {
        var readablesnapshot = snapshot.val();
        if(!snapshot.val()){
            readablesnapshot = [1];
        }
        update(boardlist, 
        {
                [readablesnapshot.length]:{
                    name:listinputtitle.textContent
                }
        })
    })
    $(".largelistcontainer").append(`<div class="listcontainer" id="${listinputtitle.innerHTML}"><p1>${listinputtitle.innerHTML}</p1><br><div class="cardarea"></div><br><span1 class="listinput" id="cardtitleinput" role="textbox" contenteditable>Card Title</span1><br><button class="listinputbutton" id="createcardbutton" type="button">+</button><button class="listinputbutton" id="editbutton" type="button">???</button><button class="listinputbutton" id="deletebutton" type="button">X</button></div>`)
}

function loader(){
    const boards = ref(getDatabase(), 'boards/'+getParameterByName('id')+'/lists')
    const boardname = ref(getDatabase(), 'boards/'+getParameterByName('id'))
    get(boardname).then((snapshot2) => {
        body.style.backgroundColor = snapshot2.val().bgcolor;
        body.style.backgroundImage = `url("${snapshot2.val().bgimglink}")`;
    })
    get(boardname).then((snapshot1) => {
        $(body).append(`<span class="bottomtext" role="textbox">${snapshot1.val().boardtitle}</span>`)
    })
    get(boards).then((snapshot) => {
        snapshot.forEach((element) => {
            $(".largelistcontainer").append(`<div class="listcontainer" id="${element.key}"><p1>${element.val().name}</p1><br><div class="cardarea"></div><br><span1 class="listinput" id="cardtitleinput" role="textbox" contenteditable>Card Title</span1><br><button class="listinputbutton" id="createcardbutton" type="button">+</button><button class="listinputbutton" id="editbutton" type="button">???</button><button class="listinputbutton" id="deletebutton" type="button">X</button></div>`)
            element.forEach((element2) => {
                if(!element2.val().name){
                    return
                }
                $("#"+element.key).find('.cardarea').append(`<span1 class="listinput" id="cardtitle">${element2.val().name}</span1>`)
            })
        })
    })
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
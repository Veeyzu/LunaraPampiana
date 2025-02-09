
let ShopIteration = 0;
let Data = {};
let lastCtick = 0;

let scrolls = [];
let opened = false;

let scrollingTemplate = document.getElementById("ScrollingTemplate");
let descDoc

scrollingTemplate.hidden = "hidden";
fetch('./data.json')
    .then((response) => response.json())
    .then((json) => 
        Init(json)
    );

function format(number) {
    
    var thousandSeparator = ",";    
    var result = String(number);

    result = result.split("").reverse().join("");
    
    result = result.replace(/(\d{3}(?!$))/g, "$1" + thousandSeparator);
    
 
    return result.split("").reverse().join("");
}

class newScroll{
    constructor(label, arr) {
        this.Label = label;
        this.curIndex = 0;
        this.arr = arr;
        this.maxIndex = Object.keys(arr).length;
        this.Div = scrollingTemplate.cloneNode(true);
    }
    showDescription(){
        if (!opened) {
            opened = true;
            descDoc.style.bottom = -30+"px";
            var iter = 0;
            for (const [key, value] of Object.entries(Data.Shop[this.Label])) {
                if (iter == this.curIndex) {
                    console.log( descDoc.querySelector("#Content"));
                    console.log(value[2]);
                    descDoc.querySelector("#Content").innerHTML = value[2];
                    descDoc.querySelector("#selectedImage").src = "/assets/"+value[0];
                    descDoc.querySelector("#Price").innerHTML = "RP. "+ format(value[1]);
                    // this.Div.querySelector('#Chosen').innerHTML = key;
                    //console.log(document.getElementsByClassName("ScrollingDisplay")[0].querySelectorAll('h1')[0].innerHTML);
                    break;
                }
                iter += 1;

            }
            
        }
    }
    revolve(inc){
        this.curIndex += inc
        if (this.curIndex > this.maxIndex - 1) {
            this.curIndex = 0;
        }
        if (this.curIndex < 0 ){
            this.curIndex =  this.maxIndex - 1;
        }

        let iter = 0;
        for (const [key, value] of Object.entries(Data.Shop[this.Label])) {
            if (iter == this.curIndex) {
                this.Div.querySelectorAll(".previewImage")[0].src = "/assets/"+value[0];
                this.Div.querySelector("#Price").innerHTML = "RP. "+ format(value[1]);
                this.Div.querySelector('#Chosen').innerHTML = key;
                //console.log(document.getElementsByClassName("ScrollingDisplay")[0].querySelectorAll('h1')[0].innerHTML);
                break;
            }
    
            iter += 1;
            
        }
    }
    init(){
        document.body.querySelector("#ScrollContainers").appendChild(this.Div);
        this.Div.removeAttribute("hidden");
        this.Div.querySelector("#title").innerHTML = this.Label;
        
       
        this.revolve(1);
        
    }
   
}


function render(ctick) {
    ctick = ctick/1000
    let delta = ctick - lastCtick;
    lastCtick = ctick;
    // ctick += delta;
    let i = 0;

    while (i < scrolls.length) {
        scrolls[i].Div.querySelectorAll(".previewImage")[0].style = "transform: translate("+Math.sin(ctick) * 2 +"%,"+(-50 +Math.cos((ctick+i*2)*1.5) * 2)+"%)";
       // console.log(scrolls[i]);
        i++;
    }
    
    //document.getElementsByClassName("previewImage")[0].style = "transform: translate("+Math.sin(ctick) * 2 +"%,"+(-50 +Math.cos(ctick*1.5) * 2)+"%)";
    //console.log(Math.sin(ctick*Math.PI) * 5);
    requestAnimationFrame(render);
}


function Init(json){
    Data = json;
    console.log(Data);

    descDoc = document.getElementsByClassName("Description")[0];

    descDoc.style.bottom = 
    - 30
    - descDoc.offsetHeight + "px";

    descDoc.onclick = function(){
        if (opened) {
            opened = false;
            descDoc.style.bottom = 
            - 30
            - descDoc.offsetHeight + "px";
        }
    }

    for (const [label, arr] of Object.entries(Data.Shop)) {
       
        //console.log(key);

        let CreatedScroll = new newScroll(label, arr)
        CreatedScroll.init();
        CreatedScroll.revolve(0);
        CreatedScroll.Div.querySelector(".previewImage").onclick = function() {
            CreatedScroll.showDescription()
        }
        CreatedScroll.Div.querySelector("#LeftArrow").onclick = function() {
            CreatedScroll.revolve(-1);
        }
        CreatedScroll.Div.querySelector("#RightArrow").onclick = function() {
            CreatedScroll.revolve(1);
        }

        scrolls.push(CreatedScroll);
    }
  
    requestAnimationFrame(render);
}


console.log("sigma sigma skibidi");


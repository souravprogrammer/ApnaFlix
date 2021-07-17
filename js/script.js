// using the property
// let nav = document.querySelector("nav");
// search bar height  height: 40px;
/*      <div class="show-card">
        <div class="show-image">
            <img src="./assets/test3.jpg" alt="">
        </div>
        <p class="content-size">Episode 12</p>
        <p class="title">title name</p>
    </div>  */

function ShowCard(data){

    let cardBody = document.createElement("div");
    cardBody.classList.add("show-card");



    let cardImg = document.createElement("div");
    cardImg.classList.add("show-image");
    let img = document.createElement("img");
    img.src = data.img;
    cardImg.appendChild(img);

    let contentSize = document.createElement("p");
    contentSize.classList.add("content-size");
    let title = document.createElement("p");

    title.classList.add("title");
    title.textContent =data.title ;
    contentSize.textContent = data.episode;

    cardBody.appendChild(cardImg);
    cardBody.appendChild(contentSize);
    cardBody.appendChild(title);

  //  console.log(cardBody);
    return cardBody ;
}
function ShowCardOngoing(data){

    let cardBody = document.createElement("div");
    cardBody.classList.add("show-card");



    let cardImg = document.createElement("div");
    cardImg.classList.add("show-image");
    let img = document.createElement("img");
    img.src = data.img;
    cardImg.appendChild(img);

    let contentSize = document.createElement("p");
    contentSize.classList.add("content-size");
    let title = document.createElement("p");

    title.classList.add("title");
    title.textContent =data.title ;
    contentSize.textContent = data.episode;

    let content = document.createElement("div");
    content.classList.add("show-content");

    cardBody.appendChild(cardImg);

    content.appendChild(title);
    content.appendChild(contentSize);
    cardBody.appendChild(content);
   

  //  console.log(cardBody);
    return cardBody ;
}



function navbar(){
    let nav = {
        nav : document.querySelector("nav"),
        navoptions : document.querySelector(".navbar .nav-options ul"),
        searchBarButton  :document.querySelector("#searchbutton"),
        searchBar : document.querySelector(".searchbar")
    }
    return nav ;
}
let checkbox  = document.querySelector('.checkbox input');
const navigation = navbar();
let search_status = false ;

let resizeObserver = new ResizeObserver(() => {
    
    
    if(navigation.nav.offsetWidth>=600 ){
        navigation.searchBar.style.animation ="none" ;
        navigation.searchBar.style.pointerEvents = "all";
    }
    if(navigation.nav.offsetWidth>=1000){
       var value = window.getComputedStyle(navigation.navoptions).getPropertyValue("opacity");
        if(value == 0){
        navigation.navoptions.style.animation="none";
         navigation.navoptions.style.opacity="1";
    }


    }
    if(navigation.nav.offsetWidth<=1000){
        if(!checkbox.checked){
            navigation.navoptions.style.opacity="0";
        }else{
            navigation.navoptions.style.opacity="1";

        }
    }
});
// observing the change in width 
resizeObserver.observe(navigation.nav);

checkbox.addEventListener("click",function(){
    let height = navigation.nav.offsetHeight;
    //175
    if(checkbox.checked){
        height = height + 175 ;
        navigation.nav.style.height = height+"px";
        navigation.navoptions.style.animation = "appear-in 0.5s ease-in-out 1 both";
        navigation.navoptions.classList.toggle(".fade-in")

    }else {
        height = height -175 ;
        navigation.nav.style.height = height+"px";
        navigation.navoptions.style.opacity = "0" ;

        navigation.navoptions.style.animation = "appear-out 0.5s ease-in-out 1 both";
        navigation.navoptions.classList.toggle(".fade-out")

    }
});
navigation.searchBarButton.addEventListener("click",()=>{

    console.log(navigation.searchBar);

    if(!search_status){
        //for add search box
    if(navigation.nav.offsetHeight === 75){
        var height = 50 + navigation.nav.offsetHeight ;
        console.log("height "+ height) ;
        navigation.nav.style.height =  height+"px" ;
    } else if(checkbox.checked){
        var height = 50 + navigation.nav.offsetHeight ;
        console.log("height "+ height) ;
        navigation.nav.style.height =  height+"px" ;
        
    }
    navigation.searchBar.style.animation ="appear-in 0.5s ease-in-out 1 both" ;
    navigation.searchBar.style.pointerEvents = "all";

    search_status = true ;
}else {
    // for removing search box
    console.log("hello "+  navigation.nav.offsetHeight ) ;

    if(navigation.nav.offsetHeight <= 130){
        var height =  navigation.nav.offsetHeight -50 ;
        console.log( height) ;
        navigation.nav.style.height =  height+"px" ;
    }else if(checkbox.checked){
        var height =  navigation.nav.offsetHeight -50 ;
        console.log( height) ;
        navigation.nav.style.height =  height+"px" ;
    }
    navigation.searchBar.style.animation ="appear-out 0.5s ease-in-out 1 both" ;
    navigation.searchBar.style.pointerEvents = "none";

   

    search_status = false ;
}


});



//TODO CHANGE THIS AND MAKE IT CLEAR


     //   let random_container = document.querySelector(".recently-updated-container");

// for(var i=0;i<10;i++){
// random_container.appendChild(ShowCard());
// }

    // random_img.src = data.random[0].img ;
    // random_title.textContent = data.random[0].title ;
    // random_description.textContent =data.random[0].description

fetch("./js/data.json").then(response => response.json()).then(data=> {
    // console.log(random_img);

    let addrandom = function(value){
        const rand = Math.random()*2;
        const card =  value[Math.floor(rand)] ;
      //  console.log(card);
        let random_img = document.querySelector(".image-holder img");
        let random_title = document.querySelector(".random-card h2");
        let random_description = document.querySelector(".random-card p");
        let element = window.getComputedStyle(
            document.querySelector('.random-card'), '::before'
        );


       // console.log(element.backgroundImage);
        random_title.textContent =  card.title ;
        random_img.src =  card.img ;
  

        random_description.textContent =  card.description ;
    };
    const recentlyUpdated = function(value ){

        let container = document.querySelector(".recently-updated-container");
        value.forEach(element=>{

          let card = ShowCard(element);
          container.appendChild(card);
        });
    };

    const trending  = function(value){
        let container = document.querySelector(".all-show-container");
        value.forEach(element=>{

          let card = ShowCard(element);
          container.appendChild(card);
        });
    };
    const ongoing  = function(value){
        let container = document.querySelector(".onging-container");
        value.forEach(element=>{

          let card = ShowCardOngoing(element);
          container.appendChild(card);
        });
    };
    const addAnousment  = function(value){
        let container = document.querySelector(".card-body p");
        container.textContent =value ;
    };
    addrandom( data.random);
    recentlyUpdated(data.recentlyadded);
    trending(data.trending);
    ongoing(data.ongoing);
    addAnousment(data.announcement);
});


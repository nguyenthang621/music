var $=document.querySelector.bind(document)
var $$=document.querySelectorAll.bind(document)
var cd=$(".cd")
const header=$(".header h2")
const imgSong=$(".cd img")
const audio=$("#audio")
const btnPlay=$(".btn-play")
const iconPlay=$(".btn-play i.bx-play")
const barMusic=$("#progress")
const iconPause=$(".btn-play i.bx-pause")
const btnNext=$(".btn-next")
const btnPre=$(".btn-pre")
const btnRandom=$(".btn-random")
const btnRepeat=$(".btn-repeat")

const app ={
    currentIndex:0,
    isPlay:"false",
    isRandom:"false",
    isRepeat:"false",
    songs:[
        {
            name:"Shape Of You",
            singer:"cover by J.Fla",
            path:"./music/Shape Of You ( cover by J.Fla ) (128 kbps).mp3",
            image:"./img/img1.jpg"
        },
        {
            name:"Darkside",
            singer:"Alan Walker",
            path:"./music/Alan Walker - Darkside .mp3",
            image:"./img/icon music.png"
        },
        {
            name:"Unstoppable",
            singer:"Sia Lyrics",
            path:"./music/Unstoppable  Sia Lyrics.mp3",
            image:"./img/icon music.png"
        },
        {
            name:"TẾT XA",
            singer:"Hương Tú",
            path:"./music/TẾT XA  Hương Tút.mp3",
            image:"./img/icon music.png"
        },
        {
            name:"Một Ngày Không Xa",
            singer:"i dont know :) ",
            path:"./music/Một Ngày Không Xa.mp3",
            image:"./img/icon music.png"
        },
        {
            name:"Quê Tôi",
            singer:"Thùy Chi",
            path:"./music/Quê Tôi Thùy Chi.mp3",
            image:"./img/icon music.png"
        },
 
        {
            name:"Impossible",
            singer:"Shontelle",
            path:"./music/Impossible  Shontelle.mp3",
            image:"./img/icon music.png"
        },
        {
            name:"Monsters",
            singer:"Sia Lyrics",
            path:"./music/Katie Sky  Monsters Lyrics.mp3",
            image:"./img/icon music.png"
        },
  

    ],

    render: function (){
        var htmls=
        this.songs.map((song,index)=>{
           return `   
            <div class="song index${index} " data-index="${index}" >
           <div class="img-song"><img src="${song.image}" alt="error url"></div>
           <div class="infor">
               <div class="title">${song.name}</div>
               <div class="author">${song.singer}</div>
           </div>
           <span class="option"><i class='bx bx-dots-horizontal-rounded'></i></span>
        </div>`
       })
       return $(".playList").innerHTML= htmls.join("")
    },

// dinh nghia ra thuoc tinh cho object:
    defineProperties: function (){
    Object.defineProperty(this,"currentSong",{
        get: function () {
            return this.songs[this.currentIndex]
        }
    })
},

    handleEvents: function (){
//xu ly hide CD :
{
    var cdWidth=$(".cd").offsetWidth
    var cdHeight=$(".cd").offsetHeight
    document.onscroll=function (){
        var curentPosition=Math.round(document.documentElement.scrollTop) || window.scrollY;

        var newcdWidth=cdWidth-curentPosition
        cd.style.width =newcdWidth>0? cdWidth-curentPosition + "px":0

        var newcdHeight=cdHeight-curentPosition
        cd.style.height =newcdHeight>0? cdHeight-curentPosition + "px":0
        cd.style.opacity=newcdWidth/cdWidth
  }  

}
// quay CD :
{
    var rotCDAnimate=cd.animate(
        [{transform:'rotate(360deg)'}],
        {duration:10000,//tg quay het 1 vong
        iterations: Infinity // lap bao nhieu lan
    })
    rotCDAnimate.pause()

}

      // xu ly click play:
      {
          btnPlay.onclick=function(){
              if (audio.paused){
                  audio.play()
                }
                else{
                audio.pause()
              }
          }
          audio.onplay = function(){
            iconPlay.classList.add("hide")
            iconPause.classList.remove("hide")  
              rotCDAnimate.play()
          }
          audio.onpause = function(){
            iconPlay.classList.remove("hide")
            iconPause.classList.add("hide")  
            rotCDAnimate.pause()
          }

      }

      // tien do change:
      audio.ontimeupdate=function(){
          if (audio.duration){
            barMusic.value=audio.currentTime/audio.duration *100

        }

      }


      // xu ly khi tua bar audio :
      barMusic.onchange=function(e){
          audioSeekTime=e.target.value*audio.duration/100
        audio.currentTime=audioSeekTime
      }

      btnRepeat.onclick=function(){
        app.isRepeat=( !app.isRepeat)
        console.log(app.isRepeat)
        btnRepeat.classList.toggle("active",app.isRepeat)

    }

    //remove activeSong:   


    // xu ly lick vao song :
    listSong=$$(".playList")

    listSong.forEach(function(song){
        song.onclick=function(e){
            var indexThumb=e.target.closest(".song:not(.activeSong)")
            var option=e.target.closest(".option")
            if (indexThumb && !option){
                app.currentIndex=indexThumb.getAttribute("data-index")
                app.activeSong()
                app.loadCurrentSong()
                audio.play()
            }
            if (option){
                console.log("option");
            }
        }
    })

    },
    
    // end handleEvents
    
    loadCurrentSong:function (){
        header.innerText=this.currentSong.name
        imgSong.src=this.currentSong.image
        audio.src=this.currentSong.path
        this.activeSong()
        this.scrollToActiveSong()
    },
    // active Song:
    activeSong:function (){
        const currentSongPlay=$(".song.index"+this.currentIndex)
        const listSong=$$(".song")
        listSong.forEach(function(song){
            song.classList.remove("activeSong")     
        })
        currentSongPlay.classList.add("activeSong")            

    },
    // effect scroll 
    scrollToActiveSong: function (){
     const currentActiveSong=$('.song.activeSong');
     // neu hide thi xu li sau!!!!
    //  console.log($('.song.activeSong').getAttribute("data-index"));
     currentActiveSong.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    },

    // xu ly button next and pre:
    nextSong:function (){
        btnNext.onclick=function(){
            if (app.isRandom===true){
                app.playRandomSong()
            }
            else{
                app.currentIndex++;
            }
                if (app.currentIndex>app.songs.length-1){
                    app.currentIndex=0;
                }
                app.loadCurrentSong();
                audio.play()
            }
    },

    preSong:function (){
        btnPre.onclick=function(){
            if (app.isRandom===true){
                app.playRandomSong()
            }
            else{
                app.currentIndex--;
            }
                if (app.currentIndex<0){
                    app.currentIndex=app.songs.length-1;
                }
                app.loadCurrentSong();
                audio.play()
            }
    },

// button random:
    randomSong:function(){
        btnRandom.onclick=function(){
            app.isRandom=!app.isRandom;
            btnRandom.classList.toggle("active",app.isRandom);
            // app.currentIndex=Math.round(Math.random()*(app.songs.length-1))
        }
    },

    playRandomSong: function (){
        var newIndexSong;
        do{
            newIndexSong=Math.round(Math.random()*(app.songs.length-1))
        }while(newIndexSong===app.currentIndex)
        app.currentIndex=newIndexSong
    },

// btn repeat:


    // xu ly khi audio ended:
    audioEnded: function (){
        audio.onended=function(){
            if (app.isRepeat===true){
                audio.play()
            }else{
                btnNext.click()
            }
        }
    },



    start: function(){
        this.randomSong()
        this.defineProperties()
        this.render()
        this.handleEvents()
        this.nextSong()
        this.preSong()
        this.loadCurrentSong()
        this.audioEnded()
    }
}

app.start()


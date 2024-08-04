let searchParam = location.search.split("=").pop(); // type location.search to console

const accessKey = "cI-zVnPd8cSIcrhLixmx4rXX87Mw-wavm_qVO3mtRv0";

const randomPhotoURL = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=30`;
const searchPhotoURL = `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${searchParam}&per_page=50`;

const gallery = document.querySelector(".gallery");
// const spinner = document.getElementById("loading-spinner");
const shimmerContainer = document.getElementById("shimmer-container");

let allImages;
let currentImage=0;

// const getImages = async () =>{
//     // spinner.classList.remove("hide");
//     shimmerContainer.classList.remove("hide");
//     const result = await fetch(randomPhotoURL);
//     const data = await result.json();
//     console.log(data);
//     allImages = data;
//     makeImages(allImages);
//     // spinner.classList.add("hide");
//     shimmerContainer.classList.add("hide");
// }

const getImages = async () => {
    try {
        if (shimmerContainer) shimmerContainer.classList.remove("hide");
        const result = await fetch(randomPhotoURL);
        const data = await result.json();
        console.log("Random images data:", data);
        allImages = data;
        makeImages(allImages);
    } catch (error) {
        console.error("Error fetching random images:", error);
    } finally {
        if (shimmerContainer) shimmerContainer.classList.add("hide");
    }
}
// *********************************************FOR INFINITE SCROLL*********************************************

window.addEventListener('scroll', () => {
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = document.documentElement;
  
    if ((scrollTop + clientHeight) >= (scrollHeight - 20)) {
  
      getImages();
    }
  })

const searchImages = async () =>{    
    try {
        // spinner.classList.remove("hide");
        if (shimmerContainer) shimmerContainer.classList.remove("hide");
        const result = await fetch(searchPhotoURL);
        const data = await result.json();
    console.log(data.result);
    allImages = data.results;
    makeImages(allImages);
    }
    catch (error) {
        console.error("Error fetching random images:", error);
    } finally {
        if (shimmerContainer) shimmerContainer.classList.add("hide");
        // spinner.classList.add("hide");
    }
    
   
}

const makeImages = (data) => {
    // console.log(data);
    data.forEach((item, index) => {
        // console.log(item);
       let img = document.createElement("img");
       img.src = item.urls.regular;
       img.className = "gallery_img";

       gallery.appendChild(img);

    //----------------for popup------------
img.addEventListener("click",()=>{
    currentImage = index;
    showPopUp(item);
})
    })
}

const showPopUp = (item)=>{
   const popupContainer = document.querySelector("image_pop_up_container");
    let popup = document.querySelector(".image_pop_up");
    const downloadBtn = document.querySelector(".download_btn");
    const closeBtn = document.querySelector(".close_btn");
    const largeImage = document.querySelector(".large_img");

    popup.classList.remove("hide");
    downloadBtn.href = item.links.html;
    largeImage.src = item.urls.regular;

    closeBtn.addEventListener("click",()=>{
         popup.classList.add("hide");
    })

}
if(searchParam == ""){
    getImages();
}else{
    searchImages();
}


//----------------------------controls-------------------

const preBtn = document.querySelector(".pre_btn");
const nextBtn = document.querySelector(".next_btn");

preBtn.addEventListener("click",()=>{
   
    if(currentImage > 0){
        preBtn.classList.remove("disabled");
        nextBtn.classList.remove("disabled");
        currentImage--;
        showPopUp(allImages[currentImage])
        
    }
    else if(currentImage<=0){
        preBtn.classList.add("disabled");
    }
})
nextBtn.addEventListener("click",()=>{
    if(currentImage < allImages.length-1){
        preBtn.classList.remove("disabled");
        nextBtn.classList.remove("disabled");
        currentImage++;
        showPopUp(allImages[currentImage])
    }else if(currentImage>=allImages.length-1){
        nextBtn.classList.add("disabled");
    }
})
import $ from 'jquery'; 

 export default function noHide(){
  var video = document.getElementById("myvideo");
  $('#myvideo').hover(function toggleControls() {
      if (video.hasAttribute("controls")) {
    
      } else {
          video.setAttribute("controls", "controls")
      }
  })
};
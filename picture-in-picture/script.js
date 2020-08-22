const videoElement = document.getElementById('video');
const button = document.getElementById('button');


//select media, pass to video, then play
async function selectMediaStream(){
  try{
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.onplay();
    }
  }catch(error){
      console.log('something went wrong', error)
  }
}


button.addEventListener('click', async () => {
  button.disable = true;
  //start pic in Picture
  await videoElement.requestPictureInPicture();
  //reset
  button.disable = false;
});

//on load
selectMediaStream();

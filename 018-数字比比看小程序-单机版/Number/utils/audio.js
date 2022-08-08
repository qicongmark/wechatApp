const app = getApp();

function createAudio(audio) {
  if (audio){
    var innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.autoplay = false;
    innerAudioContext.src = app.RES_URL + "mp3/" + audio;
    innerAudioContext.onPlay(() => {
      //console.log('开始播放');
    });
    innerAudioContext.onError((res) => {
      console.log(res.errCode);
    })
    return innerAudioContext;
  }
}

//export
module.exports = {
  createAudio: createAudio
}


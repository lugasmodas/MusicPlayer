class MusicPlayerController {
  constructor() {
    this._audio = new Audio();
    this._btns = document.querySelectorAll('.btn');
    this._audioFinalTime;

    this.initialize();
    this.initButtonEvent();
    this.initKeyboard();
  }

  initialize() {
    this._audio.src = './assets/audio/better_off_alone_-_Rxbyn.mp3';
    this._audioFinalTime = 185.182041;
    let displayTime = document.querySelector('#forwardTime');

    document.querySelector('#reverseTime').innerHTML = this.evalTime(this._audioFinalTime);
    this.checkCurrentTime();
    this.attDisplay(displayTime);

    setInterval(() => {
      this.attDisplay(displayTime);
      this.saveCurrentTime();
    }, 1000);
  }

  attDisplay(displayTime) {
    displayTime.innerHTML = this.evalTime(this._audio.currentTime);
    this.displayProgressBar();
  }

  saveCurrentTime() {
    sessionStorage.setItem('currentTime', this._audio.currentTime);
  }

  checkCurrentTime() {
    (sessionStorage.getItem('currentTime')) ? this._audio.currentTime = parseFloat(sessionStorage.getItem('currentTime')) : this._audio.currentTime = 0;
  }

  evalTime(value) {
    let min = 0, sec = 0;
    let flag;

    do {
      flag = false;
      if ((value - 60) >= 0) {
        min++;
        value -= 60;
        flag = true;
      }
    } while (flag);

    sec = Math.trunc(value);

    if (min < 10)
      min = `0${min}`;

    if (sec < 10)
      sec = `0${sec}`;

    return `${min}:${sec}`;
  }

  displayProgressBar() {
    let bar = document.querySelector('#insideProgressBar');
    let point = document.querySelector('#pointProgressBar');

    let porcent = (1 - ((this._audioFinalTime - this._audio.currentTime) / this._audioFinalTime)) * 100;

    bar.style.width = `${porcent}%`;
    point.style.marginLeft = `${porcent - 1}%`;
  }

  initButtonEvent() {
    let btns = [...this._btns];

    btns.forEach(btn => {
      btn.addEventListener('click', e => {
        this.execBtn(btn.id);
      })
    })
  }

  initKeyboard() {
    document.addEventListener('keyup', e => {
      console.log(e);
      switch (e.key) {
        case ' ':
          this.playStopFunction();
          break;
      }
    })
  }

  execBtn(btnId) {
    switch (btnId) {
      case 'playStopButton':
        this.playStopFunction();
        break;
    }
  }

  playStopFunction() {
    let btn = document.querySelector('#playStopButton');
    if (this._audio.paused) {
      this._audio.play()
      btn.src = "./assets/images/pause.png";
    }
    else {
      this._audio.pause();
      btn.src = "./assets/images/play.png";
    };
  }
}
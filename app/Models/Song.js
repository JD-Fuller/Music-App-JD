export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt = data.albumArt || data.artworkUrl100.replace(/100x100/g, "50x50");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
    this.durationInMillis = data.durationInMillis || "Unknown";
  }

  get songTemplate() {
    return `
    <div class="card p-2 itunes__track">
                      <img class="itunes__track__cover" src="${this.albumArt}">
                      <div class="itunes__track__info">
                      <h3 class="itunes__track__title">${this.title}</h3>
                      <span class="itunes__track__artist">${this.artist}</span>
                     
                      <button class="btn btn-primary" onclick="app.songsController.playSong('${this._id}')"></button>
                      </div>
                      <button class="btn btn-dark" type="button" onclick="app.songsController.addSong('${this._id}')">+</button>
                     
                    </div>
        `;
  }

  get playlistTemplate() {
    return `
    <div class="card p-2 itunes__track">
                      <img class="itunes__track__cover" src="${this.albumArt}"></img>
                      <div class="itunes__track__info">
                      <h3 class="itunes__track__title">${this.title}</h3>
                      <span class="itunes__track__artist">${this.artist}</span>
                      </div>
                      <button type="button" class="btn btn-success" onclick="app.songsController.removeSong('${this._id}')">X</button>
                    </div>
        `;
  }


  get PreviewTemplate() {
    return `
    <div class='player'>
    <div class='album-cover'>
      <img src='${this.albumArt}' />
    </div>
    <div class='song-progress-bar'>
      <div class='inner-bar'></div>	
    </div>	
    <div class='song-info'>
      <h1 class='song-title'>${this.title}</h1>
      <div class='song-band-wrapper'>
        <p class='song-band'>${this.artist} - <span class='album'>OK Computer</span></p>
      </div>	
    </div>	
    <div class='player-buttons'>
      <div class='playerbtn song-back'>
        <i class="fa fa-backward" aria-hidden="true"></i>
      </div>
      <div class='playerbtn playToggle'>
        <i class="fa fa-play" aria-hidden="true"></i>
      </div>
      <div class='playerbtn song-forward'>
        <i class="fa fa-forward" aria-hidden="true"></i>
      </div>	
    </div>	
  </div>	
    
    `;



  }

}
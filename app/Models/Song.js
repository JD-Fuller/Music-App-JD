export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
  }

  get Template() {
    return `

    <li class="itunes__track">
                      <img class="itunes__track__cover" src="${this.albumArt}">
                      <div class="itunes__track__info">
                      <h3 class="itunes__track__title">${this.title}</h3>
                      <span class="itunes__track__artist">${this.artist}</span>
                      </div>
                      <span class="itunes__track__time">4:34</span>
                      <button type="button" class="btn btn-success" onclick="app.songsController.addSong('${this._id}')">+</button>
            </div>
    `
                    </li>

        `;
  }

  get playlistTemplate() {
    return `

        `;
  }
}

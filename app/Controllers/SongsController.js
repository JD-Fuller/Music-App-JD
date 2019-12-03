import store from "../store.js";
import SongService from "../Services/SongsService.js";
import service from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let songTemplate = ''
  let song = store.State.songs
  song.forEach(song => songTemplate += song.songTemplate)

  document.querySelector("#song-list").innerHTML = songTemplate
}
/**Draws the Users saved songs to the page */
function _drawPlaylist() {
let template = ''
store.State.playlist.forEach(song => {
  template += song.playlistTemplate;
})

// let playlist = store.State.playlist
// playlist.forEach(playlist => playlistTemplate += playlist.playlistTemplate)

document.querySelector("#playlist").innerHTML = template
}

//Public
export default class SongsController {
  constructor() {
    console.log("hello from song controller")
    store.subscribe("songs", _drawResults)

    console.log("hello from playlist creator")
    store.subscribe("playlist",_drawPlaylist)
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      SongService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  addSong(id) {
    service.addSong(id);
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) {
      service.removeSong(id);

  }
/**
 * find and play a song by its id
 * @param {string} id 
 */
  playSong(id) {
    let song = store.State.songs.find(s => s._id == id);
    //TODO 
    //if (!song) { throw new Error("invalid id");}
    //
    document.getElementById("#media-player").innerHTML = song.PreviewTemplate;

  }
}

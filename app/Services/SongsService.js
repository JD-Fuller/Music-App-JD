import Song from "../Models/Song.js";
import store from "../store.js";

// @ts-ignore
let _sandBox = axios.create({
  //TODO Change YOURNAME to your actual name
  baseURL: "//bcw-sandbox.herokuapp.com/api/jdfuller"
});

class SongsService {
  constructor() {
    // NOTE this will get your songs on page load
    this.getJDSongs();
    // this.loadSongs();
  }
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        let results = res.results.map(rawData => new Song(rawData));
        store.commit("songs", results);
      })
      .catch(err => {
        throw new Error(err);
      });
  }
  /**
   * Retrieves the saved list of songs from the sandbox
   */
  getJDSongs() {
    _sandBox
      .get()
      .then(res => {
        //TODO What are you going to do with this result
        let results = res.results.map(rawData => new Song(rawData));
      })
      .catch(error => {
        throw new Error(error);
      });
  }
  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  addSong(id) {
    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?
_sandBox.post("/songs", id).then(res => {
  this.getJDSongs()
}).catch(err =>{
  console.error(err)
})
  }

  /**
   * Sends GET request to our sandbox to post to our playlist on screen
   */
  // loadSongs(){
  //   _sandBox.get("/songs").then(res => {
  //     console.log(res)
  //     let songs = res.data.map(s => new Song(s))
  //     store.commit("songs", songs)
  //   }).catch(err =>{
  //     console.error(err)
  //   })
  // }


  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  removeSong(songId) {
    //TODO Send the id to be deleted from the server then update the store
    _sandBox.delete('/songs/${songId}').then(res => {
      console.log(res)
      this.loadSongs()
    }).catch(err => {
      console.error(err)
    })

  }
}

const service = new SongsService();
export default service;

function http(method, url) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();

        xhr.open(method, url);
        xhr.responseType = "json";

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200)
                resolve(this.response);
            else if (xhr.status >= 400 && xhr.status <= 500) {
                reject(xhr.status);
            }
        }

        xhr.send();
    });
}

let map = new Map();
http('GET', "./data/music.json")
    .then(function(results) {
        if (results && Array.isArray(results)) {
          results.forEach(function(res) {
            if(res.name)
              map.set(res.name, res.albums);
          })
        }
    })
    .then(function() {
      if(map && map.size > 0) {

          for(let [artist, albums] of map.entries()) {
            let text = `${artist} has ${albums.length} albums`;
            console.log(text);

            // print the track list
            albums.forEach(function(album) {
              let title = `${album.title} has ${album.songs.length} tracks and released on ${album.released}`;
              console.log(title);

              album.songs.forEach(function(song) {
                console.log(`${song.title}, ${song.length}`);
              });
            });
          }
      }
    })
    .catch(function(err) {
        parsed_json = null;
        console.log("some error", err);
    });
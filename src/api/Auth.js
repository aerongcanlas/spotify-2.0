const url = require("url");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const axios = require("axios");

/* readfile
// const fs = require("fs");

// const read_scope = fs.readFile("./scope.txt", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   const scope_arr = data.split(", \n")
//   return data;
// });
*/

// const client_id = process.env.REACT_APP_CLIENT_ID; // use github var for security
// const client_secret = process.env.REACT_APP_CLIENT_SECRET;

const client_id = "f429068956f4483da0b25e71d29fc805"; // use github var for security
const client_secret = "045ebe5fdcaf493a90e0806a41b69cf7";
const redirect_uri = "http://localhost:3001/";

const generateRandomString = function (length) {
   var text = "";
   var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

   for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
   }
   return text;
};

const stateKey = "spotify_auth_state";
const scope = [
   "user-read-email",
   "user-read-private",
   "user-library-read",
   "user-top-read",
   "user-read-playback-state",
   "user-modify-playback-state",
   "user-read-currently-playing",
   "user-read-recently-played",
   "user-follow-read",
   "playlist-read-private",
   "playlist-read-collaborative",
   "streaming",
].join(" ");

app.use(cors()).use(cookieParser());

app.get("/express_backend", (req, res) => {
   res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

// authorize
app.get("/", function (req, res) {
   console.log("Server started.");
});

app.get("/login", function (req, res) {
   const state = generateRandomString(16);
   res.cookie(stateKey, state);
   const auth_params = {
      client_id: client_id,
      response_type: "code",
      redirect_uri: redirect_uri,
      state: state,
      scope: scope,
   };

   res.redirect(
      "https://accounts.spotify.com/authorize?" +
         new url.URLSearchParams(auth_params).toString()
   );
});

// get refresh and access tokens
app.get("/callback", function (req, res) {
   const code = req.query.code || null;
   const state = req.query.state || null;
   const storedState = req.cookies ? req.cookies[stateKey] : null;

   if (state === null || state !== storedState) {
      res.redirect(
         "/#" +
            new url.URLSearchParams({
               error: "state_mismatch",
            }).toString()
      );
   } else {
      res.clearCookie(stateKey);
      const authOptions = {
         url: "https://accounts.spotify.com/api/token",
         method: "post",
         data: new url.URLSearchParams({
            code: code,
            redirect_uri: redirect_uri,
            grant_type: "authorization_code",
         }).toString(),
         headers: {
            Authorization:
               "Basic " +
               new Buffer.from(client_id + ":" + client_secret).toString("base64"),
            "content-type": "application/x-www-form-urlencoded",
         },
         responseType: "json",
      };

      // get access token
      axios(authOptions).then(function (response, error) {
         if (!error && response.status === 200) {
            console.log("Access token received!");

            const access_token = response.data.access_token,
               refresh_token = response.data.refresh_token,
               expire_time = response.data.expires_in;

            res.send({
               'access_token': access_token, 
               'refresh-token': refresh_token, 
               'expire-time': expire_time
            })

            const auth_options = {
               url: "https://api.spotify.com/v1/me",
               method: "get",
               headers: {
                  Authorization: "Bearer " + access_token,
                  "copntent-type": "application/json",
               },
            };

            // axios api calls
            //#region
            // // print name of current logged in user
            // axios(auth_options).then(function (response, error) {
            //   console.log(response.data.display_name);
            // });

            // auth_options["url"] += "/player";

            // // get current playback state; print song and artist name
            // axios(auth_options).then(function (response, error) {
            //   if (!error && response.status === 200) {
            //     const song_name = response.data.item.name,
            //       song_artists = response.data.item.artists
            //         .map((artist) => artist.name)
            //         .join(" ");

            //     console.log(song_name + " by " + song_artists);
            //   } else if (!error && response.status === 204)
            //     console.log("Nothing is playing.");
            //   else
            //     console.log(
            //       response.status +
            //         " " +
            //         (error.status !== undefined ? error.status : "no error")
            //     );
            // });

            // const track_id = "6HyJKFTdA0apKZHX0x4zQF";

            // auth_options["url"] =
            //   auth_options["url"].replace("me/player", "tracks") + "/" + track_id;

            // // get song with track_id; print song name, artists, and available markets
            // axios(auth_options).then(function (response, error) {
            //   if (!error && response.status === 200) {
            //     const song_name = response.data.name,
            //       song_artists = response.data.artists
            //         .map((artist) => artist.name)
            //         .join(" "),
            //       available_markets = 
            //       response.data.album.available_markets.length ? 
            //       response.data.album.available_markets.join(", ") : "Not available on Spotify.";

            //     console.log(song_name + " by " + song_artists + " ~~~ in: ");
            //     console.log(available_markets);
            //   } else if (!error && response.status === 204)
            //     console.log("Nothing is playing.");
            //   else
            //     console.log(
            //       response.status +
            //         " " +
            //         (error.status !== undefined ? error.status : "no error")
            //     );
            // });
            //#endregion

            //res.redirect("http://localhost:3000");
            // res.redirect(
            //   "/#" +
            //     new url.URLSearchParams({
            //       access_token: access_token,
            //       refresh_token: refresh_token,
            //     }).toString()
            // );
         } else {
            res.redirect(
               "/#" +
                  new url.URLSearchParams({
                     error: "invalid_token",
                  }).toString()
            );
         }
      });
   }
});

app.get("/refresh_token", function (req, res) {
   // requesting access token from refresh token
   const refresh_token = req.query.refresh_token;
   const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      method: "post",
      headers: {
         Authorization:
            "Basic " +
            new Buffer.from(client_id + ":" + client_secret).toString("base64"),
         "content-type": "application/x-www-form-urlencoded",
      },
      data: new url.URLSearchParams({
         grant_type: "refresh_token",
         refresh_token: refresh_token,
      }).toString(),
      responseType: "json",
   };

   axios(authOptions).then(function (response, error) {
      if (!error && response.status === 200) {
         const access_token = response.data.access_token;
         res.send({
            access_token: access_token,
         });
      }
   });
});

app.listen(3001, () => {
   console.log("Listening on 3001");
});

// open browser and run the calls
// const open = require("open");
// open("http://localhost:3001", { app: { name: open.apps.chrome } });

// credentials config code
//#region 
// const credentials_config = {
//   url: "https://accounts.spotify.com/api/token",
//   method: "post",
//   data: new url.URLSearchParams(auth_params).toString(),
//   headers: {
//     Authorization:
//       "Basic " +
//       new Buffer.from(client_id + ":" + client_secret).toString("base64"),
//     "content-type": "application/x-www-form-urlencoded",
//   },
//   responseType: "json",
// };

// axios(credentials_config).then(function (response, error) {
//   if (!error && response.status === 200) {
//     const token = response.data.access_token;
//     const get_config = {
//       url: "https://api.spotify.com/v1/users/perseuscage",
//       method: "get",
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//       responseType: "json",
//     };

//     axios(get_config).then(function (response) {
//       console.log(response.data);
//     });
//   }
// });
//#endregion

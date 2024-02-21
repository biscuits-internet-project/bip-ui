require("babel-register")({
  presets: ["es2015", "react"]
});

const router = require("./route").default;
const Sitemap = require("react-router-sitemap").default;
const axios = require('axios').default;

async function generateSitemap() {

  let resp = await axios.get("https://api.discobiscuits.net/api/songs");
  const songs = resp.data
  let songSlugs = [];
  for(var i = 0; i < songs.length; i++) {
    songSlugs.push({ id: songs[i].slug });
  }

  resp = await axios.get("https://api.discobiscuits.net/api/shows");
  const shows = resp.data
  let showSlugs = [];
  for(i = 0; i < shows.length; i++) {
    showSlugs.push({ id: shows[i].slug });
  }

  resp = await axios.get("https://api.discobiscuits.net/api/venues");
  const venues = resp.data
  let venueSlugs = [];
  for(i = 0; i < venues.length; i++) {
    venueSlugs.push({ id: venues[i].slug });
  }

  let years = [];
  for(i = 1995; i < 2021; i++) {
    years.push({ year: i });
  }

  const paramsConfig = {
    "/songs/:id": songSlugs,
    "/shows/:id": showSlugs,
    "/venues/:id": venueSlugs,
    "/shows/year/:year": years
  };

    return (
      new Sitemap(router)
          .applyParams(paramsConfig)
          .build("https://discobiscuits.net")
          .save("./public/sitemap.xml")
    );
}

generateSitemap()
import React from "react";
import { Grid } from "@material-ui/core";
import ResourceCard from "./ResourceCard";
import PageHeading from "../shared/PageHeading";
import HtmlHead from "../shared/HtmlHead";

const Resources: React.FC = () => {
  return (
    <>
      <HtmlHead
        title="Band History, Rock Operas, Terminology, Film Score and More"
        description="The ultimate collection of Disco Biscuits history."
      />

      <PageHeading text="Resources" />

      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3} style={{ display: "flex", height: "auto" }}>
          <ResourceCard
            title="Band History"
            content={`From their early days in Philadelphia as "Zex Sea" to their current lineup as The Disco Biscuits, read more about the band members, who they are, and how they came together.`}
            image="/band.jpg"
            url="/resources/history"
          ></ResourceCard>
        </Grid>
        {/* <Grid item xs={12} sm={6} md={6} lg={4} xl={3} style={{display: 'flex', height: "auto"}}>
					<ResourceCard
					  title="Gear"
					  content="Ever wondered what brand of delay pedal Aaron uses on his Roland JP8000?  Here is as much as we know about the band’s setup."
					  image="/gear.jpg"
					  url="/resources/gear"
					></ResourceCard>
				</Grid> */}
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3} style={{ display: "flex", height: "auto" }}>
          <ResourceCard
            title="Musical Terminology"
            content="Inverted I-Man? Dyslexic Munchkin?? Dub Dribble??? WHAT DOES IT ALL MEAN?"
            image="/music.jpg"
            url="/resources/music"
          ></ResourceCard>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3} style={{ display: "flex", height: "auto" }}>
          <ResourceCard
            title="Touchdowns All Day Podcast"
            content="Step inside the mind of Jon Barber as he breaks down jams, interviews guests, and discusses all things Disco Biscuits on Touchdowns All Day w/ Jon Barber."
            image="/tdad.jpg"
            url="/resources/touchdowns-all-day"
          ></ResourceCard>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3} style={{ display: "flex", height: "auto" }}>
          <ResourceCard
            title="Side Projects"
            content="From Barber and the Laid Back Band to Younger Brother Live and everything in between. And we mean EVERYTHING."
            image="/electron.jpg"
            url="/resources/side-projects"
          ></ResourceCard>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3} style={{ display: "flex", height: "auto" }}>
          <ResourceCard
            title="The Hot Air Balloon"
            content="The band’s first full length rock opera, written by Jon Gutwillig and debuted at the band’s 1998 New Year’s Eve show at Silk City in Philadelphia."
            image="/hot-air-balloon.jpg"
            url="/resources/hot-air-balloon"
          ></ResourceCard>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3} style={{ display: "flex", height: "auto" }}>
          <ResourceCard
            title="The Chemical Warfare Brigade"
            content="The band’s second full length rock opera, written by Marc Brownstein, and debuted Dec 30, 2000 at the Vanderbilt on Long Island."
            image="/cwb.jpg"
            url="/resources/chemical-warfare-brigade"
          ></ResourceCard>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3} style={{ display: "flex", height: "auto" }}>
          <ResourceCard
            title="Live Movie Scores"
            content="Akira, Tron, and every other time the band played a set synched to a movie."
            image="/akira.jpg"
            url="/resources/movie-scores"
          ></ResourceCard>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3} style={{ display: "flex", height: "auto" }}>
          <ResourceCard
            title="The Perfume"
            content="Don’t miss these Disco Biscuits doppelgangers if you have the chance. Performing alternate versions of songs like Devo Frog Legs and surf punk Kitchen Mitts, catching a Perfume set is a rare treat for fans."
            image="/drops.jpg"
            url="/resources/the-perfume"
          ></ResourceCard>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3} style={{ display: "flex", height: "auto" }}>
          <ResourceCard
            title="Tractorbeam"
            content="All things serve the Beam. Debuted in 2007, this Disco Biscuits alter-ego played instrumental versions of tdb originals and covers until reinventing themselves in 2019."
            image="/tractorbeam.jpg"
            url="/resources/tractorbeam"
          ></ResourceCard>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3} style={{ display: "flex", height: "auto" }}>
          <ResourceCard
            title="News from Nowhere"
            content="From jambands.com to Rolling Stone, here you'll find all of your favorite Disco Biscuits articles and interviews in one place."
            image="/news.jpg"
            url="/resources/media"
          ></ResourceCard>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={4} xl={3} style={{ display: "flex", height: "auto" }}>
          <ResourceCard
            title="Running Mixes"
            content=""
            image="/mixes.jpg"
            url="/resources/running-mixes"
          ></ResourceCard>
        </Grid>
      </Grid>
    </>
  );
};
export default Resources;

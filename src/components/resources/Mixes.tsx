import { Link } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";
import PageHeading from "../shared/PageHeading";
import Paragraph from "../shared/Paragraph";

const Gear: React.FC = () => {
  let mixes = [
    {
      url: "http://runlikeh3ll.com/tdb/The%20Disco%20Biscuits%20-%20Air%20Song%20Running%20Mix.mp3",
      name: "Air Song Running Mix",
    },
    { url: "http://runlikeh3ll.com/tdb/The%20Disco%20Biscuits%20-%20Best%20of%202008.mp3", name: "Best of 2008" },
    {
      url: "http://runlikeh3ll.com/tdb/The%20Disco%20Biscuits%20-%20Big%20Time%20Baby%20Running%20Mix.mp3",
      name: "Big Time Baby Running Mix",
    },
    {
      url: "http://runlikeh3ll.com/tdb/The%20Disco%20Biscuits%20-%20Caterpillar%20Running%20Mix.mp3",
      name: "Caterpillar Running Mix",
    },
    {
      url: "http://runlikeh3ll.com/tdb/The%20Disco%20Biscuits%20-%20Digital%20Loufa%20Running%20Mix.mp3",
      name: "Digital Loufa Running Mix",
    },
    {
      url: "http://runlikeh3ll.com/tdb/The%20Disco%20Biscuits%20-%20Everyone%20Get%20Down%20Running%20Mix.mp3",
      name: "Everyone Get Down Running Mix",
    },
    {
      url: "http://runlikeh3ll.com/tdb/The%20Disco%20Biscuits%20-%20HIIT%20Running%20Mix.mp3",
      name: "HIIT (High Intensity Interval Training) Running Mix",
    },
    {
      url: "http://runlikeh3ll.com/tdb/The%20Disco%20Biscuits%20-%20Interplanetary%20Running%20Mix.mp3",
      name: "Interplanetary Running Mix",
    },
    {
      url: "http://runlikeh3ll.com/tdb/The%20Disco%20Biscuits%20-%20Mirrorball_&_Glowsticks_vol1_mixed_by_HAL_Masa.mp3",
      name: "Mirrorball & Glowsticks Vol 1",
    },
    {
      url:
        "http://runlikeh3ll.com/tdb/The%20Disco%20Biscuits%20-%20Post%20Halloween%20PacNW%20Throwdown%20(Jam%20Compilation).mp3",
      name: "Post-Halloween PacNW Throwdown",
    },
    {
      url: "http://runlikeh3ll.com/tdb/The%20Disco%20Biscuits%20-%20Project%20Four%20Running%20Mix.mp3",
      name: "Project 4 Running Mix",
    },
    {
      url: "http://runlikeh3ll.com/tdb/The%20Disco%20Biscuits%20-%20Rageaholics%20Anonymous%20Mix.mp3",
      name: "Rageaholics Anonymous",
    },
    {
      url: "http://runlikeh3ll.com/tdb/The%20Disco%20Biscuits%20-%20Resurrection%20Running%20Mix.mp3",
      name: "Resurrection Running Mix",
    },
    {
      url: "http://runlikeh3ll.com/tdb/The%20Disco%20Biscuits%20-%20Snowmelt%20Running%20Mix.mp3",
      name: "Snowmelt Running Mix",
    },
    {
      url: "http://runlikeh3ll.com/tdb/The%20Disco%20Biscuits%20-%20Spring%202007%20Running%20Mix.mp3",
      name: "Spring 2007 Running Mix",
    },
    {
      url: "http://runlikeh3ll.com/tdb/The%20Disco%20Biscuits%20-%20Step%20Inside%20Running%20Mix.mp3",
      name: "Step Inside Running Mix",
    },
    {
      url: "http://runlikeh3ll.com/tdb/The%20Disco%20Biscuits%20-%20The%20Decade%20Running%20Mix.mp3",
      name: "The Decade Running Mix",
    },
    {
      url: "http://runlikeh3ll.com/tdb/The%20Disco%20Biscuits%20-%20The%20Recovery%20Running%20Mix.mp3",
      name: "The Recovery Running Mix",
    },
    {
      url: "http://runlikeh3ll.com/tdb/The%20Disco%20Biscuits%20-%20The%20Revival%20Running%20Mix.mp3",
      name: "The Revival Running Mix",
    },
    {
      url: "http://runlikeh3ll.com/tdb/The%20Disco%20Biscuits%20-%20Thirst%20Quencher%20Running%20Mix.mp3",
      name: "Thirst Quencher Running Mix",
    },
    {
      url: "http://runlikeh3ll.com/tdb/The%20Disco%20Biscuits%20-%20Treemaculates%20Bischedelica.mp3",
      name: "Treemaculates Bischedelic",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Biscuits Internet Project - Running Mixes</title>
      </Helmet>
      <PageHeading text="Running Mixes" />

      <Paragraph>
        For many runners, long-form high-intensity music is the best way to get through a workout. As luck would have
        it, this is what The Disco Biscuits do best.
      </Paragraph>
      <Paragraph>
        As much as we all love their compositions, sometimes the first 10 minutes of the House Dog Party Favor
        composition aren't the ideal musical companion for pushing yourself up the side of a mountain. Sometimes you
        want to get right into the meat of the jam to fuel your ascent. That's where The Disco Biscuits Workout Mixes
        come in handy.
      </Paragraph>
      <Paragraph>These mixes are composed of hand-selected jams. In most cases, they segue into one another.</Paragraph>
      <Paragraph>
        I've found them to be the perfect musical companion for longer runs. Personally, these mixes helped me to get
        into running and forged a lifelong love for this band.{" "}
        <a href="https://livemusicblog.com/features/podcast-59-hippie-workout-mix-vol-1/" target="_blank">
          This specific mix from LiveMusicBlog.com
        </a>{" "}
        took my casual fandom to full-blown obsession back in 2008, and I've been running to the Biscuits ever since.
        They've gotten me across the finish line in countless races, and I have yet to find any music more conducive to
        cardio.
      </Paragraph>
      <Paragraph>
        I hope you enjoy these mixes as much as I do! If I've missed any mixes (or you've created a new one that you'd
        like to add), please let me know. If one of these mixes is yours and you'd like credit for it, don't hesitate to
        reach out!
      </Paragraph>
      <Paragraph>
        -{" "}
        <a href="https://johnvantine.com" target="_blank">
          John
        </a>
      </Paragraph>

      <ul>
        {mixes.map((m) => (
          <li>
            <Link href={m.url} target="blank">
              {m.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default Gear;

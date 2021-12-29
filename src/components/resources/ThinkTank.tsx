import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PageHeading from "../shared/PageHeading";
import { Card, CardContent, Link } from "@material-ui/core";
import Paragraph from "../shared/Paragraph";
import HtmlHead from "../shared/HtmlHead";

const ThinkTank: React.FC = () => {
  return (
    <>
      <HtmlHead title="Think Tank Dubs" />

      <PageHeading text="Think Tank Dubs" />
      <Card>
        <CardContent>
          <Paragraph>
            In 2007, longtime fan Think Tank Dubs mixed the cult classic&nbsp;
            <Link
              href="https://soundcloud.com/pree-di-dubs/think-tank-the-mishawaka-dub-session?si=48392ef3cf644f4ea58d6a4a632c2b9a&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
              target="_blank"
            >
              "The Mishawaka Dub Session"
            </Link>
            {". "}
            The Biscuits used the mix as their set break music well into 2008. The first night they used it was
            7/13/2007 where the band took the stage while the version of Seven Nation Army by The Dynamics was playing
            and the band began to jam along with the mix. The BIP even lists this as Seven Nation Army* (first time
            played).
          </Paragraph>
          <Paragraph>
            After several years of playing, Think Tank (much like the band) took a hiatus from playing while raising a
            family. But then Barber posted the note to fans on social media hinting at a return to touring by announcing
            that, "Set break is over. Gas tank's refilled. We are back. Get ready, the best is yet to come". And this
            inspired Think Tank to get back to his passion as well and this he wanted to infuse Bisco jams into his
            sets.
          </Paragraph>
          <Paragraph>
            Since September of 2020, Think Tank Dubs has been livestreaming a monthly show called the&nbsp;
            <Link href="http://www.twitch.tv/thinktankdubs" target="_blank">
              "Basement Sessions"
            </Link>
            &nbsp;that features two full length sets. His shows are intentionally late-night parties and typically don't
            begin until midnight. His sets include tracks from all of the different sub-genres of electronica dub music
            (dubtronica, psydub, ragga, reggaes / hip-hop crossovers steppas, jungle, DnB, and other experimental forms
            of bass music,) but he also heavily infuses deep cut Bisco jams into his sets. Often segueing in and out of
            Biscuits jams without ever getting to the point where there is a recognizable chorus. The infectious grooves
            from the bisco jams blended seamlessly with upbeat electronic dub music make for a great dance party and he
            even makes them available to stream for free the following day on&nbsp;
            <Link href="http://www.soundcloud.com/pree-di-dubs" target="_blank">
              SoundCloud.
            </Link>
          </Paragraph>
          <Paragraph>
            All show announcements and links can be found at:&nbsp;
            <Link href="https://linktr.ee/thinktankdubs" target="_blank">
              linktr.ee/thinktankdubs
            </Link>
          </Paragraph>
          <Paragraph>
            If you haven't heard one of his set yet, he has a ten best sets of 2021 playlist and another of top from the
            nearly 50 sets he played in 2020!
          </Paragraph>
        </CardContent>
      </Card>
    </>
  );
};
export default ThinkTank;

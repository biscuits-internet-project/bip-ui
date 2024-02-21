import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PageHeading from "../shared/PageHeading";
import { Card, CardContent, Link } from "@material-ui/core";
import Paragraph from "../shared/Paragraph";
import HtmlHead from "../shared/HtmlHead";

const ThinkTank: React.FC = () => {
  return (
    <>
      <HtmlHead title="Think Tank Dubs presents The Basement Sessions " />

      <PageHeading text="Think Tank Dubs presents The Basement Sessions " />
      <Card>
        <CardContent>
          <Paragraph>
            Long time tDB fan, nine-nine tour head and reggae selector, Think Tank Dubs hosts monthly livestreams called{" "}
            <Link href="http://www.twitch.tv/thinktankdubs" target="_blank">
              The Basement Sessions
            </Link>{" "}
            that feature two full-length DJ sets. The Basement Sessions are late-night dance parties, often starting at
            midnight or immediately following the band's webcasts. His carefully curated sets seamlessly weave a mix of
            dub &amp; electronica with deep cut Biscuit jams that will keep your party rocking well into the night.
            Known for his refined taste, knowledgeable jam selections while playing tracks across a wide breadth of
            sub-genres of modern dub music (dubtronica, psydub, ragga, steppas, hip-hop mash-ups, jungle, DnB, psybient,
            downtempo, and other experimental forms of bass music), Think Tank Dubs' sets are sure to keep your late
            nights raging and heads bobbing! Full-length sets and Selector's Cuts (highlights) from The Basement
            Sessions are available for streaming on SoundCloud, Twitch, and YouTube.
          </Paragraph>
          <Paragraph>
            <ul>
              <li>
                One stop shop for ALL links:{" "}
                <Link href="https://linktr.ee/thinktankdubs" target="_blank">
                  linktr.ee/thinktankdubs
                </Link>
              </li>
              <li>
                Monthly Livestreams:{" "}
                <Link href="https://twitch.tv/ThinkTankDubs" target="_blank">
                  Twitch.tv/ThinkTankDubs
                </Link>
              </li>
              <li>
                Full Sets and Selector's Cuts (audio):{" "}
                <Link href="https://soundcloud.com/Pree-Di-Dubs" target="_blank">
                  SoundCloud.com/Pree-Di-Dubs
                </Link>
              </li>
              <li>
                Show announcements and updates on{" "}
                <Link href="https://twitter.com/thinktankdubs" target="_blank">
                  Twitter
                </Link>
                {", "}
                <Link href="https://facebook.com/thinktankdubs" target="_blank">
                  Facebook
                </Link>
                {", "}
                <Link href="https://instagram.com/thinktankdubs" target="_blank">
                  Instagram
                </Link>
              </li>
            </ul>
          </Paragraph>
          Think Tank Dubs Starter Pack:
          <ul>
            <li>
              <Link
                href="https://soundcloud.com/pree-di-dubs/great-abyss-jam-20210206-white-rabbit-peter-power-edit-dj-solomun-live-ibiza-2016?in=pree-di-dubs/sets/think-tank-dubs-selectors-cuts"
                target="_blank"
              >
                Great Abyss jam (tDB 2021/02/06) &gt; White Rabbit (Peter Power Edit) (DJ Solomun LIVE - Ibiza 2016)
              </Link>
            </li>

            <li>
              <Link
                href="https://soundcloud.com/pree-di-dubs/everything-in-its-right-place-atw-dub-jam-20210717-breaker-breaker-016-20210903?in=pree-di-dubs/sets/think-tank-dubs-selectors-cuts"
                target="_blank"
              >
                Everything in its Right Place (Third Son) &gt; Above the Waves jam (tDB - 2021/07/17) &gt; Breaker,
                Breaker (Wu-Tang X Khruangbin) (Tom Caruana Remix)
              </Link>
            </li>

            <li>
              <Link
                href="https://soundcloud.com/pree-di-dubs/babylon-gamma-goblins-2021-07-10-so-much-dub-to-tell?in=pree-di-dubs/sets/think-tank-dubs-selectors-cuts"
                target="_blank"
              >
                Babylon (Pixel) &gt; Gamma Goblins (tDB – 2021/07/10) &gt; So Much Dub To Tell (Ancient Astronauts, Lee
                Perry, Nas)
              </Link>
            </li>

            <li>
              <Link
                href="https://soundcloud.com/pree-di-dubs/seven-nation-army-birdy-i-i-anthem-2021-02-06?in=pree-di-dubs/sets/think-tank-dubs-selectors-cuts"
                target="_blank"
              >
                Seven Nation Army (J.Pool &amp; Lemurian Edit) &gt; Wings (NuLogic Remix) &gt; I &amp; I (Dr. Meaker
                Remix) &gt; Dreadtime (RSD remix) &gt; Anthem (tDB - 2021/02/06)
              </Link>
            </li>

            <li>
              <Link
                href="https://soundcloud.com/pree-di-dubs/great-abyss-spacebird-jam-20090305-addict-soul-shakedown-party-afrodisiac-sound-system-remix?in=pree-di-dubs/sets/think-tank-dubs-selectors-cuts"
                target="_blank"
              >
                Great Abyss jam &gt; SBMC jam (tDB - 2009/03/05) &gt; Addict &gt; Soul Shakedown Party (Afrodisiac
                Remix)
              </Link>
            </li>

            <li>
              <Link
                href="https://soundcloud.com/pree-di-dubs/don-man-sound-j-star-remix-tractorbeam-20191227-made-you-look-smile-davis-remix_pn?in=pree-di-dubs/sets/think-tank-dubs-selectors-cuts"
                target="_blank"
              >
                Don Man Sound (J Star remix) &gt; Tractorbeam jam (tDB - 2019/12/27) &gt; Made You Look (Smile Davis
                remix)
              </Link>
            </li>

            <li>
              <Link
                href="https://soundcloud.com/pree-di-dubs/money-x-cream-lunar-pursuit-jam-w-kung-confrontation-ending-sc-024-20211231?in=pree-di-dubs/sets/think-tank-dubs-selectors-cuts"
                target="_blank"
              >
                Money Rules Everything Around Me (Wu-Tang X King Tubby) &gt; Money (Horace Andy, Dreadzone remix) &gt;
                Lunar Pursuit jam w/ Kung samples (Phish – 2011/06/15) &gt; Confrontation ending (tDB – 2021/11/21)
              </Link>
            </li>
          </ul>
        </CardContent>
      </Card>
    </>
  );
};
export default ThinkTank;

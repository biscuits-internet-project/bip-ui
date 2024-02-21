import React from "react";
import { Helmet } from "react-helmet";

const HtmlHead = ({
  title,
  description = "Fan site for the Disco Biscuits.",
  image_url = "https://discobiscuits.net/android-chrome-512x512.png",
  hide_title_prefix = false,
}) => {
  if (!hide_title_prefix) {
    title = "Biscuits Internet Project" + ` | ${title}`;
  }
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Disco Biscuits, setlists, reviews, show, band history" />
      <meta name="twitter:image" content={image_url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="og:image" content={image_url} />
      <meta property="og:site_name" content="Biscuits Internet Project" />
      <meta property="og:type" content="profile" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content="https://discobiscuits.net/" />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};

export default HtmlHead;

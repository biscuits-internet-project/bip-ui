import React from 'react'
import { Helmet } from "react-helmet"

const HtmlHead = ({title, description="Offical fan site for the Disco Biscuits.", image_url="https://discobiscuits.net/biscuits-internet-project.jpg"}) => {
    return (
        <Helmet>
            <title>Biscuits Internet Project | {title}></title>
            <meta name="twitter:image" content={image_url}/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content={title}/>
            <meta name="twitter:description" content={description}/>
            <meta property="og:image" content={image_url}/>
            <meta property="og:site_name" content="Biscuits Internet Project"/>
            <meta property="og:type" content="profile"/>
            <meta property="og:title" content={title}/>
            <meta property="og:url" content="https://discobiscuits.net/"/>
            <meta property="og:description" content={description}/>
        </Helmet>
    )
}

export default HtmlHead
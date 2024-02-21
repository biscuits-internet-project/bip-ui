import React, { useState, useEffect } from "react";
import PageHeading from "../shared/PageHeading";
import axios, { AxiosResponse } from "axios";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Link } from "@material-ui/core";
import HtmlHead from "../shared/HtmlHead";

interface IMedia {
  date: Date;
  url: string;
  year: string;
  description: string;
  media_type: string;
}

const Media: React.FC = () => {
  const [media, setMedia] = useState<IMedia[]>([]);

  useEffect(() => {
    const fetchMedia = async () => {
      const data: AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/media_contents`);
      setMedia(data.data);
    };
    fetchMedia();
  }, []);
  return (
    <>
      <HtmlHead
        title="News from Nowhere - Articles & Podcasts"
        description="From jambands.com to Rolling Stone, here you'll find all of your favorite Disco Biscuits articles and interviews in one place."
        image_url="https://discobiscuits.net/news.jpg"
      />

      <PageHeading text="News from Nowhere" />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Year</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {media.map((m: IMedia) => (
              <TableRow>
                <TableCell>{m.year}</TableCell>
                <TableCell component="th" scope="row">
                  <Link href={m.url} target="blank">
                    {m.description}
                  </Link>
                  <span style={{ color: "silver" }}>&nbsp;- {new URL(m.url).host}</span>
                </TableCell>
                <TableCell>{m.media_type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default Media;

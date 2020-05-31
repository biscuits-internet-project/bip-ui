import React, { useContext, useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Link, Chip } from "@material-ui/core";
import PageHeading from "../shared/PageHeading";
import { AppContext } from "../../context/AppProvider";
import { IShow } from "./Show";
import axios, { AxiosResponse } from "axios";
import Moment from "react-moment";
import MUIDataTable from "mui-datatables";

const ShowsTopRated: React.FC = () => {
  const { state } = useContext(AppContext);
  const { currentUser } = state;
  const [loading, setLoading] = useState(false);
  const [shows, setShows] = useState<IShow[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchShows = async () => {
      const data: AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows?top_rated=${true}`);
      setShows(data.data);
      setLoading(false);
    };
    fetchShows();
  }, []);

  const data = shows.map((show: IShow) => [
    [show.slug, show.date, show.venue?.name, show.venue?.city, show.venue?.state, show.relisten_url],
    show.average_rating,
    show.ratings_count,
  ]);

  const columns = [
    {
      name: "Show",
      options: {
        filter: false,
        sort: false,
        searchable: true,
        customBodyRender: (value) => {
          return (
            <>
              <Link component={RouterLink} to={`/shows/${value[0]}`}>
                <Typography>
                  <Moment format="M/D/YY">{value[1]}</Moment>
                </Typography>
                <Typography>
                  {value[2]}
                  <br />
                  {value[3]}
                  <span>, </span>
                  {value[4]}
                </Typography>
              </Link>
              {value[5] && (
                <Typography style={{ marginTop: 6 }}>
                  <Link href={value[5]} target="blank">
                    <img src="/relisten.png" alt="relisten" />
                  </Link>
                </Typography>
              )}
            </>
          );
        },
      },
    },
    {
      name: "Average Rating",
      options: {
        display: true,
        filter: false,
        sort: true,
        sortDirection: "DESC",
        searchable: false,
        customBodyRender: (value) => {
          return Math.round(value * 100) / 100;
        },
      },
    },
    {
      name: "Number of Ratings",
      options: {
        display: true,
        filter: false,
        sort: true,
        searchable: false,
      },
    },
  ];

  const options = {
    responsive: "stacked",
    pagination: false,
    print: false,
    filter: false,
    download: false,
    selectableRows: "none",
    selectableRowsHeader: false,
    searchOpen: false,
    viewColumns: false,
  };

  return (
    <>
      <PageHeading text="Top Rated Shows" />

      <MUIDataTable data={data} columns={columns} options={options} />
    </>
  );
};

export default ShowsTopRated;

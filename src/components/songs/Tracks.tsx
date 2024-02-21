import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Button, Typography, Box, Chip } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { AppContext } from "../../context/AppProvider";
import Moment from "react-moment";
import { IVenue } from "../../stores/venues/types";
import { IShow } from "../shows/Show";
import { ISong } from "../../stores/songs/types";
import StarIcon from "@material-ui/icons/Star";

export interface ITrack {
  id: string;
  annotations: string[];
  position: number;
  segue: string;
  set: string;
  venue: IVenue;
  show: IShow;
  note: string;
  all_timer: boolean;
  previous_track?: ITrack;
  next_track?: ITrack;
  song?: ISong;
  song_id: string;
  average_rating: number;
  tags: string[];
}

interface Props {
  tracks: ITrack[];
}

const Tracks: React.FC<Props> = ({ tracks }) => {
  const { state } = useContext(AppContext);

  // const toggleView = (jamcharts) => {
  //   if (jamcharts) {
  //     setDisplayTracks(jamCharts)
  //   } else {
  //     setDisplayTracks(songsPlayed)
  //   }
  //   dispatch({ type: 'TOGGLE_VIEW_JAM_CHARTS', payload: jamcharts })
  // }

  const data = tracks.map((t: ITrack) => [
    [t.show.slug, t.show.date, t.venue.name, t.venue.city, t.venue.state, t.show.relisten_url],
    [t.previous_track?.song?.slug, t.previous_track?.song?.title, t.previous_track?.segue],
    [t.segue, t.next_track?.song?.slug, t.next_track?.song?.title],
    t.tags,
    t.note,
    t.average_rating,
  ]);

  const columns = [
    {
      name: "Show",
      options: {
        filter: false,
        sort: true,
        sortDirection: "desc",
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
      name: "Before",
      options: {
        display: true,
        filter: false,
        sort: false,
        searchable: true,
        customBodyRender: (value) => {
          return (
            <>
              <Link component={RouterLink} to={`/songs/${value[0]}`}>
                {value[1]}
              </Link>{" "}
              {value[2]}
            </>
          );
        },
      },
    },
    {
      name: "After",
      options: {
        display: true,
        filter: false,
        sort: false,
        searchable: true,
        customBodyRender: (value) => {
          return (
            <>
              {value[0]} {""}
              <Link component={RouterLink} to={`/songs/${value[1]}`}>
                {value[2]}
              </Link>
            </>
          );
        },
      },
    },
    {
      name: "Tags",
      options: {
        filter: true,
        sort: false,
        searchable: true,
        filterType: "multiselect",
        customBodyRender: (tags) => {
          if (tags === undefined || tags.length === 0) {
            return;
          } else {
            return tags.map((tag) => <Chip size="small" label={tag} color="secondary" />);
          }
        },
      },
    },
    {
      name: "Jam Charts",
      options: {
        filter: true,
        sort: true,
        sortDirection: "none",
        searchable: true,
        filterType: "checkbox",
        customFilterListOptions: { render: (v) => `Jam Charts: ${v}` },
        customBodyRender: (value) => {
          return (
            <>
              {value &&
                value.split("\n").map((item, key) => {
                  return (
                    <span key={key}>
                      {item}
                      <br />
                    </span>
                  );
                })}
            </>
          );
        },
        filterOptions: {
          names: ["Yes"],
          logic: (chart, filters) => {
            if (filters.length) return !(filters.includes("Yes") && chart !== null && chart !== "");
            return false;
          },
        },
      },
    },
    {
      name: "Rating",
      options: {
        display: true,
        filter: false,
        sort: true,
        searchable: false,
        customBodyRender: (rating) => {
          return (
            <>
              {rating > 0 && (
                <Chip
                  icon={<StarIcon />}
                  label={Math.round(rating * 100) / 100}
                  size="small"
                  style={{ marginRight: 4, marginTop: -8 }}
                />
              )}
            </>
          );
        },
      },
    },
  ];

  const options = {
    responsive: "stacked",
    filterType: "multiselect",
    pagination: true,
    print: false,
    download: false,
    selectableRows: "none",
    selectableRowsHeader: false,
    searchOpen: true,
    viewColumns: false,
    rowsPerPage: 100,
    rowsPerPageOptions: [100, 300, 600],
    customSort: (data, colIndex, order) => {
      return data.sort((a, b) => {
        if (colIndex === 0) {
          return (
            (a.data[colIndex][1].toLowerCase() < b.data[colIndex][1].toLowerCase() ? -1 : 1) *
            (order === "desc" ? 1 : -1)
          );
        } else if (colIndex === 1) {
          return (
            ((a.data[colIndex] ?? "").toLowerCase() < (b.data[colIndex] ?? "").toLowerCase() ? -1 : 1) *
            (order === "desc" ? 1 : -1)
          );
        } else if (colIndex === 4) {
          return (new Date(a.data[colIndex]) < new Date(b.data[colIndex]) ? -1 : 1) * (order === "desc" ? 1 : -1);
        } else {
          return (a.data[colIndex] < b.data[colIndex] ? -1 : 1) * (order === "asc" ? 1 : -1);
        }
      });
    },
  };

  return (
    <>
      <Typography variant="h2" style={{ marginBottom: 20 }}>
        Every time played
      </Typography>

      <MUIDataTable data={data} columns={columns} options={options} />
    </>
  );
};
export default Tracks;

import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import axios, { AxiosResponse } from "axios";
import { IShow } from "./Show";
import ListShows from "./ListShows";
import { Button, Grid } from "@material-ui/core";
import PageHeading from "../shared/PageHeading";
import ShowSearch from "../shared/ShowSearch";
import { AppContext } from "../../context/AppProvider";
import LinkButton from "../shared/LinkButton";
import moment from "moment";
import HtmlHead from "../shared/HtmlHead";
import ProgressBar from "../shared/ProgressBar";

const scrollListener = () => {
  localStorage.setItem("showsScrollY", `${window.scrollY}`);
};

const Shows: React.FC = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(params.year || currentYear);
  const [shows, setShows] = useState<IShow[]>([]);
  const [months, setMonths] = useState<string[]>([]);
  const years = Array(currentYear - 1995 + 1)
    .fill(0)
    .map((_, idx) => 1995 + idx);
  const history = useHistory();
  const { state } = useContext(AppContext);
  const { currentUser } = state;
  const admin = currentUser?.roles.includes("admin");

  useEffect(() => {
    if (shows.length) {
      const scrollY = localStorage.getItem("showsScrollY");
      scrollY && window.scrollTo(0, parseInt(scrollY));
    }
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [shows]);

  const changeYear = (year) => {
    setShows([]);
    history.push(`/shows/year/${year}`);
    setSelectedYear(year);
  };

  const scrollWithOffset = (el) => {
    const offset = state.viewSetlists ? 100 : -300;
    const elementPosition = el.offsetTop - offset;
    const behavior = elementPosition > 5000 ? "auto" : "smooth";
    window.scroll({
      top: elementPosition,
      left: 0,
      behavior: behavior,
    });
  };

  useEffect(() => {
    setLoading(true);
    const fetchSetlists = async () => {
      const data: AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows?year=${selectedYear}`);
      setShows(data.data);
      setLoading(false);

      // populate months
      const m: string[] = data.data.map((s) => {
        return moment(s.date).format("MMM");
      });
      setMonths(Array.from(new Set(m)));
    };
    fetchSetlists();
  }, [selectedYear]);
  return (
    <>
      <HtmlHead
        title="Shows & Setlists"
        description="Check out setlists by year, venue, song, or search for combinations."
      />

      <Grid container justify="space-between">
        <Grid item>
          <PageHeading text="Shows" />
        </Grid>
        <Grid item>
          {admin && (
            <div style={{ alignContent: "right" }}>
              <LinkButton text="Add Show" to="/admin/shows/create" />
            </div>
          )}
        </Grid>
      </Grid>
      <ShowSearch setShows={setShows} setLoading={setLoading}></ShowSearch>

      {years.map((year) => {
        return (
          <Button key={year} onClick={() => changeYear(year)} style={{ display: "inline", marginRight: 6 }}>
            {year}
          </Button>
        );
      })}

      {months && (
        <>
          <div style={{ height: 20 }}></div>
          <Grid container>
            {months.map((month) => {
              return (
                <Grid item key={month}>
                  <Button
                    key={month}
                    scroll={(el) => scrollWithOffset(el)}
                    component={HashLink}
                    to={`#${month}`}
                    style={{ display: "inline", marginRight: 6 }}
                  >
                    {month}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}

      {loading && <ProgressBar />}

      <ListShows shows={shows} />
    </>
  );
};

export default Shows;

import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import PageHeading from "../shared/PageHeading";
import ShowForm from "./ShowForm";
import axios, { AxiosResponse } from "axios";
import { IShow } from "./Show";
import moment from "moment";
import TrackForm from "./TrackForm";
import {
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { ITrack } from "./Tracklist";
import { AppContext } from "../../context/AppProvider";
import { useSnackbar } from "notistack";

const EditShow: React.FC = () => {
  const { state } = useContext(AppContext);
  const params = useParams();
  const [show, setShow] = useState<IShow | undefined>(undefined);
  const [track, setTrack] = useState<ITrack | undefined>(undefined);
  const [trackFormOpen, setTrackFormOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser } = state;

  const handleOpenTrackForm = (track) => {
    if (track) {
      track.annotations_with_newlines = track.annotations.join("\n");
    }

    setTrackFormOpen(true);
    setTrack(track);
  };

  const handleCloseTrackForm = () => {
    initShow();
    setTrack(undefined);
    setTrackFormOpen(false);
  };

  const initShow = useCallback(async () => {
    const fetchShow = async () => {
      const data: AxiosResponse = await axios.get(`${process.env.REACT_APP_API_URL}/shows/${params.id}`);
      const show: IShow = data.data;
      show.date = new Date(moment(show.date).format("YYYY/MM/DD"));
      setShow(show);
    };
    fetchShow();
  }, [params.id]);

  useEffect(() => {
    initShow();
  }, [initShow]);

  const deleteTrack = useCallback(
    async (track) => {
      const resp: AxiosResponse = await axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}/tracks/${track.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: currentUser?.token,
        },
      });

      if (resp.status !== 204) {
        enqueueSnackbar("Error deleting track.", { variant: "error" });
        return;
      } else {
        enqueueSnackbar("Track deleted.", { variant: "success" });
      }
      initShow();
    },
    [enqueueSnackbar, currentUser, initShow]
  );

  return (
    <>
      <Helmet>
        <title>Biscuits Internet Project - Edit Show</title>
      </Helmet>

      <PageHeading text="Edit Show" />

      {show && (
        <>
          <ShowForm show={show}></ShowForm>

          <div style={{ height: 20 }}></div>

          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h2">Tracks</Typography>
            </Grid>
            <Grid item>
              <div style={{ alignContent: "right" }}>
                <Button onClick={() => handleOpenTrackForm(undefined)}>Add Track</Button>
              </div>
            </Grid>
          </Grid>

          <Dialog open={trackFormOpen} onClose={() => handleCloseTrackForm()} maxWidth="md" fullWidth={true}>
            <DialogTitle>{track === undefined ? "Add" : "Edit"} Track</DialogTitle>
            <DialogContent>
              <TrackForm track={track} show={show} handleClose={() => handleCloseTrackForm()} />
            </DialogContent>
          </Dialog>

          <div style={{ height: 10 }}></div>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Set</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Song</TableCell>
                  <TableCell>Segue</TableCell>
                  <TableCell>All timer</TableCell>
                  <TableCell>Notes</TableCell>
                  <TableCell>Annotations</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {show &&
                  show.tracks.map((track, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>{track.set}</TableCell>
                        <TableCell>{track.position}</TableCell>
                        <TableCell>{track.song_title}</TableCell>
                        <TableCell>{track.segue}</TableCell>
                        <TableCell>{track.all_timer}</TableCell>
                        <TableCell>{track.note}</TableCell>
                        <TableCell>
                          {track.annotations.map((annotation, i) => {
                            return <div key={i}>{annotation}</div>;
                          })}
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => handleOpenTrackForm(track)}>Edit</Button>{" "}
                          <Button
                            onClick={() =>
                              window.confirm("Are you sure you want to delete this track?") && deleteTrack(track)
                            }
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default EditShow;

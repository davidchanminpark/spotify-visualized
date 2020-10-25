import React, { useState, useEffect } from "react";
import label from "./assets/spotify-visualized-label.svg";
import querystring from "querystring";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {Tabs, Tab, AppBar, Grid, Container, Box, Avatar, Typography} from '@material-ui/core';
import { useStyles } from "./uistyles.js";
import PropTypes from 'prop-types';
import WordCloud from './WordCloud.js'; 
import CoverPhoto from './CoverPhoto.js'; 
import PlaylistPic from './PlaylistPic.js'; 

const Modes = {
  WordCloud: 0,
  CoverPhoto: 1,
  PlaylistPic: 2
};

const TimePeriod = {
  Short: 1,
  Medium: 2,
  Long: 3,
};

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div>
      {value === index && children}
    </div>
  );
}

function Home() {
  const history = useHistory();
  const [username, setUsername] = useState("user");
  const [shortTermTracks, setShortTermTracks] = useState([]);
  const [mediumTermTracks, setMediumTermTracks] = useState([]);
  const [longTermTracks, setLongTermTracks] = useState([]);
  const [userImage, setUserImage] = useState("");
  const [amount, setAmount] = useState(50);
  const [mode, setMode] = useState(Modes.WordCloud);

  function setTracks(track, term) {
    switch (term) {
      case "short":
        setShortTermTracks([
          ...shortTermTracks,
          {
            id: track.id,
            name: track.name,
            image: track.album.images[0],
            artists: track.artists.name,
            popularity: track.popularity,
          },
        ]);
      case "medium":
        setMediumTermTracks([
          ...mediumTermTracks,
          {
            id: track.id,
            name: track.name,
            image: track.album.images[0],
            artists: track.artists.name,
            popularity: track.popularity,
          },
        ]);
      case "long":
        setLongTermTracks([
          ...longTermTracks,
          {
            id: track.id,
            name: track.name,
            image: track.album.images[0],
            artists: track.artists.name,
            popularity: track.popularity,
          },
        ]);
      default:
    }
  }

  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let accessToken = params.get("access_token");
    let refreshToken = params.get("refresh_token");

    const usernameOptions = {
      url: "https://api.spotify.com/v1/me",
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      json: true,
    };

    axios(usernameOptions)
      .then((response) => {
        setUsername(response.data.display_name);
        setUserImage(response.data.images[0].url);
      })
      .catch((error) => {
        console.log(error);
      });

    const topFiftyTracksOptionsShort = {
      url: "https://api.spotify.com/v1/me/top/tracks",
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      params: {
        time_range: "short_term",
        limit: 50,
      },
      json: true,
    };

    const topFiftyTracksOptionsMedium = {
      url: "https://api.spotify.com/v1/me/top/tracks",
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      params: {
        time_range: "medium_term",
        limit: 50,
      },
      json: true,
    };

    const topFiftyTracksOptionsLong = {
      url: "https://api.spotify.com/v1/me/top/tracks",
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      params: {
        time_range: "long_term",
        limit: 50,
      },
      json: true,
    };

    axios
      .all([
        axios(topFiftyTracksOptionsShort),
        axios(topFiftyTracksOptionsMedium),
        axios(topFiftyTracksOptionsLong),
      ])
      .then((responseArr) => {
        console.log(responseArr[0]);
        var i;
        for (i = 0; i < 50; i++) {
          setTracks(responseArr[0].data.items[i], "short");
          setTracks(responseArr[1].data.items[i], "medium");
          setTracks(responseArr[2].data.items[i], "long");
        }
      });
  }, []);

  const handleTabMode = (_, newValue) => {
    setMode(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container className={classes.navbar}>
        <Grid item>
          <Avatar alt="user-pic" src={userImage} />
        </Grid>
        <Grid className="label">
          <img src={label} width="400" />
        </Grid>
        <Grid item>
          <div className="username-display">hello {username} </div>
        </Grid>
      </Grid>
      <Container maxWidth="lg" className={classes.body}>
        {/* <AppBar position='static'> */}
          <Tabs value={mode} onChange={handleTabMode}>
            <Tab label="Word Cloud" />
            <Tab label="Cover Photo" />
            <Tab label="Playlist Picture" />
          </Tabs>
          <TabPanel value={mode} index={0}>
            <WordCloud>

            </WordCloud>
          </TabPanel>
          <TabPanel value={mode} index={1}>
            <CoverPhoto>

            </CoverPhoto>
          </TabPanel>
          <TabPanel value={mode} index={2}>
            <PlaylistPic>

            </PlaylistPic>
          </TabPanel>
      </Container>
    </div>
  );
}

export default Home;

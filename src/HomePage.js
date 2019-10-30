import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Movie from "./Movie";
import Filters from "./Filters";
import AppDataContext from "./AppDataContext";

const drawerWidth = 240;

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    backgroundColor: "#1A2127"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
    backgroundColor: "#1A2127"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: "#1A2127"
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#1A2127",
    color: "#fff"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "#1A2127"
  },
  gridRoot: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
}));

export default function HomePage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [movies, setMovie] = React.useState([]);
  var appData = React.useContext(AppDataContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
    getData(newValue);
  };

  async function getData(tab) {
    let url = "";
    if (tab == 0) {
      url =
        "https://api.themoviedb.org/3/discover/movie?api_key=3a94078fb34b772a31d9a1348035bed7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
    } else if (tab == 1) {
      url =
        "https://api.themoviedb.org/3/discover/movie?api_key=3a94078fb34b772a31d9a1348035bed7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
    } else if (tab == 2) {
      url =
        "https://api.themoviedb.org/3/discover/movie?api_key=3a94078fb34b772a31d9a1348035bed7&language=en-US&sort_by=primary_release_date.desc&include_adult=false&include_video=false&page=1";
    }
    const response = await fetch(url);
    const data = await response.json();
    setMovie(data.results);
    appData = data.results;
  }

  React.useEffect(() => {
    setMovie([]);
    async function getData() {
      const response = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=3a94078fb34b772a31d9a1348035bed7&language=en-US&sort"
      );
      const data = await response.json();
      setMovie(data.results);
      console.log(data.results);
      appData = data.results;
    }
    getData();
  }, [appData, setMovie]);
  console.log("render");
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.gridRoot}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Typography variant="h6" noWrap>
                  Discover
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab label="Item One" {...a11yProps(0)} />
                  <Tab label="Item Two" {...a11yProps(1)} />
                  <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
              </Grid>
              <Grid item xs={3}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <TabPanel value={value} index={0}>
          <div className={classes.gridRoot}>
            <Grid container spacing={3}>
              {movies.map(movie => {
                return (
                  <Movie
                    key={movie.id}
                    imageSrc={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                    name={movie.original_title}
                  />
                );
              })}
            </Grid>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid container spacing={3}>
            {movies.map(movie => {
              return (
                <Movie
                  key={movie.id}
                  imageSrc={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                  name={movie.original_title}
                />
              );
            })}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Grid container spacing={3}>
            {movies.map(movie => {
              return (
                <Movie
                  key={movie.id}
                  imageSrc={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                  name={movie.original_title}
                />
              );
            })}
          </Grid>
        </TabPanel>
      </main>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
        <Filters />
      </Drawer>
    </div>
  );
}

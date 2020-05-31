import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Notes, QueueMusic, Home, Room, CardTravel, Info, Album, Radio } from "@material-ui/icons";
import { BrowserRouter as Router, Link as RouterLink, Route, NavLink } from "react-router-dom";
import { ListItemIcon, ListItem, ListItemText, Link } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

const appMenuItems = [
  {
    link: "/",
    name: "Home",
    Icon: Home,
    children: [],
  },
  {
    link: "/shows",
    name: "Shows",
    Icon: QueueMusic,
    children: [
      {
        link: "/shows/top-rated",
        name: "Top Rated",
      },
    ],
  },
  {
    link: "/songs",
    name: "Songs",
    Icon: Album,
    children: [
      {
        link: "/songs/jam-charts",
        name: "Jam Charts",
      },
    ],
  },
  {
    link: "/venues",
    name: "Venues",
    Icon: Room,
    children: [],
  },
  {
    link: "/tour",
    name: "Tour Dates",
    Icon: CardTravel,
    children: [],
  },
  {
    link: "/resources",
    name: "Resources",
    Icon: Info,
    children: [],
  },
  {
    link: "/resources/touchdowns-all-day",
    name: "touchdowns all day w/ jon barber",
    Icon: Radio,
    children: [],
  },
];

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const AppMenu: React.FC = () => {
  const classes = useStyles();

  return (
    <List>
      {appMenuItems.map((item) => (
        <Route path={item.link}>
          {({ match }) => (
            <>
              <ListItemLink
                component={RouterLink}
                key={item.name}
                to={`${item.link}`}
                className={match && item.name !== "Home" ? classes.sidebarItemActive : classes.sidebarItem}
              >
                <ListItemIcon>
                  <item.Icon style={match && item.name !== "Home" ? { color: "#BB86FC" } : undefined} />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemLink>

              {match &&
                item.children.map((child) => {
                  return (
                    <ListItem className={classes.sidebarChild}>
                      <Link
                        component={NavLink}
                        to={child.link}
                        activeClassName={classes.sidebarChildActive}
                        className={classes.sidebarChildInactive}
                      >
                        {child.name}
                      </Link>
                    </ListItem>
                  );
                })}
            </>
          )}
        </Route>
      ))}
    </List>
  );
};

const drawerWidth = 240;

const useStyles = makeStyles(() =>
  createStyles({
    appMenu: {
      width: "100%",
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: "#97c05c",
    },
    sidebarItem: {
      textTransform: "lowercase",
    },
    sidebarItemActive: {
      textTransform: "lowercase",
      background: "rgba(0, 0, 0, 0.08)",
      color: "#BB86FC",
    },
    sidebarChild: {
      textTransform: "lowercase",
      padding: "2px 0px 15px 73px",
      fontSize: "13px",
      background: "rgba(0, 0, 0, 0.08)",
    },
    sidebarChildInactive: {
      color: "white",
    },
    sidebarChildActive: {
      color: "#BB86FC",
    },
  })
);

export default AppMenu;

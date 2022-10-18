import React, { useState, useEffect } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import _ from "lodash";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Box from "@material-ui/core/Box";
import BusinessIcon from "@material-ui/icons/Business";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import organization from "./tree.json";
import * as Icons from "react-icons/bi";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { SocialIcon } from "react-social-icons";
import { CardActionArea } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    display: "inline-block",
    borderRadius: 16,
  },
  expand: {
    transform: "rotate(0deg)",
    marginTop: -10,
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.short,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#ECECF4",
  },
}));

function Parent({ org, onCollapse, collapsed }) {
  const classes = useStyles();

  let backgroundColor = "white";

  return (
    <Card
      variant="outlined"
      className={classes.root}
      style={{ backgroundColor }}
    >
      <CardActionArea onClick={() => org.link && window.open(org.link, "_blank")}>
        <CardHeader
          avatar={
            <Badge
              style={{ cursor: "pointer" }}
              color="secondary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              showZero
              invisible={!collapsed}
              overlap="circular"
              badgeContent={_.size(org.organizationChildRelationship)}
              onClick={onCollapse}
            >
              <SocialAvatar classes={classes} custom={<CustomIcon name={org.icon ? org.icon : null} />} />
            </Badge>
          }
          title={org.name}

        />

      </CardActionArea>

    </Card>
  );
}
function SocialAvatar({ classes, custom }) {
  return <Avatar className={classes.avatar}>
    {custom}
  </Avatar>;
}

function Child({ a }) {
  const classes = useStyles();
  return (
    <Card
      variant="outlined"
      className={classes.root}
      style={{ cursor: "pointer" }}
    >
      <CardActionArea
        onClick={() => a.link && window.open(a.link, "_blank")}>
        <CardHeader
          avatar={
            <SocialAvatar classes={classes} custom={<CustomIcon name={a.icon ? a.icon : null} />} />
          }
          title={a.name}
        />
      </CardActionArea>
    </Card >
  );
}

const CustomIcon = ({ name }) => {
  var Icn = Icons[name];
  if (name === "" || !name) return <BusinessIcon color="primary" />;
  if (!Icn) {
    return <SocialIcon network={name} />
  };
  return <Icn />;
};


function Product({ p }) {
  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.root}>
      <CardActionArea
        onClick={() => p.link && window.open(p.link, "_blank")}>
        <CardHeader
          avatar={
            <Badge
              style={{ cursor: "pointer" }}
              color="secondary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              showZero
              overlap="circular"
            >
              <SocialAvatar classes={useStyles()} custom={<CustomIcon name={p.icon ? p.icon : null} />} />
            </Badge>
          }
          title={p.name}

        />

      </CardActionArea>
    </Card>
  );
}
function Node({ o, parent }) {
  const [collapsed, setCollapsed] = React.useState(o.collapsed);
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  React.useEffect(() => {
    o.collapsed = collapsed;
  });
  const T = parent
    ? TreeNode
    : (props) => (
      <Tree
        {...props}
        lineWidth={"2px"}
        lineColor={"#bbc"}
        lineBorderRadius={"12px"}
      >
        {props.children}
      </Tree>
    );
  return collapsed ? (
    <T
      label={
        <Parent
          org={o}
          onCollapse={handleCollapse}
          collapsed={collapsed}
        />
      }
    />
  ) : (
    <T
      label={
        <Parent
          org={o}
          onCollapse={handleCollapse}
          collapsed={collapsed}
        />
      }
    >
      {_.map(o.child, (a) => (
        <TreeNode label={<Child a={a} />}>
          {
            _.map(a.product, (p) => (<TreeNode label={<Product p={p} />} />))
          }
        </TreeNode>
      ))}
      {_.map(o.parent, (c) => (
        <Node o={c} parent={o} />
      ))}
    </T>
  );
}
const theme = createTheme({
  palette: {
    background: "#ECECF4",
  },
  fontFamily: "Roboto, sans-serif",
});

export default function App(props) {
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isLandscape = () => window.matchMedia('(orientation:landscape)').matches;

  const [orientation, setOrientation] = useState(isLandscape() ? 'landscape' : 'portrait');

  const onWindowResize = () => {
    clearTimeout(window.resizeLag)
    window.resizeLag = setTimeout(() => {
      delete window.resizeLag
      setOrientation(isLandscape() ? 'landscape' : 'portrait')
    }, 200)
  }

  useEffect(() => (
    onWindowResize(),
    window.addEventListener('resize', onWindowResize),
    () => window.removeEventListener('resize', onWindowResize)
  ), [])


  let isMobile = width <= 768;

  const RotateIcon = Icons["BiRotateRight"];
  if (isMobile && !isLandscape()) {
    return <>
      <div style={{
        height: "100vh",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <RotateIcon size={50} />
        <h3>Please rotate your device to view the tree.</h3>
      </div>
    </>
  }

  return (
    // <div style={{ width: windowWidth, height:windowHeight }}>
    <ThemeProvider theme={theme}>
      <Box bgcolor="background" padding={4} width="80vw">
        <Node o={organization} />
      </Box>
    </ThemeProvider>
    // </div>
  );
}

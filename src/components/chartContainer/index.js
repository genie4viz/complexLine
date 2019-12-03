import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
// import firebase from "../../config/firebase";
import useDimensions from "../../utils/useDimensions";
import LineChart from "./chart";
import moment from "moment";
import { Select, DatePicker, Icon } from "antd";
import "antd/dist/antd.css";

const UpperFirst = str =>
  str
    .toLowerCase()
    .replace(/(^|\s)\S/g, firstLetter => firstLetter.toUpperCase());

const durationList = [
  {
    label: "Last 7 days",
    value: 7
  },
  {
    label: "Last 14 days",
    value: 14
  },
  {
    label: "Last 30 days",
    value: 30
  },
  {
    label: "Last 2 months",
    value: 60
  },
  {
    label: "Last 1 year",
    value: 365
  }
];

const dateFormat = "YYYY/MM/DD";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  behaviorLabel: {
    padding: theme.spacing(1),
    textAlign: "left",
    fontSize: 14,
    color: "#9aa1a9"
  },
  behavior: {
    padding: theme.spacing(1),
    fontSize: 20,
    textAlign: "left",
    fontWeight: "bold",
    color: "#505d6f"
  },
  duration: {
    margin: 4
  },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing(1),
    color: "#505d6f"
  },
  select: {
    width: 140,
    margin: "0 4px",
    fontWeight: "700"
  },
  behaviorsPan: {
    padding: theme.spacing(2),
    height: 120,
    borderTop: "1px solid #e9ebf1",
    overflowY: "scroll"
  },
  behaviorItem: {
    margin: theme.spacing(1),
    padding: "0 4px",
    cursor: "pointer",
    border: "none"
  }
}));

const convertRealDate = (values, colors) => {
  let converted = [];
  for (let i = 0; i < values.length; i++) {
    converted.push({
      ...values[i],
      behaviorData: values[i].behaviorData.map(v => ({
        ...v,
        date: v.date * 1000,
        clr: colors[i]
      }))      
    });
  }
  return converted;
};

const ChartContainer = ({ data, colorList }) => {
  const classes = useStyles();

  const realData = convertRealDate(data, colorList);

  const [svgContainerRef, svgSize] = useDimensions();
  const [behaviorName, setBehaviorName] = useState("");
  const [duration, setDuration] = useState(durationList[1].value);
  const [between, setBetween] = useState({
    fromDate:
      new Date().getTime() - durationList[1].value * 24 * 60 * 60 * 1000,
    toDate: new Date().getTime()
  });
  const [toggledBehaviors, setToggledBehaviors] = useState([
    realData[0].behaviorId
  ]);

  // useEffect(() => {
  //   firebase
  //     .firestore()
  //     .collection("behaviors")
  //     .onSnapshot(snapshot => {
  //       snapshot.forEach(doc => {
  //         if (doc.data().id === "0n7gCIJjN7BsTeaVANu9") {
  //           setBehaviorName(doc.data().name);
  //         }
  //       });
  //     });

  // }, [realData]);

  const onChangeDuration = value => {
    setBetween({
      fromDate: new Date().getTime() - value * 24 * 60 * 60 * 1000,
      toDate: new Date().getTime()
    });
    setDuration(value);
  };

  const onChangeDateRange = range => {
    setBetween({
      fromDate: range[0]._d.getTime(),
      toDate: range[1]._d.getTime()
    });
  };

  const onToggleBehavior = id => {
    let toggledList = [...toggledBehaviors];
    if (toggledList.includes(id)) {
      toggledList = toggledList.filter(e => e !== id);
    } else {
      toggledList.push(id);
    }
    setToggledBehaviors(toggledList);
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.behaviorLabel}>BEHAVIORS</div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <div className={classes.behavior}>{behaviorName}</div>
        </Grid>
        <Grid item xs={12} sm={8}>
          <div className={classes.duration}>
            <Grid container justify="flex-end" alignItems="center" spacing={1}>
              <Grid item xs={12} sm={6} lg={4}>
                <Grid
                  container
                  justify="flex-end"
                  alignItems="center"
                  spacing={1}
                >
                  <Icon type="setting" className={classes.icon} />
                  <Select
                    value={duration}
                    className={classes.select}
                    onChange={onChangeDuration}
                  >
                    {durationList.map((d, i) => (
                      <Select.Option key={i} value={d.value}>
                        {d.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} md={5} lg={3}>
                <Grid container justify="flex-end">
                  <DatePicker.RangePicker
                    defaultValue={[
                      moment(new Date(), dateFormat),
                      moment(new Date(), dateFormat)
                    ]}
                    format={dateFormat}
                    onChange={onChangeDateRange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div ref={svgContainerRef}>
            {svgSize.width && realData.length !== 0 && (
              <LineChart
                data={realData.filter(d =>
                  toggledBehaviors.includes(d.behaviorId)
                )}
                behaviors={toggledBehaviors}
                width={svgSize.width}
                height={400}
                colorList={colorList}
                between={between}
              />
            )}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Grid container className={classes.behaviorsPan}>
            {realData.map((e, i) => (
              <Grid item xs={3} key={i}>
                <Grid
                  container
                  justify="center"                  
                >
                  <ToggleButton
                    value="behavior"
                    disabled={i === 0 ? true : false}
                    selected={toggledBehaviors.includes(e.behaviorId)}
                    onClick={() => onToggleBehavior(e.behaviorId)}
                    className={classes.behaviorItem}
                  >
                    <span style={{ color: colorList[i] }}>
                      &#11044;&nbsp;{UpperFirst(e.behaviorName)}
                    </span>
                  </ToggleButton>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChartContainer;

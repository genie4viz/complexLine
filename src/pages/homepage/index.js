import React from "react";
// import firebase from "../../config/firebase";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import ChartContainer from "../../components/chartContainer";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    height: '100vh'
  }  
}));

function App() {
  
  const classes = useStyles();
  
  const data = [
    {
      behaviorId: "4gyNJ40Pd9XADl0Pj4hL",
      behaviorName: "patrick test 1",
      behaviorData: [
        { date: 1571106400, score: 8 },
        { date: 1571300000, score: 4 },
        { date: 1571410000, score: 3 },
        { date: 1571520000, score: 7 },
        { date: 1571756400, score: 4 },
        { date: 1572060000, score: 2 },
        { date: 1572270000, score: 4 },
        { date: 1572580000, score: 3 },
        { date: 1572786400, score: 8 },
        { date: 1573090000, score: 5 },
        { date: 1573380000, score: 3 },
        { date: 1573690000, score: 8 },
        { date: 1574186400, score: 7 },
        { date: 1574290000, score: 6 },
        { date: 1574500000, score: 2 },
        { date: 1574810000, score: 8 }
      ]
    },
    {
      behaviorId: "3ad2q8oEx6Ndp0swRPXN",
      behaviorName: "anton test 1",
      behaviorData: [
        { date: 1571106400, score: 3 },
        { date: 1571300000, score: 5 },
        { date: 1571410000, score: 2 },
        { date: 1571520000, score: 3 },
        { date: 1571756400, score: 5 },
        { date: 1572060000, score: 8 },
        { date: 1572270000, score: 3 },
        { date: 1572580000, score: 3 },
        { date: 1572786400, score: 5 },
        { date: 1573090000, score: 5 },
        { date: 1573380000, score: 5 },
        { date: 1573690000, score: 2 },
        { date: 1574186400, score: 8 },
        { date: 1574290000, score: 3 },
        { date: 1574500000, score: 6 },
        { date: 1574810000, score: 4 }
      ]
    },
    {
      behaviorId: "4gyNJ40Pd9XAdsfds0Pj4hL",
      behaviorName: "uyiuyu test 1",
      behaviorData: [
        { date: 1571106400, score: 8 },
        { date: 1571300000, score: 4 },
        { date: 1571410000, score: 3 },
        { date: 1571520000, score: 7 },
        { date: 1571756400, score: 4 },
        { date: 1572060000, score: 5 },
        { date: 1572270000, score: 2 },
        { date: 1572580000, score: 3 },
        { date: 1572786400, score: 2 },
        { date: 1573090000, score: 8 },
        { date: 1573380000, score: 3 },
        { date: 1573690000, score: 8 },
        { date: 1574186400, score: 7 },
        { date: 1574290000, score: 7 },
        { date: 1574500000, score: 2 },
        { date: 1574810000, score: 3 }
      ]
    },
    {
      behaviorId: "3ad2q8osdfsdfdp0swRPXN",
      behaviorName: "fgjhfhg test 1",
      behaviorData: [
        { date: 1571106400, score: 3 },
        { date: 1571300000, score: 2 },
        { date: 1571410000, score: 4 },
        { date: 1571520000, score: 6 },
        { date: 1571756400, score: 7 },
        { date: 1572060000, score: 8 },
        { date: 1572270000, score: 4 },
        { date: 1572580000, score: 6 },
        { date: 1572786400, score: 8 },
        { date: 1573090000, score: 2 },
        { date: 1573380000, score: 1 },
        { date: 1573690000, score: 5 },
        { date: 1574186400, score: 8 },
        { date: 1574290000, score: 3 },
        { date: 1574500000, score: 4 },
        { date: 1574810000, score: 3 }
      ]
    },
    {
      behaviorId: "4gysdfsdgd9XADl0Pj4hL",
      behaviorName: "sdfsd test 1",
      behaviorData: [
        { date: 1571106400, score: 7 },
        { date: 1571300000, score: 3 },
        { date: 1571410000, score: 1 },
        { date: 1571520000, score: 5 },
        { date: 1571756400, score: 3 },
        { date: 1572060000, score: 2 },
        { date: 1572270000, score: 7 },
        { date: 1572580000, score: 3 },
        { date: 1572786400, score: 9 },
        { date: 1573090000, score: 5 },
        { date: 1573380000, score: 3 },
        { date: 1573690000, score: 8 },
        { date: 1574186400, score: 4 },
        { date: 1574290000, score: 7 },
        { date: 1574500000, score: 1 },
        { date: 1574810000, score: 7 }
      ]
    },
    {
      behaviorId: "3ad2q8oEx6NsdfsdfRPXN",
      behaviorName: "bvnv test 1",
      behaviorData: [
        { date: 1571106400, score: 6 },
        { date: 1571300000, score: 5 },
        { date: 1571410000, score: 5 },
        { date: 1571520000, score: 3 },
        { date: 1571756400, score: 6 },
        { date: 1572060000, score: 5 },
        { date: 1572270000, score: 5 },
        { date: 1572580000, score: 3 },
        { date: 1572786400, score: 6 },
        { date: 1573090000, score: 5 },
        { date: 1573380000, score: 5 },
        { date: 1573690000, score: 3 },
        { date: 1574186400, score: 6 },
        { date: 1574290000, score: 5 },
        { date: 1574500000, score: 5 },
        { date: 1574810000, score: 3 }
      ]
    }
  ];

  const colorList = [
    "#d9caf5",
    "#008eff",
    "#5f2dc6",
    "#6265f1",
    "#ad34fe",
    "#3b694e"
  ];

  // real code to get the data from firebase

  // useEffect(() => {

  //   let behaviorIds = []
  //   let behaviorNames = []

  //   firebase
  //     .firestore()
  //     .collection("behaviors")
  //     .onSnapshot(snapshot => {
  //       snapshot.forEach(doc => {
  //         if (
  //           doc.data().assignedStudent &&
  //           doc.data().assignedStudent.studentId ===
  //             "1dde51314202f19fb021ed787da149c0"
  //         ) {
  //           if(doc.data().id){
  //             behaviorIds.push(doc.data().id)
  //             behaviorNames.push(doc.data().name)
  //           }
  //         }
  //       });
  //     });

  //   let buffer = [];
  //   let t_buffer = [];
  //   firebase
  //     .firestore()
  //     .collection("behaviorTrackingEntry")
  //     .onSnapshot(snapshot => {
  //       snapshot.forEach(doc => {
  //         if (
  //           // doc.data().behavior === "giihgKpI3uzBzHeHNC1y" &&
  //           doc.data().student === "1dde51314202f19fb021ed787da149c0"
  //         ) {
  //           buffer.push({
  //             behaviorId: doc.data().behavior,
  //             date: doc.data().startDateTime.seconds,
  //             score: doc.data().freqScore
  //           });
  //         }
  //       });
  //       behaviorIds.forEach((e, index) => {
  //         const buf = buffer.filter((ele) => ele.behaviorId === e)
  //         t_buffer.push({behaviorId: e, behaviorName: behaviorNames[index], behaviorData: buf})
  //       })
  //       setData(t_buffer);
  //     });
  // }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" className={classes.root}>
        <ChartContainer data={data} colorList={colorList} />
      </Container>
    </React.Fragment>
  );
}

export default App;

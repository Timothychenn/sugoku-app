import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import axios from "axios";
import SudokuBoard from "../components/sudokuBoard.js";
import LevelButton from "../components/levelButton.js";
import ActionButton from "../components/actionButton.js";
import Timer from "../components/timer.js";
import { useSelector, useDispatch } from "react-redux";
import { setHighscore } from "../store/actions/index";

export default function GameScreen({ navigation }) {
  const dispatch = useDispatch();
  const { usernameStore } = useSelector((state) => {
    return {
      usernameStore: state.usernameStore,
    };
  });
  const [board, setBoard] = useState([]);
  const [boardIsEmpty, setBoardIsEmpty] = useState(true);
  const [inputBoard, setInputBoard] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(false);
  const [solveTime, setSolveTime] = useState(0);
  const [userTime, setUserTime] = useState(0);
  useEffect(() => {
    getEmpyBoard();
  }, []);

  async function getEmpyBoard() {
    try {
      setLoading(true);
      setBoardIsEmpty(true);
      const response = await axios.get("https://sugoku.herokuapp.com/board");
      setBoard(response.data.board);
      setInputBoard(response.data.board);
      setLoading(false);
      setTimer(false);
    } catch (error) {
      console.log(error);
    }
  }

  function arrayToObjArray(array) {
    return array.map((arr) => {
      return arr.map((num) => {
        if (num > 0) {
          return {
            number: num,
            editable: false,
          };
        } else {
          return {
            number: num,
            editable: true,
          };
        }
      });
    });
  }

  async function generateSudokuBoard(difficulty) {
    try {
      setBoardIsEmpty(false);
      if (difficulty === "easy") {
        setSolveTime(300);
      } else if (difficulty === "medium") {
        setSolveTime(600);
      } else if (difficulty === "hard") {
        setSolveTime(900);
      }
      setLoading(true);
      const response = await axios.get(
        `https://sugoku.herokuapp.com/board?difficulty=${difficulty}`
      );
      const objBoard = arrayToObjArray(response.data.board);
      setBoard(objBoard);
      setInputBoard(response.data.board);
      setLoading(false);
      setTimer(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleInputChange(col, row, num) {
    try {
      const newBoard = await inputBoard.slice();
      newBoard[col][row] = Number(num);
      setInputBoard(newBoard);
    } catch (error) {
      console.log(error);
    }
  }

  async function submitSudokuBoard() {
    try {
      const params = new URLSearchParams();
      params.append(`board`, `${JSON.stringify(inputBoard)}`);
      const response = await axios.post(
        "https://sugoku.herokuapp.com/validate",
        params,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      console.log(response.data.status);

      if (response.data.status === "solved") {
        setTimer(false);
        getEmpyBoard();
        dispatch(
          setHighscore({
            usernameStore,
            userTime,
          })
        );
        navigation.navigate("Finish");
      } else if (response.data.status === "unsolved") {
        Alert.alert(
          "Sudoku",
          "Board is not finished!",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      } else if (response.data.status === "broken") {
        Alert.alert(
          "Sudoku",
          "Wrong solution!",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getSolution() {
    if (boardIsEmpty) {
      Alert.alert(
        "Sudoku",
        "Board is empty! Please generate a board first!",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        params.append(`board`, `${JSON.stringify(inputBoard)}`);
        const response = await axios.post(
          "https://sugoku.herokuapp.com/solve",
          params,
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );
        const objBoard = arrayToObjArray(response.data.solution);
        setBoard(objBoard);
        setInputBoard(response.data.solution);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function navigateToHome() {
    setTimer(false);
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {usernameStore}!</Text>
      <Text style={{ textAlign: "center", fontSize: 20 }}>
        Difficulty Level
      </Text>
      <LevelButton generateSudokuBoard={generateSudokuBoard} />
      {timer && (
        <Timer
          navigateToHome={navigateToHome}
          solveTime={solveTime}
          setUserTime={setUserTime}
          userTime={userTime}
        />
      )}
      <SudokuBoard
        board={board}
        loading={loading}
        handleInputChange={handleInputChange}
      />
      <ActionButton
        submitSudokuBoard={submitSudokuBoard}
        getSolution={getSolution}
        getEmpyBoard={getEmpyBoard}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#98C3F5",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
  },
});

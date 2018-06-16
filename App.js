/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  FlatList
} from "react-native";
import SQLite from "react-native-sqlite-2";
import { somemethod } from "./databases/dbSchema";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      max: []
    };

    newtodoList = {
      id: 23,
      name: "Ninad",
      creationDate: new Date()
    };

    somemethod(newtodoList)
      .then(data => this.setState({ max: data }))
      .catch(err => alert(JSON.stringify(err)));
  }

  componentWillMount() {
    /*  const db = SQLite.openDatabase("lux.db", "1.0", "", 1);
    db.transaction(function(txn) {
      txn.executeSql("DROP TABLE IF EXISTS Users", []);
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30))",
        []
      );
      // txn.executeSql("INSERT INTO Users (name) VALUES (:name)", ["nora"]);
      // txn.executeSql("INSERT INTO Users (name) VALUES (:name)", ["takuya"]);
      txn.executeSql("SELECT * FROM `users`", [], function(tx, res) {
        console.log(res);
      });
    });
    */
  }

  methodhandler = () => {
    alert("hello");
    const db = SQLite.openDatabase("loncha.db", "1.0", "", 1);
    db.transaction(txn => {
      txn.executeSql("INSERT INTO Users (name) VALUES (:name)", ["nora"]);
      // txn.executeSql("INSERT INTO Users (name) VALUES (:name)", ["takuya"]);
      txn.executeSql("SELECT * FROM `users`", [], (tx, res) => {
        console.log(res);
        this.setState({ max: res.rows._array });
      });
    });
  };

  methodhandlerdupli = () => {
    const db = SQLite.openDatabase("loncha.db", "1.0", "", 1);
    db.transaction(txn => {
      // txn.executeSql("INSERT INTO Users (name) VALUES (:name)", ["takuya"]);
      txn.executeSql("INSERT INTO Users (name) VALUES (:name)", ["Ashutosh"]);
      txn.executeSql("SELECT * FROM `users`", [], (tx, res) => {
        console.log(res.rows._array);
        this.setState({ max: res.rows._array });
      });
    });
  };

  maxyBoy = () => {
    console.log(this.state.max);
  };

  render() {
    /*  

    {this.state.max.length === 0 ? (
            <Text> Loading....</Text>
          ) : (
            this.state.max.map((maxy, i) => <Text key={i}> {maxy.name}</Text>)
          )}

    */
    console.log(this.state.max);
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to React Native!</Text>
          <FlatList
            data={this.state.max}
            renderItem={item => <Text>{item.item.name}</Text>}
            keyExtractor={item => item.name.toString()}
          />

          <Text> thisis key</Text>
          <Button title={"Select"} onPress={this.methodhandler} />
          <Button title={"Select again"} onPress={this.methodhandlerdupli} />
          <Button title={"Select one more"} onPress={this.maxyBoy} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

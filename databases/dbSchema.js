import SQLite from "react-native-sqlite-2";

export const somemethod = newtodoList =>
  new Promise((resolve, reject) => {
    const db = SQLite.openDatabase("lolo.db", "1.0", "", 1);
    try {
      db.transaction(tx => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30))",
          []
        );
        console.log(newtodoList);
        tx.executeSql("INSERT INTO Users (name) VALUES (:name)", [
          newtodoList.name
        ]);

        tx.executeSql(
          "SELECT * FROM `users`",
          [],
          (tx, res) => {
            resolve(res.rows._array);
          },
          (tx, err) => reject({ tx, err })
        );
      });
    } catch (err) {
      reject({ lol: err });
    }
  });

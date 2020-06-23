import * as sqlite from 'expo-sqlite';

const connection = sqlite.openDatabase('temp');

interface Room {
  room_size: string;
  room_name: string;
  room_desc: string;
}
export const createTable = () => {
  return new Promise((resolve, reject) => {

    connection.transaction((transaction) => {
      const sql = `
    CREATE TABLE IF NOT EXISTS temp.favorites (
      favorite varchar(2000)
    );
    
  `
      transaction.executeSql(sql,
        [],
        (t, results) => { resolve(results) },
        (t, error) => { reject(error); return false })
    })
  }
  )
}
export const createRoomTable = () => {
  return new Promise((resolve, reject) => {

    connection.transaction((transaction) => {
      const sql = `
    CREATE TABLE IF NOT EXISTS temp.rooms (
      room varchar(2000)
    );
  `
      transaction.executeSql(sql,
        [],
        (t, results) => { resolve(results) },
        (t, error) => { reject(error); return false })
    })
  }
  )
}
export const getRooms: () => Promise<any[]> = () => {
  return new Promise((resolve, reject) => {

    connection.transaction((transaction) => {
      const sql = `
      SELECT rowid, * from temp.rooms;
  `
      transaction.executeSql(sql,
        [],
        (t, results) => { resolve((results.rows as any)._array) },
        (t, error) => { reject(error); return false })
    })
  }
  )
}
export const addRoom = (object: object) => {
  return new Promise((resolve, reject) => {

    connection.transaction((transaction) => {
      const sql = `
      INSERT INTO temp.rooms (
        room
      ) VALUES (
        ?
      )
  `
      transaction.executeSql(sql,
        [JSON.stringify(object)],
        (t, results) => { resolve(results) },
        (t, error) => { reject(error); return false })
    })
  }
  )
}
export const updateRoom = (object: object, rowid: string) => {
  return new Promise((resolve, reject) => {

    connection.transaction((transaction) => {
      const sql = `
      UPDATE temp.rooms SET room=? WHERE rowid=?;
  `
      transaction.executeSql(sql,
        [JSON.stringify(object), rowid],
        (t, results) => { resolve(results) },
        (t, error) => { reject(error); return false })
    })
  }
  )
}
export const addFavorite = (object: object) => {
  return new Promise((resolve, reject) => {

    connection.transaction((transaction) => {
      const sql = `
      INSERT INTO favorites (
        favorite
      ) VALUES (
        ?
      )
  `
      transaction.executeSql(sql,
        [JSON.stringify(object)],
        (t, results) => { resolve(results) },
        (t, error) => { reject(error); return false })
    })
  }
  )
}

export const getFavorites: () => Promise<any[]> = () => {
  return new Promise((resolve, reject) => {

    connection.transaction((transaction) => {
      const sql = `
      SELECT rowid, * from temp.favorites;
  `
      transaction.executeSql(sql,
        [],
        (t, results) => { resolve((results.rows as any)._array) },
        (t, error) => { reject(error); return false })
    })
  }
  )

}

export const removeRoom = (rowid: string) => {
  return new Promise((resolve, reject) => {

    connection.transaction((transaction) => {
      const sql = `
      DELETE FROM temp.rooms WHERE rowid=?;
  `
      transaction.executeSql(sql,
        [rowid],
        (t, results) => { resolve(results) },
        (t, error) => { reject(error); return false })
    })
  }
  )
}
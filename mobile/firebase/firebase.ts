import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCPVmLQharW8Ne0Mm_74x3HqwsDoZ1mAYs",
  authDomain: "mobilki-d7662.firebaseapp.com",
  databaseURL: "https://mobilki-d7662.firebaseio.com",
  projectId: "mobilki-d7662",
  storageBucket: "mobilki-d7662.appspot.com",
  messagingSenderId: "341261303541",
  appId: "1:341261303541:web:d1e979b7d57c26ddbdcfbc"
};


class FirebaseService {
  private firebase = firebase.initializeApp(firebaseConfig).database();

  setCar(car_name: string, image_url: string, fuel_type: string, fuel_efficiency: string, creation_date: string) {
    return this.firebase.ref('cars').push({
      car_name,
      image_url,
      fuel_type,
      fuel_efficiency,
      creation_date
    })
  }

  getCars() {
    return this.firebase.ref('cars').once('value');
  }

  deleteCar(id) {
    return this.firebase.ref(`cars/${id}`).remove()
  }
}

export const firebaseService = new FirebaseService();
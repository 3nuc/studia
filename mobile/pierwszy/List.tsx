import { SqliteService, GetCalculationResult } from './db';
import { StyleSheet, Text, View, TextInput, Button, Platform, Image, TouchableOpacity, Modal } from "react-native";
import React from 'react';
import { BaseRouter } from '@react-navigation/native';
export class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      db: null,
      modalVisible: null,
    }
  }

  componentDidMount() {
    this.setState({ db: new SqliteService() }, () => {
      this.state.db.getCalculations().then(data => this.setState({list: data}));
    })
    
  }

  render() {
    const reportElements = this.state.list.map(({car_name,creation_date,fuel_efficiency,fuel_type,image_url, rowid}) => {
      return (
        <TouchableOpacity onPress={() => { this.props.navigation.push("Details", {car_name, creation_date, fuel_efficiency, fuel_type, image_url, rowid}) }} key={rowid}>
      <View>
        <Image source={{ uri: image_url }} style={style.tinyLogo}></Image>
        <Text>Entry {rowid}</Text>
        <Text>{car_name}</Text>
        <Text>{creation_date}</Text>
        <Text>{fuel_efficiency}</Text>
        <Text>{fuel_type}</Text>
        <TouchableOpacity style={style.button}>
          <Button title="Usuń" onPress={() => {
            this.setState({modalVisible: rowid})
          }}
          />
          </TouchableOpacity>
      </View>
      </TouchableOpacity>
      )
    })
    
  return (
    <View>
      {reportElements}
      <Button
        onPress={() => {
          console.log('xd')
          this.props.navigation.push("Add");
        }}
        title="Dodaj nowy" 
      />
      <Modal visible={!!this.state.modalVisible} style={style.modal}>
        <Text>Na pewno?</Text>
        <Button onPress={async () => {
          await this.state.db.deleteCalculation(this.state.modalVisible);
          this.setState({ list: await this.state.db.getCalculations() })
          this.setState({modalVisible: null})
        }}
        title="Tak"
        />
        <Button onPress={() => {
          this.setState({modalVisible: null})
        }}
        title="Anuluj"
        />
      </Modal>
    </View>   
  )
  }
  
}


const style = StyleSheet.create({
  input: {
    borderRadius: 10,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  button: {
    width: 100
  },
  modal: {
    width: 200,
    height: 400,
    opacity: 20
  }
})
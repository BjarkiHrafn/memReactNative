import React, { useState } from "react";
import 'core-js';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Button, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from "react-native";
import ListItem from "./components/listItem";
import list from "./data";
class App extends React.Component {
  const
  constructor(props){
    super(props);
    //mapping the json data into a jsx
    const mapView = list.data.map((item, i) => <ListItem key = {i} title = {item.title} subtitle = {item.subtitle}/>)

    this.state = {
       modalVisible: false,
       title: "",
       subtitle: "",
       list: mapView,
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleRandom = this.handleRandom.bind(this)
    this.setModalVisible = this.setModalVisible.bind(this)
  }

  setModalVisible = (visible) => {
    this.setState({
      modalVisible: visible
    });
  }

  setTitle = (title) => {
    this.setState({
      title: title
    });
  }

  setSubtitle = (subtitle) => {
    this.setState({
      subtitle: subtitle
    });
  }

  /*
  Function does not work as it should. The items are added to the list but
  fails because of format on return from the modal
  */
  handleAdd = () => {
    var item = {
      title: this.state.title,
      subtitle: this.state.subtitle
    }
    //hide the modal again
    this.setModalVisible(false)
    this.setState((state) => ({
      list: [...this.state.list, item],
    }))
  }

  handleRandom = () => {
    //getting a random number between 0 - sizeof list
    var rand = Math.floor(Math.random() * this.state.list.length) + 1 ;
    //hide the modal again
    this.setModalVisible(false)
    this.setState((state) => ({
      list: [...this.state.list, this.state.list[rand]],
    }))
  }

  render() {
    const { modalVisible } = this.state;
    return (
        <View style = {styles.container}>
          <ScrollView>
            {this.state.list}
          </ScrollView>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!modalVisible);
              }}
            >
              <View style = {styles.modalContainer}>
              <SafeAreaView>
                <TextInput
                  style={styles.input}
                  onChangeText={e => this.setTitle(e)}
                  value={this.state.title}
                  placeholder="Title"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={e => this.setSubtitle(e)}
                  value={this.state.subtitle}
                  placeholder="Subtitle"
                />
              </SafeAreaView>
                <Button
                  style={styles.button}
                  title="Add"
                  onPress={() => this.handleAdd()}
                  />
                <View style = {{height: 10}}/>
                <Button
                  style={styles.button}
                  title="Randomize"
                  onPress={() => this.handleRandom()}/>
              </View>
            </Modal>
            <TouchableOpacity
               onPress={() => this.setModalVisible(true)}
               style={styles.button}>
               <Text style={{fontSize: 42}}>+</Text>
             </TouchableOpacity>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalContainer: {
    padding: 10,
    backgroundColor: 'white'
  },
  button: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1
  },
  temp:{
    marginTop: 40
  }
});

export default App;

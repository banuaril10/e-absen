import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Image,
  Alert, 
  FlatList
} from "react-native";
import * as Location from 'expo-location';
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 0,
      lng: 0,
	  image: "https://images.unsplash.com/photo-1574876999803-955c688d6581?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
	  capture: 0,
	  approved: 0,
	  isLoading: false,
    };
  }
  
  componentDidMount = async () => {
	  
	  
	  
	  
	  
	  const nik = await AsyncStorage.getItem("nik");
	  const nama_lengkap = await AsyncStorage.getItem("nama_lengkap");
	  const store = await AsyncStorage.getItem("store");
	  this.setState({nik: nik, nama: nama_lengkap, toko: store})
	  
	  this._fetchList(nik);
	  
  };


_fetchList= async (nik)=>{
        this.setState({ isLoading: true });
		
        try {
            let response = await fetch('https://absen.idolmartidolaku.com/action.php?modul=absen&act=list&nik='+nik);
            let responseJson = await response.json();
            await this.setState({
                    isLoading: false,
                    dataSource: responseJson.result,
            });
			console.log(responseJson.result);
			
        } catch (error) {
            console.error(error);
        }
		this.setState({ isLoading: false });
    }

  logout = async () => {
    await AsyncStorage.removeItem("nik");
    await AsyncStorage.removeItem("nama_lengkap");
    await AsyncStorage.removeItem("store");

    this.props.navigation.navigate("Login");
    this.setState({
      nik: "",
		nama: "",
		toko: "",
    });
  };



  render() {
	  
	  
    return (

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingLeft: 0,
          paddingRight: 0,
		  backgroundColor: '#506D84',
		  paddingTop: 20
        }}
      >
	  

	 
        <View style={styles.container}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          ></StatusBar>
		  




	<FlatList
        data={this.state.dataSource}
		extraData={this.state}
		refreshing={this.state.isLoading}
         onRefresh={this.componentDidMount}
        renderItem={({ item }) => {
          return (
        <View
          style={{
            // marginTop: StatusBar.currentHeight,
            paddingRight: 10,
            paddingVertical: 10,
            paddingHorizontal: 10,
            alignItems: "center",
            flexDirection: "row",
            borderBottomWidth: 0.3,
            alignItems: "center",
            backgroundColor: "white",
            borderBottomColor: "grey",
			
			
          }}
        >
			   
			   
                  <View>
				  

                      <Text
                        allowFontScaling={false}
                        style={{
                          letterSpacing: 0,
                          marginTop: 0,
						  width: "100%",
						  textTransform: 'uppercase',
						  fontSize: 15,
						  fontWeight: 'bold',
						  color: 'red'
                        }}
                      >
                        {item.keterangan}
                      </Text>
					  

                      <Text
                        allowFontScaling={false}
                        style={{
                          fontSize: 12,
                          letterSpacing: 0,
                          marginTop: -2,
                          color: "#000",
						   textAlign: 'left',
                        }}
                      >
					  
					  
					{item.tanggal}
					  
					  
                      </Text>
                  </View>
           
		
		

				
			</View>
          );
        }}
      />






		 
			  
			  
        </View>
      </ScrollView>
    );
  }
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
	padding: 10
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold",
  },
});

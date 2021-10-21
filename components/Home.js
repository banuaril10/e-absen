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
} from "react-native";
import * as Location from 'expo-location';
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 0,
      lng: 0,
	  image: "https://absen.idolmartidolaku.com/noimage.png",
	  capture: 0,
	  approved: 0
    };
  }
  
  componentDidMount = async () => {
	  
	  
	  
	  
	  
	  const nik = await AsyncStorage.getItem("nik");
	  const nama_lengkap = await AsyncStorage.getItem("nama_lengkap");
	  const store = await AsyncStorage.getItem("store");
	  this.setState({nik: nik, nama: nama_lengkap, toko: store})
	  
	  this.getLoc(store);
	  
	// const value = await AsyncStorage.getItem("nohp");
    // if (value !== null) {
      // this.props.navigation.navigate("ListStore");
    // }
	  
    // await Facebook.initializeAsync('587269805125650');
    // firebase.auth().onAuthStateChanged((user) => {
      // if (user != null) {
        // console.log(user);
      // }
    // });
    // this.signOutAsync();
    const { state, navigate } = this.props.navigation;
    const { navigation } = this.props;
  };
  
  
  
getLoc = async (store) => {	  
	  let locationSuccess = false;
	  while( !locationSuccess ) {  
		try {
		let { status } = await Location.requestForegroundPermissionsAsync();
		// let { status1 } = await Location.enableNetworkProviderAsync();
		if (status !== 'granted') {
			return;
		}
		let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
		// this.updateState(location);
		console.log(location);
		const geocode = await Location.reverseGeocodeAsync(location.coords);
		
		this.cekLocation(location.coords.latitude, location.coords.longitude, store);
		
		this.setState({lat: location.coords.latitude, lng: location.coords.longitude});
		
		console.log(geocode[0]);
		locationSuccess = true;
		} catch (error) {
		console.log(error);
		}
	}
	  
	  
  }


	cekLocation = (lat, lng, store) => {
        this.setState({ isLoading: true });
		
		
		
		
		
      fetch('https://absen.idolmartidolaku.com/action.php?modul=absen&act=ceklokasi&lat='+lat+'&long='+lng+'&store='+store)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.result == "1") {
            ToastAndroid.show("Location approved", ToastAndroid.SHORT)
			this.setState({approved: 1});
          } else if(responseJson.result == "0"){
			ToastAndroid.show("Lokasi diluar jangkauan", ToastAndroid.SHORT)
			this.setState({approved: 0});
			  
		  } else {
            Alert.alert(
              "Mohon maaf absen tidak berhasil!",
              "Server tidak berjalan..",
              [{ text: "OKE", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
            this.setState({
              loading: false,
            });
          }
        });
		
		this.setState({ isLoading: false });
    
  };


  onPress = () => {
    this.signInAsync();
  };
  
  
   absensi = () => {
	if(this.state.capture == 0){
		ToastAndroid.show("Ambil foto terlebih dahulu", ToastAndroid.SHORT)
		
	}else{
		
		
	this.setState({ error: "", loading: true });
    const { nik, nama, toko } = this.state;
	
	const data = new FormData();
	data.append("nik", nik);
	data.append("nama", nama);
	data.append("toko", toko);
          if (this.state.image != null) {
            data.append("image", {
              uri: this.state.image,
              type: "image/jpeg",
              name: "default.jpg",
            });
          }




      fetch("https://absen.idolmartidolaku.com/action.php?modul=absen&act=masuk", {
        method: "POST",
        body: data, // <-- Post parameters
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.result == "1") {
            ToastAndroid.show(responseJson.msg, ToastAndroid.LONG)
			this.setState({ image: "https://absen.idolmartidolaku.com/noimage.png" });
			this.setState({capture: 0,});
          } else if(responseJson.result == "0"){
			  ToastAndroid.show(responseJson.msg, ToastAndroid.LONG)
		  } else {
            Alert.alert(
              "Mohon maaf absen tidak berhasil!",
              "Server tidak berjalan..",
              [{ text: "OKE", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
            this.setState({
              loading: false,
            });
          }
        });
		
		
		
		
	}
  };
  
  
  
  absensi_pulang = () => {
	if(this.state.capture == 0){
		ToastAndroid.show("Ambil foto terlebih dahulu", ToastAndroid.SHORT)
		
	}else{
		
		
	this.setState({ error: "", loading: true });
    const { nik, nama, toko } = this.state;

const data = new FormData();
	data.append("nik", nik);
	data.append("nama", nama);
	data.append("toko", toko);
          if (this.state.image != null) {
            data.append("image", {
              uri: this.state.image,
              type: "image/jpeg",
              name: "default.jpg",
            });
          }


      fetch("https://absen.idolmartidolaku.com/action.php?modul=absen&act=pulang", {
        method: "POST",
        body: data, // <-- Post parameters 
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.result == "1") {
            ToastAndroid.show(responseJson.msg, ToastAndroid.LONG)
			this.setState({ image: "https://absen.idolmartidolaku.com/noimage.png" });
			this.setState({capture: 0,});
          } else if(responseJson.result == "0"){
			  ToastAndroid.show(responseJson.msg, ToastAndroid.LONG)
		  } else {
            Alert.alert(
              "Mohon maaf absen tidak berhasil!",
              "Server tidak berjalan..",
              [{ text: "OKE", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
            this.setState({
              loading: false,
            });
          }
        });
		
		
		
		
	}
  };

  // onSignUpPress() {
    // this.setState({ error: "", loading: true, halaman: "login" });

    // const { email_regis, password_regis } = this.state;
    // firebase
      // .auth()
      // .createUserWithEmailAndPassword(email_regis, password_regis)
      // .then(() => {
        // this.setState({ error: "", loading: false });
        // this.props.navigation.navigate("gettingData");
      // })
      // .catch(() => {
        // this.setState({ error: "Authentication Failed", loading: false });
      // });
  // }

 takePicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {

      this.setState({ image: result.uri });
	  console.log(result.uri);
	  this.setState({capture: 1})
    }
    //CameraRoll.saveToCameraRoll(this.state.image);
    // this.takePictureAndCreateAlbum();
  };



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
		  padding: 20
        }}
      >
	  

	 
        <View style={styles.container}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          ></StatusBar>
		  

		 <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                 
                }}
              >
			  
			  			 <TouchableOpacity
                style={{
					alignItems: "center",
					backgroundColor: "red",
					padding: 10,
					color: 'white',
					marginTop: 10,
					marginBottom: 10,
					width: '100%',
				
				}}
                onPress={() => this.logout()}
              >
			  
			  
			  <Text style={{
					color: 'white',
					fontWeight: 'bold'
				
				}}>LOGOUT</Text>
              </TouchableOpacity>
			  
			<Text style={{color: 'white', fontSize:12, textTransform:'uppercase'}}>Selamat bekerja, {this.state.nama} ({this.state.nik})</Text>
			<Text style={{color: 'white', fontSize:12, textTransform:'uppercase', marginBottom: 10,}}>{this.state.toko}</Text>
			

			
		</View>


				<Image
                      style={{
                        backgroundColor: "#F0F0F0",
						width: '100%',
						height: 350
                      }}
                      resizeMode="cover"
                      source={{
                        uri: this.state.image,
                      }}
                    ></Image>
					
					
					
					
					
					
					
					
					

			  
			  
			  
			  
			  
			  <View style={{flex: 1,
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',}}>
				<View style={{flex: 1,}}>
				 <TouchableOpacity disabled={this.state.approved == 0 ? true : false}
                style={{
					alignItems: "center",
					backgroundColor: "#889EAF",
					padding: 10,
					color: 'white',
					marginTop: 10,
					width: '100%',
					opacity: this.state.approved == 0 ? 0.5 : 1
				
				}}
                onPress={() => this.takePicture()}
              >
			  
			  
			  <Text style={{
					color: 'white',
					fontWeight: 'bold'
				
				}}>AMBIL FOTO</Text>
              </TouchableOpacity>
				</View>
				<View style={{flex: 1,}}>
				 <TouchableOpacity
                style={{
					alignItems: "center",
					backgroundColor: "#000",
					padding: 10,
					color: 'white',
					marginTop: 10,
					width: '100%',
				
				}}
                onPress={() => this.props.navigation.navigate("List")}
              ><Text style={{
					color: 'white',
					fontWeight: 'bold'
				
				}}>LIST ABSEN</Text>
				
              </TouchableOpacity>
				</View>
				
				<View style={{flex: 1,}}>
				 <TouchableOpacity
                style={{
					alignItems: "center",
					backgroundColor: "#6C4A4A",
					padding: 10,
					color: 'white',
					marginTop: 10,
					width: '100%',
				
				}}
                onPress={() => this.componentDidMount()}
              ><Text style={{
					color: 'white',
					fontWeight: 'bold'
				
				}}>CEK LOKASI</Text>
				
              </TouchableOpacity>
				</View>
				
				
			</View>  
			  
			  
			  
			  
			  
			  
			  
			<View style={{flex: 1,
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',}}>
				<View style={{flex: 1,}}>
				<TouchableOpacity disabled={this.state.approved == 0 ? true : false} 
                style={{
					alignItems: "center",
					backgroundColor: "#e55f2b",
					padding: 10,
					color: 'white',
					marginTop: 5,
					width: '100%',
					opacity: this.state.approved == 0 ? 0.5 : 1
				
				}}
                onPress={() => this.absensi()}
              ><Text style={{
					color: 'white',
					fontWeight: 'bold'
				
				}}> ABSENSI MASUK</Text>
				
              </TouchableOpacity>
				</View>
				<View style={{flex: 1,}}>
				<TouchableOpacity disabled={this.state.approved == 0 ? true : false} 
                style={{
					alignItems: "center",
					backgroundColor: "#3ba927",
					padding: 10,
					color: 'white',
					marginTop: 5,
					width: '100%',
					opacity: this.state.approved == 0 ? 0.5 : 1
				}}
                onPress={() => this.absensi_pulang()}
              ><Text style={{
					color: 'white',
					fontWeight: 'bold'
				
				}}> ABSENSI PULANG</Text>
				
              </TouchableOpacity>
				</View>
			</View>  
			  
			  
			  
			  
			  
			  
			
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
			  
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                 backgroundColor: "white",
				 padding: 10,
				 marginTop: 10,
				 fontWeight: 'bold'
                }}
              >
			  
			  
			   {this.state.approved == 0 ? (
			  
					<Text style={{ color: "red"}}>Lokasi diluar jangkauan</Text>
			  
			   ) : (<Text style={{ color: "green"}}>Lokasi diizinkan</Text>)}
			  
              </View>
			  
			  
			  
			  
			  
			  
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

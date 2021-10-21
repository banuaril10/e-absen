import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  ToastAndroid,
  ImageBackground
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const tinggi = Dimensions.get("window").height;
const lebar = Dimensions.get("window").width;

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      hal: "Welcome",
      username: "123456",
      password: "123456",
      halaman: "login",
    };
  }

  componentDidMount = async () => {
    // const value = await AsyncStorage.getItem("nik");
    // if (value !== null) {
      // this.props.navigation.navigate("Home");
    // }

    // await Facebook.initializeAsync('587269805125650');
  };


  onLoginPress = async () => {
	  
    this.setState({ error: "", loading: true });
    const { username, password } = this.state;

      fetch("https://absen.idolmartidolaku.com/api_login.php", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded", // <-- Specifying the Content-Type
        }),
        body: "username=" + username + "&password=" + password + "", // <-- Post parameters
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.result == "1") {
            this.gotoHome(responseJson);
          } else {
            Alert.alert(
              "NIK/Password kamu salah!",
              "Mohon maaf, sepertinya kamu salah masukin NIK/password, coba diinget lagi deh..",
              [{ text: "OKE", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
            this.setState({
              loading: false,
            });
          }
        });
    // 
  };

  gotoHome = async (responseJson) => {
    console.log(responseJson);
    await AsyncStorage.setItem("nik", responseJson.data.nik);
    await AsyncStorage.setItem("nama_lengkap", responseJson.data.nama_lengkap);
    await AsyncStorage.setItem("store", responseJson.data.store);
    await AsyncStorage.setItem("branch", responseJson.data.branch);
    // await AsyncStorage.setItem("id_user", responseJson.id_user);
    this.props.navigation.navigate("Home");
  };

  render() {
    return (
<ImageBackground
              source={require("../assets/absen.png")}
              style={{flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10}}
            >
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>

              <View style={{paddingHorizontal: 10,}}>
                <Text
                  allowFontScaling={false}
                  style={{
                   
                    fontSize: 14,
                    letterSpacing: 0,
                    letterSpacing: 1,
                    marginTop: 0,
                    textAlign: "left",
					fontWeight: 'bold'
                  }}
                >
                  Nomor Induk Karyawan
                </Text>
                <TextInput
                  allowFontScaling={false}
                  placeholder={"Masukan NIK"}
                  keyboardType={"numeric"}
                  style={{
                    padding: 5,
                    backgroundColor: "white",
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    marginBottom: 10,
                    fontSize: 14,
                    textAlign: "left",
                  }}
                  onChangeText={(text) =>
                    this.setState({
                      username: text,
                    })
                  }
                  value={this.state.username}
                />
                <Text
                  allowFontScaling={false}
                  style={{
                   
                    fontSize: 14,
                    letterSpacing: 0,
                    letterSpacing: 1,
                    marginTop: 10,
                    textAlign: "left",
					fontWeight: 'bold'
                  }}
                >
                  Password
                </Text>
                <TextInput
                  allowFontScaling={false}
                  placeholder={"Masukan Password"}
                  keyboardType={"keyboard"}
                  secureTextEntry={true}
                  style={{
                    padding: 5,
                    backgroundColor: "white",
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    marginBottom: 10,
                    fontSize: 14,
                    textAlign: "left",
					
                  }}
                  onChangeText={(text) =>
                    this.setState({
                      password: text,
                    })
                  }
                  value={this.state.password}
                />

                {this.state.email == "" || this.state.password == "" ? (
                  <View>
                    <View
                      style={{
                        backgroundColor: "orange",
                        paddingVertical: 8,
                        paddingHorizontal: 20,
                        marginTop: 10,
                        minWidth: lebar * 0.7,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        allowFontScaling={false}
                        style={{
                         
                          fontSize: 14,
                          letterSpacing: 0,
                          marginTop: 3,
                          color: "white",
                          letterSpacing: 1,
                        }}
                      >
                        Login
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.onLoginPress();
                      }}
                      style={{
                        marginTop: 0,
                        marginBottom: 5,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "orange",
                          paddingVertical: 8,
                          paddingHorizontal: 20,
                          marginTop: 10,
                          minWidth: lebar * 0.8,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          allowFontScaling={false}
                          style={{
                           
                            fontSize: 14,
                            letterSpacing: 0,
                            marginTop: 3,
                            color: "white",
                            letterSpacing: 1,
                          }}
                        >
                          Login
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}

                <View
                  style={{
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                </View>
              </View>

          </ScrollView>
	 </ImageBackground>
    );
  }
}

export default Login;

import  React, { useState } from 'react';
import { View, StyleSheet, Text, ImageBackground, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import firebaseConfig from '../firebaseConfig'
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import firebase from 'firebase';
import { color } from 'react-native-reanimated';

// firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); // if already initialized, use that one
 }

 const image = { uri: "https://i.pinimg.com/originals/b9/16/73/b91673c3e31d8b688d4b5e28769eba67.png" };

export default function SignupScreen({navigation}) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [facID, setFacID] = useState();

    const createProfile = async(email, password, name, facID) => {
        try {
            const user = await firebase.database().ref(`users/${name.split()[0]}`).set(
                {
                    name: name,
                    email: email,
                    password: password,
                    facID: facID
                }
            )
        } catch (error) {
            console.log(error.toString())
        }
    }

  return (
      <>
      
      
        <Container style={styles.container}>
        <ImageBackground source={image} style={styles.image} >
        {/* <Image
        source={require("../assets/Avatar.png")}
        resizeMode="contain"
        
        style={styles.image1}
      /> */}
        <Text style={styles.title}>SignUp at TrackIT.</Text>
        <Form style={{marginVertical:20,paddingHorizontal:10}}>
            <Item 
                rounded
                style={{backgroundColor: 'rgba(184, 196, 212,0.4)'}}
            >
                
                <Icon name="email" style={{marginLeft: 10}} color='white'/>
                <Input 
                    autoCorrect = {false}
                    autoCapitalize = "none"
                    placeholderTextColor="white"
                    placeholder="Enter email"
                    style={{color: 'white'}}
                    onChangeText = {email => setEmail(email)}
                />
            </Item>

            <Item 
                rounded 
                style={{marginTop: 10, backgroundColor: 'rgba(184, 196, 212,0.4)'}}
            >
                <Icon name="lock" style={{marginLeft: 10}} color='white' />
                <Input 
                    secureTextEntry
                    placeholderTextColor="white"
                    placeholder="Choose a password"
                    style={{color: 'white'}}
                    autoCorrect = {false}
                    autoCapitalize = "none"
                    onChangeText = {pass => setPassword(pass)}
                />
            </Item>

            <Item 
                rounded
                style={{backgroundColor: 'rgba(184, 196, 212,0.4)', marginTop: 10}}
            >
                
                <Icon name="person" style={{marginLeft: 10}} color='white'/>
                <Input 
                    autoCorrect = {false}
                    autoCapitalize = "none"
                    placeholderTextColor="white"
                    placeholder="Enter name"
                    style={{color: 'white'}}
                    onChangeText = {name => setName(name)}
                />
            </Item>

            <Item 
                rounded
                style={{backgroundColor: 'rgba(184, 196, 212,0.4)', marginTop: 10}}
            >
                
                <Icon name="fingerprint" style={{marginLeft: 10}} color='white' />
                <Input 
                    autoCorrect = {false}
                    autoCapitalize = "none"
                    placeholderTextColor="white"
                    placeholder="Enter unique faculty ID"
                    style={{color: 'white'}}
                    onChangeText = {id => setFacID(id)}
                />
            </Item>

            
            <Button 
                full
                success
                style={{marginTop: 40, borderRadius: 20, backgroundColor: '#0F2C52'}}
                onPress = {() => {
                    createProfile(email, password, name, facID);
                    alert("Profile has been created!")
                    navigation.navigate("Login")
                }}
            >
                <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold', color: '#cccccc'}}>Create profile</Text>
            </Button>
            
        </Form>
          </ImageBackground>
    </Container>
    </>
    
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  title: { 
      fontWeight: 'bold',
      fontSize: 60,
      alignSelf: 'center',
      marginTop: 15,
      color: '#FFB81D',
      fontFamily: 'sans-serif-condensed',
      marginLeft: 10,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    
  },  
  image1: {
    flex:2,
    alignSelf: 'center',
    margin: 60,
    
  },
});
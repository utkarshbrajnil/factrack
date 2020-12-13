import  React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text } from 'react-native';
import firebaseConfig from '../firebaseConfig'
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import firebase from 'firebase';

firebase.initializeApp(firebaseConfig);


export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUpUser = (email, password) => {
        try {
            if(password.length < 6) {
                alert("Please enter atleast 6 characters")
                return;
            }

            firebase.auth().createUserWithEmailAndPassword(email, password)

            
        } catch (error) {
            console.log(error.toString())
        }
    }

    const loginUser = (email, password) => {
        try {
            firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
               // console.log(user.stsTokenManager.accessToken);
               navigation.replace("GetLocation");
                
            })
        } catch (error) {
            console.log(error.toString())
        }
    }

  return (
      <>
      
      <Text style = {styles.title}>TeacherTracker</Text>
        <Container style={styles.container}>
        
        <Form>
            <Item floatingLabel>
                <Label>Email</Label>
                <Input 
                    autoCorrect = {false}
                    autoCapitalize = "none"
                    onChangeText = {email => setEmail(email)}
                />
            </Item>

            <Item 
                floatingLabel 
                style={{marginTop: 20}}
            >
                <Label>Password</Label>
                <Input 
                    secureTextEntry
                    autoCorrect = {false}
                    autoCapitalize = "none"
                    onChangeText = {pass => setPassword(pass)}
                />
            </Item>

            <Button 
                full
                success
                style={{marginTop: 40}}
                onPress = {() => loginUser(email, password)}
            >
                <Text style={{color: 'white'}}>Log In</Text>
            </Button>
        </Form>
          
    </Container>
    </>
    
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
  },

  title: { 
      fontWeight: 'bold',
      fontSize: 40,
      alignSelf: 'center',
      marginTop: '20%',
      color: 'green',
      fontFamily: 'sans-serif-condensed'  
  },
});
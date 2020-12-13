import React, {Component, useState} from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';



export default function OptionsPage({navigation}){
    const data = [
        {
          label: 'Teacher'
         },
         {
          label: 'Student'
         }
        ];

    const [choice, setchoice] = useState('')

    const handlepress = () => {
        if(choice=='Teacher')
        {
            navigation.navigate("Login");
            console.log("Teacher");
        }
        else if (choice == 'Student')
        {
            navigation.navigate('Show');
            console.log("Student");
        }
        else
        {
            alert('Select a choice!');
        }
    }



    return(
        <View style={styles.container}>
            <Text style={styles.title}>Are you a teacher or student?</Text>
            <RadioButtonRN style={styles.btn}
        data={data}
        selectedBtn={(e) => 
            // console.log(e.label)
            setchoice(e.label)
        }
      />
      <View style={styles.btn2}>
      <Button 
      title="Next"
      color="#005792"
      onPress={()=> {handlepress()}}
      />
      </View>
      
      </View>
            

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        justifyContent: "center",  
        flex: 1,
        backgroundColor: "rgba(217,250,255,1)"
    },
    title:{
        fontSize: 20,
        fontFamily: "sans-serif-condensed",
        fontWeight: "500",
        padding: 15,
        alignSelf: "center",
    },

    btn:{
        padding: 10,

    },
    btn2:{
        padding: 20,

    },
});
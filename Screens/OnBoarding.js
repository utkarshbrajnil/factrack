import React from 'react'
import { Alert, StatusBar } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import Onboarding from 'react-native-onboarding-swiper';


const OnBoarding = ({ navigation }) => {
    return (
        <Onboarding
    showDone={false}
    onSkip={() => Alert.alert('Skipped')}
    pages={[
      {
        title: 'Hurray, you made it !',
        subtitle: 'Welcome to TrackIt !',
        backgroundColor: '#583d72',
        image: (
          <Icon
            name="hand-peace-o"
            type="font-awesome"
            size={100}
            color="white"
          />
        ),
      },
      {
        title: 'Search for faculties',
        subtitle: 'You can search for faculties by entering their name',
        backgroundColor: '#9f5f80',
        image: (
          <Icon
            name="search"
            type="font-awesome"
            size={100}
            color="white"
          />
        ),
      },
      {
        title: 'Get live location',
        subtitle: 'As soon as you enter the faculty name, you are provided with the live location',
        backgroundColor: '#9f5f80',
        image: (
          <Icon name="map" type="font-awesome" size={100} color="white" />
        ),
      },
      {
        title: "That's Enough",
        subtitle: (
          <Button
            title={'Get Started'}
            containerViewStyle={{ marginTop: 20 }}
            backgroundColor={'white'}
            borderRadius={5}
            textStyle={{ color: '#003c8f' }}
            onPress={() => {
              navigation.navigate("Options")
              StatusBar.setBarStyle('default');
            }}
          />
        ),
        backgroundColor: '#ff8e71',
        image: (
          <Icon name="rocket" type="font-awesome" size={100} color="white" />
        ),
      },
    ]}
  />
    )    
}


export default OnBoarding
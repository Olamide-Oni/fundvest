import React, {useState} from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { Image } from 'expo-image';
import { Colors } from "@/colors";


export default function OnboardingImage() {
  const {height, width} = useWindowDimensions();
  const [size, setSize] = useState(0);
    return (
      <View style={styles.imageContainer} >
        <View style={{position: 'relative',top: '15%',left:'10%'}}>
          <View style={{ width: width/1.25, height: width/1.25, position: 'absolute', backgroundColor: Colors.lightGreen, borderRadius: width/2.5}}>     
          </View>
          <Image source={require('@/assets/images/coinhand.png')} style={{
            width: '60%',height: 300,position: 'absolute',left: '20%', }}/>
        </View>
                    
      </View> 
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: '80%',
        backgroundColor: Colors.cyprus,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginHorizontal: 'auto'
      },
})
import React, { useRef, useState } from 'react';
import { ScrollView, View, Text, Button, Dimensions, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Colors } from "@/colors";
import OnboardingImage from '@/components/OnboardingImage';
import { Link } from 'expo-router';

const {height, width } = Dimensions.get('window'); 

export default function Home() {
  
  
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentPage, setCurrentPage] = useState(0);


  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage < 2) {
      setCurrentPage(nextPage);
      scrollViewRef.current?.scrollTo({
        x: nextPage * width,
        animated: true,
      });
    }
  };

 /*const handlePreviousPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 0) {
      setCurrentPage(prevPage);
      scrollViewRef.current?.scrollTo({
        x: prevPage * width,
        animated: true,
      });
    }
  }; */

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const page = Math.floor(event.nativeEvent.contentOffset.x / width);
          setCurrentPage(page);
        }}
      >
        <View style={[styles.page, {backgroundColor: Colors.fence, paddingTop: '15%'}]}>
          < View style = {{
            display: 'flex',
            width: '100%',
            flex: 1,
            justifyContent: 'space-between'
            }}>
              <Text style={
                styles.onboardingText
              }>Build You Wealth</Text>
              <OnboardingImage />
                   
          </View>         
        </View>
        <View style={[styles.page, {backgroundColor: Colors.fence, paddingTop: '15%'}]}>
          < View style = {{
            display: 'flex',
            width: '100%',
            flex: 1,
            justifyContent: 'space-between'
            }}>
              <Text style={
                styles.onboardingText
              }>Are you ready to take control of your finances?</Text>
              <OnboardingImage />
                   
          </View>         
        </View>
      </ScrollView>

      <View style={styles.buttons}>
          {/*<Button
          title="Previous"
          onPress={handlePreviousPage}
          disabled={currentPage === 0}
        /> */}
        { currentPage === 1 ? <Link href="/home"> Home
          </Link> :  <Button
          title="Next"
          onPress={handleNextPage}
          disabled={currentPage === 2}
        /> }
       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
  },
  page: {
    width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    /*flexDirection: 'row',
    justifyContent: 'center',*/
    padding: 20,
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -50 }],
    bottom: '10%',
  },
  onboardingText: {
    lineHeight: 39,
    fontWeight: 'semibold',
    fontSize: 30,
    color: Colors.lightGreen,
    textAlign: 'center'
  },
 
  
});
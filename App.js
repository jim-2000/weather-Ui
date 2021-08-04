/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 *
 */

import React, { useRef } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Animated,
  TouchableOpacity
} from 'react-native'; 
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
// data & svg images 
import Locations  from './model/Location';
import SunIcon from './assets/sun.svg';
import NightIcon from './assets/moon.svg';
import CloudIcon from './assets/cloudy.svg';
import RainIcon from './assets/rain.svg';
import MenuIcon from './assets/menu.svg';
import SearchIcon from './assets/search.svg';
//
import { getStatusBarHeight } from 'react-native-status-bar-height';

//
const WeatherIcon = (weatherType)=>{
  if (weatherType === 'Night') {
    return <NightIcon width={34} height={34} fill="#fff" />
  }else if(weatherType === 'Cloudy'){
    return <CloudIcon width={34} height={34} fill="#fff" />
  }else if(weatherType === 'Sunny'){
    return <SunIcon width={34} height={34} fill="#fff" />
  }else if(weatherType === 'Rainy'){
    return <RainIcon width={34} height={34} fill="#fff" />
  }
  return null;
}



///
const App  = () => {
  const {width: windowWidth,height:windowHeight} = useWindowDimensions()
  const scrollX = useRef(new Animated.Value(0)).current;


  //
  return (
<>
    <ScrollView
    horizontal={true}
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    onScroll={Animated.event([
      {
        nativeEvent:{
          contentOffset:{
            x:scrollX,
          }
        }
      }
    ]
     ,{useNativeDriver:false}
    )}
      scrollEventThrottle={1}
    >
      <StatusBar barStyle="light-content" />
      {
        Locations.map((location,index)=>{
   
          if (location.weatherType === 'Night') {
            bgImg = require('./assets/night2.jpg')
          }else if(location.weatherType === 'Cloudy'){
             bgImg = require('./assets/cloudy.jpeg')
          }else if(location.weatherType === 'Sunny'){
             bgImg = require('./assets/sunny.jpg')
          }else if(location.weatherType === 'Rainy'){
             bgImg = require('./assets/rainy.jpg')
          }
          return(
             <View 
             style={{width:windowWidth,height:windowHeight}} 
             key={index}>
              <ImageBackground source={bgImg} 
                 style={{flex:1}}
                >
                 <View 
                 style={{
                   flex:1,
                   backgroundColor:'rgba(0,0,0,0.3)',
                   padding:20,
                   
                   }}>
                   <View style={styles.topInfocontainer}>
                      <View>
                      <Text style={styles.city}>{location.city}</Text>
                      <Text style={styles.time}>{location.dateTime}</Text>
                      </View>
                      <View>
                        <Text style={styles.temparature}>{location.temparature}</Text>
                       <View style={{flexDirection:'row'}}>
                         {WeatherIcon(location.weatherType)}
                         <Text style={styles.weatherType}>{location.weatherType}</Text>
                       </View>
                      </View>
                   </View>
     
                   <View style={{
                     borderBottomColor:'rgba(255,255,255,0.7)',
                     marginTop:20,
                     borderBottomWidth:1,
                   }} />
                   {/* bottom data  */}
                   <View style={styles.BottomInfocontainer}>
                      <View style={{alignItems:'center'}} >
                        <Text style={styles.wind} >Wind</Text>
                        <Text  style={[styles.wind,{fontSize:24}]} >{location.wind}</Text>
                        <Text  style={styles.wind}>Km/h</Text>
                        <View style={styles.infobar}>
                          <View 
                          style={{width:location.wind/2,height:5,backgroundColor:'#69f0ae'}}
                          />
                        </View>
                      </View>
                      <View style={{alignItems:'center'}} >
                        <Text style={styles.wind} >Rain</Text>
                        <Text  style={[styles.wind,{fontSize:24}]} >{location.rain}</Text>
                        <Text  style={styles.wind}>%</Text>
                        <View style={styles.infobar}>
                          <View 
                          style={{width:location.rain/2,height:5,backgroundColor:'#f44336'}}
                          />
                        </View>
                      </View>
                      <View style={{alignItems:'center'}} >
                        <Text style={styles.wind} >Humidity</Text>
                        <Text  style={[styles.wind,{fontSize:24}]} >{location.humidity}</Text>
                        <Text  style={styles.wind}>%</Text>
                        <View style={styles.infobar}>
                          <View 
                          style={{width:location.humidity/2,height:5,backgroundColor:'#f44336'}}
                          />
                        </View>
                      </View>
                   </View>
                 </View>
                </ImageBackground>
              </View>
          )

        })
      }      
    </ScrollView>

    <View style={styles.appHeader}>
      <TouchableOpacity>
        <SearchIcon width={24} height={24} fill="#fff" />
      </TouchableOpacity>
      <TouchableOpacity>
        <MenuIcon width={24} height={24} fill="#fff" />
      </TouchableOpacity>
    </View>

    <View style={styles.indicatorContainer}>
      {Locations.map((location,index)=>{
        const width = scrollX.interpolate(
          {
            inputRange:[
              windowWidth*(index-1),
              windowWidth*index,
              windowWidth*(index+1),
            ],
            outputRange:[
              5,12,5
            ],
            extrapolate:'clamp'
          }
        )
        return(
          <Animated.View
          key={index}
          style={[styles.indicator,{width}]}
          />
        )
      })}
    </View>
</>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  appHeader:{
    position:'absolute',
    top:0,
    width:'100%',
    height:getStatusBarHeight()+40,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-end',
    paddingHorizontal:20
  },
  topInfocontainer:{
    flex:1,
    marginTop:160,
    // backgroundColor:'gray',
    justifyContent:'space-between'

  },
  city:{
    color:'#fff',
    fontSize:30,
    fontFamily:'Lato-Regular',
    fontWeight:'bold'
  },
  time:{
    color:'#fff',
    fontFamily:'Lato-Regular',
    fontWeight:'bold'
  },
  temparature:{
    color:'#fff',
    fontFamily:'Lato-Light',
    fontSize:85
  },
  weatherType:{
    color:'#fff',
    fontFamily:'Lato-Light',
    fontWeight:'bold',
    fontSize:25,
    lineHeight:34,
    marginLeft:20
  },
  BottomInfocontainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:20
  },
  wind:{fontSize:14,color:'#fff',fontFamily:'Lato-Regular',fontWeight:'bold'},
  infobar:{
    width:45,
    height:5,
    backgroundColor:'rgba(255,255,255,0.5)'
  },
  indicatorContainer:{
    position:'absolute',
    top:140,
    left:20,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  indicator:{
    height:5,
    width:5,
    borderRadius:4,
    marginHorizontal:4,
    backgroundColor:'#fff'
  }
  
});

export default App;

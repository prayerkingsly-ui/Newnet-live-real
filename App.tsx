import { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function ForYouScreen() {
  const [isLive, setIsLive] = useState(false);
  const [wallet, setWallet] = useState(39500);
  const [aisha, setAisha] = useState(45000);
  const [blessing, setBlessing] = useState(32000);

  if (!isLive) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0a0a0a', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>NewNET Live - REAL</Text>
        <Text style={{ color: 'gold', marginTop: 10 }}>Wallet: N{wallets}</Text>
        <TouchableOpacity onPress={() => setIsLive(true)} style={{ backgroundColor: 'red', padding: 20, borderRadius: 50, marginTop: 30, width: '80%', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>TAP TO ACTIVATE REAL LIVE</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Image source={{ uri: 'https://i.pravatar.cc/500?img=5' }} style={{ width: '100%', height: '100%', position: 'absolute' }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, paddingTop: 50, position: 'absolute', top: 0, width: '100%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'gold', padding: 8, borderRadius: 20 }}><Text style={{ fontWeight: 'bold', fontSize: 11 }}>Aisha {Math.floor(aisha/1000)}K LEADING</Text></View>
          <Text style={{ color: 'white', marginHorizontal: 10, fontWeight: 'bold' }}>VS</Text>
          <View style={{ backgroundColor: 'white', padding: 8, borderRadius: 20 }}><Text style={{ fontWeight: 'bold', fontSize: 11 }}>Blessing {Math.floor(blessing/1000)}K</Text></View>
        </View>
        <TouchableOpacity onPress={() => setIsLive(false)}><Text style={{ color: 'white', fontSize: 20 }}>X</Text></TouchableOpacity>
      </View>
      <View style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.85)', padding: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <View style={{ backgroundColor: '#222', padding: 8, borderRadius: 20 }}><Text style={{ color: 'white' }}>Wallet: N{wallet.toLocaleString()}</Text></View>
          <TouchableOpacity onPress={() => setWallet(wallet + 5000)} style={{ backgroundColor: '#222', borderWidth: 1, borderColor: 'gold', padding: 8, borderRadius: 20 }}><Text style={{ color: 'gold' }}>+ Top Up N5k</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal>
          <TouchableOpacity onPress={() => { setWallet(wallet-100); setAisha(aisha+100); }} style={{ backgroundColor: '#333', padding: 12, borderRadius: 20, marginRight: 8 }}><Text style={{ color: 'white' }}>Rose N100</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { setWallet(wallet-500); setAisha(aisha+500); }} style={{ backgroundColor: '#333', padding: 12, borderRadius: 20, marginRight: 8 }}><Text style={{ color: 'white' }}>Star N500</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { if(wallet>=5000){ setWallet(wallet-5000); setAisha(aisha+5000); }}} style={{ backgroundColor: 'gold', padding: 12, borderRadius: 20, marginRight: 8 }}><Text style={{ color: 'black', fontWeight: 'bold' }}>Lion N5000</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => { if(wallet>=2000){ setWallet(wallet-2000); }}} style={{ backgroundColor: '#00d2a0', padding: 12, borderRadius: 20 }}><Text style={{ color: 'black', fontWeight: 'bold' }}>Money Rain N2000</Text></TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

function FollowingScreen(){ return <View style={{ flex: 1, backgroundColor: '#0a0a0a', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>Following FREE</Text></View>; }
function MoviesScreen(){ return <View style={{ flex: 1, backgroundColor: '#0a0a0a', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>Movies N500/30d</Text></View>; }
function GoLiveScreen(){ return <View style={{ flex: 1, backgroundColor: '#0a0a0a', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>Go Live N3000 Once</Text></View>; }
function ProfileScreen(){ return <View style={{ flex: 1, backgroundColor: '#0a0a0a', justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'white' }}>Profile Wallet N39,500</Text></View>; }

export default function App(){
  return(
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: 'black', height: 60 }, tabBarActiveTintColor: '#00d2a0', headerShown: false }}>
        <Tab.Screen name="ForYou" component={ForYouScreen} options={{ tabBarLabel: 'NewNET Live', tabBarIcon: () => <Text>🏠</Text> }} />
        <Tab.Screen name="Following" component={FollowingScreen} options={{ tabBarLabel: 'Following', tabBarIcon: () => <Text>👥</Text> }} />
        <Tab.Screen name="GoLive" component={GoLiveScreen} options={{ tabBarLabel: 'Go Live', tabBarIcon: () => <Text>➕</Text> }} />
        <Tab.Screen name="Movies" component={MoviesScreen} options={{ tabBarLabel: 'Movies', tabBarIcon: () => <Text>🎬</Text> }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile', tabBarIcon: () => <Text>👤</Text> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

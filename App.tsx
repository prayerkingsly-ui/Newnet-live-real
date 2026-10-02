import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, StatusBar } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [wallet, setWallet] = useState(39500);
  const [gifts, setGifts] = useState([
    { user: 'You', time: '19:46', name: 'Rose', price: 100 },
    { user: 'You', time: '19:48', name: 'Money Rain', price: 2000 },
    { user: 'You', time: '09:06', name: 'Money Rain', price: 2000 },
    { user: 'You', time: '13:16', name: 'Money Rain', price: 2000 },
  ]);

  useEffect(() => {
    (async () => {
      const s = await AsyncStorage.getItem('wallet');
      if(s) setWallet(parseInt(s));
      if(!permission?.granted) await requestPermission();
    })();
  }, [permission]);

  if(!permission?.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.white}>We need camera permission for REAL LIVE</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.btn}><Text style={styles.btnTxt}>ALLOW CAMERA</Text></TouchableOpacity>
      </View>
    );
  }

  const sendGift = async (n:string,p:number) => {
    if(wallet<p) return;
    const nw=wallet-p;
    setWallet(nw);
    await AsyncStorage.setItem('wallet', String(nw));
    setGifts(g=>[...g,{user:'You', time:new Date().toLocaleTimeString().slice(0,5), name:n, price:p}]);
  };

  return (
    <View style={styles.full}>
      <StatusBar hidden />
      {/* REAL CAMERA - YOUR REAL FACE */}
      <CameraView style={styles.camera} facing="front" />

      {/* YOUR SCREENSHOT UI ON TOP */}
      <View style={styles.overlay}>
        {/* Top Bar like screenshot */}
        <View style={styles.topBar}>
          <View style={styles.profileRow}>
            <View style={styles.avatar}><Text>A</Text></View>
            <View>
              <Text style={styles.name}>Aisha • NewNET LIVE</Text>
              <Text style={styles.viewers}>12.4K viewers</Text>
            </View>
          </View>
          <View style={styles.topActions}>
            <View style={styles.followBtn}><Text style={styles.small}>+ Follow</Text></View>
            <View style={styles.realCam}><Text style={styles.small}>● Real Camera</Text></View>
          </View>
        </View>

        <View style={styles.vsRow}>
          <View style={styles.leading}><Text style={styles.leadTxt}>Aisha 45K 🔥 LEADING</Text></View>
          <Text style={styles.vs}>VS</Text>
          <View style={styles.blessing}><Text>Blessing 32K</Text></View>
        </View>

        {/* Gifts like screenshot */}
        <View style={styles.middle}>
          <ScrollView style={styles.giftList}>
            {gifts.map((g,i)=>(
              <View key={i} style={styles.giftItem}>
                <View style={styles.yCircle}><Text style={styles.y}>Y</Text></View>
                <Text style={styles.giftTxt}><Text style={styles.you}>You</Text> {g.time} 🎁 {g.name} ₦{g.price.toLocaleString()}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.rightBar}>
            <TouchableOpacity style={styles.rBtn}><Text style={styles.rEmoji}>❤️</Text><Text style={styles.rTxt}>253K</Text></TouchableOpacity>
            <TouchableOpacity style={styles.rBtn}><Text style={styles.rEmoji}>💬</Text><Text style={styles.rTxt}>12K</Text></TouchableOpacity>
            <TouchableOpacity style={styles.rBtn}><Text style={styles.rEmoji}>🎁</Text><Text style={styles.rTxt}>Gift</Text></TouchableOpacity>
            <TouchableOpacity style={styles.rBtn}><Text style={styles.rEmoji}>↗️</Text><Text style={styles.rTxt}>8.4K</Text></TouchableOpacity>
          </View>
        </View>

        {/* Bottom like screenshot */}
        <View style={styles.bottom}>
          <View style={styles.commentRow}>
            <TextInput placeholder="Send a comment or emoji..." placeholderTextColor="#aaa" style={styles.commentInput} />
            <View style={styles.moneyBtn}><Text>💸</Text></View>
          </View>

          <View style={styles.walletRow}>
            <View style={styles.wallet}><Text style={styles.whiteSmall}>🪙 Wallet: ₦{wallet.toLocaleString()}</Text></View>
            <TouchableOpacity onPress={async()=>{const nw=wallet+5000; setWallet(nw); await AsyncStorage.setItem('wallet',String(nw))}} style={styles.topUp}><Text style={styles.yellow}>+ Top Up ₦5k</Text></TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.giftPills}>
            <TouchableOpacity onPress={()=>sendGift('Rose',100)} style={styles.pill}><Text>🌹 N100</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>sendGift('Star',500)} style={styles.pill}><Text>⭐ N500</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>sendGift('Lion',5000)} style={[styles.pill, styles.pillGold]}><Text>🦁 N5000</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>sendGift('Money Rain',2000)} style={[styles.pill, styles.pillGreen]}><Text>💸 Money Rain ₦2000</Text></TouchableOpacity>
          </ScrollView>

          <View style={styles.reactions}>
            <View style={styles.heartCount}><Text style={styles.whiteSmall}>❤️ 25.4K</Text></View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  full:{flex:1,backgroundColor:'#000'},
  camera:{flex:1, position:'absolute', top:0, left:0, right:0, bottom:0},
  overlay:{flex:1, justifyContent:'space-between', paddingTop:40},
  center:{flex:1, backgroundColor:'#000', justifyContent:'center', alignItems:'center', padding:20},
  white:{color:'#fff', fontSize:16, marginBottom:20, textAlign:'center'},
  btn:{backgroundColor:'#00ff88', padding:15, borderRadius:10},
  btnTxt:{fontWeight:'bold'},
  topBar:{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:12, alignItems:'center'},
  profileRow:{flexDirection:'row', alignItems:'center', gap:8},
  avatar:{width:36, height:36, backgroundColor:'#fff', borderRadius:18, justifyContent:'center', alignItems:'center'},
  name:{color:'#fff', fontWeight:'bold', fontSize:13},
  viewers:{color:'#fff', fontSize:11},
  topActions:{flexDirection:'row', gap:6},
  followBtn:{backgroundColor:'#00d8a0', paddingHorizontal:10, paddingVertical:6, borderRadius:6},
  realCam:{backgroundColor:'#ff2d55', paddingHorizontal:10, paddingVertical:6, borderRadius:6},
  small:{color:'#fff', fontSize:10, fontWeight:'bold'},
  vsRow:{flexDirection:'row', alignItems:'center', paddingHorizontal:12, marginTop:8, gap:8},
  leading:{backgroundColor:'#FFD700', paddingHorizontal:12, paddingVertical:4, borderRadius:12},
  leadTxt:{fontWeight:'bold', fontSize:11},
  vs:{color:'#fff', fontWeight:'bold'},
  blessing:{backgroundColor:'#fff', paddingHorizontal:12, paddingVertical:4, borderRadius:12},
  middle:{flex:1, flexDirection:'row', alignItems:'flex-end', paddingHorizontal:10},
  giftList:{flex:1, maxHeight:200, marginBottom:120},
  giftItem:{flexDirection:'row', backgroundColor:'rgba(0,0,0,0.6)', padding:8, borderRadius:20, marginBottom:6, alignItems:'center', alignSelf:'flex-start'},
  yCircle:{width:24, height:24, backgroundColor:'#333', borderRadius:12, justifyContent:'center', alignItems:'center', marginRight:6},
  y:{color:'#fff', fontSize:10},
  giftTxt:{color:'#fff', fontSize:13},
  you:{color:'#00ff88', fontWeight:'bold'},
  rightBar:{width:60, alignItems:'center', gap:18, marginBottom:120},
  rBtn:{alignItems:'center'},
  rEmoji:{fontSize:26},
  rTxt:{color:'#fff', fontSize:10, marginTop:2},
  bottom:{backgroundColor:'rgba(0,0,0,0.5)', padding:10, gap:8},
  commentRow:{flexDirection:'row', gap:8, alignItems:'center'},
  commentInput:{flex:1, backgroundColor:'rgba(50,50,50,0.8)', borderRadius:20, paddingHorizontal:14, paddingVertical:8, color:'#fff'},
  moneyBtn:{width:36, height:36, backgroundColor:'#FFD700', borderRadius:18, justifyContent:'center', alignItems:'center'},
  walletRow:{flexDirection:'row', justifyContent:'space-between'},
  wallet:{backgroundColor:'rgba(0,0,0,0.7)', paddingHorizontal:10, paddingVertical:6, borderRadius:15, borderWidth:1, borderColor:'#333'},
  whiteSmall:{color:'#fff', fontSize:12, fontWeight:'bold'},
  topUp:{backgroundColor:'rgba(0,0,0,0.7)', paddingHorizontal:10, paddingVertical:6, borderRadius:15, borderWidth:1, borderColor:'#FFD700'},
  yellow:{color:'#FFD700', fontSize:12, fontWeight:'bold'},
  giftPills:{flexDirection:'row'},
  pill:{backgroundColor:'#333', paddingHorizontal:14, paddingVertical:8, borderRadius:20, marginRight:6},
  pillGold:{backgroundColor:'#FFD700'},
  pillGreen:{backgroundColor:'#00d8a0'},
  reactions:{flexDirection:'row'},
  heartCount:{backgroundColor:'#ff2d55', paddingHorizontal:12, paddingVertical:6, borderRadius:15},
});

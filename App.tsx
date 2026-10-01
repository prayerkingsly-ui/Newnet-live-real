
 import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, StatusBar, Dimensions } from 'react-native';
import AgoraUIKit from 'agora-rn-uikit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [wallet, setWallet] = useState(39500);
  const [gifts, setGifts] = useState([
    { user: 'You', time: '09:06', name: 'Money Rain', price: 2000 },
    { user: 'You', time: '13:16', name: 'Money Rain', price: 2000 },
  ]);
  const [videoCall, setVideoCall] = useState(true);

  const connectionData = {
    appId: '95fd8370cdbe433cb0ca66de2f39987e',
    channel: 'battle1',
    token: '007eJxTYHjsaDdjp2ei04b0JZPec9itejQz6s4XPaX2VT9fPj9ziG2VAoOlaV5kqK7mFvbGlqY5qvaivVkNgYwML9oTGBihEMRnZ0hKLCnJSTVkYAAAhaQjiQ==',
  };

  useEffect(() => { loadWallet(); }, []);
  const loadWallet = async () => {
    const s = await AsyncStorage.getItem('wallet');
    if (s) setWallet(parseInt(s));
  };
  const sendGift = async (name:string, price:number) => {
    if (wallet < price) return;
    const nw = wallet - price;
    setWallet(nw);
    await AsyncStorage.setItem('wallet', String(nw));
    const now = new Date().toLocaleTimeString().slice(0,5);
    setGifts(p=>[...p, {user:'You', time:now, name, price}]);
  };
  const topUp = async () => {
    const nw = wallet + 5000;
    setWallet(nw);
    await AsyncStorage.setItem('wallet', String(nw));
  };

  return (
    <View style={styles.full}>
      <StatusBar hidden translucent backgroundColor="transparent" />
      
      {/* FULL SCREEN CAMERA - NO BORDER */}
      <View style={styles.cameraFull}>
        {videoCall && (
          <AgoraUIKit 
            connectionData={connectionData} 
            rtcCallbacks={{ EndCall: () => setVideoCall(false) }}
            styleProps={{ 
              localBtnStyles: { backgroundColor: 'transparent' },
              UIKitContainer: { height: height, width: width },
              maxViewStyles: { height: height, width: width },
            }}
          />
        )}
      </View>

      {/* OVERLAY - FLOATING */}
      <View style={styles.overlayFull}>
        <ScrollView style={styles.giftFloat} showsVerticalScrollIndicator={false}>
          {gifts.map((g,i)=>(
            <View key={i} style={styles.giftBubble}>
              <Text style={styles.giftText}>Y  {g.user} {g.time} 🎁 {g.name} ₦{g.price.toLocaleString()}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.rightFloat}>
          <TouchableOpacity style={styles.iconBtn}><Text style={styles.bigEmoji}>❤️</Text></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Text style={styles.bigEmoji}>💬</Text></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Text style={styles.bigEmoji}>🎁</Text><Text style={styles.label}>Gift</Text></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Text style={styles.bigEmoji}>↗️</Text><Text style={styles.label}>8.4K</Text></TouchableOpacity>
        </View>

        <View style={styles.bottomFull}>
          <TextInput placeholder="Send a comment or emoji..." placeholderTextColor="#ccc" style={styles.commentInput} />
          
          <View style={styles.walletRow}>
            <View style={styles.walletPill}><Text style={styles.walletTxt}>🪙 Wallet: ₦{wallet.toLocaleString()}</Text></View>
            <TouchableOpacity onPress={topUp} style={styles.topUpPill}><Text style={styles.topUpTxt}>+ Top Up ₦5k</Text></TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={()=>sendGift('Rose',100)} style={styles.pill}><Text>🌹 N100</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>sendGift('Star',500)} style={styles.pill}><Text>⭐ N500</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>sendGift('Lion',5000)} style={[styles.pill, styles.gold]}><Text>🦁 N5000</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>sendGift('Money Rain',2000)} style={[styles.pill, styles.green]}><Text>💸 Money Rain N2000</Text></TouchableOpacity>
          </ScrollView>

          <View style={styles.reactionRow}>
            <View style={styles.heartPill}><Text style={{color:'#fff', fontWeight:'bold'}}>❤️ 25.3K</Text></View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  full: { flex: 1, backgroundColor: '#000', width: width, height: height },
  cameraFull: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: width, height: height, backgroundColor: '#000' },
  overlayFull: { flex: 1, width: width, height: height, justifyContent: 'flex-end' },
  giftFloat: { position: 'absolute', bottom: 220, left: 10, right: 70, maxHeight: 200 },
  giftBubble: { backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginBottom: 6, alignSelf: 'flex-start' },
  giftText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  rightFloat: { position: 'absolute', right: 10, bottom: 220, gap: 18, alignItems: 'center' },
  iconBtn: { alignItems: 'center' },
  bigEmoji: { fontSize: 30 },
  label: { color: '#fff', fontSize: 11, marginTop: 2 },
  bottomFull: { backgroundColor: 'rgba(0,0,0,0.4)', padding: 12, paddingBottom: 30 },
  commentInput: { backgroundColor: 'rgba(50,50,50,0.8)', borderRadius: 25, paddingHorizontal: 18, paddingVertical: 10, color: '#fff', marginBottom: 12 },
  walletRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  walletPill: { backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#555' },
  walletTxt: { color: '#fff', fontWeight: 'bold' },
  topUpPill: { backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#FFD700' },
  topUpTxt: { color: '#FFD700', fontWeight: 'bold' },
  pill: { backgroundColor: '#333', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  gold: { backgroundColor: '#FFD700' },
  green: { backgroundColor: '#00ff88' },
  reactionRow: { flexDirection: 'row', marginTop: 10 },
  heartPill: { backgroundColor: '#ff2d55', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
});         

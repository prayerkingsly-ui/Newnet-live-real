import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, StatusBar, Image } from 'react-native';
import AgoraUIKit from 'agora-rn-uikit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [wallet, setWallet] = useState(0);
  const [myScore, setMyScore] = useState(45000);
  const [oppScore, setOppScore] = useState(32000);
  const [timeLeft, setTimeLeft] = useState(300);
  const [gifts, setGiftLog] = useState([
    { user: 'You', time: '19:46', name: 'Rose', price: 100 },
    { user: 'You', time: '19:48', name: 'Money Rain', price: 2000 },
  ]);
  const [videoCall, setVideoCall] = useState(true);

  // REAL AGORA - YOUR TOKEN
  const connectionData = {
    appId: '95fd8370cdbe433cb0ca66de2f39987e',
    channel: 'battle1',
    token: '007eJxTYHjsaDdjp2ei04b0JZPec9itejQz6s4XPaX2VT9fPj9ziG2VAoOlaVqKhbG5QXJKUqJsXFykkFyoplZSqpRmrGlpY5qvaivVkNgYwML9oTGBihEMRnZ0hKLCnJSTVkYAAAhaQjiQ==',
  };

  const rtcCallbacks = { EndCall: () => setVideoCall(false) };

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(s => s > 0 ? s - 1 : 0), 1000);
    loadWallet();
    return () => clearInterval(t);
  }, []);

  const loadWallet = async () => {
    const saved = await AsyncStorage.getItem('wallet');
    if (saved) setWallet(parseInt(saved));
    else { setWallet(39500); AsyncStorage.setItem('wallet', '39500'); }
  };

  const sendRealGift = async (name: string, price: number, points: number) => {
    if (wallet < price) { alert('Low wallet! Top up'); return; }
    const newWallet = wallet - price;
    setWallet(newWallet);
    await AsyncStorage.setItem('wallet', String(newWallet));
    setMyScore(s => s + points);
    const now = new Date().toLocaleTimeString().slice(0,5);
    setGiftLog(prev => [...prev, { user: 'You', time: now, name, price }]);
  };

  const topUp = async () => {
    const newWallet = wallet + 5000;
    setWallet(newWallet);
    await AsyncStorage.setItem('wallet', String(newWallet));
  };

  const formatTime = (s: number) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* REAL CAMERA LAYER */}
      <View style={styles.cameraLayer}>
        {videoCall ? (
          <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} styleProps={{}} />
        ) : (
          <View style={styles.noCam}><Text style={{color:'#fff'}}>Battle Ended</Text></View>
        )}
      </View>

      {/* REAL UI OVERLAY - LIKE YOUR SCREENSHOT */}
      <View style={styles.overlay}>
        {/* TOP */}
        <View style={styles.topRow}>
          <View style={styles.profile}>
            <Text style={styles.avatar}>A</Text>
            <View><Text style={styles.name}>Aisha • NewNET LIVE</Text><Text style={styles.viewers}>12.4K viewers</Text></View>
          </View>
          <TouchableOpacity style={styles.follow}><Text style={{color:'#fff'}}>+ Follow</Text></TouchableOpacity>
          <View style={styles.camBadge}><Text style={styles.camText}>📷 Real Camera</Text></View>
        </View>

        <View style={styles.battleBar}>
          <View style={styles.leadingTag}><Text style={styles.leadingText}>Aisha 45K 🔥 LEADING</Text></View>
          <Text style={styles.vs}>VS</Text>
          <View style={styles.oppTag}><Text style={{color:'#000', fontWeight:'bold'}}>Blessing 32K</Text></View>
        </View>

        {/* RIGHT ACTIONS */}
        <View style={styles.rightActions}>
          <TouchableOpacity style={styles.actionBtn}><Text style={styles.emoji}>❤️</Text><Text style={styles.count}>268K</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}><Text style={styles.emoji}>💬</Text><Text style={styles.count}>12K</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}><Text style={styles.emoji}>🎁</Text><Text style={styles.count}>Gift</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}><Text style={styles.emoji}>🔗</Text><Text style={styles.count}>8.4K</Text></TouchableOpacity>
        </View>

        {/* GIFT LOG - REAL */}
        <ScrollView style={styles.giftLog}>
          {gifts.map((g,i) => (
            <View key={i} style={styles.giftItem}>
              <Text style={styles.giftUser}>{g.user} {g.time} 🎁 {g.name} ₦{g.price.toLocaleString()}</Text>
            </View>
          ))}
        </ScrollView>

        {/* BOTTOM */}
        <View style={styles.bottom}>
          <View style={styles.walletRow}>
            <View style={styles.walletBox}><Text style={styles.wallet}>🪙 Wallet: ₦{wallet.toLocaleString()}</Text></View>
            <TouchableOpacity onPress={topUp} style={styles.topUp}><Text style={{color:'#FFD700', fontWeight:'bold'}}>+ Top Up ₦5k</Text></TouchableOpacity>
          </View>

          <View style={styles.giftButtons}>
            <TouchableOpacity onPress={() => sendRealGift('Rose', 100, 500)} style={styles.gBtn}><Text>🌹 N100</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => sendRealGift('Star', 500, 3000)} style={styles.gBtn}><Text>⭐ N500</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => sendRealGift('Crown', 5000, 40000)} style={[styles.gBtn, {backgroundColor:'#FFD700'}]}><Text>🦁 N5000</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => sendRealGift('Money Rain', 2000, 15000)} style={[styles.gBtn, {backgroundColor:'#00ff88'}]}><Text>💸 Money Rain</Text></TouchableOpacity>
          </View>

          <View style={styles.commentBar}>
            <TextInput placeholder="Send a comment or emoji..." placeholderTextColor="#888" style={styles.input} />
            <View style={styles.reactBar}>
              <Text style={styles.react}>❤️ 25.1K</Text>
              <Text style={styles.react}>🔥</Text>
              <Text style={styles.react}>👋</Text>
              <Text style={styles.react}>⭐</Text>
            </View>
          </View>

          <Text style={styles.timer}>{formatTime(timeLeft)} BATTLE • {myScore > oppScore ? 'YOU LEADING 🔥' : 'LOSING'}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  cameraLayer: { ...StyleSheet.absoluteFillObject },
  noCam: { flex: 1, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' },
  overlay: { flex: 1, paddingTop: 40 },
  topRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, gap: 10 },
  profile: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFD700', textAlign: 'center', lineHeight: 40, fontWeight: 'bold' },
  name: { color: '#fff', fontWeight: 'bold', fontSize: 12, marginLeft: 5 },
  viewers: { color: '#aaa', fontSize: 11, marginLeft: 5 },
  follow: { backgroundColor: '#00cc88', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  camBadge: { backgroundColor: 'red', padding: 5, borderRadius: 5 },
  camText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  battleBar: { flexDirection: 'row', alignItems: 'center', marginTop: 10, paddingHorizontal: 10, gap: 10 },
  leadingTag: { backgroundColor: '#FFD700', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 15 },
  leadingText: { fontWeight: 'bold', fontSize: 11 },
  vs: { color: '#fff', fontWeight: 'bold' },
  oppTag: { backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 15 },
  rightActions: { position: 'absolute', right: 10, top: 180, gap: 20 },
  actionBtn: { alignItems: 'center' },
  emoji: { fontSize: 28 },
  count: { color: '#fff', fontSize: 11, marginTop: 2 },
  giftLog: { position: 'absolute', bottom: 200, left: 10, right: 80, maxHeight: 150 },
  giftItem: { backgroundColor: 'rgba(0,0,0,0.6)', padding: 8, borderRadius: 20, marginBottom: 5, flexDirection: 'row' },
  giftUser: { color: '#fff', fontSize: 12 },
  bottom: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.8)', padding: 10 },
  walletRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  walletBox: { backgroundColor: '#222', padding: 6, borderRadius: 20, borderWidth: 1, borderColor: '#444' },
  wallet: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  topUp: { backgroundColor: '#222', padding: 6, borderRadius: 20, borderWidth: 1, borderColor: '#FFD700' },
  giftButtons: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  gBtn: { backgroundColor: '#333', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  commentBar: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  input: { flex: 1, backgroundColor: '#222', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 8, color: '#fff' },
  reactBar: { flexDirection: 'row', gap: 8, backgroundColor: '#222', padding: 5, borderRadius: 20 },
  react: { color: '#fff', fontSize: 12 },
  timer: { color: '#FFD700', textAlign: 'center', marginTop: 5, fontWeight: 'bold', fontSize: 11 }
});

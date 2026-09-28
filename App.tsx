import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, StatusBar } from 'react-native';

export default function App() {
  const [wallet, setWallet] = useState(39500);
  const [myScore, setMyScore] = useState(45000);
  const [oppScore, setOppScore] = useState(28000);
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins
  const [isLeading, setIsLeading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => t > 0 ? t - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const gifts = [
    { name: '🌹 Rose', price: 100, points: 500 },
    { name: '🎁 Gift Box', price: 500, points: 3000 },
    { name: '💎 Diamond', price: 2000, points: 15000 },
    { name: '👑 Crown', price: 5000, points: 40000 },
  ];

  const sendGift = (price: number, points: number) => {
    if (wallet < price) {
      Alert.alert('Low Wallet', 'Please fund wallet. N39,500 low!');
      return;
    }
    setWallet(wallet - price);
    setMyScore(myScore + points);
    setIsLeading((myScore + points) > oppScore);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.liveBadge}><Text style={styles.liveText}>● LIVE</Text><Text style={styles.viewer}> 1.2K</Text></View>
        <View style={styles.timerBox}><Text style={styles.timer}>{formatTime(timeLeft)}</Text><Text style={styles.battleText}> BATTLE</Text></View>
        <View style={styles.walletBox}><Text style={styles.wallet}>₦{wallet.toLocaleString()}</Text></View>
      </View>

      {/* BATTLE STAGE - 2 Screens */}
      <View style={styles.stage}>
        <View style={styles.videoBox}>
          <Text style={styles.avatar}>👩🏽‍🦱 Aisha</Text>
          <Text style={styles.name}>Aisha • 12.4K fans</Text>
          <View style={[styles.scoreBar, {backgroundColor: isLeading ? '#00ff88' : '#555'}]}><Text style={styles.scoreText}>{myScore.toLocaleString()}</Text></View>
          {isLeading && <Text style={styles.leading}>LEADING 🔥</Text>}
        </View>
        <View style={styles.vsCircle}><Text style={styles.vs}>VS</Text></View>
        <View style={styles.videoBox}>
          <Text style={styles.avatar}>💃 Blessing</Text>
          <Text style={styles.name}>Blessing • 9.1K fans</Text>
          <View style={styles.scoreBarOpp}><Text style={styles.scoreText}>{oppScore.toLocaleString()}</Text></View>
        </View>
      </View>

      {/* CHAT */}
      <ScrollView style={styles.chat}>
        <Text style={styles.chatText}><Text style={styles.chatUser}>Tunde:</Text> Aisha you go win! 🔥</Text>
        <Text style={styles.chatText}><Text style={styles.chatUser}>Chiamaka:</Text> Money Rain soon! 💸</Text>
        <Text style={styles.chatText}><Text style={styles.chatUser}>System:</Text> Go Live costs ₦3000 once. Wallet: ₦{wallet}</Text>
      </ScrollView>

      {/* GIFTS - REAL MONEY */}
      <View style={styles.giftRow}>
        {gifts.map(g => (
          <TouchableOpacity key={g.name} style={styles.giftBtn} onPress={() => sendGift(g.price, g.points)}>
            <Text style={styles.giftName}>{g.name}</Text>
            <Text style={styles.giftPrice}>₦{g.price}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.goLiveBtn} onPress={() => Alert.alert('Go Live', 'Pay ₦3000 once to go live. Real camera will open after payment. Built for Naija!')}>
          <Text style={styles.goLiveText}>🎥 GO LIVE ₦3000</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.moneyRainBtn} onPress={() => { if(wallet>=2000){ setWallet(wallet-2000); Alert.alert('Money Rain!','₦2000 rained to viewers!'); } else Alert.alert('Low funds'); }}>
          <Text style={styles.moneyRainText}>💸 Money Rain ₦2000</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>NewNET Live - Real Camera • Real Gifts • Wallet ₦{wallet.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', paddingTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, alignItems: 'center' },
  liveBadge: { flexDirection: 'row', backgroundColor: '#ff0055', padding: 6, borderRadius: 20, paddingHorizontal: 12 },
  liveText: { color: '#fff', fontWeight: 'bold', fontSize: 12 }, viewer: { color: '#fff', fontSize: 12 },
  timerBox: { flexDirection: 'row', backgroundColor: '#222', padding: 6, borderRadius: 10 }, timer: { color: '#ffcc00', fontWeight: 'bold' }, battleText: { color: '#fff' },
  walletBox: { backgroundColor: '#00ff88', padding: 6, borderRadius: 10, paddingHorizontal: 10 }, wallet: { color: '#000', fontWeight: 'bold' },
  stage: { flexDirection: 'row', height: 380, backgroundColor: '#151515', margin: 8, borderRadius: 16, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  videoBox: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }, avatar: { fontSize: 50 }, name: { color: '#fff', marginTop: 8, fontWeight: 'bold' },
  scoreBar: { marginTop: 10, padding: 6, borderRadius: 20, width: '90%', alignItems: 'center' }, scoreBarOpp: { marginTop: 10, backgroundColor: '#444', padding: 6, borderRadius: 20, width: '90%', alignItems: 'center' },
  scoreText: { color: '#fff', fontWeight: 'bold' }, leading: { color: '#00ff88', marginTop: 6, fontWeight: 'bold', fontSize: 12 },
  vsCircle: { width: 40, height: 40, backgroundColor: '#ff0055', borderRadius: 20, alignItems: 'center', justifyContent: 'center', zIndex: 10 }, vs: { color: '#fff', fontWeight: 'bold' },
  chat: { flex: 1, padding: 12, maxHeight: 120 }, chatText: { color: '#ddd', marginVertical: 2 }, chatUser: { color: '#00ff88', fontWeight: 'bold' },
  giftRow: { flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: '#1a1a1a' },
  giftBtn: { backgroundColor: '#252525', padding: 10, borderRadius: 12, alignItems: 'center', width: 80, borderWidth: 1, borderColor: '#333' }, giftName: { color: '#fff', fontSize: 12, fontWeight: 'bold' }, giftPrice: { color: '#ffcc00', fontSize: 11, marginTop: 4 },
  bottomActions: { flexDirection: 'row', padding: 10, gap: 10 }, goLiveBtn: { flex: 1, backgroundColor: '#ff0055', padding: 14, borderRadius: 12, alignItems: 'center' }, goLiveText: { color: '#fff', fontWeight: 'bold' },
  moneyRainBtn: { flex: 1, backgroundColor: '#00ff88', padding: 14, borderRadius: 12, alignItems: 'center' }, moneyRainText: { color: '#000', fontWeight: 'bold' },
  footer: { color: '#666', textAlign: 'center', fontSize: 10, padding: 8 }
});

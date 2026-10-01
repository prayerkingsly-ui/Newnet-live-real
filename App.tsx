import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, StatusBar } from 'react-native';
import AgoraUIKit from 'agora-rn-uikit';

export default function App() {
  const [wallet, setWallet] = useState(39500);
  const [myScore, setMyScore] = useState(45000);
  const [oppScore, setOppScore] = useState(28000);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isLeading, setIsLeading] = useState(true);
  const [videoCall, setVideoCall] = useState(true);

  const connectionData = {
    appId: '95fd8370cdbe433cb0ca66de2f39987e',
    channel: 'battle1',
    token: '007eJxTYHjsaDdjp2ei04b0JZPec9itejQz6s4XPaX2VT9fPj9ziG2VAoOlaVqKhbG5QXJKUqqJsXFykkFyoplZSqpRmrGlpY5qvaivVkNgYwML9oTGBihEMRnZ0hKLCnJSTVkYAAAhaQjiQ==',
    uid: 0,
  };

  const rtcCallbacks = {
    EndCall: () => setVideoCall(false),
  };

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, []);

  const gifts = [
    { name: '🌹 Rose', price: 100, points: 500 },
    { name: '🎁 Gift', price: 500, points: 3000 },
    { name: '💎 Diamond', price: 2000, points: 15000 },
    { name: '👑 Crown', price: 5000, points: 40000 },
  ];

  const sendGift = (price: number, points: number) => {
    if (wallet < price) {
      Alert.alert('Low Wallet', 'Fund wallet!');
      return;
    }
    setWallet(w => w - price);
    setMyScore(s => {
      const newScore = s + points;
      setIsLeading(newScore > oppScore);
      return newScore;
    });
  };

  const formatTime = (s: number) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* REAL LIVE VIDEO */}
      <View style={styles.videoContainer}>
        {videoCall ? (
          <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
        ) : (
          <View style={styles.ended}><Text style={styles.endedText}>Battle Ended</Text></View>
        )}
        
        {/* OVERLAY UI - Wallet, Timer, Scores */}
        <View style={styles.overlayTop}>
          <View style={styles.liveBadge}><Text style={styles.liveText}>● LIVE 1.2K</Text></View>
          <View style={styles.timerBox}><Text style={styles.timer}>{formatTime(timeLeft)} BATTLE</Text></View>
          <View style={styles.walletBox}><Text style={styles.wallet}>₦{wallet.toLocaleString()}</Text></View>
        </View>

        <View style={styles.overlayBottom}>
          <View style={styles.scoreRow}>
            <View style={[styles.scoreBar, {backgroundColor: isLeading ? '#00ff88' : '#555'}]}>
              <Text style={styles.scoreText}>Aisha: {myScore.toLocaleString()} {isLeading ? '🔥' : ''}</Text>
            </View>
            <Text style={styles.vs}>VS</Text>
            <View style={styles.scoreBarOpp}>
              <Text style={styles.scoreText}>Blessing: {oppScore.toLocaleString()}</Text>
            </View>
          </View>
          
          <View style={styles.giftRow}>
            {gifts.map((g,i) => (
              <TouchableOpacity key={i} style={styles.giftBtn} onPress={() => sendGift(g.price, g.points)}>
                <Text style={styles.giftText}>{g.name}</Text>
                <Text style={styles.giftPrice}>₦{g.price}</Text>
              </TouchableOpacity>

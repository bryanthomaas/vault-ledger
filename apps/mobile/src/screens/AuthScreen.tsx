import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useStore } from '../store/useStore';
import { colors } from '../theme/colors';
import { GlassPanel } from '../components/GlassPanel';
import Animated, { FadeInDown } from 'react-native-reanimated';

export const AuthScreen = () => {
  const setAuthenticated = useStore((state) => state.setAuthenticated);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsSupported(compatible);
      
      // Auto trigger if supported
      if (compatible) {
        handleBiometricAuth();
      }
    })();
  }, []);

  const handleBiometricAuth = async () => {
    try {
      const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
      if (!savedBiometrics) {
        return Alert.alert('Biometric record not found', 'Please verify your identity with your password');
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Unlock Vault Ledger',
        fallbackLabel: 'Use Passcode',
        disableDeviceFallback: false,
      });

      if (result.success) {
        setAuthenticated(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInDown.duration(1000).springify()} style={styles.content}>
        <GlassPanel style={styles.panel}>
          <Text style={styles.title}>Vault Ledger</Text>
          <Text style={styles.subtitle}>Secure Personal Finance</Text>
          
          <TouchableOpacity style={styles.button} onPress={handleBiometricAuth}>
            <Text style={styles.buttonText}>Unlock Vault</Text>
          </TouchableOpacity>
        </GlassPanel>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
  },
  panel: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 40,
  },
  button: {
    backgroundColor: colors.accent,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});

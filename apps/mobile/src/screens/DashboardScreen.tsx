import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
import { useStore } from '../store/useStore';
import { GlassPanel } from '../components/GlassPanel';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { AssetChart } from '../components/AssetChart';
import Animated, { FadeIn } from 'react-native-reanimated';

export const DashboardScreen = () => {
  const user = useStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Animated.View entering={FadeIn.duration(800)}>
        <Text style={styles.greeting}>
          Welcome back, {user?.firstName || 'Bryan Thomas'}
        </Text>
        <Text style={styles.subtitle}>Here is your financial overview.</Text>

        {isLoading ? (
          <GlassPanel style={styles.card}>
            <SkeletonLoader width={150} height={20} style={{ marginBottom: 16 }} />
            <SkeletonLoader width={200} height={40} style={{ marginBottom: 8 }} />
            <SkeletonLoader width="100%" height={200} borderRadius={16} />
          </GlassPanel>
        ) : (
          <GlassPanel style={styles.card}>
            <Text style={styles.cardTitle}>Total Net Worth</Text>
            <Text style={styles.balance}>$142,500.00</Text>
            <AssetChart />
          </GlassPanel>
        )}
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    marginBottom: 32,
  },
  card: {
    padding: 24,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  balance: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 24,
  },
  chartPlaceholder: {
    height: 200,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

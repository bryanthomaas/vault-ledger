import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Canvas, Path, LinearGradient, vec } from '@shopify/react-native-skia';
import { colors } from '../theme/colors';

const mockData = [
  { x: 0, y: 10000 },
  { x: 1, y: 12000 },
  { x: 2, y: 11500 },
  { x: 3, y: 14000 },
  { x: 4, y: 13500 },
  { x: 5, y: 18000 },
];

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 40 - 48; // padding logic
const CHART_HEIGHT = 200;

export const AssetChart = () => {
  // A smooth bezier curve mimicking the mockData for the portfolio flex
  const path = `M 0 150 C ${CHART_WIDTH * 0.2} 150, ${CHART_WIDTH * 0.2} 100, ${CHART_WIDTH * 0.4} 110 S ${CHART_WIDTH * 0.6} 50, ${CHART_WIDTH * 0.8} 60 S ${CHART_WIDTH} 10, ${CHART_WIDTH} 20`;
  
  return (
    <View style={styles.container}>
      <Canvas style={{ width: CHART_WIDTH, height: CHART_HEIGHT }}>
        <Path
          path={path}
          color={colors.accent}
          style="stroke"
          strokeWidth={4}
          strokeCap="round"
        />
        {/* Gradient fill under the line */}
        <Path path={`${path} L ${CHART_WIDTH} ${CHART_HEIGHT} L 0 ${CHART_HEIGHT} Z`}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(0, CHART_HEIGHT)}
            colors={[`${colors.accent}80`, 'transparent']}
          />
        </Path>
      </Canvas>
      {/* Tooltip gesture layer will go here using react-native-gesture-handler and Reanimated */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: CHART_HEIGHT,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

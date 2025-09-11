import React, { useRef } from 'react';
import { View, Animated, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';

// Usage: <CustomScrollbar><ScrollView>...</ScrollView></CustomScrollbar>
const CustomScrollbar = ({ children, style, ...props }) => {
  const { theme } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = React.useState(1);
  const [containerHeight, setContainerHeight] = React.useState(1);

  // Calculate thumb size and position
  const thumbHeight = containerHeight / contentHeight * containerHeight;
  const thumbTranslateY = Animated.multiply(scrollY, containerHeight / contentHeight);

  return (
    <View style={[styles.container, style]}>
      <Animated.ScrollView
        {...props}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={(_, h) => setContentHeight(h)}
        onLayout={e => setContainerHeight(e.nativeEvent.layout.height)}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
      >
        {children}
      </Animated.ScrollView>
      {/* Custom scrollbar */}
      {contentHeight > containerHeight && (
        <View style={styles.scrollbarTrack}>
          <Animated.View
            style={[
              styles.scrollbarThumb,
              {
                height: thumbHeight,
                transform: [{ translateY: thumbTranslateY }],
                backgroundColor: theme.primaryDark,
              },
            ]}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollbarTrack: {
    position: 'absolute',
    right: 2,
    top: 2,
    bottom: 2,
    width: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 10,
  },
  scrollbarThumb: {
    width: 10,
    borderRadius: 10,
    backgroundColor: '#063a7a', // fallback
    opacity: 0.85,
  },
});

export default CustomScrollbar;

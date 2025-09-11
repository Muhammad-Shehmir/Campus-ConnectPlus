import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useTheme } from "../context/ThemeContext";
import Background3D from "../components/Background3D";
import { SidebarLayout, useScreenSize } from "../components/ResponsiveLayout";
import SearchFilterBar from "../components/SearchFilterBar";
import EventList from "../components/EventList";
import AIRecommendations from "../components/AIRecommendations";
import CustomScrollbar from "../components/CustomScrollbar";

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { isMobile } = useScreenSize();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  // AI Recommendations Sidebar Content
  const sidebarContent = (
      <CustomScrollbar style={styles.sidebar}>
        <AIRecommendations navigation={navigation} isSidebar={!isMobile} />
      </CustomScrollbar>
  );

  // Main Events Content
  const mainContent = (
    <View style={styles.mainContent}>
      <SearchFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <EventList
        navigation={navigation}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        sortBy={sortBy}
        // On mobile, AI recommendations are shown in the mobile sidebar
        headerContent={isMobile ? null : null}
      />
    </View>
  );

  return (
    <Background3D variant="vibrant">
      <SafeAreaView style={styles.container}>
        <SidebarLayout
          sidebar={sidebarContent}
          content={mainContent}
          sidebarWidth={450}
          position="left"
        />
      </SafeAreaView>
    </Background3D>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sidebar: {
    flex: 1,
    // Sidebar styling handled by SidebarLayout
  },
  mainContent: {
    flex: 1,
  },
});

export default HomeScreen;

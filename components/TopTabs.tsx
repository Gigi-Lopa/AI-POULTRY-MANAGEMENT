import styles from '@/styles/main';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TopTabsProps {
  tabs: string[];
  onTabChange: (tab: string) => void;
}

const TopTabs: React.FC<TopTabsProps> = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <View style = {[styles.flexRow,styles.tabsContainer]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => {
            setActiveTab(tab);
            onTabChange(tab);
          }}
          style={[
            activeTab === tab && styles.activeTab,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText,
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TopTabs;

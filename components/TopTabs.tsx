import styles from '@/styles/main';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

interface TopTabsProps {
  tabs: string[];
  onTabChange: (tab: string) => void;
}

const TopTabs: React.FC<TopTabsProps> = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal style = {[styles.flexRow,]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => {
            setActiveTab(tab);
            onTabChange(tab);
          }}
          style={[
            {
              marginRight : 15
            },
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
    </ScrollView>
  );
};

export default TopTabs;

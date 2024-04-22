import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import PostItem from './PostItem';

const LatestItemsList = ({ products, heading }) => {
  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">Latest Items</Text>
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item, index }) => <PostItem item={item} />}
      />
    </View>
  );
};

export default LatestItemsList
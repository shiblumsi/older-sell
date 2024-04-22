import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'


const Slider = ({ sliders }) => {
  return (
    <View className="mt-5">
      <FlatList
        data={sliders}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <Image
              source={{ uri: item?.image }}
              className="h-[150px] w-[290px] mr-3 rounded-lg object-content"
            />
          </View>
        )}
      />
    </View>
  );
};

export default Slider
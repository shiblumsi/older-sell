import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Categories = ({ categoryList }) => {
  const navigation = useNavigation();
  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]"> Categories</Text>
      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
          onPress={()=>navigation.navigate('item-list',{
            category:item.name
          })}
          className="flex-1 items-center justify-center border-[1px] border-blue-200 p-2 m-1 rounded-lg h-[70px] bg-blue-50">
            <Image source={{ uri: item.icon }} className="w-[35px] h-[35px]" />
            <Text className="text-[10px] mt-1 ">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Categories
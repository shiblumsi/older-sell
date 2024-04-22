import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const PostItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      
      className="flex-1 m-2 p-2 rounded-lg border-[1px] border-slate-200 bg-gray-100"
      onPress={()=>navigation.push('product-detail',
    {product:item}
    )}
    >
      <Image
        source={{ uri: item.image }}
        className="w-full h-[120px] rounded-lg"
      />
      <View>
        <Text className="text-[15px] font-bold mt-2">{item.title}</Text>
        <Text className="text-[20px] font-bold text-blue-500">
          $ {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PostItem
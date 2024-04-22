import { View, Text, Image, TextInput, ActivityIndicator } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Ionicons from '@expo/vector-icons/Ionicons';

const Header = () => {
    const { user } = useUser();
  return (
    <View>
      <View className="flex flex-row item-center gap-2">
        <Image
          source={{ uri: user?.imageUrl }}
          className="rounded-full w-12 h-12"
        />
        <View>
          <Text className="text-[16px]">Welcome</Text>
          <Text className="text-[20px] font-bold">{user?.fullName}</Text>
        </View>
      </View>
      <View className="p-[8px] px-5 flex flex-row item-center bg-blue-50 mt-5 rounded-full border-[1px] border-blue-200 ">
        <Ionicons name="search" size={24} color="gray" />
        <TextInput placeholder="Search" className="ml-2 text-[16px]" />
      </View>
    </View>
  );
}

export default Header
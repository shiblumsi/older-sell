import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'

const ProductDetails = () => {
    const { params } = useRoute();
    const [singleProduct, setSingleProduct] = useState();
    useEffect(()=>{
      params && setSingleProduct(params.product);

    },[params])
  return (
    <View>
      <Image
        source={{ uri: singleProduct?.image }}
        className="w-full h-[320px]"
      />
      <View className="p-3">
        <Text className="text-[24px] font-bold">{singleProduct?.title}</Text>
        <View className="items-baseline flex flex-row justify-start  items-center gap-3  ">
          <Text className="bg-blue-200 text-blue-500 p-1 px-2 rounded-full">
            {singleProduct?.category}
          </Text>
          <Text className="bg-blue-200 text-blue-500 p-1 px-2 rounded-full">
            {singleProduct?.address}
          </Text>
        </View>

        <Text className="mt-3 font-bold text-[17px] ">Description</Text>
        <Text className="text-[14px] h-20 ">{singleProduct?.desc}</Text>
      </View>
      <Text className="pl-3 text-[17px] font-bold">Seller Info</Text>
      <View className=" ml-3 m-3 p-3 flex flex-row border-[1px] border-gray-400 bg-blue-100 rounded-[5px]">
        <Image
          source={{ uri: singleProduct?.userImage }}
          className="h-10 w-10 rounded-full"
        />
        <View className="pl-3">
          <Text className="font-bold text-[16px]">
            {singleProduct?.userName}
          </Text>
          <Text className="text-[13px]">{singleProduct?.userEmail}</Text>
        </View>
      </View>
    </View>
  );
}

export default ProductDetails
import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { app } from '../../firebaseConfig'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import LatestItemsList from '../components/home/LatestItemsList'

const ItemList = () => {
    const {params} = useRoute()
    const db=getFirestore(app)
    const [itemList,setItemList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        params && getItemsByCategory();
    },[params])

    const getItemsByCategory = async()=>{
        setItemList([])
        setLoading(true)
        const q=query(collection(db,"UserPost"),where('category','==',params.category))
        const snapshot = await getDocs(q)
        setLoading(false)
        snapshot.forEach(doc=>{
            setItemList((itemList)=>[...itemList,doc.data()])
            setLoading(false)
        })
    }
  return (
    <View className="p-2">
      {
      
      loading?<ActivityIndicator size={'large'} color={'blue'} /> :
      
      itemList.length > 0 ? (
        <LatestItemsList products={itemList} heading={"Latest Posts"} />
      ) : (
        <Text className="p-5 mt-24 text-[20px] justify-center text-center text-red-300">No Post Found</Text>
      )}
    </View>
  );
}

export default ItemList
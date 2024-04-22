import { View, Text, ScrollView, VirtualizedList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/home/Header'
import Slider from '../components/home/Slider'
import Categories from '../components/home/Categories'

import { collection, getDocs, getFirestore, orderBy } from "firebase/firestore";
import { app } from '../../firebaseConfig'
import LatestItemsList from '../components/home/LatestItemsList'



const HomeScreen = () => {


    const db = getFirestore(app);

    const [sliders, setSliders] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [products, setProducts] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(() => {
      getSliders();
      getCategory();
      getProducts();
    }, []);


    const getSliders = async () => {
      setSliders([]);
      const querySnapshot = await getDocs(collection(db, "Slider"));
      querySnapshot.forEach((doc) => {
        setSliders((sliders) => [...sliders, doc.data()]);
      });
    };


    const getCategory = async () => {
      setCategoryList([]);
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, "Category"));
      querySnapshot.forEach((doc) => {
        setCategoryList((categoryList) => [...categoryList, doc.data()]);
        setLoading(false)
      });
    };


    const getProducts = async () => {
      setProducts([]);
      setLoading(true);
      const querySnapshot = await getDocs(
        collection(db, "UserPost"),
        orderBy("createdAt", "desc")
      );
      querySnapshot.forEach((doc) => {
        setProducts((products) => [...products, doc.data()]);
      });
      setLoading(false);
    };

  return (
    <ScrollView>
      <View className="py-8 flex-1 bg-white px-6">
        <Header />
        <Slider sliders={sliders} />
        {loading ? (
          <ActivityIndicator size={"large"} color={"blue"} />
        ) : (
          <Categories categoryList={categoryList} />
        )}
        {loading ? (
          <ActivityIndicator size={"large"} color={"blue"} />
        ) : (
          <LatestItemsList products={products} heading={"Latest Items"} />
        )}
      </View>
    </ScrollView>
  );
}

export default HomeScreen
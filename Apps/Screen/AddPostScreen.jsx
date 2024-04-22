import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Image, ToastAndroid, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  addDoc,
  collection,
  getDocs,
  getFirestore
} from "firebase/firestore";
import {app} from '../../firebaseConfig'
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo';


const AddPostScreen = () => {

  const db = getFirestore(app);

  const [categoryList, setCategoryList] = useState([])
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState()
  const storage = getStorage();

  const {user} = useUser()

  useEffect(()=>{
    getCategory()
  },[])

  const getCategory =async ()=>{
    setCategoryList([])
    const querySnapshot = await getDocs(collection(db,'Category'))
    querySnapshot.forEach((doc)=>{
      setCategoryList((categoryList)=>[...categoryList,doc.data()])
    })
  }

const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};

const onSubmitMethod = async value=>{
  setLoading(true)
  const resp = await fetch(image);
  const blob = await resp.blob();
  const storageRef = ref(storage, "communityPost/"+Date.now()+"jpg");
  uploadBytes(storageRef, blob).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  }).then((resp)=>{
    getDownloadURL(storageRef).then(async(downloadUrl)=>{
      console.log(downloadUrl);
      value.image=downloadUrl;
      value.userName=user.fullName;
      value.userEmail = user.primaryEmailAddress.emailAddress;
      value.userImage=user.imageUrl
      const docRef = await addDoc(collection(db,"UserPost"),value)
      if(docRef.id){
        setLoading(false)
        Alert.alert('Post Added')
      }
    })
  })
}

  return (
    <KeyboardAvoidingView>
      <ScrollView className="p-10">
        <Text className="text-[20px] font-bold">Add New Post</Text>
        <Text className="text-[12px] text-gray-500 mb-7">
          Create New Post and Start Selling.
        </Text>
        <Formik
          initialValues={{
            title: "",
            desc: "",
            category: "",
            address: "",
            price: "",
            image: "",
            userName: "",
            userEmail: "",
            userImage: "",
            createdAt:Date.now()
          }}
          onSubmit={(value) => onSubmitMethod(value)}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              console.log("Title not Present");
              ToastAndroid.show("Title must be there", ToastAndroid.SHORT);
              errors.name = "Title must be there";
            }
            return errors;
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
          }) => (
            <View>
              <TouchableOpacity onPress={pickImage}>
                {image ? (
                  <Image
                    style={{ width: 100, height: 100, borderRadius: 15 }}
                    source={{ uri: image }}
                  />
                ) : (
                  <Image
                    source={require("./../../assets/images/login.jpg")}
                    style={{ width: 100, height: 100, borderRadius: 15 }}
                  />
                )}
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Title"
                value={values?.title}
                onChangeText={handleChange("title")}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                numberOfLines={3}
                value={values?.desc}
                onChangeText={handleChange("desc")}
              />
              <TextInput
                style={styles.input}
                placeholder="Price"
                value={values?.price}
                keyboardType="number-pad"
                onChangeText={handleChange("price")}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={values?.address}
                onChangeText={handleChange("address")}
              />
              <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 15 }}>
                <Picker
                  className="border-2"
                  selectedValue={values?.category}
                  onValueChange={(itemValue) =>
                    setFieldValue("category", itemValue)
                  }
                >
                  {categoryList &&
                    categoryList.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item.name}
                        value={item.name}
                      />
                    ))}
                </Picker>
              </View>
              {/* <Button className="mt-7" title="submit" onPress={HandleSubmit} /> */}
              <TouchableOpacity
                onPress={handleSubmit}
                style={{ backgroundColor: loading ? "#ccc" : "#007BFF" }}
                disabled={loading}
                className="bg-blue-500 rounded-full p-4  mt-10"
              >
                {loading ? (
                  <ActivityIndicator color="#fff"  />
                ) : (
                  <Text className="text-white text-center text-[15px]">
                    Submit
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default AddPostScreen

const styles = StyleSheet.create({
  input:{
    borderWidth:1,
    borderRadius:10,
    padding:10,
    paddingHorizontal:17,
    fontSize:17,
    marginTop:10,
    marginBottom:5,
    paddingTop:15,
  }
})
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
      try {
        const { createdSessionId, signIn, signUp, setActive } =
          await startOAuthFlow();

        if (createdSessionId) {
          setActive({ session: createdSessionId });
        } else {
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
    }, []);


  return (
    <>
      <View>
        <Image
          source={require("./../../assets/images/login.jpg")}
          className="w-full h-[400px]"
        />
      </View>
      <View className="p-8 bg-white mt-[-20px] rounded-t-3xl shadow-md">
        <Text className="text-[20px] font-bold text-center ">
          Community Marketplace
        </Text>
        <Text className="text-[15px] text-center text-slate-500 mt-6">
          Buy Sell Marketplace where you can Sell old item and make real money.
        </Text>
        <TouchableOpacity
          onPress={onPress}
          className="mt-20 p-4 bg-blue-500 rounded-full"
        >
          <Text className="text-white text-center text-[15px]">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default LoginScreen
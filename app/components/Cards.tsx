import icons from "@/constants/icons";
import images from "@/constants/images";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const FeaturedCard = () => {
  return (
    <TouchableOpacity className="relative w-60 h-80">
      <Image source={images.japan} className="size-full rounded-2xl" />
      <Image
        source={images.cardGradient}
        className="absolute size-full rounded-2xl"
      />
      <View className="absolute right-5 top-5 bg-white/90 flex-row items-center rounded-full py-1.5 px-3">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-1">
          4.4
        </Text>
      </View>
      <View className="absolute bottom-5 inset-x-5">
        <Text className="text-white text-xl font-rubik-bold" numberOfLines={1}>
          Modern Apartment
        </Text>
        <Text className="text-base text-white font-rubik">
          22 W 15th St, New York
        </Text>
        <View className="flex-row items-center justify-between w-full">
          <Text className="text-xl text-white font-rubik-extrabold">
            $1,200
          </Text>
          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Card = () => {
  return (
    <TouchableOpacity className="relative w-52 h-72 p-4 bg-white rounded-lg shadow-lg shadow-black-100/70">
      <Image source={images.newYork} className="w-full h-40 rounded-xl" />
      <View className="mt-3 w-full">
        <Text className="text-lg font-rubik-bold">Cozy Studio</Text>
        <Text className="text-sm text-black-200 font-rubik">
          22 W 15th St, New York
        </Text>
        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-xl font-rubik-bold text-black-300">$1,200</Text>
          <Image source={icons.heart} className="w-5 h-5" tintColor="#191D31" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

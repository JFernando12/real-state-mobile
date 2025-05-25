import images from "@/constants/images";
import React from "react";
import { Image, ImagePropsBase, Text, View } from "react-native";

const NoResults = () => {
  return (
    <View className="flex-1 items-center justify-center mt-5">
      <Image source={images.noResult as ImagePropsBase} className="size-60" />
      <Text className="font-rubik-semibold">No result were found</Text>
    </View>
  );
};

export default NoResults;

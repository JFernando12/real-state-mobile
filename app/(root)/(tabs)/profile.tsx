import { settings } from "@/constants/data";
import icons from "@/constants/icons";
import images from "@/constants/images";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SettingItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between py-3"
  >
    <View className="flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const handleLogout = async () => {};
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>
        <View className="flex-row justify-center">
          <View className="flex-col items-center">
            <View className="relative">
              <Image source={images.avatar} className="size-44 rounded-full" />
              <TouchableOpacity className="absolute bottom-2 right-2">
                <Image source={icons.edit} className="size-9" />
              </TouchableOpacity>
            </View>
            <Text className="text-2xl font-rubik-bold mt-2">
              Jose Fernando | Backend
            </Text>
          </View>
        </View>
        <View className="flex-col mt-10">
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>
        <View>
          {settings.map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

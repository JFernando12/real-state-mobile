import { settings } from "@/constants/data";
import icons from "@/constants/icons";
import { logout } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import React from 'react';
import {
  Alert,
  Image,
  ImagePropsBase,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SettingItemProps {
  icon: ImagePropsBase;
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
    {showArrow && (
      <Image source={icons.rightArrow as ImagePropsBase} className="size-5" />
    )}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch } = useGlobalContext();
  const handleLogout = async () => {
    const result = await logout();
    if (!result) {
      Alert.alert('Failed', 'Logout failed');
      return;
    }
    Alert.alert('Success', 'Logout successful');
    refetch();
  };
  return (
    <SafeAreaView className="h-full bg-white -pb-safe-offset-20">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell as ImagePropsBase} className="size-5" />
        </View>
        <View className="flex-row justify-center">
          <View className="flex-col items-center">
            <View className="relative">
              <Image
                source={{ uri: user?.avatar }}
                className="size-44 rounded-full"
              />
              <TouchableOpacity className="absolute bottom-2 right-2">
                <Image
                  source={icons.edit as ImagePropsBase}
                  className="size-9"
                />
              </TouchableOpacity>
            </View>
            <Text className="text-xl text-center font-rubik-bold mt-2">
              {user?.name}
            </Text>
          </View>
        </View>
        <View className="flex-col mt-10">
          <SettingsItem
            icon={icons.calendar as ImagePropsBase}
            title="My Bookings"
          />
          <SettingsItem
            icon={icons.wallet as ImagePropsBase}
            title="Payments"
          />
        </View>
        <View className="flex-col mt-5 border-t border-primary-200">
          {settings.map((item, index) => (
            <SettingsItem
              key={index}
              title={typeof item.title === 'string' ? item.title : ''}
              icon={item.icon}
            />
          ))}
        </View>
        <View className="flex-col mt-5 border-t border-primary-200">
          <SettingsItem
            icon={icons.logout as ImagePropsBase}
            title="Logout"
            onPress={handleLogout}
            showArrow={false}
            textStyle="text-danger"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

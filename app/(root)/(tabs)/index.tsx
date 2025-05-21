import Search from '@/app/components/Search';
import icons from '@/constants/icons';
import images from '@/constants/images';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Image source={images.avatar} className="size-12 rounded-full" />
            <View className="flex-col ml-2 justify-center">
              <Text className="text-xs font-rubik text-black-100">
                Good Morning
              </Text>
              <Text className="text-base font-rubik-medium text-black-300">
                Fernando
              </Text>
            </View>
          </View>
          <Image source={icons.bell} className="size-7" />
        </View>
        <Search />
      </View>
    </SafeAreaView>
  );
}

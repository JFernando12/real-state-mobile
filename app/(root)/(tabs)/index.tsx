import { Card, FeaturedCard } from "@/app/components/Cards";
import Search from "@/app/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 0 }}
      >
        <View className="px-5">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Image
                source={images.avatar as ImageSourcePropType}
                className="size-12 rounded-full"
              />
              <View className="flex-col ml-2 justify-center">
                <Text className="text-xs font-rubik text-black-100">
                  Good Morning
                </Text>
                <Text className="text-base font-rubik-medium text-black-300">
                  Fernando
                </Text>
              </View>
            </View>
            <Image
              source={icons.bell as ImageSourcePropType}
              className="size-7"
            />
          </View>
          <Search />
          <View className="my-5">
            <View className="flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300">
                Featured
              </Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-primary-300">
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <FeaturedCard />
          </View>
          <View className="my-5">
            <View className="flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300">
                Our Recommendation
              </Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-primary-300">
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center justify-between gap-3">
              <Card />
              <Card />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

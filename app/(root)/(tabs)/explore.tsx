import { Card } from "@/app/components/Cards";
import Filters from "@/app/components/Filters";
import NoResults from "@/app/components/NoResults";
import Search from "@/app/components/Search";
import icons from "@/constants/icons";
import { getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImagePropsBase,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Explore() {
  const params = useLocalSearchParams<{ filter?: string; query?: string }>();

  const {
    data: properties,
    loading: propertiesLoading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView className="bg-white h-full -pb-safe-offset-20">
      <FlatList
        data={properties}
        renderItem={({ item }) => <Card item={item} />}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="flex gap-5 px-5"
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          propertiesLoading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex-row items-center justify-between mt-5">
              <TouchableOpacity onPress={() => router.back()}>
                <Image
                  source={icons.backArrow as ImagePropsBase}
                  className="size-10"
                />
              </TouchableOpacity>
              <Text className="text-lg font-rubik-semibold text-black-300">
                Search for the best properties
              </Text>
              <Image source={icons.bell as ImagePropsBase} className="size-7" />
            </View>
            <Search />
            <Filters />
          </View>
        }
      />
    </SafeAreaView>
  );
}

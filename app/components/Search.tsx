import icons from "@/constants/icons";
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ImagePropsBase,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

const Search = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState<string>(params.query || '');

  const debouncedSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: search }),
    500
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };
  return (
    <View className="flex-row items-center justify-between w-full bg-accent-100 border border-primary-100 rounded-lg px-4 py-2 mt-5">
      <View className="flex-row w-full items-center">
        <Image source={icons.search as ImagePropsBase} className="size-5" />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          placeholderTextColor="#A0AEC0"
          style={{
            height: 25,
            textAlignVertical: 'center',
          }}
          className="flex-1 font-rubik text-black ml-2"
        />
        <TouchableOpacity>
          <Image source={icons.filter as ImagePropsBase} className="size-5" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;

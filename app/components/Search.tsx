import icons from '@/constants/icons';
import { useLocalSearchParams, usePathname } from 'expo-router';
import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState<string>(params.query || '');

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <View className="flex-row items-center justify-between w-full bg-accent-100 border border-primary-100 rounded-lg px-4 py-2 mt-5">
      <View className="flex-1 flex-row items-center justify-start">
        <Image source={icons.search} className="size-5" />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          className="text-sm font-rubik text-black-300 ml-2 flex-1"
        />
      </View>
      <TouchableOpacity>
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;

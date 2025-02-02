import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import { getMenu } from "../../data/DataAPI";
import { useGlobalContext } from "../../components/GlobalContext/GlobalContext";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemModal from "../../components/ItemModel";

export default function HomeScreen(props) {

  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [menuItems, setMenuItems] = useState(false);
  const { state, dispatch } = useGlobalContext();
  const [selectedItem, setSelectedItem] = useState(null);

  useLayoutEffect(() => {
    getMenu().then((menuItems) => {
      setIsDataAvailable(true);
      setMenuItems(menuItems);
      dispatch({ menuItems: menuItems });
    });
  }, []);

  useEffect(() => {
    setMenuItems(state.menuItems);
  }, [state]);

  const onPressRecipe = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const renderRecipes = ({ item }) => (

    <View style={styles.container} key={item.id}>
      <TouchableHighlight underlayColor="#fff" onPress={() => onPressRecipe(item)}>
        <>
          <Image style={styles.photo} source={{ uri: item.photoUrl }} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>{item.category}</Text>
        </>
      </TouchableHighlight>
    </View >
  );

  return (
    <SafeAreaView >
      {
        isDataAvailable && (
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={menuItems}
            renderItem={renderRecipes}
            keyExtractor={(item) => `${item.id}`}
            // contentContainerStyle={{ width: '100%' }}
          />
        )
      }
      <ItemModal item={selectedItem} onClose={handleCloseModal} />
    </SafeAreaView>
  );
}

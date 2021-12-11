import React, {useContext} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import SearchIcon from '../assets/search-2-line.svg';
import {Context} from '../provider/provider';
import Colors from '../styles/colors';
export const HomeHeader = () => {
  const {headerText, headerSelected, setHeaderSelected} = useContext(Context);
  const data = ['All', 'Museums', 'Historical Places', 'Restaurant'];
  return (
    <View style={styles.headerContainer}>
      <View style={styles.row}>
        <View>
          <Text style={styles.headerText}>Discover,</Text>
          <Text style={[styles.headerText, styles.bold]}>{headerText}!</Text>
        </View>
        <View style={styles.search}>
          <SearchIcon />
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item}
        pagingEnabled={true}
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Pressable
            onPress={() => setHeaderSelected(item)}
            style={[
              styles.headerItem,
              headerSelected == item && styles.selectedHeader,
            ]}>
            <Text
              style={[
                styles.headerItemText,
                headerSelected == item && styles.selectedHeaderText,
              ]}>
              {item}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    marginLeft: 24,
    marginTop: 45,
  },
  headerText: {
    fontFamily: 'Times New Roman',
    fontSize: 36,
    lineHeight: 40,
  },
  bold: {
    fontWeight: 'bold',
  },
  search: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.thirtary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 24,
  },
  headerItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    height: 32,
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  headerItemText: {
    letterSpacing: 0.03,
    textTransform: 'uppercase',
    color: '#666462',
    fontSize: 12,
    lineHeight: 14,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedHeader: {
    backgroundColor: '#D5E5E2',
    borderRadius: 29,
  },
  selectedHeaderText: {
    color: '#5B7D76',
  },
});
export default HomeHeader;

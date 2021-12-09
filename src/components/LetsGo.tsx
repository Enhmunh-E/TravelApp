import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components';
import Colors from '../styles/colors';
type LineProps = {
  color: string;
  width: number;
};
type LetsGoPropsType = {
  isdark: boolean;
};
const LetsGoText = styled.Text`
  font-size: 14px;
  line-height: 40px;
  display: flex;
  align-items: center;
  color: #ea8246;
  font-weight: 600;
  padding-left: 29px;
`;
const Line = styled.View`
  height: 1px;
  margin-right: 12px;
  width: ${(props: LineProps) => props.width};
  background-color: ${(props: LineProps) => props.color};
`;
export const LetsGo = (props: LetsGoPropsType) => {
  return (
    <View>
      <LetsGoText>LET'S GO!</LetsGoText>
      <View style={styles.row}>
        <Line
          width={'213px'}
          color={props.isdark ? Colors.grey : Colors.primary}
        />
        <Line
          width={'44px'}
          color={props.isdark ? Colors.grey : Colors.primary}
        />
        <Line
          width={'25px'}
          color={props.isdark ? Colors.grey : Colors.primary}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
});
export default LetsGo;

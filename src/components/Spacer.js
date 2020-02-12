// only use of Spacer is to apply some margin to a child component
import React from "react";
import { View, StyleSheet } from "react-native";

// we need to use spacer to wrap some element and apply some margin to it
const Spacer = ({ children }) => {
    return <View style= {styles.spacer}>{children}</View>
};

const styles = StyleSheet.create({
    spacer: {
        margin: 15
    }
});

export default Spacer;

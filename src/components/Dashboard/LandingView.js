import React from "react";
import {View, Text, StyleSheet} from "react-native";

class LandingView extends React.Component {
    render(){
        return(
            <View>
                <Text style={styles.titleText}>Klose</Text>
                <Text>The best app to help you keep in touch.</Text>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#e9e1d7",
    },
    titleText: {
        color: "#78b49b",
        fontFamily: "Fredoka One",
        fontWeight: 600,
        fontSize: 50,
    },

});

export default LandingView;
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
    titleText: {
        color: "#78b49b",
    },

});

export default LandingView;
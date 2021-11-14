import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native';
import { AntDesign  } from '@expo/vector-icons';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
const AnimatedIcon = Animated.createAnimatedComponent(AntDesign);


export default class ReminderItem extends Component {

  renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    
    return (
      <RectButton style={styles.rightAction} onPress={this.closeSwipe}>
        <View accessible accessibilityRole="button">
          <Text style={{color: '#db644e', fontFamily:'Rubik_500Medium', fontSize: 20}}>Delete</Text>
        </View>
        <AnimatedIcon
          name="delete"
          size={30}
          color="#db644e"
          style={[styles.actionIcon]}
        />
      </RectButton>
    );
   
  };

  updateRef = ref => {
    this._swipeableRow = ref;
  };

  closeSwipe = () => {
    this._swipeableRow.close();
    this.props.deleteSwipe(this.props.reminderID)
  };

  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        rightThreshold={41}
        renderRightActions={this.renderRightActions}
        containerStyle={this.props.upcomingItem  ? [styles.swipeable, styles.upcomingItem ] : styles.swipeable}
      >
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  swipeable:{
    flex: 1,
    backgroundColor: '#fff',
    width: '90%',
    padding: 16,
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 7
  },
  upcomingItem:{
    shadowColor: '#db644e',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
  }
});

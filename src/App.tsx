import { ImageSourcePropType, StyleSheet,Image, Text, View, Pressable, Animated, Easing } from 'react-native'
import React, { useState, useRef } from 'react'
import type { PropsWithChildren } from 'react'
import DiceOne from '../assets/one.png'
import DiceTwo from '../assets/two.png'
import DiceThree from '../assets/three.png'
import DiceFour from '../assets/four.png'
import DiceFive from '../assets/five.png'
import DiceSix from '../assets/six.png'

type DiceProps = PropsWithChildren<{
  imageUrl: ImageSourcePropType
}>

const Dice = ({ imageUrl }: DiceProps): JSX.Element => {
  return (
    <View>
      <Image style={styles.diceImage} source={imageUrl} />
    </View>
  )
}

function App(): JSX.Element {
  const [diceImage, setDiceImage] = useState<ImageSourcePropType>(DiceOne)

  const diceAnimation = useRef(new Animated.Value(0)).current

  const rollDiceOnTap = () => {
    
    Animated.sequence([
      Animated.timing(diceAnimation, {
        toValue: 1, 
        duration: 300, 
        easing: Easing.linear, 
        useNativeDriver: true, 
      }),
      Animated.timing(diceAnimation, {
        toValue: 0, 
        duration: 0, 
        useNativeDriver: true,
      }),
    ]).start()

    
    let randomNumber = Math.floor(Math.random() * 6) + 1
    switch (randomNumber) {
      case 1:
        setDiceImage(DiceOne)
        break
      case 2:
        setDiceImage(DiceTwo)
        break
      case 3:
        setDiceImage(DiceThree)
        break
      case 4:
        setDiceImage(DiceFour)
        break
      case 5:
        setDiceImage(DiceFive)
        break
      case 6:
        setDiceImage(DiceSix)
        break
      default:
        setDiceImage(DiceOne)
        break
    }
  }

  
  
  const rotate = diceAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Dice imageUrl={diceImage} />
      </Animated.View>
      <Pressable onPress={rollDiceOnTap}>
        <Text style={styles.rollDiceBtnText}>Roll the dice</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF2F2',
  },
  diceImage: {
    height: 200,
    width: 200,
  },
  rollDiceBtnText: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#E5EOFF',
    fontSize: 16,
    fontWeight: '700',
    color: "#8EA7E9",
    textTransform: 'uppercase',
    marginTop:45
  }
});

export default App;

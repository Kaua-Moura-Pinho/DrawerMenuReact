import * as React from 'react';
import { Button, View, Text, StyleSheet, ImageBackground } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ProductList from './productlist';


function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
            <div style={styles.div1}>
                <h1 style={styles.title}>PICTURES HERE</h1>
            </div>
            <ImageBackground
                source={require('../assets/bg-img.jpg')}
                style={styles.imgback}
            />
        </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function ProductsScreen({ navigation }) {
  return (<ProductList />
  );
}

const Drawer = createDrawerNavigator();

export default function MenuDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home"
        screenOptions={{
          drawerStyle: { backgroundColor: '#252525', },

        }}
        drawerContentOptions={{
          activeTintColor: 'blue',
          labelStyle: { color: '#fff' },
          drawerContentContainerStyle: { backgroundColor: '#252525' }
        }}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerLabelStyle: { color: '#fff' }
          }}
        />
        <Drawer.Screen
          name="Notificações"
          component={NotificationsScreen}
          options={{
            drawerLabelStyle: { color: '#fff' }
          }}
        />
        <Drawer.Screen
          name="Produtos"
          component={ProductsScreen}
          options={{
            drawerLabelStyle: { color: '#fff' }
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
  },
  iconTabRound: {
      width: 60,
      height: 90,
      borderRadius: 30,
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 6,
      shadowColor: '#9C27B0',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 5
  },
  imgback: {
      width: '100%',
      height: '100vh',
      opacity: '0.8',
      flex: 1,
  },
  div1: {
      position: 'absolute',
      zIndex: 1,
      paddingTop: '2em',

  },
  title: {
      color: '#000',
      borderStyle: 'solid'
  }
});
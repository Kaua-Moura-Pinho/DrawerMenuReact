import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <div style={styles.div1}>
        <h1 style={styles.title}>COIZAX HERE</h1>
      </div>
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
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bem vindo aos Produtos</Text>
    </View>
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
});
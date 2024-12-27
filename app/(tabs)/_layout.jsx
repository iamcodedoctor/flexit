import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const HomeIcon = (props) => (
  <Icon
    {...props}
    name='home-outline'
  />
);

const DashboardIcon = (props) => (
  <Icon
    {...props}
    name='file-text-outline'
  />
);


export default function TabsLayout() {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor='white' style='dark-content' />
          <Tabs
            screenOptions={{
              headerShown: false,
            }}
            tabBar={({ navigation, state }) => (
              <BottomNavigation
                selectedIndex={state.index}
                onSelect={index => navigation.navigate(state.routeNames[index])}
              >
                <BottomNavigationTab title="Home" icon={HomeIcon} />
                <BottomNavigationTab title="Dashboard" icon={DashboardIcon} />
              </BottomNavigation>
            )}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

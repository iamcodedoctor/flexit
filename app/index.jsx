import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import { Layout, Spinner, Text, Button } from '@ui-kitten/components';
import { Image, StyleSheet, Alert } from 'react-native';

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authFailed, setAuthFailed] = useState(false); // To track authentication failure
  const router = useRouter();

  useEffect(() => {
    const checkBiometrics = async () => {
      const isHardwareAvailable = await LocalAuthentication.hasHardwareAsync();
      const supportedAuthTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

      if (isHardwareAvailable && supportedAuthTypes.length > 0) {
        handleBiometricAuth();
      } else {
        Alert.alert('Error', 'Biometric authentication is not supported on this device.');
        setLoading(false);
      }
    };

    checkBiometrics();
  }, []);

  const handleBiometricAuth = async () => {
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with fingerprint',
      fallbackLabel: 'Enter password',
    });

    if (biometricAuth.success) {
      setIsAuthenticated(true);
      router.replace('/home');
    } else {
      Alert.alert('Authentication Failed', 'Unable to authenticate with fingerprint.');
      setAuthFailed(true); // Set authFailed state
      setLoading(false);
    }
  };

  // Show loading screen (spinner) when checking fingerprint
  if (loading && !authFailed) {
    return (
      <Layout style={styles.container}>
        {/* Adding Image above the spinner */}
        <Image
          source={require('../assets/images/index-banner.jpg')}
          resizeMode="contain" // Ensure the image is fully contained
          style={styles.bannerImage}
        />
        <Layout style={styles.innerContainer}>
          <Spinner size="giant" status="primary" />
          <Text category="s1" style={styles.text}>
            Checking fingerprint authentication...
          </Text>
        </Layout>
      </Layout>
    );
  }

  // Handle failed authentication: show Try Again button
  if (authFailed) {
    return (
      <Layout style={styles.container}>
        <Image
          source={require('../assets/images/index-banner.jpg')}
          resizeMode="contain" // Ensure the image is fully contained
          style={styles.bannerImage}
        />
        <Layout style={styles.innerContainer}>
          <Text category="s1" style={styles.text}>
            Authentication failed.
          </Text>
          <Button onPress={handleBiometricAuth} style={styles.button}>
            Try Again
          </Button>
        </Layout>
      </Layout>
    );
  }

  return null; // Since the only cases handled are loading and failed auth
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align the content to the top
    alignItems: 'center',         // Center the content horizontally
  },
  bannerImage: {
    width: '100%',  // Full width of the screen
    height: 400,    // Set the height of the image (you can adjust as needed)
    marginBottom: 20, // Add some spacing between the image and spinner
  },
  innerContainer: {
    justifyContent: 'center', // Center the spinner/text/button
    alignItems: 'center',
    paddingVertical: 20,
  },
  text: {
    marginTop: 20,
  },
  button: {
    marginTop: 20,
  },
});

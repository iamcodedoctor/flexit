import { Layout, Input, Button, Text } from '@ui-kitten/components';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">Login</Text>
      <Input placeholder="Email" style={{ marginVertical: 10 }} />
      <Input placeholder="Password" secureTextEntry={true} style={{ marginVertical: 10 }} />
      <Button onPress={() => router.push('/tabs')}>Login</Button>
    </Layout>
  );
}

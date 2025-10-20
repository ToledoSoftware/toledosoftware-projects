// app/_layout.tsx
import 'react-native-get-random-values';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native'; // <-- 1. Importar Platform

// 2. Configurar o handler com TODAS as propriedades
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    // --- CORREÇÃO (Adicionando propriedades faltando) ---
    // @ts-ignore (Ignora caso a tipagem não bata 100%, mas garante que funcione)
    shouldShowBanner: true, // (iOS)
    shouldShowList: true,   // (Android)
  }),
});

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Falha ao obter permissão para notificações! O app não poderá enviar lembretes.');
    return;
  }

  // --- 3. ADICIONAR CANAL PARA ANDROID ---
  // Isso é obrigatório para notificações agendadas no Android
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX, // Garante que a notificação apareça
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  // --- FIM DA CORREÇÃO ANDROID ---
}

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

function ThemedApp() {
  // ... (O resto desta função continua igual)
  const { theme } = useTheme();

  return (
    <>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme === 'dark' ? '#1A1A1A' : '#ffffff',
          },
          headerTintColor: theme === 'dark' ? '#e0e0e0' : '#162447',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
            title: 'Adicionar Novo Hábito',
            headerStyle: {
              backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F8F8',
            },
          }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  // ... (O resto desta função continua igual)
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      registerForPushNotificationsAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}
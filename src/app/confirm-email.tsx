import { useEffect } from 'react';
import { Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { api } from '@/services/api';

export default function ConfirmEmailScreen() {
  const { token } = useLocalSearchParams()

  useEffect(() => {
    if (token) {
      api.patch('user/validate/verifyToken', { token })
        .then(() => {
          alert('E-mail confirmado com sucesso!');
          console.log(token)
          router.navigate('/welcome')
        })
        .catch(() => {
          alert('Token inválido ou expirado.');
        });
    }
  }, [token]);

  return (
    <Text>Confirmando e-mail...</Text>
  );
}

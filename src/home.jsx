import React from 'react';
import {
  Link,
  Card,
  Stack,
  Heading,
  Text,
  Icon,
  CardBody,
  CardHeader,
  Grid,
} from '@chakra-ui/react';
import { FaClipboard, FaSignInAlt, FaSignOutAlt, FaList } from 'react-icons/fa';

export default function Home() {
  const navigateTo = path => {
    window.history.pushState(null, null, path);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={4}
        width="100%"
        justifyContent="center"
      >
        <Link to="/vehicle-registration">
          <Card
            mt={4}
            padding={4}
            maxW="580px"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="md"
            transition="transform 0.2s"
            marginLeft={6}
            _hover={{ transform: 'scale(1.05)' }}
            cursor="pointer"
            onClick={() => navigateTo('/vehicle-registration')}
          >
            <Stack direction="row" alignItems="center">
              <CardHeader
                backgroundColor="blue.500"
                borderRadius="md"
                padding={3}
              >
                <Stack direction="row" alignItems="center">
                  <Icon as={FaClipboard} boxSize={6} color="white" />
                </Stack>
              </CardHeader>
              <CardBody>
                <Heading size="sm" textAlign="left">
                  Registrar un Vehiculo
                </Heading>
                <Text fontSize="sm" py="2" textAlign="left">
                  Agrega la informacion del registro del vehiculo
                </Text>
              </CardBody>
            </Stack>
          </Card>
        </Link>

        <Link to="/entry-list">
          <Card
            mt={4}
            padding={4}
            maxW="580px"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="md"
            transition="transform 0.2s"
            marginLeft={6}
            _hover={{ transform: 'scale(1.05)' }}
            cursor="pointer"
            onClick={() => navigateTo('/entry-list')}
          >
            <Stack direction="row" alignItems="center">
              <CardHeader
                backgroundColor="blue.500"
                borderRadius="md"
                padding={3}
              >
                <Stack direction="row" alignItems="center">
                  <Icon as={FaSignInAlt} boxSize={6} color="white" />{' '}
                </Stack>
              </CardHeader>
              <CardBody>
                <Heading size="sm" textAlign="left">
                  Entradas de Vehiculos
                </Heading>
                <Text fontSize="sm" py="2" textAlign="left">
                  Revisa las últimas entradas de los Vehículos
                </Text>
              </CardBody>
            </Stack>
          </Card>
        </Link>

        <Link to="/departure-list">
          <Card
            mt={4}
            padding={4}
            maxW="580px"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="md"
            transition="transform 0.2s"
            marginLeft={6}
            marginRight={6}
            _hover={{ transform: 'scale(1.05)' }}
            cursor="pointer"
            onClick={() => navigateTo('/vehicle-list')}
          >
            <Stack direction="row" alignItems="center">
              <CardHeader
                backgroundColor="blue.500"
                borderRadius="md"
                padding={3}
              >
                <Stack direction="row" alignItems="center">
                  <Icon as={FaList} boxSize={6} color="white" />{' '}
                </Stack>
              </CardHeader>
              <CardBody>
                <Heading size="sm" textAlign="left">
                  Lista de Vehiculos
                </Heading>
                <Text fontSize="sm" py="2" textAlign="left">
                  Ver lista completa de vehiculos
                </Text>
              </CardBody>
            </Stack>
          </Card>
        </Link>
        <Link to="/departure-list">
          <Card
            mt={4}
            padding={4}
            maxW="580px"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="md"
            transition="transform 0.2s"
            marginLeft={6}
            marginRight={6}
            _hover={{ transform: 'scale(1.05)' }}
            cursor="pointer"
            onClick={() => navigateTo('/departure-list')}
          >
            <Stack direction="row" alignItems="center">
              <CardHeader
                backgroundColor="blue.500"
                borderRadius="md"
                padding={3}
              >
                <Stack direction="row" alignItems="center">
                  <Icon as={FaSignOutAlt} boxSize={6} color="white" />{' '}
                </Stack>
              </CardHeader>
              <CardBody>
                <Heading size="sm" textAlign="left">
                  Salidas de Vehiculos
                </Heading>
                <Text fontSize="sm" py="2" textAlign="left">
                  Revisa las últimas salidas de los Vehículos
                </Text>
              </CardBody>
            </Stack>
          </Card>
        </Link>
      </Grid>
    </>
  );
}

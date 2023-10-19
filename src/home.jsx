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
  Flex,
} from '@chakra-ui/react';
import { FaClipboard, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

export default function Home() {
  return (
    <>
    <Flex h={16} mt={8}>
        <Link to="/ruta-de-registro">
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

      <Link to="/ruta-de-registro">
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

      <Link to="/ruta-de-registro">
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
      </Flex>
    </>
  );
}

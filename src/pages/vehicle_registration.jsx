import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  FormLabel,
  Input,
  FormControl,
  ModalHeader,
  ModalFooter,
  Button,

} from '@chakra-ui/react';

export default function RegistroModal(isOpen, onClose) {
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Editar cuenta</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Clasificacición</FormLabel>
            <Input
              type={'text'}
              isDisabled
              readOnly
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Saldo</FormLabel>
            <Input type="number" readOnly />
          </FormControl>

          <FormControl>
            <FormLabel>Código</FormLabel>
            {/* {account.id === undefined ? (
              <InputGroup>

                <Input type="text" />
              </InputGroup>
            ) : (
              <Input
                type="text"
                isDisabled
                readOnly
              />
            )} */}

          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Nombre de la cuenta</FormLabel>
            <Input type="text" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Descripción</FormLabel>
            <Input type="text"  />

          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose} type="button" variant="secondary">
            Cerrar
          </Button>

          <Button colorScheme={'blue'} type="submit">
            Guardar
          </Button>
        </ModalFooter>
    </ModalContent>
  </Modal>;
}

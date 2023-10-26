import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Skeleton,
  } from '@chakra-ui/react';

  import InputFormGroup from '@components/InputFormGroup/InputFormGroup';
  import TextAreaFormGroup from '@components/TextAreaFormGroup/TextAreaFormGroup';

  
  export default function ModalEditVehicle({
    onClose,
    isOpen,
    recordId,
  }) {

    return (
      <>
        <Modal
          onClose={onClose !== undefined ? onClose : () => {}}
          isOpen={isOpen !== undefined ? isOpen : false}
          closeOnOverlayClick={false}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <form >
              <ModalCloseButton />
              <ModalHeader fontSize={'lg'}>Editar Inventario</ModalHeader>
              <ModalBody>
                <InputFormGroup
                  field="inventoryTypeName"
                  label="Nombre"
                  placeholder={'Nombre'}
                />
  
                <TextAreaFormGroup
                  field="description"
                  label="Descripción"
                  placeholder={'Descripción'}
                />
              </ModalBody>
  
              <ModalFooter>
                <Skeleton >
                  <Button
                    mr={4}
                    type="button"
                    onClick={onClose}
                    variant="secondary"
                  >
                    Cancelar
                  </Button>
                </Skeleton>
  
                <Skeleton>
                  <Button
                    colorScheme={'blue'}
                    type="submit"
                  >
                    Guardar
                  </Button>
                </Skeleton>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    );
  }
  
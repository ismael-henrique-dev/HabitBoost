import { Button } from '../../button'
import { ModalBase } from '../modal-base'


type UpdateUsernameModalProps = {
  visible: boolean
  onClose: () => void
}

export function UpdateUsernameModal({
  visible,
  onClose,
}: UpdateUsernameModalProps) {
  return (
    <ModalBase visible={visible} onClose={onClose}>
      <ModalBase.Content>
        <ModalBase.Header onClose={onClose}>
          <ModalBase.HeaderTitle>Alterar nome de usuário</ModalBase.HeaderTitle>
        </ModalBase.Header>

        <ModalBase.HeaderSubtitle>
          Informe seu nome de usuário atual abaixo:
        </ModalBase.HeaderSubtitle>

        

      
      </ModalBase.Content>
    </ModalBase>
  )
}

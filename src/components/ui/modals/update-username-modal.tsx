import { UpdateUsernameForm } from '../forms/update-username-form'
import { ModalBase } from './modal-base'

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

        <UpdateUsernameForm />
      </ModalBase.Content>
    </ModalBase>
  )
}

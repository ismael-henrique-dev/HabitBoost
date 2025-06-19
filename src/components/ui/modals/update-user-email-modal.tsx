import { UpdateUserEmailForm } from '../forms/update-email-form'
import { ModalBase } from './modal-base'

type UpdateUsernameModalProps = {
  visible: boolean
  onClose: () => void
}

export function UpdateUserEmailModal({
  visible,
  onClose,
}: UpdateUsernameModalProps) {
  return (
    <ModalBase visible={visible} onClose={onClose}>
      <ModalBase.Content>
        <ModalBase.Header onClose={onClose}>
          <ModalBase.HeaderTitle>Alterar email</ModalBase.HeaderTitle>
        </ModalBase.Header>

        <ModalBase.HeaderSubtitle>
          Informe seu email atual e a senha abaixo:
        </ModalBase.HeaderSubtitle>

        <UpdateUserEmailForm />
      </ModalBase.Content>
    </ModalBase>
  )
}

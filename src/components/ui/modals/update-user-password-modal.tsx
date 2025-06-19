import { UpdateUserPasswordForm } from '../forms/update-user-password-form'
import { ModalBase } from './modal-base'

type UpdateUsernameModalProps = {
  visible: boolean
  onClose: () => void
}

export function UpdateUserPasswordModal({
  visible,
  onClose,
}: UpdateUsernameModalProps) {
  return (
    <ModalBase visible={visible} onClose={onClose}>
      <ModalBase.Content>
        <ModalBase.Header onClose={onClose}>
          <ModalBase.HeaderTitle>Alteração de senha</ModalBase.HeaderTitle>
        </ModalBase.Header>

        <ModalBase.HeaderSubtitle>
          Informe a senha atual e nova senha abaixo:
        </ModalBase.HeaderSubtitle>

        <UpdateUserPasswordForm />
      </ModalBase.Content>
    </ModalBase>
  )
}

import { ModalBase } from './modal-base'
import { UpdateUserProfileImageActions } from '@/components/user-update-profile-image-actions'

type UpdateUsernameModalProps = {
  visible: boolean
  onClose: () => void
}

export function UpdateUserProfileImageModal({
  visible,
  onClose,
}: UpdateUsernameModalProps) {
  return (
    <ModalBase visible={visible} onClose={onClose}>
      <ModalBase.Content>
        <ModalBase.Header onClose={onClose}>
          <ModalBase.HeaderTitle>Alterar foto de perfil</ModalBase.HeaderTitle>
        </ModalBase.Header>

        <ModalBase.HeaderSubtitle>
          Deseja de fato alterar foto de perfil?
        </ModalBase.HeaderSubtitle>

        <UpdateUserProfileImageActions />
      </ModalBase.Content>
    </ModalBase>
  )
}

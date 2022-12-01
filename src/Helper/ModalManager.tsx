import { Text } from "@mantine/core"
import { openConfirmModal } from "@mantine/modals"



export function OpenConfirmModal(title: string, desc: string, onConfirm?: () => void, onCancle?: () => void) {
    openConfirmModal({
        title: title,
        centered: true,
        children: (
            <Text size="sm">
                {desc}
            </Text>
        ),
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: onCancle,
        onConfirm: onConfirm,
    });

}

export function OpenDeleteModal(title: string, desc: string, onConfirm?: () => void, onCancle?: () => void) {

    openConfirmModal({
        title: title,
        centered: true,
        children: (
            <Text size="sm">
                {desc}
            </Text>
        ),
        labels: { confirm: 'Delete', cancel: "No don't delete!" },
        confirmProps: { color: 'red' },
        onCancel: () => onCancle,
        onConfirm: () => onConfirm,
    });

}
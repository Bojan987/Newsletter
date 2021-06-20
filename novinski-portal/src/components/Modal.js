import React, { useContext } from 'react'
import Modal from '@material-ui/core/Modal'

import AppContext from '../context/AppContext'

export default function SimpleModal({ body }) {
    const context = useContext(AppContext)

    const handleClose = () => {
        context.setModalOpen(false)
    }

    return (
        <div>
            <Modal
                open={context.modalOpen}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    )
}

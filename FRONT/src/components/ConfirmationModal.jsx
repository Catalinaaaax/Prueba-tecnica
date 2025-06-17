import React from 'react';

/**
 * ConfirmationModal: Un componente reutilizable para mostrar un diálogo de confirmación.
 * Ideal para acciones que requieren una segunda validación del usuario, como eliminaciones.
 *
 * @param {object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Controla si el modal está visible o no.
 * @param {Function} props.onClose - Función que se ejecuta cuando el usuario cierra el modal (ej. clic en overlay o botón "Cancelar").
 * @param {Function} props.onConfirm - Función que se ejecuta cuando el usuario confirma la acción.
 * @param {string} props.title - Título que se mostrará en el modal.
 * @param {string} props.message - Mensaje o pregunta de confirmación para el usuario.
 * @param {string} [props.confirmText="Confirmar"] - Texto para el botón de confirmación. Opcional.
 * @param {string} [props.cancelText="Cancelar"] - Texto para el botón de cancelación. Opcional.
 * @returns {JSX.Element|null} El modal renderizado o null si `isOpen` es falso.
 */
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar", // Valor por defecto si no se provee
  cancelText = "Cancelar"  // Valor por defecto si no se provee
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Detenemos la propagación del evento onClick para que al hacer clic dentro del modal, no se cierre. */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          {/* Botón para cancelar la acción y cerrar el modal */}
          <button type="button" className="modal-button cancel" onClick={onClose}>
            {cancelText}
          </button>
          {/* Botón para confirmar la acción */}
          <button type="button" className="modal-button confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

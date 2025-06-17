import { useState } from 'react';
import IconVehiculo from "../assets/Icon_vehiculo.svg"; // Importar el ícono de vehículo
import IconVehiculo1 from "../assets/Icon_vehiculo1.svg"; // Importar el nuevo ícono de vehículo Rosado
import IconUbicacion from "../assets/Icon_puntoubicacion.svg";
import IconUbicacion1 from "../assets/Icon_puntoubicacion1.svg"; // Importar el nuevo ícono de ubicación activo
import IconPersona from "../assets/Icon_persona.svg";
import IconPersona1 from "../assets/Icon_persona1.svg";   // Importar el nuevo ícono de persona activo
import iconCrear from "../assets/icon_crear.svg";       // Importar el icono de creación

/**
 * Formulario tipo tarjeta para crear/editar usuario
 * Props:
 * - values: objeto {marca, sucursal, aspirante}
 * - onChange: handler input
 * - onSubmit: handler submit (desde CrudPage)
 * - onCancel: handler cancelar (desde CrudPage)
 * - editMode: bool, true si es edición
 * - onInitiateCreate: función para preparar la creación de un nuevo registro (desde CrudPage)
 * - isSubmitting: bool, para deshabilitar botones durante el envío
 * - iconConfirmarSrc: string, ruta al ícono para el botón de confirmar/crear
 * - iconCancelarSrc: string, ruta al ícono para el botón de cancelar
 */
const FormCard = ({
  values,
  onChange,
  onSubmit,
  onCancel,
  editMode = false,
  onInitiateCreate,
  isSubmitting,
  iconConfirmarSrc, // Prop para el ícono del botón de confirmar/crear
  iconCancelarSrc,  // Prop para el ícono del botón de cancelar
}) => {
  const [actionsVisibleInternal, setActionsVisibleInternal] = useState(false);

  const handleCreateIconClick = () => {
    if (editMode) {
      if (window.confirm("Está editando un registro. ¿Desea descartar los cambios y crear uno nuevo?")) {
        if (onInitiateCreate) onInitiateCreate();
        setActionsVisibleInternal(true);
      }
    } else {
      if (actionsVisibleInternal) {
        setActionsVisibleInternal(false);
      } else {
        if (onInitiateCreate) onInitiateCreate();
        setActionsVisibleInternal(true);
      }
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    onSubmit(e);
    if (!editMode) { // Si se trata de una creación los botones de acción deben ocultarse
      setActionsVisibleInternal(false);
    }
    // Si se trata de una acción de edición, handleCancel de CrudPage también restablecerá editMode.
    // y actionsVisibleInternal se gestionará de forma natural mediante la lógica showActions.
  };

  const handleCancelForm = () => {
    onCancel();
    setActionsVisibleInternal(false);
  };

  const showActions = editMode || actionsVisibleInternal;
  const currentVehicleIcon = editMode || actionsVisibleInternal ? IconVehiculo1 : IconVehiculo;
  const currentUbicacionIcon = editMode || actionsVisibleInternal ? IconUbicacion1 : IconUbicacion;
  const currentPersonaIcon = editMode || actionsVisibleInternal ? IconPersona1 : IconPersona;
  const submitButtonText = editMode ? 'Confirmar' : 'Crear';

  // Estilo para botones de íconos para eliminar la apariencia predeterminada de los botones
  const iconButtonStyle = {
    background: 'none',
    border: 'none',
    padding: '0', //Ajusto según sea necesario
    cursor: 'pointer',
    lineHeight: '0', // Ayuda a alinear el ícono si el botón tiene una altura de línea inherente
  };

  const iconStyle = {
    width: '35px', //Ajusto el tamaño para que coincida con Icon_cancelar.svg o su preferencia
    height: '35px',
    verticalAlign: 'middle',
  };


  return (
    <div className="form-card">
            {/*
        Aplicamos estilos Flexbox al form-sidebar para organizar sus elementos hijos
        verticalmente y con un espacio entre ellos, evitando superposiciones.
      */}
      <div className="form-sidebar" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>

        <img
          src={iconCrear}
          alt="Crear nuevo registro"
          className="create-action-icon"
          onClick={handleCreateIconClick}
          style={{ opacity: isSubmitting ? 0.5 : 1, 
                   pointerEvents: isSubmitting ? 'none' : 'auto' }}
        />
        <div className={`form-icons ${showActions ? 'icons-active' : ''}`}>
          <img src={currentVehicleIcon} alt="Marca (vehículo)" />
          <img src={currentUbicacionIcon} alt="Sucursal (ubicación)" />
          <img src={currentPersonaIcon} alt="Aspirante" />
        </div>
      </div>
      <form onSubmit={handleSubmitForm}>
        <input
          name="marca"
          placeholder="Mazda"
          value={values.marca || ''}
          onChange={onChange}
          autoComplete="off"
          disabled={isSubmitting}
        />
        <input
          name="sucursal"
          placeholder="Chapinero"
          value={values.sucursal || ''}
          onChange={onChange}
          autoComplete="off"
          disabled={isSubmitting}
        />
        <input
          name="aspirante"
          placeholder="David Sandoval"
          value={values.aspirante || ''}
          onChange={onChange}
          autoComplete="off"
          disabled={isSubmitting}
        />
        {showActions && (
          <div className="form-actions visible">
            {/* Botón Cancelar */}
            {editMode && iconCancelarSrc ? ( // Modo Edición: Icono
              <button
                type="button"
                className="btn-cancel-icon" // Clase para el icono de cancelar
                style={iconButtonStyle}
                onClick={handleCancelForm}
                disabled={isSubmitting}
                title="Cancelar"
              >
                <img src={iconCancelarSrc} alt="Cancelar" style={iconStyle} />
              </button>
            ) : !editMode ? ( // Modo Creación: Texto
              <button
                type="button"
                className="btn-cancel" // Clase para el botón de texto "Cancelar" (fondo rosado)
                onClick={handleCancelForm}
                disabled={isSubmitting}
              >
                Cancelar
              </button>
            ) : null}

            {/* Botón Confirmar/Crear */}
            {editMode && iconConfirmarSrc ? ( // Modo Edición: Icono
              <button
                type="submit"
                className="btn-confirm-icon" // Clase para el icono de confirmar/actualizar
                style={iconButtonStyle}
                disabled={isSubmitting}
                title={submitButtonText} // Será "Confirmar" o "Actualizar"
              >
                <img src={iconConfirmarSrc} alt={submitButtonText} style={iconStyle} />
              </button>
            ) : !editMode ? ( // Modo Creación: Texto
              <button
                type="submit"
                className="btn-create" // Clase para el botón de texto "Crear" (fondo azul)
                disabled={isSubmitting}
              >
                {submitButtonText} {/* Será "Crear" */}
              </button>
            ) : null}
          </div>
        )}
      </form>
    </div>
  );
};

export default FormCard;

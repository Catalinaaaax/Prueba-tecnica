import IconVehiculo from "../assets/Icon_vehiculo.svg";
import IconUbicacion from "../assets/Icon_puntoubicacion.svg";
import IconPersona from "../assets/Icon_persona.svg";

/**
 * Formulario tipo tarjeta para crear/editar usuario
 * Props:
 * - values: objeto {marca, sucursal, aspirante}
 * - onChange: handler input
 * - onSubmit: handler submit
 * - onCancel: handler cancelar
 * - editMode: bool, true si es edición
 */
const FormCard = ({
  values,
  onChange,
  onSubmit,
  onCancel,
  editMode = false,
}) => (
  <div className="form-card">
    <div className="form-icons">
      <img src={IconVehiculo} alt="Marca (vehículo)" />
      <img src={IconUbicacion} alt="Sucursal (ubicación)" />
      <img src={IconPersona} alt="Aspirante" />
    </div>
    <form onSubmit={onSubmit}>
      <input
        name="marca"
        placeholder="Mazda"
        value={values.marca}
        onChange={onChange}
        autoComplete="off"
      />
      <input
        name="sucursal"
        placeholder="Chapinero"
        value={values.sucursal}
        onChange={onChange}
        autoComplete="off"
      />
      <input
        name="aspirante"
        placeholder="David Sandoval"
        value={values.aspirante}
        onChange={onChange}
        autoComplete="off"
      />
      <div className="form-actions">
        <button
          type="button"
          className="btn-cancel"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn-create"
        >
          {editMode ? 'Confirmar' : 'Crear'}
        </button>
      </div>
    </form>
  </div>
);

export default FormCard;
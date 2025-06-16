import IconEditar from "../assets/Icon_editar.svg";
import IconEliminar from "../assets/Icon_eliminar.svg";
import IconConfirmar from "../assets/Icon_confirmar.svg"; // Icono de confirmar para la fila
import IconCancelar from "../assets/Icon_cancelar.svg";   // Icono de cancelar para la fila
import IconPersona from "../assets/Icon_persona.svg";
import IconButton from "./IconButton";

/**
 * Tabla CRUD para mostrar y gestionar usuarios.
 * Props:
 * - rows: array de usuarios
 * - onEdit: función para iniciar la edición de una fila (recibe el índice)
 * - onDelete: función para eliminar una fila (recibe el índice)
 * - editingRowIndex: índice de la fila actualmente en edición
 * - isAnyRowEditing: boolean, true si alguna fila está siendo editada (para deshabilitar otros botones de editar)
 * - onConfirmEdit: función a llamar cuando se presiona el icono de confirmar en la fila (usualmente handleSubmit del CrudPage)
 * - onCancelEdit: función a llamar cuando se presiona el icono de cancelar en la fila (usualmente handleCancel del CrudPage)
 */
const CrudTable = ({
  rows,
  onEdit,
  onDelete,
  editingRowIndex,
  isAnyRowEditing,
  onConfirmEdit,
  onCancelEdit,
}) => (
  <table className="crud-table">
    <thead>
      <tr>
        <th>Marca</th>
        <th>Sucursal</th>
        <th>Aspirante</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row, i) => (
        <tr key={row.id || i}> {/* Usar row.id como key si está disponible y es único */}
          <td>{row.marca}</td>
          <td>{row.sucursal}</td>
          <td>
            <img
              src={IconPersona}
              alt="Persona"
              width="16"
              style={{ marginRight: 6, verticalAlign: 'middle' }}
            />
            {row.aspirante}
          </td>
          <td>
            {editingRowIndex === i ? (
              <>
                <IconButton
                  icon={IconConfirmar} // Icono de confirmar de la fila
                  alt="Confirmar Cambios"
                  color="blue"
                  onClick={onConfirmEdit} // Llama directamente a la función del CrudPage
                  title="Confirmar Cambios"
                />
                <IconButton
                  icon={IconCancelar} // Icono de cancelar de la fila
                  alt="Cancelar Edición"
                  color="pink"
                  onClick={onCancelEdit} // Llama directamente a la función del CrudPage
                  title="Cancelar Edición"
                />
              </>
            ) : (
              <>
                <IconButton
                  icon={IconEditar}
                  alt="Editar"
                  color="blue"
                  onClick={() => onEdit(i)}
                  disabled={isAnyRowEditing && editingRowIndex !== i} // Deshabilitar si otra fila se está editando
                  title="Editar"
                />
                <IconButton
                  icon={IconEliminar}
                  alt="Eliminar"
                  color="pink"
                  onClick={() => onDelete(i)}
                  disabled={isAnyRowEditing} // Opcional: deshabilitar eliminar mientras se edita otra fila
                  title="Eliminar"
                />
              </>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default CrudTable;

import IconEditar from "../assets/Icon_editar.svg";
import IconEliminar from "../assets/Icon_eliminar.svg";
import IconConfirmar from "../assets/Icon_confirmar.svg";
import IconCancelar from "../assets/Icon_cancelar.svg";
import IconPersona from "../assets/Icon_persona.svg";
import IconButton from "./IconButton";

/**
 * Tabla CRUD para mostrar y gestionar usuarios.
 * Props:
 * - rows: array de usuarios
 * - onEdit: click editar
 * - onDelete: click eliminar
 * - onConfirm: click confirmar edición
 * - onCancel: click cancelar edición
 * - editingRowIndex: índice de la fila en edición
 */
const CrudTable = ({
  rows,
  onEdit,
  onDelete,
  onConfirm,
  onCancel,
  editingRowIndex,
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
        <tr key={i}>
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
                  icon={IconConfirmar}
                  alt="Confirmar"
                  color="blue"
                  onClick={() => onConfirm(i)}
                  title="Confirmar"
                />
                <IconButton
                  icon={IconCancelar}
                  alt="Cancelar"
                  color="pink"
                  onClick={() => onCancel(i)}
                  title="Cancelar"
                />
              </>
            ) : (
              <>
                <IconButton
                  icon={IconEditar}
                  alt="Editar"
                  color="blue"
                  onClick={() => onEdit(i)}
                  title="Editar"
                />
                <IconButton
                  icon={IconEliminar}
                  alt="Eliminar"
                  color="pink"
                  onClick={() => onDelete(i)}
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
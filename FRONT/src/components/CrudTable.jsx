import PropTypes from 'prop-types'; // Sugerencia: Añadir PropTypes para robustez
import IconEditar from "../assets/Icon_editar.svg"; // Icono para editar una fila
import IconEliminar from "../assets/Icon_eliminar.svg"; // Icono para eliminar una fila
import IconEditarActivo from "../assets/Icon_editar1.svg"; // Icono para la fila en estado de edición
import IconPersona from "../assets/Icon_persona.svg"; // Icono para representar un aspirante
import IconButton from "./IconButton";
import "../index.css";

// CrudTable: Componente presentacional para mostrar los datos en una tabla.
// Recibe los datos y las funciones de manejo (editar, eliminar) como props.

const CrudTable = ({
  rows, // Array de objetos, cada objeto es una fila de la tabla.
  onEdit, // Función callback que se ejecuta al hacer clic en editar. Recibe el índice de la fila.
  onDelete, // Función callback que se ejecuta al hacer clic en eliminar. Recibe el índice de la fila.
  editingRowIndex, // Índice de la fila que actualmente se está editando (null si ninguna).
  isAnyRowEditing, // Booleano que indica si alguna fila en la tabla está en modo de edición.
}) => (
  <table className="crud-table" style={{ maxWidth: '600px', margin: '10px auto' }}>
    {/* Sugerencia: Para tablas más complejas, considera usar clases CSS en lugar de tantos estilos inline */}
    <thead>
      <tr>
        <th>Marca</th>
        <th>Sucursal</th>
        <th>Aspirante</th>
      </tr>
    </thead>
    <tbody>
      {/* Itera sobre las filas para renderizar cada una */}
      {rows.map((row, i) => ( // Asegúrate que row.id sea único si existe, o 'i' como fallback
        <tr key={row.id || i}>
          <td>{row.marca}</td>
          <td>{row.sucursal}</td>
          <td style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '8px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              <img
                src={IconPersona}
                alt="Persona"
                width="16"
                style={{ marginRight: '6px', verticalAlign: 'middle' }}
              />
              {row.aspirante}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              {/* IconButton para Editar:
                  - Muestra IconEditarActivo (azul) si es la fila en edición o si ninguna fila está en edición (estado por defecto).
                  - Muestra IconEditar (gris) si otra fila está en edición.
                  - Se deshabilita si otra fila está en edición para evitar ediciones múltiples. */}
              <IconButton
                icon={
                  // Lógica simplificada para el ícono de edición
                  (editingRowIndex === i || !isAnyRowEditing)
                    ? IconEditarActivo // Fila actual en edición o ninguna en edición: azul activo
                    : IconEditar       // Otra fila en edición: esta fila muestra el gris
                }
                alt="Editar"
                color="blue"
                onClick={() => onEdit(i)}
                disabled={isAnyRowEditing && editingRowIndex !== i} // La lógica de disabled es correcta
                title="Editar"
                style={{ cursor: "pointer", marginLeft: isAnyRowEditing && editingRowIndex !== i ? '5px' : '0' }}
              />
              {/* IconButton para Eliminar:
                  - Se deshabilita si cualquier fila está en modo de edición para prevenir acciones conflictivas. */}
              <IconButton
                icon={IconEliminar}
                alt="Eliminar"
                color="pink"
                onClick={() => onDelete(i)}
                disabled={isAnyRowEditing}
                title="Eliminar"
                style={{ marginLeft: "5px", cursor: "pointer" }}
              />
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

// Sugerencia: Definir PropTypes para mejorar la mantenibilidad y detección de errores
CrudTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Asumiendo que id puede ser string o number
    marca: PropTypes.string,
    sucursal: PropTypes.string,
    aspirante: PropTypes.string,
  })).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  editingRowIndex: PropTypes.number, // Puede ser null, por lo que no es isRequired
  isAnyRowEditing: PropTypes.bool.isRequired,
};

// Valor por defecto para editingRowIndex si no se proporciona
CrudTable.defaultProps = {
  editingRowIndex: null,
};

export default CrudTable;

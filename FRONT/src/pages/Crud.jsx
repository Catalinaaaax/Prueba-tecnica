import { useState, useEffect, useCallback } from 'react';
import FormCard from '../components/FormCard';
import CrudTable from '../components/CrudTable';
import ConfirmationModal from '../components/ConfirmationModal'; // Importar el nuevo modal
// import IconUbicacion from "../assets/Icon_puntoubicacion.svg"; // Comentado si no se usa directamente aquí
import IconConfirmarBoton from "../assets/Icon_confirmar.svg"; // Icono para el botón de confirmar del formulario
import ImagoLogotipo from "../assets/imagologotipo_motion.svg"; // Importar la nueva imagen
import IconCancelarBoton from "../assets/Icon_cancelar.svg";   // Icono para el botón de cancelar del formulario
import '../index.css';

// URL base de la API para las operaciones CRUD.
const API_URL = 'http://localhost:8000/api';
// Estado inicial para el formulario, usado para creación y para resetear.
const initialFormState = { id: null, marca: '', sucursal: '', aspirante: '' };

// CrudPage: Componente principal que maneja la lógica del CRUD de concesionarios.
const CrudPage = () => {
  // --- Estados del Componente ---
  const [rows, setRows] = useState([]); // Almacena los datos de los concesionarios obtenidos de la API.
  const [form, setForm] = useState(initialFormState); // Estado para los campos del formulario (crear/editar).
  const [editingRowIndex, setEditingRowIndex] = useState(null); // Índice de la fila que se está editando. Null si no hay edición.
  const [isAnyRowEditing, setIsAnyRowEditing] = useState(false); // Flag para saber si alguna fila está en modo edición.
  const [isLoading, setIsLoading] = useState(true); // Indica si se están cargando los datos iniciales.
  const [isSaving, setIsSaving] = useState(false);   // Indica si se está procesando una operación de guardado (POST/PUT).
  const [error, setError] = useState(null); // Almacena mensajes de error de las operaciones API.
  const [newlyAddedRowId, setNewlyAddedRowId] = useState(null); // ID de la fila recién agregada, para posibles animaciones.
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Controla la visibilidad del modal de confirmación de eliminación.
  const [itemToDelete, setItemToDelete] = useState(null); // Almacena la información del ítem que se va a eliminar.

  const fetchConcesionarios = useCallback(async () => {
    setIsLoading(true);
    setError(null); // Limpiar errores previos
    try {
      const response = await fetch(`${API_URL}/concesionarios`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setRows(data);
    } catch (e) {
      console.error("Error al obtener concesionarios:", e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConcesionarios();
  }, [fetchConcesionarios]);

  // Maneja los cambios en los inputs del formulario.
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Maneja el envío del formulario (creación o actualización).
  const handleSubmit = async (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault(); // Prevenir solo si es un evento de formulario real
    }

    if (!form.marca || !form.sucursal || !form.aspirante) {
      setError("Todos los campos son obligatorios. Por favor, complete la información.");
      return;
    }

    setError(null); // Limpiar errores de validación previos
    setIsSaving(true);

    // Prepara el payload sin el ID, ya que la API lo maneja o no lo necesita para POST.
    const payload = { marca: form.marca, sucursal: form.sucursal, aspirante: form.aspirante };

    try {
      let response;
      let responseData;
      let successMessage = "";

      if (form.id) {
        // Si hay un ID en el formulario, es una actualización (PUT).
        response = await fetch(`${API_URL}/concesionarios/${form.id}/`, { // Asegúrate que el endpoint de PUT termine en / si así lo requiere tu API DRF
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          let errorMsg = `Error al actualizar: ${response.status} ${response.statusText}`;
          try {
            const errorData = await response.json();
            errorMsg = errorData.detail || errorData.message || JSON.stringify(errorData) || errorMsg;
          } catch (parseError) { /* ignorar si el cuerpo del error no es JSON */ }
          throw new Error(errorMsg);
        }
        responseData = await response.json();
        // Actualiza la fila correspondiente en el estado local.
        setRows(prevRows => prevRows.map(row => (row.id === responseData.id ? responseData : row)));
        successMessage = "Concesionario actualizado exitosamente.";
      } else {
        // Si no hay ID, es una creación (POST).
        response = await fetch(`${API_URL}/concesionarios/`, { // Asegúrate que el endpoint de POST termine en / si así lo requiere tu API DRF
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          let errorMsg = `Error al crear: ${response.status} ${response.statusText}`;
          try {
            const errorData = await response.json();
            errorMsg = errorData.detail || errorData.message || JSON.stringify(errorData) || errorMsg;
          } catch (parseError) { /* ignorar si el cuerpo del error no es JSON */ }
          throw new Error(errorMsg);
        }
        responseData = await response.json();
        // Añade la nueva fila al estado local.
        setRows(prevRows => [...prevRows, responseData]);
        setNewlyAddedRowId(responseData.id); // Guardar el ID de la nueva fila
        setTimeout(() => { // Limpiar el ID después de un tiempo para que la animación no se repita
          setNewlyAddedRowId(null);
        }, 1000); // Ajustar si la duración de la animación es diferente
        successMessage = "Concesionario creado exitosamente.";
      }
      handleCancel(); // Resetea el formulario y el estado de edición después de una operación exitosa.
      // Opcional: mostrar mensaje de éxito (podrías usar otro estado para esto)
      // setSuccessMessage(successMessage); 
      // setTimeout(() => setSuccessMessage(null), 3000);
      console.log(successMessage);

    } catch (err) {
      console.error("Error al enviar el formulario:", err);
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Prepara el formulario para editar una fila existente.
  const handleEdit = idx => {
    const recordToEdit = rows[idx];
    setForm({
      id: recordToEdit.id,
      marca: recordToEdit.marca,
      sucursal: recordToEdit.sucursal,
      aspirante: recordToEdit.aspirante
    });
    setEditingRowIndex(idx); // Marca la fila como en edición.
    setIsAnyRowEditing(true); // Indica que hay una edición en curso.
    setError(null); // Limpiar errores al iniciar edición
  };

  // Resetea el formulario y el estado de edición.
  // Se usa al cancelar una edición o al iniciar una nueva creación.
  const handleCancel = () => {
    setEditingRowIndex(null);
    setForm(initialFormState);
    setIsAnyRowEditing(false);
    setError(null); // Limpiar errores al cancelar
  };

  // Inicia el proceso de eliminación: guarda el ítem y muestra el modal de confirmación.
  const handleDeleteRequest = idx => {
    const recordToDelete = rows[idx];
    if (!recordToDelete || typeof recordToDelete.id === 'undefined') { // Chequeo más robusto
      setError("Error: No se puede eliminar un registro sin ID o inválido.");
      return;
    }
    setItemToDelete({ index: idx, data: recordToDelete });
    setShowDeleteModal(true);
    setError(null); // Limpiar errores al iniciar borrado
  };

  // Confirma y ejecuta la eliminación del ítem.
  const confirmDelete = async () => {
    if (!itemToDelete || !itemToDelete.data || !itemToDelete.data.id) return;

    setShowDeleteModal(false);
    setIsSaving(true);
    setError(null); // Limpiar errores previos

    try {
      // Petición DELETE a la API.
      const response = await fetch(`${API_URL}/concesionarios/${itemToDelete.data.id}/`, { // Asegúrate que el endpoint de DELETE termine en / si así lo requiere tu API DRF
        method: 'DELETE',
      });
      if (!response.ok && response.status !== 204) { // 204 No Content también es éxito para DELETE
        let errorMsg = `Error al eliminar: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.detail || errorData.message || JSON.stringify(errorData) || errorMsg;
        } catch (parseError) {
          try { // Si no es JSON, intenta leer como texto
            const textError = await response.text();
            errorMsg = textError || errorMsg;
          } catch (textParseError) { /* ignorar */ }
        }
        throw new Error(errorMsg);
      }
      setRows(prevRows => prevRows.filter(row => row.id !== itemToDelete.data.id));
      // Si la fila eliminada era la que se estaba editando, resetea el formulario.
      if (form.id === itemToDelete.data.id) {
        handleCancel();
      }
      // Opcional: mostrar mensaje de éxito
      console.log("Concesionario eliminado exitosamente.");
    } catch (err) {
      console.error("Error al eliminar el registro:", err);
      setError(err.message);
    } finally {
      setIsSaving(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="crud-layout">
      <FormCard
        values={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        editMode={form.id !== null} // Indica al FormCard si está en modo edición o creación.
        onInitiateCreate={handleCancel} // <--- Añadir esta línea
        isSubmitting={isSaving} // Usar isSaving para el estado de envío
        isRowEditingActive={isAnyRowEditing} // Para cambiar botones del formulario a iconos
        iconConfirmarSrc={IconConfirmarBoton}
        iconCancelarSrc={IconCancelarBoton}
      />
      <div>
        {/* Área general para mostrar errores */}
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>Error: {error}</p>}

        {isLoading && rows.length === 0 && <p style={{textAlign: 'center'}}>Cargando concesionarios...</p>}

        {/* Renderiza la tabla si no hay errores y (no está cargando o ya hay filas). */}
        {(!isLoading || rows.length > 0) && ( // No necesitas !error aquí si el error se muestra arriba
          <CrudTable
            rows={rows}
            onEdit={handleEdit} // Pasa la función de edición
            onDelete={handleDeleteRequest} // Pasa la función que abre el modal
            editingRowIndex={editingRowIndex}
            isAnyRowEditing={isAnyRowEditing}
            newlyAddedRowId={newlyAddedRowId} // Pasar el ID de la fila recién agregada
          />
        )}
        {/* Mensaje si no hay datos y no está cargando ni hay errores. */}
        {rows.length === 0 && !isLoading && !error && <p style={{textAlign: 'center'}}>No hay concesionarios para mostrar.</p>}

    
        {/* Nuevo div para la imagen centrada */}
        <div style={{ textAlign: 'center', marginTop: '6rem' }}>
          <img src={ImagoLogotipo} alt="Motion Logotipo" className="imagotipo-animated" style={{ width: '200px', marginLeft: '-480px' }} /> {/* Ajusta '-50px' para moverla más a la izquierda desde el centro */}
        </div>
      </div>
      {/* Modal de confirmación para la eliminación. */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setItemToDelete(null);
          setError(null); // Limpiar error si se cierra el modal sin confirmar
        }}
        onConfirm={confirmDelete}
        title="Confirmar Eliminación"
        message={itemToDelete ? `¿Está seguro de que desea eliminar el concesionario ${itemToDelete.data.marca} - ${itemToDelete.data.aspirante}?` : "¿Está seguro?"}
      />
    </div>
  );
};

export default CrudPage;

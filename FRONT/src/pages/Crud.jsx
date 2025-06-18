import { useState, useEffect } from 'react';
import FormCard from '../components/FormCard';
import CrudTable from '../components/CrudTable';
import IconUbicacion from "../assets/Icon_puntoubicacion.svg";
import IconConfirmarBoton from "../assets/Icon_confirmar.svg"; // Icono para el botón de confirmar del formulario
import ImagoLogotipo from "../assets/imagologotipo_motion.svg"; // Importar la nueva imagen
import IconCancelarBoton from "../assets/Icon_cancelar.svg";   // Icono para el botón de cancelar del formulario
import '../index.css';


const API_URL = 'https://prueba-tecnica-msk5.onrender.com';
const initialFormState = { id: null, marca: '', sucursal: '', aspirante: '' };

const CrudPage = () => {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [isAnyRowEditing, setIsAnyRowEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Para carga inicial de datos
  const [isSaving, setIsSaving] = useState(false);   // Para estado de envío del formulario
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConcesionarios = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/concesionarios`);
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
    };
    fetchConcesionarios();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault(); // Prevenir solo si es un evento de formulario real
    }
    if (!form.marca || !form.sucursal || !form.aspirante) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const payload = { marca: form.marca, sucursal: form.sucursal, aspirante: form.aspirante };
    setIsSaving(true);
    setError(null);

    try {
      let response;
      let responseData;

      if (form.id) {
        response = await fetch(`${API_URL}/api/concesionarios/${form.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`Error al actualizar: ${response.status} ${response.statusText}`);
        responseData = await response.json();
        setRows(rows.map(row => (row.id === responseData.id ? responseData : row)));
      } else {
        response = await fetch(`${API_URL}/api/concesionarios`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`Error al crear: ${response.status} ${response.statusText}`);
        responseData = await response.json();
        setRows([...rows, responseData]);
      }
      handleCancel(); // Resetear formulario y estados de edición
    } catch (err) {
      console.error("Error al enviar el formulario:", err);
      setError(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = idx => {
    const recordToEdit = rows[idx];
    setForm({
      id: recordToEdit.id,
      marca: recordToEdit.marca,
      sucursal: recordToEdit.sucursal,
      aspirante: recordToEdit.aspirante
    });
    setEditingRowIndex(idx);
    setIsAnyRowEditing(true);
  };

  const handleCancel = () => {
    setEditingRowIndex(null);
    setForm(initialFormState);
    setIsAnyRowEditing(false);
  };

  const handleDelete = async idx => {
    const recordToDelete = rows[idx];
    if (!recordToDelete || !recordToDelete.id) {
      alert("Error: No se puede eliminar un registro sin ID.");
      return;
    }

    if (window.confirm(`¿Está seguro de que desea eliminar el concesionario ${recordToDelete.marca} - ${recordToDelete.aspirante}?`)) {
      setIsSaving(true); // Usar isSaving también para la operación de borrado para deshabilitar botones
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/concesionarios/${recordToDelete.id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          let errorBody = '';
          try { errorBody = await response.text(); } catch (e) { /* ignorar */ }
          throw new Error(`Error al eliminar: ${response.status} ${response.statusText}. ${errorBody}`);
        }
        setRows(rows.filter(row => row.id !== recordToDelete.id));
        if (form.id === recordToDelete.id) {
          handleCancel();
        }
      } catch (err) {
        console.error("Error al eliminar el registro:", err);
        setError(err.message);
        alert(`Error: ${err.message}`);
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="crud-layout">
      <FormCard
        values={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        editMode={form.id !== null}
        onInitiateCreate={handleCancel} // <--- Añadir esta línea
        isSubmitting={isSaving} // Usar isSaving para el estado de envío
        isRowEditingActive={isAnyRowEditing} // Para cambiar botones del formulario a iconos
        iconConfirmarSrc={IconConfirmarBoton} // Corregido: Usar Icon_confirmar.svg para el botón de Confirmar/Crear
        iconCancelarSrc={IconCancelarBoton}   // Ruta al icono de cancelar
      />
      <div>
        {isLoading && rows.length === 0 && <p>Cargando concesionarios...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {(!isLoading || rows.length > 0) && !error && (
          <CrudTable
            rows={rows}
            onEdit={handleEdit}
            onDelete={handleDelete}
            editingRowIndex={editingRowIndex}
            isAnyRowEditing={isAnyRowEditing}
            onConfirmEdit={handleSubmit} // Conectar icono de confirmar de la fila al submit del formulario
            onCancelEdit={handleCancel}   // Conectar icono de cancelar de la fila al cancel del formulario
          />
        )}
        {rows.length === 0 && !isLoading && !error && <p>No hay concesionarios para mostrar.</p>}

    
        {/* Nuevo div para la imagen centrada */}
        <div style={{ textAlign: 'center', marginTop: '6rem' }}>
          <img src={ImagoLogotipo} alt="Motivion Logotipo" className="imagotipo-animated" style={{ width: '200px', marginLeft: '-480px' }} /> {/* Ajusta '-50px' para moverla más a la izquierda desde el centro */}
        </div>
      </div>
    </div>
  );
};

export default CrudPage;

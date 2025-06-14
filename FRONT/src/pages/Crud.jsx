import { useState } from 'react';
import FormCard from '../components/FormCard';
import CrudTable from '../components/CrudTable';
import IconUbicacion from "../assets/Icon_puntoubicacion.svg";
import '../index.css'; // o '../styles/main.css' si prefieres

const initialRows = [
  { marca: 'Mazda', sucursal: 'Chapinero', aspirante: 'David Sandoval' },
  { marca: 'Mercedes', sucursal: 'Localidad', aspirante: 'Nombre Apellido' },
  { marca: 'Ford', sucursal: 'Localidad', aspirante: 'Nombre Apellido' },
  { marca: 'Renault', sucursal: 'Localidad', aspirante: 'Nombre Apellido' },
  { marca: 'Chevrolet', sucursal: 'Localidad', aspirante: 'Nombre Apellido' },
  { marca: 'Volkswagen', sucursal: 'Localidad', aspirante: 'Nombre Apellido' },
  { marca: 'Susuki', sucursal: 'Localidad', aspirante: 'Nombre Apellido' },
  { marca: 'KIA', sucursal: 'Localidad', aspirante: 'Nombre Apellido' },
  { marca: 'Hyunday', sucursal: 'Localidad', aspirante: 'Nombre Apellido' },
  { marca: 'Honda', sucursal: 'Localidad', aspirante: 'Nombre Apellido' },
  { marca: 'Volvo', sucursal: 'Localidad', aspirante: 'Nombre Apellido' },
];

const CrudPage = () => {
  const [rows, setRows] = useState(initialRows);
  const [form, setForm] = useState({ marca: '', sucursal: '', aspirante: '' });
  const [editingRowIndex, setEditingRowIndex] = useState(null);

  // Maneja cambios en los inputs
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // Crear nuevo registro
  const handleSubmit = e => {
    e.preventDefault();
    if (!form.marca || !form.sucursal || !form.aspirante) return;
    if (editingRowIndex !== null) {
      // Editar
      handleEditConfirm();
    } else {
      // Crear
      setRows([...rows, { ...form }]);
      setForm({ marca: '', sucursal: '', aspirante: '' });
    }
  };

  // Confirmar edición (separado para claridad)
  const handleEditConfirm = () => {
    const updated = [...rows];
    updated[editingRowIndex] = { ...form };
    setRows(updated);
    setEditingRowIndex(null);
    setForm({ marca: '', sucursal: '', aspirante: '' });
  };

  // Editar fila
  const handleEdit = idx => {
    setForm(rows[idx]);
    setEditingRowIndex(idx);
  };

  // Cancelar edición o formulario
  const handleCancel = () => {
    setEditingRowIndex(null);
    setForm({ marca: '', sucursal: '', aspirante: '' });
  };

  // Eliminar fila
  const handleDelete = idx => {
    setRows(rows.filter((_, i) => i !== idx));
    handleCancel();
  };

  return (
    <div className="crud-layout">
      <FormCard
        values={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        editMode={editingRowIndex !== null}
      />
      <div>
        <CrudTable
          rows={rows}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onConfirm={handleEditConfirm}
          onCancel={handleCancel}
          editingRowIndex={editingRowIndex}
        />
        <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--grey-1)' }}>
          <img src={IconUbicacion} alt="Ubicación" width="20" style={{ marginRight: '5px' }} />
          Datos ubicados en el sistema general de usuarios
        </div>
      </div>
    </div>
  );
};

export default CrudPage;
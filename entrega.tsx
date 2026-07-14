import React, { useState, useEffect, useRef } from 'react';
import { FileDown, User, Monitor, Trash2, Globe, FileText, Plus } from 'lucide-react';

export default function App() {
  const [isPdfReady, setIsPdfReady] = useState(false);
  const [registrosAltas, setRegistrosAltas] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    idioma: 'es',
    nombre: '',
    lugar: '',
    fecha: '',
    peticion: '',
  });

  const [equipos, setEquipos] = useState([
    { tipo: 'PC', marca: '', modelo: '', serial: '' },
    { tipo: 'Monitor', marca: '', modelo: '', serial: '' },
    { tipo: 'Portátil', marca: '', modelo: '', serial: '' },
    { tipo: 'Teléfono Móvil', marca: '', modelo: '', serial: '' },
  ]);

  const pdfRef = useRef<HTMLDivElement>(null);

  // Cargar html2pdf dinámicamente
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.async = true;
    script.onload = () => setIsPdfReady(true);
    document.body.appendChild(script);

    // Set default date
    const today = new Date();
    const formattedDate = `${today.getDate()} de ${today.toLocaleString('es-ES', { month: 'long' })} de ${today.getFullYear()}`;
    setFormData(prev => ({ ...prev, fecha: formattedDate, lugar: 'Paterna (Valencia)' }));

    // Cargar datos de Altas
    const loadAltasData = () => {
      const savedAltas = localStorage.getItem('cartasData');
      if (savedAltas) {
        try {
          const parsed = JSON.parse(savedAltas);
          setRegistrosAltas(parsed);
          // Opcional: preseleccionar el primer registro
          if (parsed.length > 0) {
            const record = parsed[0];
            setFormData(prev => ({
              ...prev,
              nombre: record['Nombre Completo Normalizado'] || record['Nombre Normalizado'] || '',
              lugar: record['Delegacion'] || 'Paterna (Valencia)',
              peticion: record['Iniciales'] || record['FecPEDIDO'] || record['DatPEDIDO'] || '',
              fecha: record['FecALTA'] || record['Fecha'] || prev.fecha
            }));
          }
        } catch (e) {}
      }
    };

    loadAltasData();

    // Escuchar cambios en localStorage
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'cartasData') {
        loadAltasData();
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: value
    }));
  };

  const handleEquipoChange = (index: number, field: string, value: string) => {
    const newEquipos = [...equipos];
    (newEquipos[index] as any)[field] = value;
    setEquipos(newEquipos);
  };

  const addEquipo = () => {
    setEquipos([...equipos, { tipo: 'Otros', marca: '', modelo: '', serial: '' }]);
  };

  const removeEquipo = (index: number) => {
    const newEquipos = equipos.filter((_, i) => i !== index);
    setEquipos(newEquipos);
  };

  const generatePDF = () => {
    if (!isPdfReady || !(window as any).html2pdf) {
      alert('El motor de PDF aún se está cargando. Inténtalo de nuevo en unos segundos.');
      return;
    }

    const element = pdfRef.current;
    if (!element) return;

    element.classList.add('exporting-pdf');

    const opt = {
      margin: 0,
      filename: formData.nombre ? `Entrega_${formData.nombre.replace(/\s+/g, '_')}.pdf` : 'Entrega.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    (window as any).html2pdf().set(opt).from(element).save().then(() => {
      element.classList.remove('exporting-pdf');
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans">
      {/* PANEL IZQUIERDO - FORMULARIO */}
      <div className="w-full md:w-1/3 bg-white md:border-r border-gray-200 p-6 md:overflow-y-auto md:h-screen shadow-lg z-10">
        <div className="flex items-center gap-2 mb-6 text-blue-600">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Water_drop_icon.svg/512px-Water_drop_icon.svg.png" alt="Logo" className="w-6 h-6 opacity-80 filter invert-20" />
          <h1 className="text-xl font-bold">Generador Entrega Equipos</h1>
        </div>

        <button
          onClick={generatePDF}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md font-semibold flex items-center justify-center gap-2 transition-colors mb-6"
        >
          <FileDown size={20} /> Generar PDF Oficial
        </button>

        <div className="space-y-6">
          {/* Precargar de Altas */}
          {registrosAltas.length > 0 && (
            <section className="bg-white p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-yellow-800 flex items-center gap-2">
                  <User size={16} /> Precargar datos de Altas
                </label>
                <button
                  onClick={() => {
                    if (window.confirm('¿Estás seguro de que quieres eliminar todos los registros de altas precargados?')) {
                      localStorage.removeItem('cartasData');
                      setRegistrosAltas([]);
                    }
                  }}
                  className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded-md transition-colors flex items-center gap-1 text-xs"
                  title="Limpiar registros"
                >
                  <Trash2 size={14} /> Limpiar
                </button>
              </div>
              <select 
                className="w-full text-sm border-yellow-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500 p-2 border bg-white"
                onChange={(e) => {
                  if (e.target.value === "") return;
                  const record = registrosAltas[parseInt(e.target.value)];
                  if (record) {
                    setFormData(prev => ({
                      ...prev,
                      nombre: record['Nombre Completo Normalizado'] || record['Nombre Normalizado'] || '',
                      lugar: record['Delegacion'] || 'Paterna (Valencia)',
                      peticion: record['Iniciales'] || record['FecPEDIDO'] || record['DatPEDIDO'] || '',
                      fecha: record['FecALTA'] || record['Fecha'] || prev.fecha
                    }));
                  }
                }}
              >
                <option value="">-- Seleccionar un alta --</option>
                {registrosAltas.map((r, i) => (
                  <option key={i} value={i}>{r['Nombre Completo Normalizado'] || r['Nombre Normalizado']} ({r['Cargo']} - {r['Delegacion']})</option>
                ))}
              </select>
            </section>
          )}

          {/* Idioma del Documento */}
          <section className="bg-white p-4 rounded-lg border border-green-100">
            <h2 className="text-sm font-semibold text-green-800 flex items-center gap-2 mb-3">
              <Globe size={16} /> Idioma del Documento
            </h2>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="idioma" value="es" checked={formData.idioma === 'es'} onChange={handleChange} className="text-green-600 focus:ring-green-500" />
                Español
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="idioma" value="pt" checked={formData.idioma === 'pt'} onChange={handleChange} className="text-green-600 focus:ring-green-500" />
                Português (PT)
              </label>
            </div>
          </section>

          {/* Datos del Empleado */}
          <section>
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3 border-b pb-2">
              <User size={16} /> Datos del Empleado
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Nombre Completo</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="Ej. Juan Pérez" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">REF/Pedido</label>
                <input type="text" name="peticion" value={formData.peticion} onChange={handleChange} className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
              </div>
            </div>
          </section>

          {/* Entrega de Equipos */}
          <section>
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3 border-b pb-2">
              <Monitor size={16} /> Entrega de Recursos IT
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Lugar de firma</label>
                <input type="text" name="lugar" value={formData.lugar} onChange={handleChange} className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="Paterna (Valencia)" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Fecha</label>
                <input type="text" name="fecha" value={formData.fecha} onChange={handleChange} className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="26 de Junio de 2026" />
              </div>
            </div>

            <div className="space-y-2">
              {equipos.map((eq, index) => (
                <div key={index} className="bg-gray-50 p-2 rounded border text-xs">
                  <div className="flex justify-between items-center mb-2">
                    <input
                      type="text"
                      value={eq.tipo}
                      onChange={(e) => handleEquipoChange(index, 'tipo', e.target.value)}
                      className="font-semibold bg-transparent border-none p-0 focus:ring-0 w-24"
                    />
                    <button onClick={() => removeEquipo(index)} className="text-red-500 hover:text-red-700 p-1">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" placeholder="Marca" value={eq.marca} onChange={(e) => handleEquipoChange(index, 'marca', e.target.value)} className="w-full p-1 border rounded" />
                    <input type="text" placeholder="Modelo" value={eq.modelo} onChange={(e) => handleEquipoChange(index, 'modelo', e.target.value)} className="w-full p-1 border rounded" />
                    <input type="text" placeholder="IMEI/Serial" value={eq.serial} onChange={(e) => handleEquipoChange(index, 'serial', e.target.value)} className="w-full p-1 border rounded" />
                  </div>
                </div>
              ))}
              <button onClick={addEquipo} className="w-full py-2 text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 flex items-center justify-center gap-1 mt-2">
                <Plus size={14} /> Añadir otro equipo
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* PANEL DERECHO - VISTA PREVIA DEL DOCUMENTO */}
      <div className="w-full md:w-2/3 bg-gray-200 md:overflow-y-auto p-4 flex flex-col items-center">
        <div className="mb-4 text-gray-500 flex items-center gap-2 text-sm">
          <FileText size={16} /> Vista Previa del Documento (A4)
        </div>

        {/* Contenedor principal que se exportará a PDF */}
        <div
          ref={pdfRef}
          className="pdf-container"
          style={{
            fontFamily: 'Arial, Helvetica, sans-serif',
            color: '#000000',
          }}
        >
          <style>{`
            .pdf-container {
              width: 210mm;
              margin: 0 auto;
            }
            .exporting-pdf {
              margin: 0 !important;
            }
            .pdf-page {
              width: 210mm;
              height: 297mm;
              padding: 25mm 20mm;
              background: white;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              box-sizing: border-box;
              font-size: 10pt;
              line-height: 1.25;
              position: relative;
              overflow: hidden;
              display: flex;
              flex-direction: column;
            }
            .exporting-pdf .pdf-page {
              margin: 0 !important;
              box-shadow: none !important;
              height: 296mm !important;
            }
            .pdf-table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0;
            }
            .pdf-table th, .pdf-table td {
              border: 0.6px solid #00509a;
              padding: 6px 10px;
              text-align: left;
            }
            .pdf-table th {
              background-color: #f3f4f6;
              font-weight: bold;
            }
            .text-justify { text-align: justify; }
            .font-bold { font-weight: bold; }
            .mb-2 { margin-bottom: 0.5rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mt-6 { margin-top: 1.5rem; }
            .small-text { font-size: 10pt; line-height: 1.15; }
          `}</style>

          {/* ================= PÁGINA 1: ENTREGA DE EQUIPOS ================= */}
          <div className="pdf-page text-justify small-text" id="page-1">
            <h2 className="font-bold mb-4" style={{ fontSize: '10pt' }}>{formData.peticion ? `REF. - ${formData.peticion} - ` : ''}Entrega de recursos informáticos</h2>
            <p className="mb-4" style={{ fontSize: '10pt' }}>
              {formData.idioma === 'pt'
                ? <>Em <strong>{formData.lugar || 'Paterna (Valencia)'}</strong>, a <strong>{formData.fecha || '________________________'}</strong>.</>
                : <>En <strong>{formData.lugar || 'Paterna (Valencia)'}</strong>, a <strong>{formData.fecha || '________________________'}</strong>.</>}
            </p>

            <p className="mb-4" style={{ fontSize: '10pt' }}>
              {formData.idioma === 'pt'
                ? <>O(A) Sr(a). <strong>{formData.nombre || '_____________________________________'}</strong> Colaborador(a) da Aquaservice, recebe o material propriedade da empresa, conforme pedido efetuado pelo departamento de Pessoas e Cultura ao departamento de IT para o desempenho das funções inerentes ao seu posto de trabalho.</>
                : <>D./Dña. <strong>{formData.nombre || '_____________________________________'}</strong> Empleado/a de Aquaservice, ubicado/a en la oficina recibe el material propiedad de la empresa, según petición realizada por el departamento de Personas y Cultura al departamento de IT para la realización de las funciones derivadas de su puesto trabajo.</>}
            </p>

            <table className="pdf-table" style={{ fontSize: '10pt' }}>
              <thead>
                <tr>
                  <th>{formData.idioma === 'pt' ? 'Descrição' : 'Descripción'}</th>
                  <th>Marca</th>
                  <th>Modelo</th>
                  <th>{formData.idioma === 'pt' ? 'IMEI / Série' : 'IMEI / Serial'}</th>
                </tr>
              </thead>
              <tbody>
                {equipos.map((eq, i) => (
                  <tr key={i}>
                    <td>{formData.idioma === 'pt' && eq.tipo === 'Teléfono Móvil' ? 'Telemóvel' : eq.tipo}</td>
                    <td>{eq.marca}</td>
                    <td>{eq.modelo}</td>
                    <td>{eq.serial}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="font-bold mt-6 mb-2" style={{ fontSize: '10pt' }}>{formData.idioma === 'pt' ? 'O Colaborador manifesta que:' : 'El Empleado manifiesta que:'}</p>
            <p className="mb-2" style={{ fontSize: '10pt' }}>
              {formData.idioma === 'pt'
                ? 'Os equipamentos aqui descritos, bem como qualquer outro que lhe venha a ser entregue pela empresa para a realização do seu trabalho, são propriedade exclusiva da Aquaservice. Em caso de cessação do contrato de trabalho, entrega de novos equipamentos, ou a pedido da empresa, o(a) Colaborador(a) compromete-se a proceder à sua devolução imediata. No caso de telemóveis, isto inclui a colaboração do(a) Colaborador(a) para desvincular o terminal do utilizador.'
                : 'Los equipos aquí detallados, así como cualquier otro, que le fuera entregada por la empresa para la realización de su trabajo, es propiedad exclusiva de Aquaservice. En caso de terminación del contrato de trabajo, entrega de nuevos equipos, o a requerimiento de la empresa el Empleado/a se compromete a realizar la devolución de forma inmediata. En el caso de teléfonos móviles el Empleado/a esto incluye la colaboración para eliminar la vinculación del terminal con el usuario.'}
            </p>
            <p className="mb-2" style={{ fontSize: '10pt' }}>
              {formData.idioma === 'pt'
                ? 'O trabalhador autoriza expressamente a empresa, mediante a assinatura deste documento, a descontar nos salários pendentes e no acerto de contas o valor dos equipamentos quando estes não forem devolvidos em qualquer dos casos mencionados anteriormente.'
                : 'El trabajador autoriza expresamente a la empresa mediante la firma de este documento a descontar de salarios pendientes la liquidación de prestaciones el valor de los equipos cuando estos no sean devueltos en cualquiera de los casos mencionados anteriormente.'}
            </p>
            <p className="mb-2" style={{ fontSize: '10pt' }}>
              {formData.idioma === 'pt'
                ? <>Perante qualquer situação de perda ou roubo do mesmo, deve-se notificar o departamento de T.I. através de <strong style={{ color: '#00509a' }}>https://aquaservice.atlassian.net/servicedesk</strong> clicando no botão de nova incidência.</>
                : <>Ante cualquier incidencia de pérdida o robo del mismo se debe notificar al departamento de T.I. a través de <strong style={{ color: '#00509a' }}>https://aquaservice.atlassian.net/servicedesk</strong> pulsando el botón nueva incidencia.</>}
            </p>
            <p className="mb-2 font-bold" style={{ fontSize: '10pt' }}>
              {formData.idioma === 'pt'
                ? 'Lembramos que os documentos devem ser guardados na drive Google Drive ou na unidade partilhada A. Não nos responsabilizamos pela perda de qualquer ficheiro guardado localmente.'
                : 'Recuerda que los documentos deben guardarse en la unidad Google Drive o en la unidad compartida A, no nos haremos responsables de perdida de cualquier archivo guardado en local.'}
            </p>
            <p className="mb-6" style={{ fontSize: '10pt' }}>
              {formData.idioma === 'pt'
                ? <>Também nos pode ligar para o número <strong>961415503</strong> para qualquer esclarecimento.</>
                : <>También nos puede llamar al teléfono <strong>961415503</strong> para cualquier aclaración.</>}
            </p>

            <div style={{ fontSize: '10pt' }}>
              <p>
                {formData.idioma === 'pt'
                  ? <>Em <strong>{formData.lugar || '________________'}</strong>, a <strong>{formData.fecha || '________________________'}</strong></>
                  : <>En <strong>{formData.lugar || '________________'}</strong>, a <strong>{formData.fecha || '________________________'}</strong></>}
              </p>
              <br /><br /><br />
              <p>{formData.idioma === 'pt' ? 'Assinado:' : 'Firmado:'}</p>
            </div>
            <img src="logo.png" style={{ position: 'absolute', bottom: '20mm', right: '20mm', width: '210px' }} alt="Logo Aquaservice" />
          </div>

        </div>
      </div>
    </div>
  );
}

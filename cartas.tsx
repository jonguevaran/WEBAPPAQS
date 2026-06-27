import React, { useState, useEffect, useRef } from 'react';
import { FileDown, User, Monitor, Shield, Mail, FileText, Plus, Trash2, Globe } from 'lucide-react';

export default function App() {
  const [isPdfReady, setIsPdfReady] = useState(false);
  const [registrosAltas, setRegistrosAltas] = useState([]);

  const [formData, setFormData] = useState({
    idioma: 'es',
    tipoPlantilla: 'con_correo',
    nombre: '',
    departamento: '',
    delegacion: '',
    iniciales: '',
    usuario: '',
    passWindows: '',
    usuarioCrm: '',
    passCrm: '',
    fechaLugar: '', // ej. "Paterna (Valencia), a 26 de Junio de 2026"
    lugar: '',
    fecha: '',
  });

  const [equipos, setEquipos] = useState([
    { tipo: 'PC', marca: '', modelo: '', serial: '' },
    { tipo: 'Monitor', marca: '', modelo: '', serial: '' },
    { tipo: 'Portátil', marca: '', modelo: '', serial: '' },
    { tipo: 'Teléfono Móvil', marca: '', modelo: '', serial: '' },
  ]);

  const pdfRef = useRef(null);

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
              departamento: record['Cargo'] || '',
              delegacion: record['Delegacion'] || '',
              lugar: record['Delegacion'] || 'Paterna (Valencia)',
              iniciales: record['Iniciales'] || '',
              usuario: record['Usuario'] || (record['Email'] ? record['Email'].split('@')[0] : ''),
              usuarioCrm: record['Usuario'] || (record['Email'] ? record['Email'].split('@')[0] : '')
            }));
          }
        } catch (e) {}
      }
    };

    loadAltasData();

    // Escuchar cambios en localStorage
    const handleStorage = (e) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: value,
      ...(name === 'delegacion' ? { lugar: value || 'Paterna (Valencia)' } : {})
    }));
  };

  const handleEquipoChange = (index, field, value) => {
    const newEquipos = [...equipos];
    newEquipos[index][field] = value;
    setEquipos(newEquipos);
  };

  const addEquipo = () => {
    setEquipos([...equipos, { tipo: 'Otros', marca: '', modelo: '', serial: '' }]);
  };

  const removeEquipo = (index) => {
    const newEquipos = equipos.filter((_, i) => i !== index);
    setEquipos(newEquipos);
  };

  const generatePDF = () => {
    if (!isPdfReady || !window.html2pdf) {
      alert('El motor de PDF aún se está cargando. Inténtalo de nuevo en unos segundos.');
      return;
    }

    const element = pdfRef.current;
    const opt = {
      margin: 0, // Margen manejado por CSS interno
      filename: `Carta_Bienvenida_${formData.nombre.replace(/\s+/g, '_') || 'Empleado'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    window.html2pdf().set(opt).from(element).save();
  };

  // Firma SVG para imitar la original
  const SignatureSVG = () => (
    <svg width="200" height="100" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 180 C 150 120, 250 80, 380 40" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M190 120 C 230 180, 280 140, 240 90 C 220 60, 210 50, 220 20 C 225 10, 230 15, 225 35 C 210 100, 180 130, 300 80" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans">

      {/* PANEL IZQUIERDO - FORMULARIO */}
      <div className="w-full md:w-1/3 bg-white border-r border-gray-200 p-6 overflow-y-auto h-screen shadow-lg z-10">
        <div className="flex items-center gap-2 mb-6 text-blue-600">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Water_drop_icon.svg/512px-Water_drop_icon.svg.png" alt="Logo" className="w-6 h-6 opacity-80 filter invert-20" />
          <h1 className="text-xl font-bold">Generador Aquaservice</h1>
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
            <section className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <label className="block text-sm font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                <User size={16} /> Precargar datos de Altas
              </label>
              <select 
                className="w-full text-sm border-yellow-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500 p-2 border bg-white"
                onChange={(e) => {
                  if (e.target.value === "") return;
                  const record = registrosAltas[parseInt(e.target.value)];
                  if (record) {
                    setFormData(prev => ({
                      ...prev,
                      nombre: record['Nombre Completo Normalizado'] || record['Nombre Normalizado'] || '',
                      departamento: record['Cargo'] || '',
                      delegacion: record['Delegacion'] || '',
                      lugar: record['Delegacion'] || 'Paterna (Valencia)',
                      iniciales: record['Iniciales'] || '',
                      usuario: record['Usuario'] || (record['Email'] ? record['Email'].split('@')[0] : ''),
                      usuarioCrm: record['Usuario'] || (record['Email'] ? record['Email'].split('@')[0] : '')
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
          {/* Tipo de Plantilla */}
          <section className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h2 className="text-sm font-semibold text-blue-800 flex items-center gap-2 mb-3">
              <Mail size={16} /> Tipo de Plantilla
            </h2>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="tipoPlantilla" value="con_correo" checked={formData.tipoPlantilla === 'con_correo'} onChange={handleChange} className="text-blue-600 focus:ring-blue-500" />
                Con Correo
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="radio" name="tipoPlantilla" value="sin_correo" checked={formData.tipoPlantilla === 'sin_correo'} onChange={handleChange} className="text-blue-600 focus:ring-blue-500" />
                Sin Correo
              </label>
            </div>
          </section>

          {/* Idioma del Documento */}
          <section className="bg-green-50 p-4 rounded-lg border border-green-100">
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
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Departamento</label>
                  <input type="text" name="departamento" value={formData.departamento} onChange={handleChange} className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Delegación</label>
                  <input type="text" name="delegacion" value={formData.delegacion} onChange={handleChange} className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Iniciales</label>
                  <input type="text" name="iniciales" value={formData.iniciales} onChange={handleChange} className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
                </div>
              </div>
            </div>
          </section>

          {/* Accesos */}
          <section>
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3 border-b pb-2">
              <Shield size={16} /> Credenciales de Acceso
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Usuario (@aquaservice.com)</label>
                <div className="flex">
                  <input type="text" name="usuario" value={formData.usuario} onChange={handleChange} className="w-full text-sm border-gray-300 rounded-l-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="jperez" />
                  <span className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-md px-3 py-2 text-sm text-gray-500">@aquaservice.com</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Pass Windows</label>
                  <input type="text" name="passWindows" value={formData.passWindows} onChange={handleChange} className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Usuario CRM</label>
                  <input type="text" name="usuarioCrm" value={formData.usuarioCrm} onChange={handleChange} className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Pass CRM</label>
                <input type="text" name="passCrm" value={formData.passCrm} onChange={handleChange} className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" />
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
      <div className="w-full md:w-2/3 bg-gray-200 overflow-y-auto p-4 flex flex-col items-center">
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
            .pdf-page {
              width: 210mm;
              min-height: 297mm;
              padding: 25mm 20mm;
              margin-bottom: 20px;
              background: white;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
              box-sizing: border-box;
              font-size: 11pt;
              line-height: 1.25;
              position: relative;
            }
            .pdf-table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0;
            }
            .pdf-table th, .pdf-table td {
              border: 1px solid #000;
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
            .mt-6 { margin-top: 1.5rem; }
            .mt-12 { margin-top: 3rem; }
            .small-text { font-size: 8.5pt; line-height: 1.15; }
            .list-disc { padding-left: 20px; margin-bottom: 10px; }
            .list-disc li { margin-bottom: 4px; }
            @media print {
              .pdf-page {
                box-shadow: none;
                margin: 0;
                page-break-after: always;
              }
            }
          `}</style>

          {/* ================= PÁGINA 1: CARTA DE BIENVENIDA ================= */}
          <div className="pdf-page" id="page-1">
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '5px', marginBottom: '30px' }}>
              <div className="font-bold">{formData.idioma === 'pt' ? 'À atenção de:' : 'A la atención de:'}</div>
              <div>{formData.nombre || '_____________________'}</div>
              <div className="font-bold">Departamento:</div>
              <div>{formData.departamento || '_____________________'}</div>
              <div className="font-bold">{formData.idioma === 'pt' ? 'Delegação:' : 'Delegación:'}</div>
              <div>{formData.delegacion || '_____________________'}</div>
            </div>

            <p className="mb-4">{formData.idioma === 'pt' ? 'Olá' : 'Hola'} {formData.nombre ? formData.nombre.split(' ')[0] : '_____'}:</p>

            <p className="mb-4 text-justify">
              {formData.idioma === 'pt'
                ? 'Do departamento de Tecnologias de Informação da Aquaservice, queremos dar-te as boas-vindas.'
                : 'Desde el departamento de Tecnologías de la Información de Aquaservice, queremos darte nuestra bienvenida.'}
            </p>

            <p className="mb-4 text-justify">
              {formData.idioma === 'pt' ? 'Criámos o utilizador ' : 'Hemos creado el usuario '}
              <strong>{formData.usuario ? `${formData.usuario}@aquaservice.com` : '@aquaservice.com'}</strong> 
              {formData.idioma === 'pt' ? ' com o qual poderás aceder ao teu computador' : ' con el que podrás entrar a tu ordenador'}
              {formData.tipoPlantilla === 'con_correo' ? (formData.idioma === 'pt' ? ', ao teu correio eletrónico' : ', tu correo electrónico') : ''} 
              {formData.idioma === 'pt' ? ' e às principais aplicações da Aquaservice.' : ' y a las principales aplicaciones de Aquaservice.'}
            </p>

            <p className="mb-4 text-justify">
              {formData.idioma === 'pt'
                ? <>Para alterar a palavra-passe, depois de te explicarem na formação como te ligares à VPN e estiveres ligado, podes premir as teclas <strong>Control + Alt + Delete</strong> e escolher a opção de <strong>alterar palavra-passe</strong>, escolhe uma que possas lembrar facilmente, não a apontes em nenhum lado e o mais importante, certifica-te de que ninguém mais a sabe além de ti. Depois disso, volta a premir <strong>Control + Alt + Delete</strong> e clica em Bloquear, assim já estará completamente alterada.</>
                : <>Para cambiar la contraseña, una te hayan explicado en la formación como conectarte a la vpn y estés conectado, puedes pulsar las teclas <strong>Control + Alt+ Supr</strong> y elegir la opción de <strong>cambiar contraseña</strong>, elige una que puedas recordar fácilmente, no la apuntes en ningún sitio y lo más importante, asegúrate que no la sepa nadie más que tú. Después de eso vuelve a pulsar <strong>Control + Alt+ Supr</strong> y dale a Bloquear, asi ya estará cambiada completamente.</>}
            </p>

            {formData.tipoPlantilla === 'con_correo' && (
              <p className="mb-4 text-justify">
                {formData.idioma === 'pt'
                  ? <>Para aceder ao correio eletrónico, abre o endereço <strong>https://mail.google.com/</strong> e introduz o teu utilizador: <strong>{formData.usuario ? `${formData.usuario}@aquaservice.com` : '@aquaservice.com'}</strong> seguido da tua palavra-passe, muito simples.</>
                  : <>Para acceder al correo electrónico abre la dirección <strong>https://mail.google.com/</strong> y pon tu usuario: <strong>{formData.usuario ? `${formData.usuario}@aquaservice.com` : '@aquaservice.com'}</strong> seguido de tu contraseña, así de fácil.</>}
              </p>
            )}

            <table className="pdf-table">
              <thead>
                <tr>
                  <th>{formData.idioma === 'pt' ? 'Aplicação' : 'Aplicación'}</th>
                  <th>{formData.idioma === 'pt' ? 'Utilizador' : 'Usuario'}</th>
                  <th>{formData.idioma === 'pt' ? 'Palavra-passe' : 'Contraseña'}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Windows</td>
                  <td>{formData.usuario ? `${formData.usuario}@aquaservice.com` : ''}</td>
                  <td>{formData.passWindows}</td>
                </tr>
                <tr>
                  <td>CRM, ULISES</td>
                  <td>{formData.usuarioCrm}</td>
                  <td>{formData.passCrm}</td>
                </tr>
              </tbody>
            </table>

            <p className="mb-4 text-justify mt-6">
              {formData.idioma === 'pt'
                ? 'Além disso, deverás ler e assinar o documento RGPD que te foi entregue juntamente com esta carta.'
                : 'Además, deberás leer y firmar el documento LOPD que se te ha entregado junto con esta carta.'}
            </p>

            <p className="mb-4 text-justify">
              {formData.idioma === 'pt'
                ? <>Se tiveres qualquer problema informático ou precisares de ajuda, podes contactar-nos através de <strong>https://aquaservice.atlassian.net/servicedesk</strong> clicando no botão nova incidência ou usando o botão flutuante no ambiente de trabalho. É importante que faças isto, pois sem um número de incidência não te poderemos atender.</>
                : <>Si tienes cualquier problema informático o necesitas ayuda, puedes ponerte en contacto con nosotros a través <strong>https://aquaservice.atlassian.net/servicedesk</strong> pulsando el botón nueva incidencia o usando el botón del flotador del escritorio. Es importante que hagas esto ya que sin un número de incidencia no podemos atenderte.</>}
            </p>

            <p className="mb-4 text-justify">
              {formData.idioma === 'pt'
                ? <>Também nos podes ligar para o telefone <strong>961415503</strong> se precisares de qualquer esclarecimento, teremos todo o gosto em atender-te.</>
                : <>También nos puedes llamar al teléfono <strong>961415503</strong> si necesitas cualquier aclaración, estaremos encantados de atenderte.</>}
            </p>

            <div className="mt-12">
              <p>{formData.idioma === 'pt' ? 'Com os melhores cumprimentos:' : 'Atentamente:'}</p>
              <div style={{ marginLeft: '-20px', marginTop: '-10px', marginBottom: '-10px' }}>
                <SignatureSVG />
              </div>
              <p className="font-bold">Tomás Mateos Herrero</p>
              <p>{formData.idioma === 'pt' ? 'Diretor do departamento de T.I.' : 'Director del departamento de T.I.'}</p>
            </div>
          </div>

          {/* ================= PÁGINA 2: LOPD ================= */}
          <div className="pdf-page text-justify small-text" id="page-2">
            <h2 className="font-bold text-center mb-4" style={{ fontSize: '11pt' }}>
              {formData.idioma === 'pt'
                ? 'Declaração de registo de utilizador do sistema de informação da Viva Aqua Service Spain S.A.'
                : 'Declaración de alta de usuario de atención de Viva Aqua Service Spain S.A.'}
            </h2>

            <p className="mb-4">
              {formData.idioma === 'pt'
                ? <>O(A) Sr(a). <strong>{formData.nombre || '_____________________________________'}</strong>, membro do departamento <strong>{formData.departamento || '_____________________'}</strong>, maior de idade, declara ter recebido formação e ter sido informado(a) das obrigações que assume como utilizador do sistema de informação da Viva Aqua Service Spain S.A. com acesso a dados pessoais, especialmente as seguintes:</>
                : <>D./Dña. <strong>{formData.nombre || '_____________________________________'}</strong>, miembro del departamento <strong>{formData.departamento || '_____________________'}</strong>, mayor de edad, declara haber sido formado e informado de las obligaciones que asume como usuario del sistema de información de Viva Aqua Service Spain S.A. con acceso a datos personales, especialmente de las siguientes:</>}
            </p>

            <p className="font-bold mb-2">{formData.idioma === 'pt' ? 'Relativamente aos ficheiros automatizados' : 'Con respecto a ficheros automatizados'}</p>
            <p className="font-bold mb-1">{formData.idioma === 'pt' ? '1. Obrigações gerais' : '1. Obligaciones generales'}</p>
            <ul className="list-disc">
              {formData.idioma === 'pt' ? (
                <>
                  <li>Guardar o necessário sigilo em relação a qualquer tipo de informação de caráter pessoal conhecida em função do trabalho desenvolvido, mesmo após o término da relação laboral com a organização.</li>
                  <li>Guardar todos os suportes físicos e/ou documentos que contenham informação com dados de caráter pessoal num local seguro, quando não estiverem a ser utilizados, particularmente fora do horário de trabalho.</li>
                  <li>É proibida a deslocação de qualquer suporte, listagem ou documento com dados de caráter pessoal onde se armazene informação propriedade da organização para fora das instalações da mesma, sem autorização prévia do Encarregado da Proteção de Dados (sat@aquaservice.com). Caso haja necessidade de deslocação ou distribuição de suportes e documentos, tal realizar-se-á cifrando esses dados, ou através de outro mecanismo que impeça o acesso ou manipulação da informação por terceiros.</li>
                  <li>Ficheiros de caráter temporário ou cópias de documentos são aqueles onde se armazenam dados de caráter pessoal, gerados para o cumprimento de uma necessidade determinada ou trabalhos temporários e auxiliares, desde que a sua existência não ultrapasse um mês. Estes ficheiros de caráter temporário ou cópias de documentos devem ser apagados logo que deixem de ser necessários para os fins que motivaram a sua criação e, enquanto estiverem em vigor, deverão cumprir os níveis de segurança atribuídos pelo Responsável de Segurança. Se, decorrido um mês, o utilizador necessitar de continuar a utilizar a informação armazenada no ficheiro, deverá comunicá-lo ao Responsável de Segurança, para adoção das medidas adequadas.</li>
                  <li>As permissões de acesso dos utilizadores são concedidas pelo departamento de IT. Caso algum utilizador necessite, para o desenvolvimento do seu trabalho, de aceder a ficheiros ou documentos aos quais não está autorizado, deverá informar o seu responsável e formalizar o pedido ao departamento de IT.</li>
                  <li>Comunicar ao Responsável de Segurança (ciberseguridad@aquaservice.com), de acordo com o procedimento de notificação, os incidentes de segurança dos quais tenha conhecimento.</li>
                </>
              ) : (
                <>
                  <li>Guardar el necesario secreto respecto a cualquier tipo de información de carácter personal conocida en función del trabajo desarrollado, incluso una vez concluida la relación laboral con la organización.</li>
                  <li>Guardar todos los soportes físicos y/o documentos que contengan información con datos de carácter personal en un lugar seguro, cuando estos no sean usados, particularmente fuera de la jornada laboral.</li>
                  <li>Queda prohibido el traslado de cualquier soporte, listado o documento con datos de carácter personal en los que se almacene información titularidad de la organización fuera de los locales de la misma, sin autorización previa del Responsable de Protección de Datos (sat@aquaservice.com). En el supuesto de existir traslado o distribución de soportes y documentos se realizará cifrando dichos datos, o mediante otro mecanismo que impida el acceso o manipulación de la información por terceros.</li>
                  <li>Ficheros de carácter temporal o copias de documentos son aquellos en los que se almacenan datos de carácter personal, generados para el cumplimiento de una necesidad determinada o trabajos temporales y auxiliares, siempre y cuando su existencia no sea superior a un mes. Estos ficheros de carácter temporal o copias de documentos deben ser borrados una vez hayan dejado de ser necesarios para los fines que motivaron su creación y, mientras estén vigentes, deberán cumplir con los niveles de seguridad asignados por el Responsable de Seguridad. Si, transcurrido el mes, el usuario necesita continuar utilizando la información almacenada en el fichero, deberá comunicarlo al Responsable de Seguridad, para adoptar las medidas oportunas sobre el mismo.</li>
                  <li>Los permisos de acceso de los usuarios son concedidos por el departamento de IT. En el caso de que cualquier usuario requiera, para el desarrollo de su trabajo, acceder a ficheros o documentos a cuyo acceso no está autorizado, deberá ponerlo en conocimiento de su responsable y cursar petición a IT.</li>
                  <li>Comunicar al Responsable de Seguridad (ciberseguridad@aquaservice.com), conforme al procedimiento de notificación, las incidencias de seguridad de las que tenga conocimiento.</li>
                </>
              )}
            </ul>

            <p className="font-bold mb-1 mt-2">{formData.idioma === 'pt' ? '2. Obrigações em relação aos ficheiros automatizados' : '2. Obligaciones respecto de los ficheros automatizados'}</p>
            <ul className="list-disc">
              {formData.idioma === 'pt' ? (
                <>
                  <li>Alterar as palavras-passe a pedido do sistema.</li>
                  <li>Encerrar ou bloquear todas as sessões no final do horário de trabalho ou no caso de ausência temporária do posto de trabalho, a fim de evitar acessos não autorizados.</li>
                  <li>Não copiar a informação contida nos ficheiros onde se armazenam dados de caráter pessoal para o computador pessoal, unidades USB, qualquer outro formato de unidade externa, outros dispositivos portáteis ou qualquer outro suporte sem autorização expressa do respetivo Responsável de Segurança.</li>
                  <li>Guardar todos os ficheiros com dados de caráter pessoal nos espaços corporativos designados dos sistemas da Aquaservice, para facilitar a aplicação das medidas de segurança que lhes correspondam.</li>
                  <li>Os utilizadores estão proibidos de enviar informação de caráter pessoal de nível alto, salvo autorização expressa do Encarregado da Proteção de Dados. Em todo o caso, este envio apenas poderá ser efetuado se forem adotados os mecanismos necessários para evitar que a informação se torne ininteligível ou manipulada por terceiros.</li>
                  <li>Os utilizadores não poderão, salvo autorização expressa do Responsável de Segurança, instalar qualquer tipo de programas informáticos ou dispositivos nem nos servidores centrais nem no computador utilizado no posto de trabalho.</li>
                </>
              ) : (
                <>
                  <li>Cambiar las contraseñas a petición del sistema.</li>
                  <li>Cerrar o bloquear todas las sesiones al término de la jornada laboral o en el supuesto de ausentarse temporalmente de su puesto de trabajo, a fin de evitar accesos no autorizados.</li>
                  <li>No copiar la información contenida en los ficheros en los que se almacenen datos de carácter personal al ordenador personal, unidades USB, cualquier otro formato de unidad externa, otros dispositivos portátiles o a cualquier otro soporte sin autorización expresa del Responsable de Seguridad correspondiente.</li>
                  <li>Guardar todos los ficheros con datos de carácter personal en los espacios corporativos designados de los sistemas de Aquaservice, a fin de facilitar la aplicación de las medidas de seguridad que les correspondan.</li>
                  <li>Los usuarios tienen prohibido el envío de información de carácter personal de nivel alto, salvo autorización expresa del Responsable de Protección de Datos. En todo caso, este envío únicamente podrá realizarse si se adoptan los mecanismos necesarios para evitar que la información no sea inteligible ni manipulada por terceros.</li>
                  <li>Los usuarios no podrán, salvo autorización expresa del Responsable de Seguridad, instalar cualquier tipo de programas informáticos o dispositivos ni en los servidores centrales ni en el ordenador empleado en el puesto de trabajo.</li>
                </>
              )}
            </ul>

            <p className="font-bold mb-1">{formData.idioma === 'pt' ? 'É proibido:' : 'Queda prohibido:'}</p>
            <ul className="list-disc">
              {formData.idioma === 'pt' ? (
                <>
                  <li>Utilizar identificadores e palavras-passe de outros utilizadores para aceder ao sistema.</li>
                  <li>Tentar modificar ou aceder ao registo de acessos habilitado pelo Responsável de Segurança competente.</li>
                  <li>Contornar as medidas de segurança estabelecidas no sistema informático, tentando aceder a ficheiros ou programas cujo acesso não lhe tenha sido permitido.</li>
                  <li>Enviar correos massivos (spam) utilizando o endereço de correio eletrónico corporativo.</li>
                </>
              ) : (
                <>
                  <li>Emplear identificadores y contraseñas de otros usuarios para acceder al sistema.</li>
                  <li>Intentar modificar o acceder al registro de accesos habilitado por el Responsable de Seguridad competente.</li>
                  <li>Burlar las medidas de seguridad establecidas en el sistema informático, intentando acceder a ficheros o programas cuyo acceso no le haya sido permitido.</li>
                  <li>Enviar correos masivos (spam) empleando la dirección de correo electrónico corporativa.</li>
                </>
              )}
            </ul>
            <p className="mb-4">
              {formData.idioma === 'pt'
                ? 'E em geral, a utilização da rede corporativa, sistemas informáticos e qualquer meio colocado à disposição do utilizador que viole o direito de terceiros, os da própria organização, ou para a realização de atos que possam ser considerados ilícitos. Estas obrigações apenas serão exigíveis aos utilizadores de ficheiros automatizados, desde que a organização disponibilize os meios adequados em cada caso.'
                : 'Y en general, el empleo de la red corporativa, sistemas informáticos y cualquier medio puesto al alcance del usuario vulnerando el derecho de terceros, los propios de la organización, o bien para la realización de actos que pudieran ser considerados ilícitos. Estas obligaciones sólo serán exigibles a los usuarios de ficheros automatizados, en tanto en cuanto la organización disponga los medios adecuados en cada caso.'}
            </p>

            <p className="font-bold mb-2">{formData.idioma === 'pt' ? 'Relativamente aos ficheiros não automatizados' : 'Con respecto a ficheros no automatizados'}</p>
            <ul className="list-disc">
              {formData.idioma === 'pt' ? (
                <>
                  <li>Guardar o necessário sigilo em relação a qualquer tipo de informação de caráter pessoal conhecida no decorrer do trabalho desenvolvido, mesmo após a conclusão da relação laboral com a entidade.</li>
                  <li>Comunicar ao Responsável de Segurança, conforme o procedimento de notificação, os incidentes de segurança dos quais tenha conhecimento.</li>
                  <li>É proibida a deslocação de qualquer listagem ou documento análogo com dados de caráter pessoal onde se armazene informação propriedade da entidade para fora das instalações da mesma.</li>
                  <li>Guardar todos os suportes físicos ou documentos que contenham informação com dados de caráter pessoal num local seguro, quando não estiverem a ser utilizados, particularmente fora do horário de trabalho.</li>
                  <li>Assegurar-se de que não ficam documentos impressos contendo dados protegidos na bandeja de saída da impressora.</li>
                </>
              ) : (
                <>
                  <li>Guardar el necesario secreto respecto a cualquier tipo de información de carácter personal conocida en función del trabajo desarrollado, incluso una vez concluida la relación laboral con la entidad.</li>
                  <li>Comunicar al Responsable de Seguridad, conforme al procedimiento de notificación, las incidencias de seguridad de las que tenga conocimiento.</li>
                  <li>Queda prohibido el traslado de cualquier listado o documento análogo con datos de carácter personal en los que se almacene información titularidad de la entidad fuera de los locales de la misma.</li>
                  <li>Guardar todos los soportes físicos o documentos que contengan información con datos de carácter personal en un lugar seguro, cuando estos no sean usados, particularmente fuera de la jornada laboral.</li>
                  <li>Asegurarse de que no quedan documentos impresos que contengan datos protegidos impresos en la bandeja de salida de la impresora.</li>
                </>
              )}
            </ul>
          </div>

          {/* ================= PÁGINA 3: LOPD CONT. / ENTREGA DE EQUIPOS ================= */}
          <div className="pdf-page text-justify small-text" id="page-3">
            <ul className="list-disc mb-4">
              {formData.idioma === 'pt' ? (
                <>
                  <li>Apenas as pessoas autorizadas poderão introduzir, modificar ou anular os dados contidos nos ficheiros objeto de proteção. As permissões de acesso dos utilizadores aos diferentes ficheiros são concedidas pelo Responsável de Segurança. Caso algum utilizador necessite, para o desenvolvimento do seu trabalho, de aceder a ficheiros cujo acesso não lhe está autorizado, deverá dar conhecimento ao Responsável de Segurança.</li>
                  <li>Ficheiros de caráter temporário são aqueles nos quais se armazenam dados de caráter pessoal, gerados para o cumprimento de uma necessidade determinada, desde que a sua existência não ultrapasse um mês. Os ficheiros de caráter temporário devem ser destruídos assim que deixem de ser necessários para os fins que motivaram a sua criação e, enquanto estiverem em vigor, deverão ser contempladas as medidas de segurança contidas neste documento.</li>
                </>
              ) : (
                <>
                  <li>Únicamente las personas autorizadas para ello podrán introducir, modificar o anular los datos contenidos en los ficheros objeto de protección. Los permisos de acceso de los usuarios a los diferentes ficheros son concedidos por el Responsable de Seguridad. En el caso de que cualquier usuario requiera, para el desarrollo de su trabajo, acceder a ficheros a cuyo acceso no está autorizado, deberá ponerlo en conocimiento del Responsable de Seguridad.</li>
                  <li>Ficheros de carácter temporal son aquellos en los que se almacenan datos de carácter personal, generados para el cumplimiento de una necesidad determinada, siempre y cuando su existencia no sea superior a un mes. Los ficheros de carácter temporal deben ser destruidos una vez hayan dejado de ser necesarios para los fines que motivaron su creación y, mientras estén vigentes, deberán contemplarse las medidas de seguridad contenidas en este documento.</li>
                </>
              )}
            </ul>

            <p className="font-bold mb-2">{formData.idioma === 'pt' ? 'Relativamente às obrigações como utilizador' : 'Con respecto a las obligaciones como usuario'}</p>
            <ul className="list-disc">
              {formData.idioma === 'pt' ? (
                <>
                  <li>O correio eletrónico é considerado pela entidade como um elemento fundamental para as comunicações dentro da organização... É proibida a sua utilização para fins não relacionados com as funções laborais incumbidas.</li>
                  <li>Os utilizadores não poderão, salvo autorização expressa do Responsável de Segurança, instalar qualquer tipo de programas informáticos.</li>
                  <li>Conhecer a existência dos direitos dos titulares dos dados (direito de acesso, retificação, eliminação e, se for o caso, oposição).</li>
                </>
              ) : (
                <>
                  <li>El correo electrónico es considerado por la entidad como elemento fundamental para las comunicaciones entre la organización... Queda prohibido el uso del mismo para fines no relacionados con las funciones laborales encomendadas.</li>
                  <li>Los usuarios no podrán, salvo autorización expresa del Responsable de Seguridad, instalar cualquier tipo de programas informáticos.</li>
                  <li>Conocer la existencia de derechos de los interesados (derecho acceso, rectificación, cancelación y, en su caso, oposición).</li>
                </>
              )}
            </ul>

            <p className="mb-4">
              {formData.idioma === 'pt'
                ? 'O incumprimento por parte dos utilizadores de qualquer das obrigações aqui estabelecidas será considerado como uma falta grave, aplicando-se as sanções previstas na legislação laboral aplicável à organização para este tipo de faltas.'
                : 'El incumplimiento por parte de los usuarios de cualquiera de las obligaciones aquí establecidas será considerado como una falta grave, imponiéndose las sanciones para este tipo de faltas las previstas en la normativa laboral de aplicación a la organización.'}
            </p>

            <div className="mt-6 mb-8" style={{ fontSize: '11pt' }}>
              <p>
                {formData.idioma === 'pt'
                  ? <>Tudo o que acima declaro sob minha responsabilidade, em <strong>{formData.lugar || '________________'}</strong>, a <strong>{formData.fecha || '________________________'}</strong></>
                  : <>Todo lo cual declaro bajo mi responsabilidad, en <strong>{formData.lugar || '________________'}</strong>, a <strong>{formData.fecha || '________________________'}</strong></>}
              </p>
              <br /><br /><br />
              <p>{formData.idioma === 'pt' ? 'Assinado:' : 'Firmado:'}</p>
            </div>

          </div>

          {/* ================= PÁGINA 4: ENTREGA DE EQUIPOS ================= */}
          <div className="pdf-page text-justify small-text" id="page-4">
            <h2 className="font-bold mb-4" style={{ fontSize: '11pt' }}>Entrega de recursos informáticos {formData.iniciales ? `REF.-${formData.iniciales}` : ''}</h2>
            <p className="mb-4" style={{ fontSize: '11pt' }}>
              {formData.idioma === 'pt'
                ? <>Em <strong>{formData.lugar || 'Paterna (Valencia)'}</strong>, a <strong>{formData.fecha || '________________________'}</strong>.</>
                : <>En <strong>{formData.lugar || 'Paterna (Valencia)'}</strong>, a <strong>{formData.fecha || '________________________'}</strong>.</>}
            </p>

            <p className="mb-4" style={{ fontSize: '11pt' }}>
              {formData.idioma === 'pt'
                ? <>O(A) Sr(a). <strong>{formData.nombre || '_____________________________________'}</strong> Colaborador(a) da Aquaservice, localizado(a) no escritório recebe o material propriedade da empresa, conforme pedido efetuado pelo departamento de Pessoas e Cultura ao departamento de IT para o desempenho das funções inerentes ao seu posto de trabalho.</>
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
                    <td>{eq.tipo}</td>
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
                ? <>Perante qualquer situação de perda ou roubo do mesmo, deve-se notificar o departamento de T.I. através de <strong>https://aquaservice.atlassian.net/servicedesk</strong> clicando no botão de nova incidência.</>
                : <>Ante cualquier incidencia de pérdida o robo del mismo se debe notificar al departamento de T.I. a través de <strong>https://aquaservice.atlassian.net/servicedesk</strong> pulsando el botón nueva incidencia.</>}
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

            <div style={{ fontSize: '11pt' }}>
              <p>
                {formData.idioma === 'pt'
                  ? <>Em <strong>{formData.lugar || '________________'}</strong>, a <strong>{formData.fecha || '________________________'}</strong></>
                  : <>En <strong>{formData.lugar || '________________'}</strong>, a <strong>{formData.fecha || '________________________'}</strong></>}
              </p>
              <br /><br /><br />
              <p>{formData.idioma === 'pt' ? 'Assinado:' : 'Firmado:'}</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
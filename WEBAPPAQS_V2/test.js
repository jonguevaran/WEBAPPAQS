
        // Estructura de datos JSON validada
        let dbAquaservice = null;
        const dataUrl = './DataAlmacenes.json';

        // Datos embebidos como fallback en caso de error al cargar el archivo JSON (por ejemplo, con protocolo file://)
                const rawNewData = [
  {
    "id_centro": 1,
    "nombre_centro": "VALENCIA",
    "almacenes": [
      {
        "id": 135,
        "nombre": "SON CASTELLO"
      },
      {
        "id": 158,
        "nombre": "MANACOR"
      },
      {
        "id": 163,
        "nombre": "PALMA"
      },
      {
        "id": 192,
        "nombre": "SA POBLA"
      },
      {
        "id": 101,
        "nombre": "VALENCIA"
      },
      {
        "id": 102,
        "nombre": "VALENCIA SUR (CATARROJA)"
      },
      {
        "id": 118,
        "nombre": "VALENCIA NORTE (PUIG)"
      },
      {
        "id": 136,
        "nombre": "ALZIRA"
      },
      {
        "id": 193,
        "nombre": "BENISSODA"
      }
    ]
  },
  {
    "id_centro": 2,
    "nombre_centro": "RESIDENCIAL MADRID",
    "almacenes": []
  },
  {
    "id_centro": 3,
    "nombre_centro": "BARCELONA",
    "almacenes": [
      {
        "id": 103,
        "nombre": "BARCELONA"
      },
      {
        "id": 133,
        "nombre": "SANT JOAN DESPI"
      },
      {
        "id": 169,
        "nombre": "TERRASSA"
      },
      {
        "id": 171,
        "nombre": "MARTORELLES"
      },
      {
        "id": 178,
        "nombre": "BARCELONA URBAN"
      },
      {
        "id": 191,
        "nombre": "BARCELONA NORTE"
      }
    ]
  },
  {
    "id_centro": 4,
    "nombre_centro": "ALICANTE",
    "almacenes": [
      {
        "id": 130,
        "nombre": "VILLAJOYOSA"
      },
      {
        "id": 170,
        "nombre": "ALMORADI"
      },
      {
        "id": 186,
        "nombre": "ALICANTE CAPITAL"
      }
    ]
  },
  {
    "id_centro": 5,
    "nombre_centro": "ZARAGOZA",
    "almacenes": [
      {
        "id": 105,
        "nombre": "ZARAGOZA"
      },
      {
        "id": 125,
        "nombre": "ZARAGOZA URBAN"
      },
      {
        "id": 137,
        "nombre": "UTEBO"
      }
    ]
  },
  {
    "id_centro": 6,
    "nombre_centro": "MURCIA",
    "almacenes": [
      {
        "id": 106,
        "nombre": "MURCIA"
      },
      {
        "id": 167,
        "nombre": "MURCIA-SAN JAVIER"
      },
      {
        "id": 194,
        "nombre": "MURCIA URBAN"
      }
    ]
  },
  {
    "id_centro": 7,
    "nombre_centro": "TARRAGONA",
    "almacenes": [
      {
        "id": 107,
        "nombre": "TARRAGONA"
      },
      {
        "id": 129,
        "nombre": "ULLDECONA"
      },
      {
        "id": 159,
        "nombre": "BELLVEI"
      },
      {
        "id": 196,
        "nombre": "VILANOVA I LA GELTRU"
      }
    ]
  },
  {
    "id_centro": 8,
    "nombre_centro": "RESIDENCIAL VALENCIA",
    "almacenes": []
  },
  {
    "id_centro": 9,
    "nombre_centro": "MALAGA",
    "almacenes": [
      {
        "id": 109,
        "nombre": "MÁLAGA"
      },
      {
        "id": 176,
        "nombre": "MÁLAGA CENTRO"
      },
      {
        "id": 177,
        "nombre": "MARBELLA"
      }
    ]
  },
  {
    "id_centro": 10,
    "nombre_centro": "SEVILLA",
    "almacenes": [
      {
        "id": 110,
        "nombre": "SEVILLA"
      },
      {
        "id": 175,
        "nombre": "CORDOBA"
      },
      {
        "id": 190,
        "nombre": "HUELVA"
      }
    ]
  },
  {
    "id_centro": 11,
    "nombre_centro": "MADRID",
    "almacenes": [
      {
        "id": 111,
        "nombre": "MADRID"
      },
      {
        "id": 124,
        "nombre": "ALCALA"
      },
      {
        "id": 127,
        "nombre": "GUADALAJARA"
      },
      {
        "id": 139,
        "nombre": "MADRID ALCOBENDAS"
      },
      {
        "id": 160,
        "nombre": "MADRID VILLALBA"
      }
    ]
  },
  {
    "id_centro": 12,
    "nombre_centro": "MADRID II",
    "almacenes": [
      {
        "id": 168,
        "nombre": "TARANCON"
      }
    ]
  },
  {
    "id_centro": 13,
    "nombre_centro": "CADIZ",
    "almacenes": [
      {
        "id": 157,
        "nombre": "TENERIFE SUR"
      },
      {
        "id": 180,
        "nombre": "LAS PALMAS"
      },
      {
        "id": 195,
        "nombre": "TENERIFE"
      },
      {
        "id": 113,
        "nombre": "CÁDIZ"
      },
      {
        "id": 126,
        "nombre": "CHICLANA"
      },
      {
        "id": 162,
        "nombre": "CADIZ-ALGECIRAS"
      }
    ]
  },
  {
    "id_centro": 14,
    "nombre_centro": "ALBACETE",
    "almacenes": [
      {
        "id": 114,
        "nombre": "ALBACETE"
      }
    ]
  },
  {
    "id_centro": 15,
    "nombre_centro": "GRANADA",
    "almacenes": [
      {
        "id": 115,
        "nombre": "GRANADA"
      },
      {
        "id": 121,
        "nombre": "ALMERIA"
      },
      {
        "id": 123,
        "nombre": "EL EJIDO"
      },
      {
        "id": 138,
        "nombre": "GUADIX"
      }
    ]
  },
  {
    "id_centro": 16,
    "nombre_centro": "GERONA",
    "almacenes": [
      {
        "id": 116,
        "nombre": "GERONA"
      }
    ]
  },
  {
    "id_centro": 17,
    "nombre_centro": "VALLADOLID",
    "almacenes": [
      {
        "id": 117,
        "nombre": "VALLADOLID"
      },
      {
        "id": 128,
        "nombre": "LEON"
      },
      {
        "id": 131,
        "nombre": "SALAMANCA"
      }
    ]
  },
  {
    "id_centro": 18,
    "nombre_centro": "ALAVA",
    "almacenes": [
      {
        "id": 166,
        "nombre": "SAN SEBASTIAN"
      },
      {
        "id": 179,
        "nombre": "LOGRONO"
      },
      {
        "id": 187,
        "nombre": "HUESCA"
      }
    ]
  },
  {
    "id_centro": 19,
    "nombre_centro": "VIZCAYA",
    "almacenes": [
      {
        "id": 119,
        "nombre": "VIZCAYA"
      },
      {
        "id": 185,
        "nombre": "CANTABRIA"
      }
    ]
  },
  {
    "id_centro": 20,
    "nombre_centro": "MADRID III",
    "almacenes": [
      {
        "id": 184,
        "nombre": "MERIDA"
      },
      {
        "id": 188,
        "nombre": "TALAVERA"
      },
      {
        "id": 999,
        "nombre": "PARTNERS"
      }
    ]
  },
  {
    "id_centro": 21,
    "nombre_centro": "TORRIJOS",
    "almacenes": []
  },
  {
    "id_centro": 22,
    "nombre_centro": "PALAFOLLS",
    "almacenes": []
  },
  {
    "id_centro": 23,
    "nombre_centro": "PATERNA - SEDE PRINCIPAL",
    "almacenes": []
  },
  {
    "id_centro": 24,
    "nombre_centro": "MADRID COSLADA",
    "almacenes": []
  },
  {
    "id_centro": 25,
    "nombre_centro": "MADRID GETAFE",
    "almacenes": [
      {
        "id": 112,
        "nombre": "MADRID-GETAFE"
      }
    ]
  },
  {
    "id_centro": 26,
    "nombre_centro": "LERIDA",
    "almacenes": [
      {
        "id": 173,
        "nombre": "LLEIDA"
      }
    ]
  },
  {
    "id_centro": 27,
    "nombre_centro": "CASTELLON",
    "almacenes": [
      {
        "id": 108,
        "nombre": "CASTELLON"
      }
    ]
  },
  {
    "id_centro": 28,
    "nombre_centro": "ALMERIA",
    "almacenes": [
      {
        "id": 161,
        "nombre": "HUERCAL-OVERA"
      }
    ]
  },
  {
    "id_centro": 29,
    "nombre_centro": "ALICANTE NORTE",
    "almacenes": [
      {
        "id": 122,
        "nombre": "ALICANTE NORTE (PEDREGUER)"
      }
    ]
  },
  {
    "id_centro": 30,
    "nombre_centro": "CAMPORROBLES",
    "almacenes": [
      {
        "id": 134,
        "nombre": "CAMPORROBLES"
      }
    ]
  },
  {
    "id_centro": 31,
    "nombre_centro": "TOLEDO",
    "almacenes": [
      {
        "id": 140,
        "nombre": "TORRIJOS"
      },
      {
        "id": 172,
        "nombre": "TOLEDO"
      }
    ]
  },
  {
    "id_centro": 32,
    "nombre_centro": "MARTORELLES",
    "almacenes": []
  },
  {
    "id_centro": 33,
    "nombre_centro": "HOSPITALET",
    "almacenes": []
  },
  {
    "id_centro": 34,
    "nombre_centro": "ALGECIRAS",
    "almacenes": []
  },
  {
    "id_centro": 35,
    "nombre_centro": "VIGO",
    "almacenes": [
      {
        "id": 132,
        "nombre": "OURENSE"
      },
      {
        "id": 164,
        "nombre": "VIGO"
      }
    ]
  },
  {
    "id_centro": 36,
    "nombre_centro": "MALLORCA",
    "almacenes": []
  },
  {
    "id_centro": 37,
    "nombre_centro": "PAMPLONA",
    "almacenes": [
      {
        "id": 165,
        "nombre": "PAMPLONA"
      }
    ]
  },
  {
    "id_centro": 38,
    "nombre_centro": "CORDOBA",
    "almacenes": []
  },
  {
    "id_centro": 39,
    "nombre_centro": "JAEN",
    "almacenes": [
      {
        "id": 174,
        "nombre": "JAEN"
      }
    ]
  },
  {
    "id_centro": 40,
    "nombre_centro": "LEON",
    "almacenes": []
  },
  {
    "id_centro": 41,
    "nombre_centro": "CORUÑA",
    "almacenes": [
      {
        "id": 181,
        "nombre": "A CORUÑA"
      }
    ]
  },
  {
    "id_centro": 42,
    "nombre_centro": "MANZANARES",
    "almacenes": [
      {
        "id": 182,
        "nombre": "CIUDAD REAL"
      },
      {
        "id": 183,
        "nombre": "MANZANARES"
      }
    ]
  },
  {
    "id_centro": 43,
    "nombre_centro": "MERIDA",
    "almacenes": []
  },
  {
    "id_centro": 44,
    "nombre_centro": "CANTABRIA",
    "almacenes": []
  },
  {
    "id_centro": 45,
    "nombre_centro": "HUESCA",
    "almacenes": []
  },
  {
    "id_centro": 46,
    "nombre_centro": "TALAVERA",
    "almacenes": []
  },
  {
    "id_centro": 47,
    "nombre_centro": "HUELVA",
    "almacenes": []
  },
  {
    "id_centro": 48,
    "nombre_centro": "GIJON",
    "almacenes": [
      {
        "id": 189,
        "nombre": "GIJON"
      }
    ]
  },
  {
    "id_centro": 49,
    "nombre_centro": "TENERIFE",
    "almacenes": []
  },
  {
    "id_centro": 50,
    "nombre_centro": "PUEBLO NUEVO",
    "almacenes": []
  },
  {
    "id_centro": 51,
    "nombre_centro": "ALICANTE BACAROT",
    "almacenes": []
  },
  {
    "id_centro": 52,
    "nombre_centro": "CATARROJA",
    "almacenes": []
  },
  {
    "id_centro": 53,
    "nombre_centro": "MURCIA URBAN",
    "almacenes": []
  }
];
        
        const dbAquaserviceFallback = {
            delegaciones: rawNewData.map(d => ({
                id: d.id_centro,
                nombre: d.nombre_centro,
                almacenes_proximos: d.almacenes.map(a => a.id)
            })),
            almacenes: {}
        };
        
        rawNewData.forEach(d => {
            d.almacenes.forEach(a => {
                dbAquaserviceFallback.almacenes[a.id] = a.nombre;
            });
        });;

        async function cargarDatos() {
            try {
                console.log('Cargando datos de delegaciones y almacenes desde', dataUrl);
                const response = await fetch(dataUrl, { cache: 'no-store' });
                if (!response.ok) throw new Error(`No se pudo cargar ${dataUrl} (${response.status})`);

                
                let fetchedData = await response.json();
                if (Array.isArray(fetchedData)) {
                    dbAquaservice = {
                        delegaciones: fetchedData.map(d => ({
                            id: d.id_centro,
                            nombre: d.nombre_centro,
                            almacenes_proximos: d.almacenes.map(a => a.id)
                        })),
                        almacenes: {}
                    };
                    fetchedData.forEach(d => {
                        d.almacenes.forEach(a => {
                            dbAquaservice.almacenes[a.id] = a.nombre;
                        });
                    });
                } else {
                    dbAquaservice = fetchedData;
                }

            } catch (error) {
                console.warn('Error cargando datos de almacenes por fetch, usando datos embebidos:', error);
                dbAquaservice = dbAquaserviceFallback;
            }
            inicializarEsquema();
        }

        const selectDelegacion = document.getElementById('delegacion-select');
        const selectAlmacen = document.getElementById('almacen-select');
        const infoDelegacion = document.getElementById('info-delegacion');
        const nombreDelegacionActiva = document.getElementById('nombre-delegacion-activa');
        const idDelegacionActiva = document.getElementById('id-delegacion-activa');
        const estadoVacio = document.getElementById('estado-vacio');
        const listaAlmacenes = document.getElementById('lista-almacenes');
        const contadorAlmacenes = document.getElementById('contador-almacenes');

        function inicializarEsquema() {
            // Cargar Delegaciones ordenadas alfabéticamente
            const delegaciones = [...dbAquaservice.delegaciones].sort((a,b) => a.nombre.localeCompare(b.nombre));
            delegaciones.forEach(del => {
                const opt = document.createElement('option');
                opt.value = del.id;
                opt.textContent = `${String(del.id).padStart(2, '0')} - ${del.nombre}`;
                selectDelegacion.appendChild(opt);
            });

            // Cargar Almacenes ordenados alfabéticamente
            const almacenes = Object.entries(dbAquaservice.almacenes)
                .map(([id, nombre]) => ({ id: parseInt(id), nombre }))
                .sort((a,b) => a.nombre.localeCompare(b.nombre));

            almacenes.forEach(alm => {
                const opt = document.createElement('option');
                opt.value = alm.id;
                opt.textContent = `${alm.nombre} (ID: ${alm.id})`;
                selectAlmacen.appendChild(opt);
            });
        }

        function renderizarAlmacenes(delegacion, highlightAlmacenId = null) {
            // 1. Actualizar Info de Delegación
            nombreDelegacionActiva.textContent = delegacion.nombre;
            idDelegacionActiva.textContent = `#${delegacion.id}`;
            infoDelegacion.classList.remove('hidden');

            // 2. Limpiar vista previa
            listaAlmacenes.innerHTML = '';
            const codigos = delegacion.almacenes_proximos || [];

            if (codigos.length > 0) {
                // Configurar contenedor
                estadoVacio.classList.add('hidden');
                listaAlmacenes.classList.remove('hidden');
                contadorAlmacenes.textContent = `${codigos.length} centros`;
                contadorAlmacenes.classList.remove('hidden');

                // 3. Crear tarjetas de almacenes
                codigos.forEach((id, index) => {
                    const nombre = dbAquaservice.almacenes[id] || "Almacén Desconocido";
                    const isHighlighted = highlightAlmacenId === id;
                    
                    const card = document.createElement('div');
                    card.id = `almacen-card-${id}`;
                    
                    // Clases dinámicas dependiendo de si está resaltado
                    let baseClasses = "p-4 border rounded-xl transition-all duration-300 flex items-center space-x-4 ";
                    let iconBgClass = isHighlighted ? "bg-blue-600" : "bg-slate-700";
                    let titleColorClass = isHighlighted ? "text-indigo-900 dark:text-indigo-200 dark:text-indigo-200" : "text-slate-800 dark:text-white";

                    if (isHighlighted) {
                        baseClasses += "bg-indigo-50 dark:bg-indigo-900/40 border-blue-500 ring-2 ring-blue-200 shadow-md scale-[1.02] z-10 relative";
                    } else {
                        baseClasses += "bg-slate-50 dark:bg-slate-800/50 border-slate-200 hover:border-blue-300 hover:bg-white shadow-sm";
                    }

                    card.className = baseClasses;
                    card.style.opacity = '0'; // Inicio de animación
                    card.style.transform = 'translateY(10px)';

                    card.innerHTML = `
                        <div class="p-3 ${iconBgClass} rounded-xl text-white shadow-sm flex-shrink-0 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                            </svg>
                        </div>
                        <div class="min-w-0 flex-1">
                            <h3 class="font-bold ${titleColorClass} truncate tracking-tight text-sm sm:text-base">${nombre}</h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Cód: <span class="font-mono font-bold text-slate-700 dark:text-slate-900 bg-slate-200/80 px-1.5 py-0.5 rounded">${id}</span></p>
                        </div>
                    `;
                    
                    listaAlmacenes.appendChild(card);

                    // Animación en cascada
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50 * index);
                });

                // Auto-Scroll si hay un almacén resaltado
                if (highlightAlmacenId) {
                    setTimeout(() => {
                        const targetCard = document.getElementById(`almacen-card-${highlightAlmacenId}`);
                        if (targetCard) {
                            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }, 300);
                }

            } else {
                mostrarError("Esta delegación no tiene almacenes vinculados.");
            }
        }

        function mostrarError(mensaje) {
            listaAlmacenes.innerHTML = '';
            estadoVacio.innerHTML = `
                <div class="p-4 bg-orange-50 rounded-full text-orange-400 mb-4 border border-orange-100">
                    <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                </div>
                <p class="text-slate-700 dark:text-slate-300 dark:text-slate-500 font-bold text-lg">Sin resultados</p>
                <p class="text-slate-500 dark:text-slate-400 text-sm mt-2">${mensaje}</p>
            `;
            estadoVacio.classList.remove('hidden');
            listaAlmacenes.classList.add('hidden');
            contadorAlmacenes.classList.add('hidden');
        }

        // Listener: Búsqueda por Delegación
        selectDelegacion.addEventListener('change', (e) => {
            const id = parseInt(e.target.value);
            const delegacion = dbAquaservice.delegaciones.find(d => d.id === id);
            
            // Reiniciar el otro selector visualmente sin lanzar eventos extra
            selectAlmacen.value = ""; 
            
            if (delegacion) renderizarAlmacenes(delegacion, null);
        });

        // Listener: Búsqueda por Almacén
        selectAlmacen.addEventListener('change', (e) => {
            const almacenId = parseInt(e.target.value);
            
            // Encontrar qué delegación tiene este almacén en su lista
            const delegacion = dbAquaservice.delegaciones.find(d => 
                d.almacenes_proximos && d.almacenes_proximos.includes(almacenId)
            );

            if (delegacion) {
                // Actualizar el selector de delegación visualmente
                selectDelegacion.value = delegacion.id;
                // Renderizar y pasar el ID del almacén para resaltarlo
                renderizarAlmacenes(delegacion, almacenId);
            } else {
                mostrarError("El centro seleccionado no pertenece actualmente a ninguna delegación activa.");
                infoDelegacion.classList.add('hidden');
                selectDelegacion.value = "";
            }
        });

        // Iniciar
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', cargarDatos);
        } else {
            cargarDatos();
        }
    
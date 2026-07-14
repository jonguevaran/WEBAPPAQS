const fs = require('fs');
let html = fs.readFileSync('DelegacionAlmacenes.html', 'utf8');

const newData = [
  { "id_centro": 1, "nombre_centro": "VALENCIA", "almacenes": [ { "id": 135, "nombre": "SON CASTELLO" }, { "id": 158, "nombre": "MANACOR" }, { "id": 163, "nombre": "PALMA" }, { "id": 192, "nombre": "SA POBLA" }, { "id": 101, "nombre": "VALENCIA" }, { "id": 102, "nombre": "VALENCIA SUR (CATARROJA)" }, { "id": 118, "nombre": "VALENCIA NORTE (PUIG)" }, { "id": 136, "nombre": "ALZIRA" }, { "id": 193, "nombre": "BENISSODA" } ] },
  { "id_centro": 2, "nombre_centro": "RESIDENCIAL MADRID", "almacenes": [] },
  { "id_centro": 3, "nombre_centro": "BARCELONA", "almacenes": [ { "id": 103, "nombre": "BARCELONA" }, { "id": 133, "nombre": "SANT JOAN DESPI" }, { "id": 169, "nombre": "TERRASSA" }, { "id": 171, "nombre": "MARTORELLES" }, { "id": 178, "nombre": "BARCELONA URBAN" }, { "id": 191, "nombre": "BARCELONA NORTE" } ] },
  { "id_centro": 4, "nombre_centro": "ALICANTE", "almacenes": [ { "id": 130, "nombre": "VILLAJOYOSA" }, { "id": 170, "nombre": "ALMORADI" }, { "id": 186, "nombre": "ALICANTE CAPITAL" } ] },
  { "id_centro": 5, "nombre_centro": "ZARAGOZA", "almacenes": [ { "id": 105, "nombre": "ZARAGOZA" }, { "id": 125, "nombre": "ZARAGOZA URBAN" }, { "id": 137, "nombre": "UTEBO" } ] },
  { "id_centro": 6, "nombre_centro": "MURCIA", "almacenes": [ { "id": 106, "nombre": "MURCIA" }, { "id": 167, "nombre": "MURCIA-SAN JAVIER" }, { "id": 194, "nombre": "MURCIA URBAN" } ] },
  { "id_centro": 7, "nombre_centro": "TARRAGONA", "almacenes": [ { "id": 107, "nombre": "TARRAGONA" }, { "id": 129, "nombre": "ULLDECONA" }, { "id": 159, "nombre": "BELLVEI" }, { "id": 196, "nombre": "VILANOVA I LA GELTRU" } ] },
  { "id_centro": 8, "nombre_centro": "RESIDENCIAL VALENCIA", "almacenes": [] },
  { "id_centro": 9, "nombre_centro": "MALAGA", "almacenes": [ { "id": 109, "nombre": "MÁLAGA" }, { "id": 176, "nombre": "MÁLAGA CENTRO" }, { "id": 177, "nombre": "MARBELLA" } ] },
  { "id_centro": 10, "nombre_centro": "SEVILLA", "almacenes": [ { "id": 110, "nombre": "SEVILLA" }, { "id": 175, "nombre": "CORDOBA" }, { "id": 190, "nombre": "HUELVA" } ] },
  { "id_centro": 11, "nombre_centro": "MADRID", "almacenes": [ { "id": 111, "nombre": "MADRID" }, { "id": 124, "nombre": "ALCALA" }, { "id": 127, "nombre": "GUADALAJARA" }, { "id": 139, "nombre": "MADRID ALCOBENDAS" }, { "id": 160, "nombre": "MADRID VILLALBA" } ] },
  { "id_centro": 12, "nombre_centro": "MADRID II", "almacenes": [ { "id": 168, "nombre": "TARANCON" } ] },
  { "id_centro": 13, "nombre_centro": "CADIZ", "almacenes": [ { "id": 157, "nombre": "TENERIFE SUR" }, { "id": 180, "nombre": "LAS PALMAS" }, { "id": 195, "nombre": "TENERIFE" }, { "id": 113, "nombre": "CÁDIZ" }, { "id": 126, "nombre": "CHICLANA" }, { "id": 162, "nombre": "CADIZ-ALGECIRAS" } ] },
  { "id_centro": 14, "nombre_centro": "ALBACETE", "almacenes": [ { "id": 114, "nombre": "ALBACETE" } ] },
  { "id_centro": 15, "nombre_centro": "GRANADA", "almacenes": [ { "id": 115, "nombre": "GRANADA" }, { "id": 121, "nombre": "ALMERIA" }, { "id": 123, "nombre": "EL EJIDO" }, { "id": 138, "nombre": "GUADIX" } ] },
  { "id_centro": 16, "nombre_centro": "GERONA", "almacenes": [ { "id": 116, "nombre": "GERONA" } ] },
  { "id_centro": 17, "nombre_centro": "VALLADOLID", "almacenes": [ { "id": 117, "nombre": "VALLADOLID" }, { "id": 128, "nombre": "LEON" }, { "id": 131, "nombre": "SALAMANCA" } ] },
  { "id_centro": 18, "nombre_centro": "ALAVA", "almacenes": [ { "id": 166, "nombre": "SAN SEBASTIAN" }, { "id": 179, "nombre": "LOGRONO" }, { "id": 187, "nombre": "HUESCA" } ] },
  { "id_centro": 19, "nombre_centro": "VIZCAYA", "almacenes": [ { "id": 119, "nombre": "VIZCAYA" }, { "id": 185, "nombre": "CANTABRIA" } ] },
  { "id_centro": 20, "nombre_centro": "MADRID III", "almacenes": [ { "id": 184, "nombre": "MERIDA" }, { "id": 188, "nombre": "TALAVERA" }, { "id": 999, "nombre": "PARTNERS" } ] },
  { "id_centro": 21, "nombre_centro": "TORRIJOS", "almacenes": [] },
  { "id_centro": 22, "nombre_centro": "PALAFOLLS", "almacenes": [] },
  { "id_centro": 23, "nombre_centro": "PATERNA - SEDE PRINCIPAL", "almacenes": [] },
  { "id_centro": 24, "nombre_centro": "MADRID COSLADA", "almacenes": [] },
  { "id_centro": 25, "nombre_centro": "MADRID GETAFE", "almacenes": [ { "id": 112, "nombre": "MADRID-GETAFE" } ] },
  { "id_centro": 26, "nombre_centro": "LERIDA", "almacenes": [ { "id": 173, "nombre": "LLEIDA" } ] },
  { "id_centro": 27, "nombre_centro": "CASTELLON", "almacenes": [ { "id": 108, "nombre": "CASTELLON" } ] },
  { "id_centro": 28, "nombre_centro": "ALMERIA", "almacenes": [ { "id": 161, "nombre": "HUERCAL-OVERA" } ] },
  { "id_centro": 29, "nombre_centro": "ALICANTE NORTE", "almacenes": [ { "id": 122, "nombre": "ALICANTE NORTE (PEDREGUER)" } ] },
  { "id_centro": 30, "nombre_centro": "CAMPORROBLES", "almacenes": [ { "id": 134, "nombre": "CAMPORROBLES" } ] },
  { "id_centro": 31, "nombre_centro": "TOLEDO", "almacenes": [ { "id": 140, "nombre": "TORRIJOS" }, { "id": 172, "nombre": "TOLEDO" } ] },
  { "id_centro": 32, "nombre_centro": "MARTORELLES", "almacenes": [] },
  { "id_centro": 33, "nombre_centro": "HOSPITALET", "almacenes": [] },
  { "id_centro": 34, "nombre_centro": "ALGECIRAS", "almacenes": [] },
  { "id_centro": 35, "nombre_centro": "VIGO", "almacenes": [ { "id": 132, "nombre": "OURENSE" }, { "id": 164, "nombre": "VIGO" } ] },
  { "id_centro": 36, "nombre_centro": "MALLORCA", "almacenes": [] },
  { "id_centro": 37, "nombre_centro": "PAMPLONA", "almacenes": [ { "id": 165, "nombre": "PAMPLONA" } ] },
  { "id_centro": 38, "nombre_centro": "CORDOBA", "almacenes": [] },
  { "id_centro": 39, "nombre_centro": "JAEN", "almacenes": [ { "id": 174, "nombre": "JAEN" } ] },
  { "id_centro": 40, "nombre_centro": "LEON", "almacenes": [] },
  { "id_centro": 41, "nombre_centro": "CORUÑA", "almacenes": [ { "id": 181, "nombre": "A CORUÑA" } ] },
  { "id_centro": 42, "nombre_centro": "MANZANARES", "almacenes": [ { "id": 182, "nombre": "CIUDAD REAL" }, { "id": 183, "nombre": "MANZANARES" } ] },
  { "id_centro": 43, "nombre_centro": "MERIDA", "almacenes": [] },
  { "id_centro": 44, "nombre_centro": "CANTABRIA", "almacenes": [] },
  { "id_centro": 45, "nombre_centro": "HUESCA", "almacenes": [] },
  { "id_centro": 46, "nombre_centro": "TALAVERA", "almacenes": [] },
  { "id_centro": 47, "nombre_centro": "HUELVA", "almacenes": [] },
  { "id_centro": 48, "nombre_centro": "GIJON", "almacenes": [ { "id": 189, "nombre": "GIJON" } ] },
  { "id_centro": 49, "nombre_centro": "TENERIFE", "almacenes": [] },
  { "id_centro": 50, "nombre_centro": "PUEBLO NUEVO", "almacenes": [] },
  { "id_centro": 51, "nombre_centro": "ALICANTE BACAROT", "almacenes": [] },
  { "id_centro": 52, "nombre_centro": "CATARROJA", "almacenes": [] },
  { "id_centro": 53, "nombre_centro": "MURCIA URBAN", "almacenes": [] }
];

const newLogic = `        const rawNewData = ${JSON.stringify(newData, null, 2)};
        
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
        });`;

const startMatch = html.match(/const dbAquaserviceFallback = \{/);
const endMatch = html.match(/\};\s*async function cargarDatos\(\) \{/);

if(startMatch && endMatch) {
    const startIndex = startMatch.index;
    const endIndex = endMatch.index + 1; // Points to '}'
    html = html.substring(0, startIndex) + newLogic + html.substring(endIndex);
    fs.writeFileSync('DelegacionAlmacenes.html', html);
    console.log('Successfully replaced dbAquaserviceFallback in DelegacionAlmacenes.html');
} else {
    console.log('Could not find dbAquaserviceFallback in DelegacionAlmacenes.html');
}

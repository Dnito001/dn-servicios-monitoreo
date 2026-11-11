// ============================================================================
// DN TECNOLOGÍAS Y SERVICIOS - PANEL GERENCIAL DE MONITOREO (DERLIS NUÑEZ)
// CON BUSCADOR INTELIGENTE MULTICAMPO CORREGIDO Y CONEXIÓN EN TIEMPO REAL
// ============================================================================

const PIN_ACCESO = "111"; // PIN de acceso para Derlis Nuñez
const AUTH_SESSION_KEY = "dn_monitoreo_derlis_auth_v1";
const STORAGE_KEY = "dn_monitoreo_derlis_db_v3";
const DRIVE_URL_KEY = "dn_servicios_drive_url";

const DEFAULT_DRIVE_URL = "https://script.google.com/macros/s/AKfycbxezjx2ilDKOrdGQXrE3bHUO3cnMnMFDoDl3FJ7SX1xGTU-HmLXqWHrNB3h2IzcIrPF-g/exec";

// 1. BASE HISTÓRICA DE ÁNGEL VILLALBA (61 REGISTROS: SER-001 AL SER-061)
const DATOS_ANGEL = [
  { id: "SER-001", fecha: "10/03/2026", categoria: "Impresora", marca: "HP", modelo: "Impresora HP + PC", intervencion: "Mantenimiento Físico / Limpieza", trabajo: "Mantenimiento de impresora HP y revisión de PC", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-002", fecha: "10/03/2026", categoria: "PC Escritorio / Servidor", marca: "Genérico", modelo: "PC Diseño", intervencion: "Software / Sistema Operativo / Backup", trabajo: "Instalación de CorelDRAW 2025, Photoshop, AutoCAD y Canva", repuestos: "Ninguno", precio: "", notas: "Suite gráfica completa", tecnico: "ANGEL VILLALBA" },
  { id: "SER-003", fecha: "10/03/2026", categoria: "Electrónica / Línea Blanca / Periférico", marca: "Silhouette", modelo: "Cameo + Sublimadoras", intervencion: "Mantenimiento Físico / Limpieza", trabajo: "Mantenimiento preventivo de plotter Cameo y máquinas de sublimación", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-004", fecha: "10/03/2026", categoria: "Audio / Consola / Portátil", marca: "JBL", modelo: "JBL GO", intervencion: "Microelectrónica / Reparación de Placa", trabajo: "Revisión y servicio técnico de parlante portátil JBL GO", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-005", fecha: "11/03/2026", categoria: "Impresora", marca: "Brother", modelo: "Serie HL", intervencion: "Reemplazo de Repuesto / Hardware + Mantenimiento Físico / Limpieza", trabajo: "Limpieza interna e instalación de unidad de imagen (Drum) y tóner", repuestos: "Drum y Tóner", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-006", fecha: "12/03/2026", categoria: "Smart TV / Monitor", marca: "Amazon", modelo: "Fire TV Stick (x3 unidades)", intervencion: "Software / Sistema Operativo / Backup", trabajo: "Instalación y configuración de aplicación Flujo en 3 TV Stick", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-007", fecha: "12/03/2026", categoria: "Notebook / Laptop", marca: "Genérico", modelo: "PC / Laptop", intervencion: "Software / Sistema Operativo / Backup", trabajo: "Instalación y activación de AutoCAD", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-008", fecha: "13/03/2026", categoria: "Impresora", marca: "Epson", modelo: "EcoTank L3150", intervencion: "Mantenimiento Físico / Limpieza + Reset de Software / Contadores", trabajo: "Mantenimiento completo y reset de contador de almohadillas", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-009", fecha: "13/03/2026", categoria: "Impresora", marca: "Brother", modelo: "Impresora Brother", intervencion: "Reemplazo de Repuesto / Hardware", trabajo: "Reparación de mecanismo de arrastre (no estiraba hojas)", repuestos: "Ninguno", precio: "40.000 Gs", notas: "Francisco", tecnico: "ANGEL VILLALBA" },
  { id: "SER-010", fecha: "14/03/2026", categoria: "Impresora", marca: "Epson", modelo: "EcoTank L3210", intervencion: "Instalación / Conectividad / Redes", trabajo: "Inicialización de impresora y descarga/instalación de drivers", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-011", fecha: "29/09/2026", categoria: "Impresora", marca: "Genérico", modelo: "Impresora de Oficina", intervencion: "Instalación / Conectividad / Redes", trabajo: "Entrega, instalación física de impresora y servicio técnico", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-012", fecha: "30/09/2026", categoria: "Smart TV / Monitor", marca: "Genérico", modelo: "Smart TV / Box", intervencion: "Software / Sistema Operativo / Backup", trabajo: "Instalación y configuración de aplicación Xuper TV", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-013", fecha: "01/10/2026", categoria: "Smartphone", marca: "Apple", modelo: "Samsung a iPhone 16 Pro Max", intervencion: "Software / Sistema Operativo / Backup", trabajo: "Traspaso completo de fotografías de Samsung a iPhone", repuestos: "Ninguno", precio: "", notas: "Anotado como iPhone 18", tecnico: "ANGEL VILLALBA" },
  { id: "SER-014", fecha: "06/10/2026", categoria: "Impresora", marca: "Epson", modelo: "EcoTank L3110", intervencion: "Mantenimiento Físico / Limpieza + Reemplazo de Repuesto / Hardware + Reset de Software / Contadores", trabajo: "Reset de software, cambio de almohadillas y mantenimiento general", repuestos: "Almohadillas absorbentes", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-015", fecha: "07/10/2026", categoria: "Impresora", marca: "Epson", modelo: "EcoTank L3110", intervencion: "Reemplazo de Repuesto / Hardware + Mantenimiento Físico / Limpieza", trabajo: "Mantenimiento completo y cambio de encoder circular", repuestos: "Encoder circular", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-016", fecha: "07/10/2026", categoria: "Notebook / Laptop", marca: "HP", modelo: "Laptop HP", intervencion: "Mantenimiento Físico / Limpieza + Software / Sistema Operativo / Backup", trabajo: "Mantenimiento completo preventivo de hardware y optimización de software", repuestos: "Pasta térmica", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-017", fecha: "07/10/2026", categoria: "Almacenamiento", marca: "Genérico", modelo: "Disco Óptico CD", intervencion: "Software / Sistema Operativo / Backup + Impresión / Corte Plotter / Trabajo Práctico", trabajo: "Extracción e impresión de estudios de radiografía desde CD", repuestos: "Papel / Impresión", precio: "", notas: "Cliente Sr.", tecnico: "ANGEL VILLALBA" },
  { id: "SER-018", fecha: "07/10/2026", categoria: "Notebook / Laptop", marca: "Asus", modelo: "Laptop Asus", intervencion: "Reemplazo de Repuesto / Hardware", trabajo: "Ajuste estructural de pantalla y reconexión de flex de cámara web", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-019", fecha: "08/10/2026", categoria: "Impresora", marca: "Genérico", modelo: "Impresora Térmica", intervencion: "Microelectrónica / Reparación de Placa", trabajo: "Revisión técnica y diagnóstico de impresora térmica", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-020", fecha: "08/10/2026", categoria: "Smart TV / Monitor", marca: "Genérico", modelo: "TV Box", intervencion: "Software / Sistema Operativo / Backup", trabajo: "Instalación y configuración de plataforma Flujo en TV Box", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-021", fecha: "08/10/2026", categoria: "Impresora", marca: "HP", modelo: "Cartucho HP Negro", intervencion: "Mantenimiento Físico / Limpieza", trabajo: "Recarga de cartucho de tinta color negro", repuestos: "Tinta negra", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-022", fecha: "08/10/2026", categoria: "Impresora", marca: "Genérico", modelo: "Sistema Continuo", intervencion: "Mantenimiento Físico / Limpieza", trabajo: "Recarga de tanques de tinta de impresora", repuestos: "Tinta", precio: "", notas: "Cliente: Troche", tecnico: "ANGEL VILLALBA" },
  { id: "SER-023", fecha: "09/10/2026", categoria: "Impresora", marca: "Genérico", modelo: "Impresora Sublimación", intervencion: "Software / Sistema Operativo / Backup", trabajo: "Limpieza de cabezal desde software (sistema con tinta de sublimación)", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-024", fecha: "09/10/2026", categoria: "Almacenamiento", marca: "Genérico", modelo: "Disco Duro", intervencion: "Software / Sistema Operativo / Backup", trabajo: "Extracción y recuperación de archivos de disco", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-025", fecha: "10/10/2026", categoria: "Impresora", marca: "Epson", modelo: "EcoTank L3210", intervencion: "Mantenimiento Físico / Limpieza", trabajo: "Mantenimiento completo con purgado de dampers y limpieza de cabezal", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-026", fecha: "13/10/2026", categoria: "Notebook / Laptop", marca: "Acer", modelo: "Laptop Acer", intervencion: "Reemplazo de Repuesto / Hardware", trabajo: "Reparación y reconstrucción de bisagra de pantalla", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-027", fecha: "14/10/2026", categoria: "Notebook / Laptop", marca: "Genérico", modelo: "Laptop #1", intervencion: "Software / Sistema Operativo / Backup", trabajo: "Instalación de programas de ofimática, drivers y configuración general", repuestos: "Ninguno", precio: "50.000 Gs", notas: "Pack 2 laptops", tecnico: "ANGEL VILLALBA" },
  { id: "SER-028", fecha: "14/10/2026", categoria: "Notebook / Laptop", marca: "Genérico", modelo: "Laptop #2", intervencion: "Software / Sistema Operativo / Backup", trabajo: "Instalación de programas de ofimática, drivers y configuración general", repuestos: "Ninguno", precio: "", notas: "Pack 2 laptops", tecnico: "ANGEL VILLALBA" },
  { id: "SER-029", fecha: "14/10/2026", categoria: "Impresora", marca: "HP", modelo: "Cartucho HP Negro", intervencion: "Mantenimiento Físico / Limpieza", trabajo: "Recarga de cartucho de tinta negra", repuestos: "Tinta negra", precio: "10.000 Gs", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-030", fecha: "15/10/2026", categoria: "Impresora", marca: "Epson", modelo: "EcoTank L3250", intervencion: "Mantenimiento Físico / Limpieza", trabajo: "Mantenimiento completo con limpieza de cabezal por fallo de color negro", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-031", fecha: "16/10/2026", categoria: "Impresora", marca: "HP", modelo: "Cartucho HP", intervencion: "Mantenimiento Físico / Limpieza", trabajo: "Recarga de cartucho de tinta", repuestos: "Tinta", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-032", fecha: "16/10/2026", categoria: "Notebook / Laptop", marca: "HP", modelo: "Laptop HP", intervencion: "Mantenimiento Físico / Limpieza + Software / Sistema Operativo / Backup", trabajo: "Mantenimiento completo y activación de licencia de Office", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-033", fecha: "16/10/2026", categoria: "Notebook / Laptop", marca: "HP", modelo: "Laptop HP", intervencion: "Reemplazo de Repuesto / Hardware + Software / Sistema Operativo / Backup", trabajo: "Instalación de unidad SSD, sistema operativo y programas de ofimática", repuestos: "Disco SSD", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-034", fecha: "17/10/2026", categoria: "Notebook / Laptop", marca: "HP", modelo: "Laptop HP", intervencion: "Reemplazo de Repuesto / Hardware + Software / Sistema Operativo / Backup", trabajo: "Ampliación de memoria RAM + SSD, sistema operativo y ofimática", repuestos: "Memoria RAM + SSD", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-035", fecha: "18/10/2026", categoria: "PC Escritorio / Servidor", marca: "Genérico", modelo: "PC de Oficina", intervencion: "Instalación / Conectividad / Redes", trabajo: "Servicio técnico y soporte en oficina de contaduría", repuestos: "Ninguno", precio: "", notas: "Cliente: Contaduría", tecnico: "ANGEL VILLALBA" },
  { id: "SER-036", fecha: "24/10/2026", categoria: "Impresora", marca: "Epson", modelo: "EcoTank L380", intervencion: "Mantenimiento Físico / Limpieza + Reemplazo de Repuesto / Hardware", trabajo: "Mantenimiento completo con cambio de almohadillas", repuestos: "Almohadillas", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-037", fecha: "27/10/2026", categoria: "Impresora", marca: "HP", modelo: "Cartucho HP", intervencion: "Mantenimiento Físico / Limpieza", trabajo: "Recarga de cartucho HP", repuestos: "Tinta", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-038", fecha: "28/10/2026", categoria: "Notebook / Laptop", marca: "HP", modelo: "Laptop HP", intervencion: "Reemplazo de Repuesto / Hardware + Software / Sistema Operativo / Backup", trabajo: "Instalación de disco SSD con sistema operativo nuevo", repuestos: "Disco SSD", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-039", fecha: "28/10/2026", categoria: "Impresora", marca: "HP", modelo: "Cartucho HP Negro", intervencion: "Mantenimiento Físico / Limpieza", trabajo: "Recarga de cartucho negro HP", repuestos: "Tinta negra", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-040", fecha: "29/10/2026", categoria: "Electrónica / Línea Blanca / Periférico", marca: "Genérico", modelo: "Jarra Térmica", intervencion: "Microelectrónica / Reparación de Placa", trabajo: "Revisión y reparación eléctrica de jarra térmica", repuestos: "Ninguno", precio: "", notas: "Cliente: Fígaro", tecnico: "ANGEL VILLALBA" },
  { id: "SER-041", fecha: "29/10/2026", categoria: "Almacenamiento", marca: "Genérico", modelo: "Disco Duro HDD", intervencion: "Software / Sistema Operativo / Backup", trabajo: "Revisión de estado y diagnóstico de disco HDD", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-042", fecha: "29/10/2026", categoria: "PC Escritorio / Servidor", marca: "Genérico", modelo: "PC Gamer / Escritorio", intervencion: "Reemplazo de Repuesto / Hardware", trabajo: "Reensamblaje y corrección de cableado de PC mal armada", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-043", fecha: "29/10/2026", categoria: "Microelectrónica / Componente", marca: "Genérico", modelo: "Placa Madre Socket CPU", intervencion: "Microelectrónica / Reparación de Placa", trabajo: "Diagnóstico de placa que no encendía y enderezado de pines doblados en socket", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-044", fecha: "30/10/2026", categoria: "Audio / Consola / Portátil", marca: "Amazfit", modelo: "Smartwatch Amazfit", intervencion: "Instalación / Conectividad / Redes", trabajo: "Vinculación y configuración de reloj inteligente con smartphone", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-045", fecha: "30/10/2026", categoria: "Impresiones / Corte Plotter / Trabajos Prácticos", marca: "Genérico", modelo: "Servicio de Impresión", intervencion: "Impresión / Corte Plotter / Trabajo Práctico", trabajo: "Impresión de lote de 80 imágenes", repuestos: "Papel y Tinta", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-046", fecha: "31/10/2026", categoria: "Electrónica / Línea Blanca / Periférico", marca: "Genérico", modelo: "Rastreador GPS", intervencion: "Instalación / Conectividad / Redes", trabajo: "Configuración y puesta en marcha de dispositivo GPS", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-047", fecha: "02/11/2026", categoria: "Impresora", marca: "Epson", modelo: "EcoTank L3250", intervencion: "Mantenimiento Físico / Limpieza", trabajo: "Limpieza de cabezal por falta de inyección en color amarillo", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-048", fecha: "02/11/2026", categoria: "Smartphone", marca: "Samsung", modelo: "Samsung a Samsung", intervencion: "Software / Sistema Operativo / Backup", trabajo: "Transferencia completa de datos entre teléfonos Samsung", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-049", fecha: "02/11/2026", categoria: "Smartphone", marca: "Xiaomi", modelo: "Redmi a Redmi", intervencion: "Software / Sistema Operativo / Backup", trabajo: "Transferencia completa de datos entre teléfonos Redmi", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-050", fecha: "02/11/2026", categoria: "Smartphone", marca: "Genérico", modelo: "Smartphone Android", intervencion: "Desbloqueo / FRP / Firmware", trabajo: "Configuración inicial de teléfono y recuperación de cuentas", repuestos: "Ninguno", precio: "", notas: "Cliente Sr.", tecnico: "ANGEL VILLALBA" },
  { id: "SER-051", fecha: "02/11/2026", categoria: "Smartphone", marca: "Honor", modelo: "Honor a Honor", intervencion: "Software / Sistema Operativo / Backup", trabajo: "Transferencia completa de todos los datos de Honor a Honor", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-052", fecha: "02/11/2026", categoria: "PC Escritorio / Servidor", marca: "Dell", modelo: "PC Dell", intervencion: "Reemplazo de Repuesto / Hardware + Software / Sistema Operativo / Backup", trabajo: "Cambio de disco, instalación de sistema operativo y paquete Office", repuestos: "Disco SSD", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-053", fecha: "03/11/2026", categoria: "Audio / Consola / Portátil", marca: "JBL", modelo: "Parlante JBL", intervencion: "Software / Sistema Operativo / Backup", trabajo: "Actualización de firmware de parlante JBL", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-054", fecha: "04/11/2026", categoria: "Almacenamiento", marca: "Genérico", modelo: "Disco Duro HDD", intervencion: "Software / Sistema Operativo / Backup", trabajo: "Extracción y respaldo de datos de disco duro HDD", repuestos: "Ninguno", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-055", fecha: "05/11/2026", categoria: "Notebook / Laptop", marca: "Acer", modelo: "Laptop Acer", intervencion: "Microelectrónica / Reparación de Placa", trabajo: "Diagnóstico y reparación de laptop Acer que no encendía", repuestos: "Ninguno", precio: "", notas: "Cliente: Adalberto", tecnico: "ANGEL VILLALBA" },
  { id: "SER-056", fecha: "06/11/2026", categoria: "Impresora", marca: "Epson", modelo: "EcoTank L380", intervencion: "Mantenimiento Físico / Limpieza + Reemplazo de Repuesto / Hardware + Reset de Software / Contadores", trabajo: "Limpieza completa, reset de contador y cambio de almohadillas", repuestos: "Almohadillas", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-057", fecha: "06/11/2026", categoria: "Impresora", marca: "Epson", modelo: "EcoTank L3110", intervencion: "Reemplazo de Repuesto / Hardware + Mantenimiento Físico / Limpieza", trabajo: "Cambio de cabezal de impresión, cable flex y limpieza general", repuestos: "Cabezal y Flex", precio: "", notas: "Cliente: Adalberto", tecnico: "ANGEL VILLALBA" },
  { id: "SER-058", fecha: "07/11/2026", categoria: "Notebook / Laptop", marca: "HP", modelo: "Laptop HP", intervencion: "Reemplazo de Repuesto / Hardware", trabajo: "Cambio de batería interna de laptop HP", repuestos: "Batería HP", precio: "", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-059", fecha: "09/11/2026", categoria: "Notebook / Laptop", marca: "HP", modelo: "HP 250 G5", intervencion: "Reemplazo de Repuesto / Hardware", trabajo: "Cambio de Teclado", repuestos: "Teclado en Ingles para HP 250 G5", precio: "", notas: "Laptop del Local", tecnico: "ANGEL VILLALBA" },
  { id: "SER-060", fecha: "10/11/2026", categoria: "Impresora", marca: "HP", modelo: "Cartucho HP 664", intervencion: "Mantenimiento Físico / Limpieza", trabajo: "Recarga de cartucho de tinta negra", repuestos: "Tinta color Negro", precio: "15.000 Gs", notas: "", tecnico: "ANGEL VILLALBA" },
  { id: "SER-061", fecha: "10/11/2026", categoria: "Impresiones / Corte Plotter / Trabajos Prácticos", marca: "Genérico", modelo: "Documento Word", intervencion: "Impresión / Corte Plotter / Trabajo Práctico", trabajo: "Digitalización y escaneo de documentos a formato PDF / imagen", repuestos: "Ninguno", precio: "", notas: "-", tecnico: "ANGEL VILLALBA" }
];

// 2. BASE HISTÓRICA DE JUNIOR ALMIRÓN (287 REGISTROS: REP-001 AL REP-287)
const RAW_DATOS_JUNIOR = [
  ["REP-001", "20/07/2026", "Smartphone", "Samsung", "Galaxy A06", "Cambio de pantalla", "En DN Tecnología"],
  ["REP-002", "20/07/2026", "Smartphone", "Samsung", "Galaxy A34", "Cambio de pantalla", "En DN Tecnología"],
  ["REP-003", "20/07/2026", "Smartphone", "Xiaomi", "Redmi Note 12", "Cambio de pantalla", "En DN Tecnología"],
  ["REP-004", "20/07/2026", "Smartphone", "Samsung", "Galaxy A12", "Cambio de pantalla", "En DN Tecnología"],
  ["REP-005", "21/07/2026", "Smartphone", "Samsung", "Galaxy A12", "Desbloqueo", ""],
  ["REP-006", "21/07/2026", "Smartphone", "Xiaomi", "Redmi Note 12", "Desbloqueo", ""],
  ["REP-007", "21/07/2026", "Smartphone", "Samsung", "Galaxy A02", "Cambio de pantalla", ""],
  ["REP-008", "22/07/2026", "Smartphone", "Samsung", "Galaxy A11", "Desbloqueo FRP", ""],
  ["REP-009", "22/07/2026", "Smartphone", "Apple", "iPhone 11 a iPhone 16", "Traspaso de datos", ""],
  ["REP-010", "22/07/2026", "Smartphone", "Motorola", "Moto E7i Power", "Cambio de pantalla", ""],
  ["REP-011", "22/07/2026", "Smartphone", "Samsung", "Galaxy J2 Pro", "Desbloqueo", ""],
  ["REP-012", "22/07/2026", "Smartphone", "Xiaomi", "Redmi Note 13", "Reparación de sensor", ""],
  ["REP-013", "22/07/2026", "Smartphone", "Samsung", "Galaxy A15", "Colocación de estuche y antiquiebre", "Accesorio"],
  ["REP-014", "25/07/2026", "Smartphone", "Xiaomi", "Redmi Note 12 Pro", "Cambio de pantalla", ""],
  ["REP-015", "25/07/2026", "Smartphone", "Samsung", "Galaxy A20s", "Desbloqueo", ""],
  ["REP-016", "25/07/2026", "Smartphone", "Samsung", "Galaxy A15", "Reparación de housing", ""],
  ["REP-017", "25/07/2026", "Smartphone", "Ulefone", "Armor 22", "Desbloqueo", ""],
  ["REP-018", "25/07/2026", "Laptop", "HP", "Laptop 15 pulgadas", "Reparación de bisagras", ""],
  ["REP-019", "27/07/2026", "Smartphone", "Samsung", "Galaxy A12", "Reparación de botón y speaker", "Cliente de Derlis"],
  ["REP-020", "27/07/2026", "Almacenamiento", "Genérico", "Disco Duro HDD", "Recuperación de archivos", "Cliente de Junior"],
  ["REP-021", "28/07/2026", "Laptop", "HP", "Laptop HP", "Cambio de HDD a SSD, sistema y Office", ""],
  ["REP-022", "28/07/2026", "Smartphone", "Samsung", "Galaxy A53", "Cambio de pantalla", ""],
  ["REP-023", "29/07/2026", "Smartphone", "Apple", "iPhone 13 Pro", "Reparación de pantalla verde", "Ana"],
  ["REP-024", "29/07/2026", "PC / Software", "Genérico", "Sistema PC", "Soporte técnico de firma digital", ""],
  ["REP-025", "29/07/2026", "Infraestructura", "Genérico", "Instalación eléctrica", "Solución de parte eléctrica", ""],
  ["REP-026", "29/07/2026", "Tablet", "Samsung", "Galaxy Tab S6 Lite", "Cambio de pantalla", ""],
  ["REP-027", "30/07/2026", "Smartphone", "Samsung", "Galaxy M13", "Cambio de pantalla", ""],
  ["REP-028", "30/07/2026", "Smartphone", "Motorola", "Moto E13i", "Cambio de pantalla", ""],
  ["REP-029", "31/07/2026", "Smartphone", "Samsung", "Galaxy A12", "Cambio de pantalla", ""],
  ["REP-030", "31/07/2026", "Smartphone", "Apple", "iPhone 8 Plus", "Cambio de housing y reparación de carga", ""],
  ["REP-031", "01/08/2026", "Smartphone", "Apple", "iPhone XR", "Re-pegado de pantalla", ""],
  ["REP-032", "01/08/2026", "Smartphone", "Apple", "iPhone 8 Plus", "Cambio de cámara, flex de carga y micrófono", ""],
  ["REP-033", "01/08/2026", "Smartphone", "Samsung", "Galaxy A02s", "Reparación de botón", ""],
  ["REP-034", "01/08/2026", "Smartphone", "Samsung", "Galaxy A52", "Cambio de pantalla", ""],
  ["REP-035", "01/08/2026", "Smartphone", "Samsung", "Galaxy A01", "Cambio de pantalla", ""],
  ["REP-036", "10/08/2026", "Impresora", "Epson", "Impresora Epson", "Cambio de cartucho y configuración", "20.000 Gs"],
  ["REP-037", "11/08/2026", "PC / Redes", "Genérico", "PC Escritorio", "Optimización de PC lento y reparación WiFi", "Consultoría"],
  ["REP-038", "11/08/2026", "Smartphone", "Xiaomi", "Redmi Note 8", "Solución a problemas de reinicio", ""],
  ["REP-039", "11/08/2026", "Smartphone", "Samsung", "Galaxy A12", "Cambio de pantalla", ""],
  ["REP-040", "11/08/2026", "Smartphone", "Samsung", "Galaxy A23", "Re-pegado de pantalla", ""],
  ["REP-041", "11/08/2026", "Smartphone", "Xiaomi", "Redmi Note 13", "Cambio de batería", ""],
  ["REP-042", "11/08/2026", "Electrónica", "Genérico", "Lector de antena", "Reparación de ficha coaxial", ""],
  ["REP-043", "12/08/2026", "Smartphone", "Apple", "iPhone XR", "Cambio de pantalla", "Anotado como 12/02"],
  ["REP-044", "12/08/2026", "Smartphone", "Xiaomi", "Redmi Note 12", "Cambio de pantalla", "Anotado como 12/02"],
  ["REP-045", "13/08/2026", "Smartphone", "Xiaomi", "Redmi 12C", "Cambio de pantalla, pin de carga y desbrickeo", ""],
  ["REP-046", "13/08/2026", "Smartphone", "Samsung", "Galaxy A15", "Recuperación de archivos", ""],
  ["REP-047", "13/08/2026", "Smartphone", "Xiaomi", "Redmi A2", "Cambio de pantalla", ""],
  ["REP-048", "14/08/2026", "Smartphone", "Xiaomi", "Redmi 13C", "Cambio de pantalla", "Ana"],
  ["REP-049", "14/08/2026", "Tablet", "C-Idea", "Tablet C-Idea", "Reparación de pin de carga", ""],
  ["REP-050", "14/08/2026", "Smartphone", "Samsung", "Galaxy A34", "Reparación de táctil", ""],
  ["REP-051", "15/08/2026", "Smartphone", "Apple", "iPhone 12", "Limpieza de cámara", "Con servicio delivery"],
  ["REP-052", "15/08/2026", "Smartphone", "Samsung", "Galaxy A24", "Cambio de pantalla, batería y botón", "Ana"],
  ["REP-053", "15/08/2026", "Smartphone", "Samsung", "Galaxy A02s", "Cambio de pantalla", ""],
  ["REP-054", "15/08/2026", "Smartphone", "Samsung", "Galaxy A03 Core", "Cambio de pantalla, placa y pin de carga", ""],
  ["REP-055", "17/08/2026", "Smartphone", "Samsung", "Galaxy A20s", "Cambio de pin de carga", ""],
  ["REP-056", "17/08/2026", "Smartphone", "Samsung", "Galaxy A15", "Cambio de pantalla, pin de carga y micrófono", "Derlis"],
  ["REP-057", "18/08/2026", "Smartphone", "Xiaomi", "Redmi a Redmi", "Traspaso de datos", ""],
  ["REP-058", "18/08/2026", "Smartphone", "Xiaomi", "Redmi A1", "Cambio de pin de carga", ""],
  ["REP-059", "19/08/2026", "PC / Software", "Genérico", "PC / Laptop", "Activación de paquete Office", ""],
  ["REP-060", "20/08/2026", "Smartphone", "Samsung", "Galaxy A01", "Cambio de pantalla", "Derlis"],
  ["REP-061", "20/08/2026", "Laptop", "HP", "Laptop 15 pulgadas", "Cambio de batería", ""],
  ["REP-062", "20/08/2026", "Smartphone", "Samsung", "Galaxy A50", "Cambio de pantalla", ""],
  ["REP-063", "20/08/2026", "Impresora", "Epson", "Serie L1200", "Cambio de rodillo de arrastre con fusor", ""],
  ["REP-064", "21/08/2026", "Tablet", "Samsung", "Galaxy Tab A8", "Reparación de flex de carga y housing", ""],
  ["REP-065", "21/08/2026", "Smartphone", "Samsung", "Galaxy A13", "Cambio de pin de carga y recuperación de datos", ""],
  ["REP-066", "21/08/2026", "Smartphone", "Xiaomi", "Redmi 14C", "Cambio de pantalla", ""],
  ["REP-067", "21/08/2026", "PC / Redes", "Genérico", "PC Escritorio", "Cambio de IP y reconfiguración LAN Ethernet", "Contaduría"],
  ["REP-068", "21/08/2026", "Smartphone", "Xiaomi", "Redmi A1", "Cambio de pantalla", ""],
  ["REP-069", "21/08/2026", "Smartphone", "Xiaomi", "Redmi A1", "Cambio de pin de carga", ""],
  ["REP-070", "21/08/2026", "Smartphone", "Samsung", "Galaxy A13", "Cambio de pantalla", "Derlis"],
  ["REP-071", "21/08/2026", "Smartphone", "Samsung", "Galaxy A15", "Cambio de pantalla", ""],
  ["REP-072", "21/08/2026", "Smartphone", "Oppo", "A3x", "Recuperación de software", ""],
  ["REP-073", "24/08/2026", "Smartphone", "Tecno", "Spark Go 2024", "Cambio de pantalla", ""],
  ["REP-074", "24/08/2026", "Smartphone", "Samsung", "Galaxy A05", "Cambio de pantalla", ""],
  ["REP-075", "24/08/2026", "Smartphone", "Xiaomi", "Redmi Note 8", "Cambio de tapa trasera", ""],
  ["REP-076", "24/08/2026", "Smartphone", "Xiaomi", "Redmi Note 12", "Cambio de pantalla y desbloqueo", ""],
  ["REP-077", "25/08/2026", "Smartphone", "Xiaomi", "Redmi 14C", "Limpieza por humedad y cambio de pantalla", ""],
  ["REP-078", "25/08/2026", "Laptop", "Asus", "VivoBook", "Solución a trackpad numérico", ""],
  ["REP-079", "26/08/2026", "Impresora", "HP", "Serie 2900", "Configuración de impresora en PC HP", ""],
  ["REP-080", "26/08/2026", "Smartphone", "Samsung", "Galaxy A04", "Cambio de batería", ""],
  ["REP-081", "26/08/2026", "Smartphone", "Samsung", "Galaxy A22", "Reparación de placa de carga, huella y pantalla", ""],
  ["REP-082", "26/08/2026", "Smartphone", "Xiaomi", "Redmi Note 12S", "Cambio de pantalla", ""],
  ["REP-083", "27/08/2026", "Smartphone", "Xiaomi", "Redmi Note 11", "Cambio de pantalla", ""],
  ["REP-084", "27/08/2026", "Audio / Parlante", "JBL", "Charge 4 Versión S", "Cambio de batería y reparación de pin de carga", ""],
  ["REP-085", "27/08/2026", "Smartphone", "Samsung", "Galaxy A04e", "Cambio de pantalla", ""],
  ["REP-086", "27/08/2026", "Smartphone", "Samsung", "Galaxy A12", "Reparación de botón power", ""],
  ["REP-087", "28/08/2026", "Smartphone", "Samsung", "Galaxy M13", "Re-pegado de pantalla", ""],
  ["REP-088", "28/08/2026", "Smartphone", "Xiaomi", "Redmi 10C", "Reparación de pin de carga y cambio de pantalla", ""],
  ["REP-089", "28/08/2026", "Impresora", "Epson", "TM-U220D", "Mantenimiento y reparación de engranajes", "Graciela"],
  ["REP-090", "28/08/2026", "Smartphone", "Xiaomi", "Redmi Note 14 Pro", "Cambio de cámara y base de visor", ""],
  ["REP-091", "29/08/2026", "Celular Básico", "Nokia", "Nokia 106", "Cambio de pin de carga", ""],
  ["REP-092", "29/08/2026", "Smartphone", "Samsung", "Galaxy A32", "Cambio de pantalla", "Ana"],
  ["REP-093", "29/08/2026", "Impresora", "Epson", "LX-350", "Mantenimiento de impresora matricial", ""],
  ["REP-094", "29/08/2026", "Smartphone", "Xiaomi", "Mi 8 Lite", "Cambio de pantalla", "Ana"],
  ["REP-095", "01/09/2026", "Audio / Radio", "Megastar", "Radio Megastar", "Cambio de batería", ""],
  ["REP-096", "01/09/2026", "Smartphone", "Samsung", "Galaxy A12", "Cambio de pantalla", ""],
  ["REP-097", "01/09/2026", "Smartphone", "Samsung", "Galaxy A01", "Reparación de línea de carga", ""],
  ["REP-098", "02/09/2026", "Seguridad / Redes", "Genérico", "Cámaras WiFi (2 unidades)", "Instalación WiFi, eléctrica y tomacorriente", "2 fichas hembra y 7m cable"],
  ["REP-099", "03/09/2026", "Smartphone", "Samsung", "Galaxy A02", "Reparación de botón power y desbloqueo", ""],
  ["REP-100", "03/09/2026", "Smartphone", "Motorola", "Moto G42", "Reparación de sensor de carga", "Ana"],
  ["REP-101", "03/09/2026", "Smartphone", "Samsung", "Galaxy J7 Neo", "Reparación de pin de carga", "Ana"],
  ["REP-102", "03/09/2026", "Smartphone", "Samsung", "Galaxy A33", "Cambio de pantalla", ""],
  ["REP-103", "03/09/2026", "Smartphone", "Samsung", "Galaxy A32", "Cambio de pantalla y desbloqueo", "Derlis"],
  ["REP-104", "03/09/2026", "Smartphone", "Xiaomi", "Redmi 9A", "Reparación de botón power", ""],
  ["REP-105", "03/09/2026", "Smartphone", "Apple", "Android a iPhone", "Traspaso de datos", ""],
  ["REP-106", "03/09/2026", "Smartphone", "Apple", "iPhone 12", "Limpieza de pin de carga", ""],
  ["REP-107", "03/09/2026", "Smartphone", "Apple", "iPhone XS Max", "Limpieza de parlante y pin de carga", ""],
  ["REP-108", "04/09/2026", "Smartphone", "Apple", "iPhone 14 Pro Max", "Cambio de pantalla con trasplante de IC", ""],
  ["REP-109", "04/09/2026", "Smartphone", "Samsung", "Galaxy J7 Neo", "Recuperación de pin de carga", ""],
  ["REP-110", "05/09/2026", "Smartphone", "Motorola", "Moto G32", "Cambio de pantalla", ""],
  ["REP-111", "05/09/2026", "Smartphone", "Samsung", "Galaxy A12", "Cambio de pantalla", ""],
  ["REP-112", "07/09/2026", "Smartphone", "Samsung", "Galaxy A24", "Cambio de pin de carga", ""],
  ["REP-113", "07/09/2026", "Smartphone", "Samsung", "Galaxy S21 FE", "Reparación FPC pantalla y cambio FPC antena", ""],
  ["REP-114", "07/09/2026", "Smartphone", "Xiaomi", "Redmi 9A", "Cambio de pantalla", ""],
  ["REP-115", "07/09/2026", "Smartphone", "Xiaomi", "Redmi Note 8", "Flasheo y desbloqueo", ""],
  ["REP-116", "07/09/2026", "Audio / Auricular", "Xiaomi", "Auricular Réplica Redmi", "Reparación de pin de carga", ""],
  ["REP-117", "08/09/2026", "Smartphone", "Apple", "iPhone XR", "Cambio de pantalla", ""],
  ["REP-118", "10/09/2026", "Smartphone", "Xiaomi", "Redmi Note 11", "Cambio de batería", ""],
  ["REP-119", "10/09/2026", "Smartphone", "Xiaomi", "Redmi 9", "Reparación de conector FPC", "Derlis"],
  ["REP-120", "14/09/2026", "Smartphone", "Samsung", "Galaxy A14", "Cambio de pantalla", ""],
  ["REP-121", "14/09/2026", "Smartphone", "Samsung", "Galaxy A21s", "Desbloqueo", ""],
  ["REP-122", "14/09/2026", "Smartphone", "Samsung", "Galaxy A12", "Cambio de pantalla", ""],
  ["REP-123", "14/09/2026", "Smartphone", "Samsung", "Galaxy A21s", "Cambio de flex power y volumen", ""],
  ["REP-124", "14/09/2026", "Smartphone", "Samsung", "Galaxy A20", "Cambio de pantalla", ""],
  ["REP-125", "14/09/2026", "Smartphone", "Samsung", "Galaxy A02s", "Cambio de pantalla", ""],
  ["REP-126", "15/09/2026", "Smartphone", "Xiaomi", "Redmi 9", "Cambio de tapa trasera", ""],
  ["REP-127", "15/09/2026", "Smartphone", "Apple", "iPhone 13 Pro", "Recuperación de fotos", ""],
  ["REP-128", "16/09/2026", "Smartphone", "Samsung", "Galaxy A13", "Cambio de pantalla", ""],
  ["REP-129", "16/09/2026", "Impresora", "Brother", "HL-1200", "Reparación de impresora", ""],
  ["REP-130", "18/09/2026", "Smartphone", "Xiaomi", "Redmi 14C", "Cambio de pantalla", ""],
  ["REP-131", "18/09/2026", "Smartphone", "Tecno", "Spark 2024", "Cambio de pantalla", ""],
  ["REP-132", "19/09/2026", "Smartphone", "Tecno", "Spark", "Reparación de pin de carga", "Ana"],
  ["REP-133", "19/09/2026", "Smartphone", "Apple", "iPhone 11", "Retiro de tapa trasera", ""],
  ["REP-134", "21/09/2026", "Smartphone", "Xiaomi", "Redmi A3", "Cambio de pantalla", ""],
  ["REP-135", "21/09/2026", "Smartphone", "Apple", "iPhone 15 Pro", "Cambio de pantalla", ""],
  ["REP-136", "21/09/2026", "Celular Básico", "Nokia", "Nokia 110", "Cambio de pin de carga", ""],
  ["REP-137", "21/09/2026", "Smartphone", "Xiaomi", "Poco M5", "Cambio de pantalla", ""],
  ["REP-138", "21/09/2026", "Smartphone", "Xiaomi", "Redmi Note 12", "Reparación de conector FPC", ""],
  ["REP-139", "21/09/2026", "Smartphone", "Xiaomi", "Redmi 9A", "Reparación de botón power", "Ana"],
  ["REP-140", "21/09/2026", "Infraestructura", "Genérico", "Instalación eléctrica", "Reparación de parte eléctrica", "Derlis"],
  ["REP-141", "22/09/2026", "Seguridad / Redes", "HiLook", "Cámara 360", "Adaptación de cable UTP con fuente", ""],
  ["REP-142", "23/09/2026", "Smartphone", "Xiaomi", "Redmi 9A", "Cambio de pantalla y flasheo", "Ana"],
  ["REP-143", "23/09/2026", "Smartphone", "Xiaomi", "Redmi Note 11", "Reparación de pin de carga", ""],
  ["REP-144", "23/09/2026", "Smartphone", "Samsung", "Galaxy A21s", "Cambio de botones y re-pegado de pantalla", ""],
  ["REP-145", "23/09/2026", "Smartphone", "Apple", "iPhone 15 Pro", "Cambio de pantalla con trasplante de IC", ""],
  ["REP-146", "23/09/2026", "Smartphone", "Samsung", "Galaxy A04", "Cambio de pantalla y flasheo", "Derlis"],
  ["REP-147", "23/09/2026", "Smartphone", "Samsung", "Galaxy A21s", "Cambio de pantalla", ""],
  ["REP-148", "24/09/2026", "Smartphone", "Apple", "Galaxy A14 a iPhone 13 Pro", "Traspaso de datos", ""],
  ["REP-149", "24/09/2026", "Smartphone", "Xiaomi", "Redmi Note 8 Pro", "Cambio de pantalla", ""],
  ["REP-150", "24/09/2026", "Multimedia", "Genérico", "3 Dispositivos TV/Móvil", "Instalación de aplicación Flujo", ""],
  ["REP-151", "24/09/2026", "Smartphone", "Apple", "iPhone 12 Pro", "Cambio de pantalla", ""],
  ["REP-152", "25/09/2026", "Smartphone", "Xiaomi", "Redmi A5", "Desbloqueo FRP", ""],
  ["REP-153", "25/09/2026", "Smartphone", "Apple", "iPhone 15 Pro", "Cambio y programación de pantalla", ""],
  ["REP-154", "25/09/2026", "Smartphone", "Apple", "iPhone 11", "Mantenimiento de pin de carga", ""],
  ["REP-155", "25/09/2026", "Smartphone", "Xiaomi", "Redmi Note 11", "Reparación de reinicio", ""],
  ["REP-156", "25/09/2026", "Smartphone", "Xiaomi", "Redmi 14C", "Cambio de pantalla", ""],
  ["REP-157", "26/09/2026", "Smartphone", "Genérico", "Placa de teléfono", "Recuperación de pistas y resoldado de pin", ""],
  ["REP-158", "26/09/2026", "Smartphone", "Samsung", "Galaxy S24 Plus", "Mantenimiento de pin de carga", ""],
  ["REP-159", "28/09/2026", "Celular Básico", "Nokia", "Nokia 110", "Cambio de pin de carga", ""],
  ["REP-160", "28/09/2026", "Smartphone", "Samsung", "Galaxy A02", "Cambio de pin de carga", ""],
  ["REP-161", "28/09/2026", "Smartphone", "Samsung", "Galaxy S8", "Cambio de flex de carga", ""],
  ["REP-162", "28/09/2026", "Smartphone", "Samsung", "Galaxy A02s", "Cambio de pantalla", ""],
  ["REP-163", "28/09/2026", "Smartphone", "Xiaomi", "Redmi Note 13", "Cambio de pantalla", ""],
  ["REP-164", "28/09/2026", "Smartphone", "Samsung", "Galaxy A13", "Cambio de pin de carga", "Honorio"],
  ["REP-165", "28/09/2026", "Smartphone", "Samsung", "Galaxy J6", "Cambio de pin de carga", ""],
  ["REP-166", "29/09/2026", "Smartphone", "Samsung", "Galaxy A03", "Cambio de pantalla", ""],
  ["REP-167", "29/09/2026", "Smartphone", "Samsung", "Galaxy S20 FE", "Cambio de pantalla", ""],
  ["REP-168", "29/09/2026", "Electrónica", "Toyota", "Control de vehículo", "Reparación de control Toyota", ""],
  ["REP-169", "29/09/2026", "Smartphone", "Samsung", "Galaxy A15", "Cambio de pantalla", "Honorio"],
  ["REP-170", "29/09/2026", "Smartphone", "Samsung", "Galaxy A55", "Reparación de placa de carga", ""],
  ["REP-171", "30/09/2026", "Smartphone", "Xiaomi", "Redmi 15C", "Cambio de pantalla", "Derlis"],
  ["REP-172", "30/09/2026", "PC / Laptop", "Genérico", "Computadora", "Cambio a disco SSD, instalación SO y activación", ""],
  ["REP-173", "30/09/2026", "Smartphone", "Samsung", "Galaxy A21s", "Cambio de pin y flex de carga", ""],
  ["REP-174", "01/10/2026", "Smartphone", "Samsung", "Galaxy A21s", "Cambio de pantalla", ""],
  ["REP-175", "01/10/2026", "Smartphone", "Samsung", "Galaxy A13", "Cambio de pin de carga", "Ever"],
  ["REP-176", "01/10/2026", "Smartphone", "Apple", "iPhone 6s", "Cambio de pantalla", "Honorio"],
  ["REP-177", "01/10/2026", "Smartphone", "Samsung", "Galaxy A15", "Cambio de pantalla", "Honorio"],
  ["REP-178", "01/10/2026", "Smartphone", "Samsung", "Galaxy A12", "Cambio de pantalla", "Derlis"],
  ["REP-179", "02/10/2026", "Tablet", "Xiaomi", "Redmi Pad 2", "Flasheo de software", ""],
  ["REP-180", "02/10/2026", "Smartphone", "Xiaomi", "Galaxy A25 a Redmi 15C", "Traspaso de datos y configuración", ""],
  ["REP-181", "02/10/2026", "Smartphone", "Samsung", "Galaxy A10", "Reparación de placa de carga, micrófono y power", ""],
  ["REP-182", "02/10/2026", "Smartphone", "Samsung", "Galaxy A13", "Cambio de placa de carga", ""],
  ["REP-183", "03/10/2026", "Smartphone", "Samsung", "Galaxy A31", "Cambio de pantalla", ""],
  ["REP-184", "03/10/2026", "Smartphone", "Xiaomi", "Redmi Note 10S", "Cambio de pantalla", ""],
  ["REP-185", "03/10/2026", "Smartphone", "Xiaomi", "Redmi Note 12 Pro+", "Reparación de reinicio", ""],
  ["REP-186", "03/10/2026", "Smartphone", "Apple", "iPhone 12", "Cambio de batería", "Honorio"],
  ["REP-187", "05/10/2026", "Smartphone", "Samsung", "Galaxy A14 5G", "Cambio de pantalla y pin de carga", ""],
  ["REP-188", "05/10/2026", "Smartphone", "Samsung", "Galaxy A03", "Cambio de pin de carga", ""],
  ["REP-189", "05/10/2026", "Smartphone", "Samsung", "Galaxy A13", "Reparación de micrófono", ""],
  ["REP-190", "05/10/2026", "Smartphone", "Samsung", "Galaxy A72", "Reparación de lector SIM", "Nancy"],
  ["REP-191", "05/10/2026", "Smartphone", "Umidigi", "Umidigi", "Adaptación de batería", ""],
  ["REP-192", "05/10/2026", "Smartphone", "Samsung", "Galaxy A34", "Cambio de pantalla", ""],
  ["REP-193", "06/10/2026", "Infraestructura", "Genérico", "Luces LED externas", "Cambio de luces LED", ""],
  ["REP-194", "06/10/2026", "Smartphone", "Samsung", "Galaxy A13", "Cambio de pin de carga", "Ana"],
  ["REP-195", "06/10/2026", "Smartphone", "Apple", "iPhone 15 Pro Max", "Cambio de pantalla con trasplante de IC", ""],
  ["REP-196", "06/10/2026", "Smartphone", "Samsung", "Galaxy A13", "Cambio de pantalla y reparación de audio", ""],
  ["REP-197", "07/10/2026", "Audio / Radio", "Genérico", "Radio portátil", "Reparación de pin de carga y pistas", ""],
  ["REP-198", "07/10/2026", "Smartphone", "Samsung", "Galaxy A52", "Cambio de pantalla", "Honorio"],
  ["REP-199", "07/10/2026", "Smartphone", "Samsung", "Galaxy S24 Ultra", "Reparación de cámara", ""],
  ["REP-200", "07/10/2026", "Smartphone", "Apple", "iPhone 12 Pro", "Cambio de tapa y flex power/volumen", ""],
  ["REP-201", "09/10/2026", "Smartphone", "Samsung", "Galaxy A72", "Reparación de FPC y cambio de pin de carga", ""],
  ["REP-202", "09/10/2026", "Smartphone", "Apple", "Galaxy S22 a iPhone 16 Pro Max", "Traspaso de datos", "Anotado como 18 Pro Max"],
  ["REP-203", "09/10/2026", "Smartphone", "Samsung", "Galaxy A21s", "Cambio de pantalla", ""],
  ["REP-204", "12/10/2026", "Smartphone", "Samsung", "Galaxy A50", "Cambio de pantalla", ""],
  ["REP-205", "12/10/2026", "Smartphone", "Samsung", "Galaxy A15", "Ajuste y resoldado de conector FPC", ""],
  ["REP-206", "13/10/2026", "Smartphone", "Xiaomi", "Redmi 13C", "Cambio de pantalla y placa de carga", ""],
  ["REP-207", "13/10/2026", "Celular Básico", "Nokia", "Nokia 110", "Reparación de jack de audio 2.5", ""],
  ["REP-208", "13/10/2026", "Infraestructura", "Genérico", "Luminaria LED", "Colocación de luz LED", ""],
  ["REP-209", "13/10/2026", "Smartphone", "Samsung", "Galaxy A32", "Cambio de pantalla", ""],
  ["REP-210", "14/10/2026", "Smartphone", "Samsung", "Galaxy A21s", "Cambio de pantalla", "Honorio"],
  ["REP-211", "14/10/2026", "Smartphone", "Tecno", "Spark 2023", "Cambio de pantalla", ""],
  ["REP-212", "14/10/2026", "Smartphone", "Xiaomi", "Redmi Note 11 Pro+", "Cambio de batería", ""],
  ["REP-213", "14/10/2026", "Smartphone", "Samsung", "Galaxy A13", "Cambio de pantalla", ""],
  ["REP-214", "14/10/2026", "Smartphone", "Samsung", "Galaxy A54", "Reparación de pin de carga", "Honorio"],
  ["REP-215", "14/10/2026", "Smartphone", "Apple", "iPhone 12 Pro", "Cambio de pantalla", ""],
  ["REP-216", "15/10/2026", "Smartphone", "Samsung", "Galaxy A13", "Cambio de pantalla", ""],
  ["REP-217", "15/10/2026", "Smartphone", "Xiaomi", "Redmi 13C", "Reparación de conector FPC (no cargaba)", "Honorio"],
  ["REP-218", "15/10/2026", "Smartphone", "Apple", "iPhone 13 a iPhone 16", "Traspaso de datos", ""],
  ["REP-219", "16/10/2026", "Smartphone", "Samsung", "Galaxy A13", "Cambio de pantalla", "Honorio"],
  ["REP-220", "16/10/2026", "Smartphone", "Xiaomi", "Redmi Note 8 Pro", "Reparación de botón power y volumen", ""],
  ["REP-221", "16/10/2026", "Smartphone", "Samsung", "Galaxy A52", "Ajuste de pin de carga y parlante", "Ana"],
  ["REP-222", "16/10/2026", "Smartphone", "Samsung", "Galaxy A21s", "Cambio de pantalla", ""],
  ["REP-223", "16/10/2026", "Smartphone", "Samsung", "Galaxy A16", "Cambio de pantalla", ""],
  ["REP-224", "16/10/2026", "PC / Software", "Genérico", "PC / Laptop", "Actualización de drivers y activación Office 365", ""],
  ["REP-225", "17/10/2026", "Smartphone", "Honor", "X5b", "Cambio de pantalla", ""],
  ["REP-226", "17/10/2026", "Smartphone", "Samsung", "Galaxy A13", "Cambio de pantalla", ""],
  ["REP-227", "17/10/2026", "Smartphone", "Apple", "iPhone 11", "Limpieza de cámara y sellado de pantalla", ""],
  ["REP-228", "19/10/2026", "Smartphone", "Samsung", "Galaxy A13", "Cambio de pantalla", ""],
  ["REP-229", "19/10/2026", "Smartphone", "Samsung", "Galaxy A05", "Cambio de pantalla", "Ana"],
  ["REP-230", "19/10/2026", "Smartphone", "Apple", "iPhone 13", "Cambio de pantalla con IC y tapa trasera", ""],
  ["REP-231", "19/10/2026", "Smartphone", "Samsung", "Galaxy A32", "Cambio de pantalla", ""],
  ["REP-232", "19/10/2026", "Smartphone", "Samsung", "Galaxy A21s", "Cambio de pantalla", "Honorio"],
  ["REP-233", "20/10/2026", "Smartphone", "Samsung", "Galaxy M12", "Cambio de pantalla", ""],
  ["REP-234", "20/10/2026", "Smartphone", "Samsung", "Galaxy A13", "Cambio de pantalla", "Ever"],
  ["REP-235", "20/10/2026", "Smartphone", "Apple", "iPhone 12 Pro", "Revisión de pantalla y fallo de apagado", ""],
  ["REP-236", "21/10/2026", "Smartphone", "Realme", "C65", "Limpieza y mantenimiento general", ""],
  ["REP-237", "21/10/2026", "Smartphone", "Samsung", "Galaxy A53", "Limpieza y mantenimiento general", ""],
  ["REP-238", "21/10/2026", "Smartphone", "Samsung", "Galaxy S20 FE", "Cambio de pantalla", "Ana"],
  ["REP-239", "21/10/2026", "Smartphone", "Xiaomi", "Redmi Note 10", "Cambio de pantalla", ""],
  ["REP-240", "21/10/2026", "Celular Básico", "Nokia", "Nokia", "Cambio de pin de carga", "Ana"],
  ["REP-241", "21/10/2026", "Smartphone", "Samsung", "Galaxy A03 Core", "Cambio de pantalla y pin de carga", ""],
  ["REP-242", "22/10/2026", "Seguridad / Redes", "Genérico", "Red de internet", "Verificación y solución de internet", "Hospital"],
  ["REP-243", "22/10/2026", "Smartphone", "Apple", "iPhone 13 Pro", "Cambio de housing, pantalla con IC y batería", "Ña Graciela"],
  ["REP-244", "23/10/2026", "Smartphone", "Xiaomi", "Redmi Note 11", "Cambio de pantalla", "Anotado como 2023"],
  ["REP-245", "23/10/2026", "Smartphone", "Samsung", "Galaxy A33", "Cambio de pantalla", "Anotado como 2023"],
  ["REP-246", "23/10/2026", "PC / Software", "Genérico", "PC / Laptop", "Activación de paquete Office", "Anotado como 2023"],
  ["REP-247", "23/10/2026", "Smartphone", "Samsung", "Galaxy A20s", "Cambio de firmware y desbloqueo", "Anotado como 2023"],
  ["REP-248", "23/10/2026", "Tablet", "C-Idea", "Tablet C-Idea", "Adaptación de pin de carga", "Anotado como 2023"],
  ["REP-249", "26/10/2026", "Smartphone", "Apple", "iPhone 13 Pro Max", "Cambio de tapa y batería con reprogramación", ""],
  ["REP-250", "26/10/2026", "Smartphone", "Samsung", "Galaxy A50", "Reparación de reinicio", ""],
  ["REP-251", "26/10/2026", "Seguridad / Redes", "Imou", "Cámara IP", "Instalación de cámara en poste", ""],
  ["REP-252", "27/10/2026", "Smartphone", "Samsung", "Galaxy A20s", "Cambio de pantalla", ""],
  ["REP-253", "27/10/2026", "Audio / Parlante", "JBL", "Charge 5", "Cambio de placa de carga", ""],
  ["REP-254", "27/10/2026", "Smartphone", "Apple", "iPhone 11", "Cambio de pantalla", ""],
  ["REP-255", "28/10/2026", "Tablet", "Amazon", "Fire", "Cambio de pin de carga", ""],
  ["REP-256", "28/10/2026", "Audio / Parlante", "JBL", "Grip", "Reparación de puerto de carga", ""],
  ["REP-257", "29/10/2026", "Smartphone", "Samsung", "Galaxy A04e", "Cambio de batería y placa de carga", ""],
  ["REP-258", "29/10/2026", "Smartphone", "Samsung", "Galaxy A03s", "Cambio de pantalla", ""],
  ["REP-259", "29/10/2026", "Smartphone", "Samsung", "Galaxy A03s", "Cambio de pantalla y desbloqueo", "Derlis"],
  ["REP-260", "29/10/2026", "Smartphone", "Samsung", "Galaxy A30s", "Cambio de housing y solución de audio", ""],
  ["REP-261", "30/10/2026", "Smartphone", "Samsung", "Galaxy A13", "Cambio de pantalla", ""],
  ["REP-262", "30/10/2026", "Smartphone", "Samsung", "Galaxy A04e", "Cambio de pantalla", ""],
  ["REP-263", "30/10/2026", "Smartphone", "Samsung", "Galaxy A26", "Flasheo de software", ""],
  ["REP-264", "30/10/2026", "Smartphone", "Xiaomi", "Redmi Note 12S", "Cambio de batería", "Ana"],
  ["REP-265", "30/10/2026", "Audio / Parlante", "JBL", "Charge 3", "Cambio de batería", ""],
  ["REP-266", "30/10/2026", "Smartphone", "Motorola", "Moto E7i", "Cambio de pin de carga", ""],
  ["REP-267", "30/10/2026", "Smartphone", "Samsung", "Galaxy A30s", "Cambio de pin de carga", ""],
  ["REP-268", "30/10/2026", "Smartphone", "Realme", "8i", "Solución a apagado de pantalla", "Derlis"],
  ["REP-269", "31/10/2026", "Smartphone", "Samsung", "Galaxy A15", "Cambio de pantalla", "Honorio"],
  ["REP-270", "31/10/2026", "Smartphone", "Xiaomi", "Redmi Note 9", "Solución a reinicio, audio y cambio flex carga", ""],
  ["REP-271", "31/10/2026", "Smartphone", "Samsung", "Galaxy S21 FE", "Solución a carga y señal", ""],
  ["REP-272", "31/10/2026", "Smartphone", "Honor", "X7b", "Cambio de pantalla y pin de carga", ""],
  ["REP-273", "31/10/2026", "Smartphone", "Samsung", "Galaxy A31", "Cambio de pin de carga y botón power", ""],
  ["REP-274", "31/10/2026", "Smartphone", "Samsung", "Galaxy A50", "Cambio de pantalla y reparación de IC de carga", ""],
  ["REP-275", "31/10/2026", "Smartphone", "Samsung", "Galaxy S21 FE", "Cambio de batería y reparación de carga húmeda", ""],
  ["REP-276", "04/11/2026", "Smartphone", "Realme", "C11", "Cambio de pantalla", ""],
  ["REP-277", "04/11/2026", "Smartphone", "Samsung", "Galaxy A03", "Cambio de pantalla", ""],
  ["REP-278", "05/11/2026", "Smartphone", "Motorola", "Moto G15", "Cambio de pantalla", ""],
  ["REP-279", "05/11/2026", "Smartphone", "TCL", "605", "Limpieza por humedad, resoldado y pantalla", ""],
  ["REP-280", "05/11/2026", "Smartphone", "Xiaomi", "Redmi Note 11", "Cambio de pantalla y desbloqueo FRP", "Derlis"],
  ["REP-281", "05/11/2026", "Smartphone", "Samsung", "Galaxy A13", "Cambio de pantalla y desbloqueo FRP", "A13"],
  ["REP-282", "06/11/2026", "Smartphone", "Samsung", "Galaxy A23", "Cambio de pantalla", ""],
  ["REP-283", "07/11/2026", "Smartphone", "Samsung", "Galaxy A03 Core", "Cambio de pantalla, visor de cámara y FRP", "Derlis"],
  ["REP-284", "07/11/2026", "Smartphone", "Samsung", "Huawei Y9 2019 a Galaxy A03s", "Traspaso de datos", ""],
  ["REP-285", "07/11/2026", "Smartphone", "Samsung", "Galaxy A13", "Cambio de pantalla", ""],
  ["REP-286", "07/11/2026", "Smartphone", "Huawei", "Y9 2019", "Cambio de pantalla y flasheo", "Derlis"],
  ["REP-287", "07/11/2026", "Smartphone", "Samsung", "Galaxy A52", "Ajuste de conector FPC", ""]
];

// Función segura para normalizar cualquier texto o número para búsquedas sin tildes
function limpiarParaBusqueda(valor) {
  return String(valor ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function deducirIntervencionJunior(trabajo) {
  const t = String(trabajo ?? "").toLowerCase();
  const lista = [];
  if (t.includes("pantalla") || t.includes("táctil") || t.includes("display") || t.includes("módulo")) lista.push("Cambio de Pantalla / Módulo");
  if (t.includes("pin") || t.includes("puerto de carga") || t.includes("placa de carga") || t.includes("línea de carga") || t.includes("flex de carga") || t.includes("flex carga")) lista.push("Pin de Carga / Placa de Carga");
  if (t.includes("batería") || t.includes("bateria") || t.includes("tapa") || t.includes("housing") || t.includes("botón") || t.includes("botones") || t.includes("bisagra") || t.includes("cámara") || t.includes("flex power")) lista.push("Cambio de Batería / Flex / Carcasa");
  if (t.includes("desbloqueo") || t.includes("frp") || t.includes("flasheo") || t.includes("firmware") || t.includes("desbrickeo")) lista.push("Desbloqueo / FRP / Flasheo");
  if (t.includes("fpc") || t.includes("ic") || t.includes("pistas") || t.includes("resoldado") || t.includes("reinicio") || t.includes("sensor") || t.includes("micrófono") || t.includes("audio") || t.includes("señal")) lista.push("Microelectrónica / Placa / FPC");
  if (t.includes("limpieza") || t.includes("mantenimiento") || t.includes("humedad") || t.includes("cartucho")) lista.push("Mantenimiento Físico / Limpieza");
  if (t.includes("traspaso") || t.includes("recuperación") || t.includes("office") || t.includes("ssd") || t.includes("software") || t.includes("flujo") || t.includes("firma digital")) lista.push("Software / Traspaso de Datos / Backup");
  if (t.includes("eléctrica") || t.includes("wifi") || t.includes("utp") || t.includes("ethernet") || t.includes("internet") || t.includes("led")) lista.push("Instalación / Redes / Electricidad");
  return lista.length > 0 ? lista.join(" + ") : "Reemplazo de Repuesto / Hardware";
}

function deducirRepuestosJunior(trabajo) {
  const t = String(trabajo ?? "").toLowerCase();
  const rep = [];
  if (t.includes("cambio de pantalla") || t.includes("y pantalla")) rep.push("Módulo de Pantalla");
  if (t.includes("cambio de pin") || t.includes("pin de carga")) rep.push("Pin de Carga");
  if (t.includes("placa de carga")) rep.push("Placa de Carga");
  if (t.includes("batería") || t.includes("bateria")) rep.push("Batería");
  if (t.includes("tapa")) rep.push("Tapa Trasera");
  if (t.includes("housing")) rep.push("Housing / Carcasa");
  if (t.includes("ssd")) rep.push("Disco SSD");
  if (t.includes("flex")) rep.push("Cable Flex");
  return rep.length > 0 ? rep.join(" + ") : "Insumos de Taller";
}

function formatearGuaranies(valor) {
  if (!valor) return "";
  const limpio = String(valor).replace(/\D/g, "");
  if (!limpio) return "";
  const num = parseInt(limpio, 10);
  if (isNaN(num) || num <= 0) return "";
  return num.toLocaleString("es-PY") + " Gs";
}

function obtenerMontoNumerico(precioStr) {
  if (!precioStr) return 0;
  const limpio = String(precioStr).replace(/\D/g, "");
  return parseInt(limpio, 10) || 0;
}

function extraerPrecioDeTexto(linea) {
  let texto = String(linea ?? "").trim();
  let precioFormateado = "";
  const regexParentesisGs = /\(\s*(\d{1,3}(?:[.,]\d{3})+|\d{4,9})\s*(?:gs\.?|guaran[ií]es)\s*\)/i;
  const regexExplicito = /(?:\s+[-–:]?\s*|\b)(\d{1,3}(?:[.,]\d{3})+|\d{4,9})\s*(?:gs\.?|guaran[ií]es)\b\.?/i;

  const mParen = texto.match(regexParentesisGs);
  if (mParen) {
    precioFormateado = formatearGuaranies(mParen[1]);
    texto = texto.replace(mParen[0], " ").trim();
  } else {
    const mExp = texto.match(regexExplicito);
    if (mExp) {
      precioFormateado = formatearGuaranies(mExp[1]);
      texto = texto.replace(mExp[0], " ").trim();
    }
  }
  texto = texto.replace(/[-–:,\s]+$/, "").trim();
  return { textoSinPrecio: texto, precio: precioFormateado };
}

const DATOS_JUNIOR = RAW_DATOS_JUNIOR.map(([id, fecha, categoria, marca, modelo, trabajo, notas]) => {
  const ext = extraerPrecioDeTexto(notas);
  return {
    id,
    fecha,
    categoria,
    marca,
    modelo,
    intervencion: deducirIntervencionJunior(trabajo),
    trabajo,
    repuestos: deducirRepuestosJunior(trabajo),
    precio: ext.precio || "",
    notas: ext.precio ? ext.textoSinPrecio : notas,
    tecnico: "JUNIOR ALMIRON"
  };
});

// 348 REGISTROS MAESTROS UNIFICADOS (61 ÁNGEL + 287 JUNIOR)
const DATOS_MAESTROS_UNIFICADOS = [...DATOS_ANGEL, ...DATOS_JUNIOR];

let servicios = [];
let modoVistaActual = "tabla";
let driveUrl = localStorage.getItem(DRIVE_URL_KEY) || DEFAULT_DRIVE_URL;

function normalizarFecha(f) {
  if (!f) return "";
  const str = String(f).trim();
  if (str.includes("T")) {
    const soloFecha = str.split("T")[0];
    const partes = soloFecha.split("-");
    if (partes.length === 3) return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }
  const matchGuion = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (matchGuion) return `${matchGuion[3]}/${matchGuion[2]}/${matchGuion[1]}`;
  return str;
}

function obtenerDiaSemana(fechaDDMMYYYY) {
  if (!fechaDDMMYYYY) return "";
  const partes = String(fechaDDMMYYYY).trim().split("/");
  if (partes.length !== 3) return "";
  const [dd, mm, yyyy] = partes.map(Number);
  if (!dd || !mm || !yyyy) return "";
  const fechaObj = new Date(yyyy, mm - 1, dd);
  if (isNaN(fechaObj.getTime())) return "";
  const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  return dias[fechaObj.getDay()];
}

function obtenerNombreMesAnio(fechaDDMMYYYY) {
  const partes = String(fechaDDMMYYYY ?? "").split("/");
  if (partes.length !== 3) return "";
  const mm = parseInt(partes[1], 10);
  const yyyy = partes[2];
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  if (!mm || mm < 1 || mm > 12) return "";
  return `${meses[mm - 1]} ${yyyy}`;
}

function convertirFechaATimestamp(fechaDDMMYYYY) {
  const partes = String(fechaDDMMYYYY ?? "").split("/");
  if (partes.length !== 3) return 0;
  const [dd, mm, yyyy] = partes.map(Number);
  return new Date(yyyy, mm - 1, dd).getTime() || 0;
}

function identificarTecnico(item) {
  const t = String(item.tecnico ?? "").toUpperCase();
  const id = String(item.id ?? "").toUpperCase();
  if (t.includes("ANGEL") || t.includes("ÁNGEL") || id.startsWith("SER-")) return "ANGEL VILLALBA";
  if (t.includes("JUNIOR") || id.startsWith("REP-")) return "JUNIOR ALMIRON";
  return "ANGEL VILLALBA";
}

function normalizarRegistros(lista) {
  return lista.map((item) => {
    const tecnico = identificarTecnico(item);
    const trabajoRaw = String(item.trabajo ?? "").replace(/Ajuste reflux de conector FPC/gi, "Ajuste y resoldado de conector FPC");
    const notasRaw = String(item.notas ?? "")
      .replace(/\(Téc:\s*ANGEL VILLALBA\)/gi, "")
      .replace(/Téc:\s*ANGEL VILLALBA/gi, "")
      .trim();

    const extTrabajo = extraerPrecioDeTexto(trabajoRaw);
    const extNotas = extraerPrecioDeTexto(notasRaw);
    const precioFinal = item.precio ? formatearGuaranies(item.precio) : (extTrabajo.precio || extNotas.precio || "");
    const trabajoLimpio = extTrabajo.precio ? extTrabajo.textoSinPrecio : trabajoRaw;
    const notasLimpias = (extNotas.precio && !item.precio) ? extNotas.textoSinPrecio : notasRaw;

    let inter = String(item.intervencion ?? deducirIntervencionJunior(trabajoLimpio));
    inter = inter.replace(/\/ Reflux/gi, "").trim();

    return {
      id: String(item.id ?? "").trim(),
      fecha: String(normalizarFecha(item.fecha) ?? "").trim(),
      categoria: String(item.categoria ?? "Smartphone").trim(),
      marca: String(item.marca ?? "Genérico").trim(),
      modelo: String(item.modelo ?? "-").trim(),
      intervencion: inter,
      trabajo: String(trabajoLimpio ?? "").trim(),
      repuestos: String(item.repuestos ?? "Ninguno").trim(),
      precio: String(precioFinal ?? "").trim(),
      estado: String(item.estado ?? "Entregado").trim(),
      notas: String(notasLimpias ?? "").trim(),
      tecnico: String(tecnico).trim()
    };
  });
}

function fusionarBaseCompleta(listaEntrante) {
  const mapa = new Map();
  DATOS_MAESTROS_UNIFICADOS.forEach((m) => mapa.set(String(m.id).trim().toUpperCase(), m));
  if (Array.isArray(listaEntrante)) {
    listaEntrante.forEach((item) => {
      if (item && item.id) {
        mapa.set(String(item.id).trim().toUpperCase(), item);
      }
    });
  }
  const todos = Array.from(mapa.values());
  return todos.sort((a, b) => {
    const tA = convertirFechaATimestamp(normalizarFecha(a.fecha));
    const tB = convertirFechaATimestamp(normalizarFecha(b.fecha));
    if (tA !== tB) return tA - tB;
    const numA = parseInt(String(a.id).replace(/\D/g, "")) || 0;
    const numB = parseInt(String(b.id).replace(/\D/g, "")) || 0;
    return numA - numB;
  });
}

function inicializarIconos() {
  if (window.lucide && typeof lucide.createIcons === "function") {
    try {
      lucide.createIcons();
    } catch (e) {
      console.warn("Lucide:", e);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarIconos();
  configurarSeguridad();
  configurarEventos();
});

function configurarSeguridad() {
  const pantallaLogin = document.getElementById("pantalla-login");
  const appContenido = document.getElementById("app-contenido");
  const formLogin = document.getElementById("form-login");
  const inpPass = document.getElementById("inp-password");
  const errorLogin = document.getElementById("error-login");

  const desbloquear = () => {
    pantallaLogin.style.display = "none";
    appContenido.classList.remove("hidden");
    appContenido.style.display = "flex";
    cargarBaseDeDatos();
    inicializarIconos();
  };

  if (sessionStorage.getItem(AUTH_SESSION_KEY) === "true") {
    desbloquear();
  }

  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    if (inpPass.value.trim() === PIN_ACCESO) {
      sessionStorage.setItem(AUTH_SESSION_KEY, "true");
      errorLogin.classList.add("hidden");
      inpPass.value = "";
      desbloquear();
    } else {
      errorLogin.classList.remove("hidden");
      inpPass.value = "";
      inpPass.focus();
    }
  });

  const bloquearSistema = () => {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    appContenido.classList.add("hidden");
    appContenido.style.display = "none";
    pantallaLogin.style.display = "flex";
    inpPass.focus();
  };

  const btnBloquear = document.getElementById("btn-bloquear");
  const btnBloquearMovil = document.getElementById("btn-bloquear-movil");
  if (btnBloquear) btnBloquear.addEventListener("click", bloquearSistema);
  if (btnBloquearMovil) btnBloquearMovil.addEventListener("click", bloquearSistema);
}

function cargarBaseDeDatos() {
  // Limpiar versiones viejas de caché local
  localStorage.removeItem("dn_monitoreo_derlis_db_v1");
  localStorage.removeItem("dn_monitoreo_derlis_db_v2");

  const guardados = localStorage.getItem(STORAGE_KEY);
  if (guardados) {
    try {
      const parsed = JSON.parse(guardados);
      servicios = normalizarRegistros(fusionarBaseCompleta(parsed));
    } catch (e) {
      servicios = normalizarRegistros(fusionarBaseCompleta([]));
    }
  } else {
    servicios = normalizarRegistros(fusionarBaseCompleta([]));
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(servicios));

  actualizarContadoresTabsTecnicos();
  poblarSelectores();
  aplicarFiltros();

  if (driveUrl) {
    sincronizarDesdeDrive(false);
  }
}

function actualizarContadoresTabsTecnicos() {
  const total = servicios.length;
  const cantAngel = servicios.filter((s) => s.tecnico === "ANGEL VILLALBA").length;
  const cantJunior = servicios.filter((s) => s.tecnico === "JUNIOR ALMIRON").length;

  const bTodos = document.getElementById("badge-count-todos");
  const bAngel = document.getElementById("badge-count-angel");
  const bJunior = document.getElementById("badge-count-junior");

  if (bTodos) bTodos.textContent = total;
  if (bAngel) bAngel.textContent = cantAngel;
  if (bJunior) bJunior.textContent = cantJunior;
}

function poblarSelectores() {
  const selCat = document.getElementById("filtro-categoria");
  const selMes = document.getElementById("filtro-mes");
  const selFecha = document.getElementById("filtro-fecha");

  if (!selCat || !selMes || !selFecha) return;

  const valCat = selCat.value;
  const valMes = selMes.value;
  const valFecha = selFecha.value;

  const categorias = [...new Set(servicios.map((s) => String(s.categoria ?? "")))].filter(Boolean).sort();
  const mesesSet = new Set();
  servicios.forEach((s) => {
    const m = obtenerNombreMesAnio(s.fecha);
    if (m) mesesSet.add(m);
  });
  const meses = [...mesesSet];

  const fechasUnicas = [...new Set(servicios.map((s) => String(s.fecha ?? "")))]
    .filter(Boolean)
    .sort((a, b) => convertirFechaATimestamp(b) - convertirFechaATimestamp(a));

  selCat.innerHTML = '<option value="">Todas las categorías</option>' + categorias.map((c) => `<option value="${c}">${c}</option>`).join("");
  selMes.innerHTML = '<option value="">Todos los meses</option>' + meses.map((m) => `<option value="${m}">${m}</option>`).join("");
  selFecha.innerHTML =
    '<option value="">Todas las fechas</option>' +
    fechasUnicas
      .map((f) => {
        const dia = obtenerDiaSemana(f);
        const cant = servicios.filter((s) => s.fecha === f).length;
        return `<option value="${f}">${f} (${dia} · ${cant} serv.)</option>`;
      })
      .join("");

  selCat.value = valCat;
  selMes.value = valMes;
  selFecha.value = valFecha;
}

function aplicarFiltros() {
  const inpTexto = document.getElementById("filtro-texto");
  const selTecnico = document.getElementById("filtro-tecnico");
  const selMes = document.getElementById("filtro-mes");
  const selFecha = document.getElementById("filtro-fecha");
  const selCat = document.getElementById("filtro-categoria");

  const textoQuery = limpiarParaBusqueda(inpTexto ? inpTexto.value : "");
  const palabrasBusqueda = textoQuery ? textoQuery.split(/\s+/).filter(Boolean) : [];
  const tecnico = selTecnico ? selTecnico.value : "";
  const mes = selMes ? selMes.value : "";
  const fecha = selFecha ? selFecha.value : "";
  const cat = selCat ? selCat.value : "";

  document.querySelectorAll(".btn-tab-tecnico").forEach((btn) => {
    const tBtn = btn.getAttribute("data-tecnico") || "";
    if (tBtn === tecnico) {
      btn.className = "btn-tab-tecnico bg-zinc-900 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-sm transition flex items-center gap-2";
    } else {
      btn.className = "btn-tab-tecnico bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition flex items-center gap-2";
    }
  });

  const filtrados = servicios.filter((item) => {
    const diaNombre = obtenerDiaSemana(item.fecha);
    const mesNombre = obtenerNombreMesAnio(item.fecha);

    let coincideTexto = true;
    if (palabrasBusqueda.length > 0) {
      const bloqueFila = limpiarParaBusqueda(
        `${item.id} ${item.fecha} ${diaNombre} ${mesNombre} ${item.tecnico} ${item.categoria} ${item.marca} ${item.modelo} ${item.intervencion} ${item.trabajo} ${item.repuestos} ${item.precio} ${item.notas}`
      );
      coincideTexto = palabrasBusqueda.every((palabra) => bloqueFila.includes(palabra));
    }

    const coincideTecnico = !tecnico || item.tecnico === tecnico;
    const coincideMes = !mes || mesNombre === mes;
    const coincideFecha = !fecha || item.fecha === fecha;
    const coincideCat = !cat || item.categoria === cat;

    return coincideTexto && coincideTecnico && coincideMes && coincideFecha && coincideCat;
  });

  renderizarVistaTabla(filtrados);
  renderizarVistaDiaria(filtrados);
  actualizarKPIs(filtrados);
}

window.aplicarFiltros = aplicarFiltros;

function obtenerBadgeTecnico(tecnico) {
  if (tecnico === "ANGEL VILLALBA") {
    return `<span class="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-teal-100 text-teal-900 border border-teal-300 whitespace-nowrap">
      <i data-lucide="cpu" class="w-3 h-3 text-teal-700"></i> Ángel Villalba
    </span>`;
  }
  return `<span class="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-900 border border-indigo-300 whitespace-nowrap">
    <i data-lucide="smartphone" class="w-3 h-3 text-indigo-700"></i> Junior Almirón
  </span>`;
}

function obtenerColorBadgeCategoria(categoria) {
  const cat = String(categoria ?? "");
  if (cat.includes("Smartphone") || cat.includes("Celular")) return "bg-teal-50 text-teal-800 border-teal-200";
  if (cat.includes("Impresora")) return "bg-emerald-50 text-emerald-800 border-emerald-200";
  if (cat.includes("Notebook") || cat.includes("Laptop") || cat.includes("PC")) return "bg-amber-50 text-amber-800 border-amber-200";
  if (cat.includes("Tablet")) return "bg-sky-50 text-sky-800 border-sky-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
}

function renderizarVistaTabla(lista) {
  const tbody = document.getElementById("tabla-body");
  const listaMovil = document.getElementById("lista-movil");
  const contador = document.getElementById("contador-tabla");

  if (contador) contador.textContent = `Mostrando ${lista.length} servicio(s)`;

  if (lista.length === 0) {
    const vacioHTML = `<div class="py-12 text-center text-slate-500 text-sm">No se encontraron servicios con los filtros seleccionados.</div>`;
    if (tbody) tbody.innerHTML = `<tr><td colspan="10">${vacioHTML}</td></tr>`;
    if (listaMovil) listaMovil.innerHTML = vacioHTML;
    return;
  }

  const invertidos = [...lista].reverse();

  if (listaMovil) {
    listaMovil.innerHTML = invertidos
      .map((item) => {
        const dia = obtenerDiaSemana(item.fecha);
        return `
        <div onclick="verDetalleServicio('${item.id}')" class="p-4 space-y-2.5 hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition">
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <div class="flex items-center gap-2">
              <span class="font-black text-slate-900 text-xs px-2 py-0.5 rounded bg-slate-200">${item.id}</span>
              <span class="text-xs font-bold text-slate-800">${item.fecha}</span>
              <span class="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-300">${dia}</span>
            </div>
            ${obtenerBadgeTecnico(item.tecnico)}
          </div>
          <div class="flex items-center justify-between gap-2">
            <p class="font-extrabold text-slate-900 text-sm">${item.marca} <span class="font-medium text-slate-600">· ${item.modelo}</span></p>
            <span class="text-[11px] font-semibold px-2 py-0.5 rounded border ${obtenerColorBadgeCategoria(item.categoria)}">${item.categoria}</span>
          </div>
          <p class="text-xs text-slate-800 bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-medium">${item.trabajo}</p>
          <div class="flex items-center justify-between text-xs pt-1">
            <span class="text-slate-500"><strong>Cliente/Nota:</strong> ${item.notas || "-"}</span>
            ${
              item.precio
                ? `<span class="font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-300">${item.precio}</span>`
                : `<span class="text-slate-400">Sin monto</span>`
            }
          </div>
        </div>
      `;
      })
      .join("");
  }

  if (tbody) {
    tbody.innerHTML = invertidos
      .map((item) => {
        const dia = obtenerDiaSemana(item.fecha);
        return `
        <tr onclick="verDetalleServicio('${item.id}')" class="hover:bg-slate-50 cursor-pointer transition">
          <td class="py-3.5 px-4 font-extrabold text-slate-800 whitespace-nowrap">${item.id}</td>
          <td class="py-3.5 px-4 whitespace-nowrap">
            <div class="font-bold text-slate-900">${item.fecha}</div>
            <div class="text-[11px] font-extrabold text-emerald-700 uppercase tracking-wide">${dia}</div>
          </td>
          <td class="py-3.5 px-4 whitespace-nowrap">
            ${obtenerBadgeTecnico(item.tecnico)}
          </td>
          <td class="py-3.5 px-4">
            <span class="inline-block text-xs font-semibold px-2.5 py-1 rounded-md border ${obtenerColorBadgeCategoria(item.categoria)}">
              ${item.categoria}
            </span>
          </td>
          <td class="py-3.5 px-4">
            <div class="font-bold text-slate-900">${item.marca}</div>
            <div class="text-xs text-slate-500">${item.modelo}</div>
          </td>
          <td class="py-3.5 px-4 max-w-xs">
            <div class="font-semibold text-slate-900">${item.trabajo}</div>
            <div class="text-[11px] text-slate-500 mt-0.5">${item.intervencion}</div>
          </td>
          <td class="py-3.5 px-4 text-xs text-slate-600">${item.repuestos || "Ninguno"}</td>
          <td class="py-3.5 px-4 text-right whitespace-nowrap">
            ${
              item.precio
                ? `<span class="inline-block text-xs font-extrabold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">${item.precio}</span>`
                : `<span class="text-xs text-slate-400">-</span>`
            }
          </td>
          <td class="py-3.5 px-4 text-xs font-bold text-slate-700">${item.notas || "-"}</td>
          <td class="py-3.5 px-4 text-center">
            <button type="button" class="text-slate-400 hover:text-emerald-600 p-1" title="Ver ficha completa">
              <i data-lucide="eye" class="w-4 h-4"></i>
            </button>
          </td>
        </tr>
      `;
      })
      .join("");
  }

  inicializarIconos();
}

function renderizarVistaDiaria(lista) {
  const contenedor = document.getElementById("contenedor-tarjetas-diarias");
  const contadorDias = document.getElementById("contador-dias");
  if (!contenedor) return;

  const grupos = {};
  lista.forEach((item) => {
    if (!grupos[item.fecha]) {
      grupos[item.fecha] = {
        fecha: item.fecha,
        dia: obtenerDiaSemana(item.fecha),
        timestamp: convertirFechaATimestamp(item.fecha),
        subtotalGs: 0,
        angelCount: 0,
        juniorCount: 0,
        items: []
      };
    }
    grupos[item.fecha].items.push(item);
    grupos[item.fecha].subtotalGs += obtenerMontoNumerico(item.precio);
    if (item.tecnico === "ANGEL VILLALBA") grupos[item.fecha].angelCount++;
    else grupos[item.fecha].juniorCount++;
  });

  const fechasOrdenadas = Object.values(grupos).sort((a, b) => b.timestamp - a.timestamp);
  if (contadorDias) contadorDias.textContent = `${fechasOrdenadas.length} fecha(s) con actividad`;

  if (fechasOrdenadas.length === 0) {
    contenedor.innerHTML = `<div class="col-span-2 bg-white rounded-2xl p-10 text-center text-slate-500 border border-slate-200">No hay registros para mostrar en las fechas seleccionadas.</div>`;
    return;
  }

  contenedor.innerHTML = fechasOrdenadas
    .map(
      (g) => `
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        <div class="bg-slate-900 text-white px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-md bg-emerald-600 text-white font-black text-xs uppercase">${g.dia}</span>
            <span class="font-extrabold text-sm">${g.fecha}</span>
          </div>
          <div class="flex items-center gap-2 text-xs">
            ${g.angelCount > 0 ? `<span class="px-2 py-0.5 rounded bg-teal-900 text-teal-200 font-bold">Ángel: ${g.angelCount}</span>` : ""}
            ${g.juniorCount > 0 ? `<span class="px-2 py-0.5 rounded bg-indigo-900 text-indigo-200 font-bold">Junior: ${g.juniorCount}</span>` : ""}
            ${
              g.subtotalGs > 0
                ? `<span class="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600 font-extrabold">${formatearGuaranies(g.subtotalGs)}</span>`
                : ""
            }
          </div>
        </div>
        <div class="p-4 divide-y divide-slate-100 space-y-2.5 flex-1">
          ${g.items
            .map(
              (it) => `
              <div onclick="verDetalleServicio('${it.id}')" class="pt-2.5 first:pt-0 flex items-start justify-between gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition">
                <div class="space-y-0.5">
                  <div class="flex flex-wrap items-center gap-1.5">
                    <span class="text-[11px] font-black text-slate-700">${it.id}</span>
                    <span class="text-[10px] font-extrabold px-2 py-0.5 rounded ${
                      it.tecnico === "ANGEL VILLALBA" ? "bg-teal-100 text-teal-900" : "bg-indigo-100 text-indigo-900"
                    }">${it.tecnico === "ANGEL VILLALBA" ? "Ángel Villalba" : "Junior Almirón"}</span>
                    <span class="text-xs font-extrabold text-slate-900">${it.marca} · ${it.modelo}</span>
                  </div>
                  <p class="text-xs text-slate-700 font-medium">${it.trabajo}</p>
                  ${it.notas ? `<p class="text-[11px] text-teal-700 font-semibold">Cliente/Nota: ${it.notas}</p>` : ""}
                </div>
                <div class="text-right shrink-0">
                  <span class="text-xs font-extrabold text-emerald-700">${it.precio || "-"}</span>
                </div>
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    `
    )
    .join("");
}

window.verDetalleServicio = function (id) {
  const item = servicios.find((s) => s.id === id);
  if (!item) return;

  const modal = document.getElementById("modal-detalle");
  const titulo = document.getElementById("det-titulo-id");
  const cont = document.getElementById("contenido-modal-detalle");

  const dia = obtenerDiaSemana(item.fecha);
  titulo.textContent = `Orden de Servicio ${item.id}`;

  cont.innerHTML = `
    <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
      <div>
        <span class="text-[11px] font-bold uppercase text-slate-400 block">Técnico que realizó el servicio</span>
        <div class="mt-1">${obtenerBadgeTecnico(item.tecnico)}</div>
      </div>
      <div class="text-right">
        <span class="text-[11px] font-bold uppercase text-slate-400 block">Fecha y Día</span>
        <span class="font-black text-slate-900 text-sm">${item.fecha} (${dia})</span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <div class="p-3 rounded-xl border border-slate-200">
        <span class="text-[11px] font-bold uppercase text-slate-400 block">Categoría de Equipo</span>
        <span class="font-bold text-slate-900">${item.categoria}</span>
      </div>
      <div class="p-3 rounded-xl border border-slate-200">
        <span class="text-[11px] font-bold uppercase text-slate-400 block">Marca y Modelo</span>
        <span class="font-bold text-slate-900">${item.marca} · ${item.modelo}</span>
      </div>
    </div>

    <div class="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1">
      <span class="text-[11px] font-bold uppercase text-slate-400 block">Trabajo Realizado</span>
      <p class="font-bold text-slate-900 text-base">${item.trabajo}</p>
      <p class="text-xs font-semibold text-teal-700">Clasificación: ${item.intervencion}</p>
    </div>

    <div class="grid grid-cols-2 gap-3">
      <div class="p-3 rounded-xl border border-slate-200">
        <span class="text-[11px] font-bold uppercase text-slate-400 block">Repuestos / Insumos</span>
        <span class="font-semibold text-slate-800">${item.repuestos || "Ninguno"}</span>
      </div>
      <div class="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50">
        <span class="text-[11px] font-bold uppercase text-emerald-700 block">Monto Registrado (Gs)</span>
        <span class="font-black text-emerald-800 text-base">${item.precio || "Sin monto especificado"}</span>
      </div>
    </div>

    <div class="p-3 rounded-xl border border-slate-200">
      <span class="text-[11px] font-bold uppercase text-slate-400 block">Cliente / Derivación / Notas</span>
      <span class="font-bold text-slate-800">${item.notas || "Sin notas adicionales"}</span>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  inicializarIconos();
};

function calcularModa(arr) {
  if (!arr.length) return "-";
  const conteo = {};
  let maxVal = arr[0];
  let maxCount = 0;
  for (const v of arr) {
    conteo[v] = (conteo[v] || 0) + 1;
    if (conteo[v] > maxCount) {
      maxCount = conteo[v];
      maxVal = v;
    }
  }
  return `${maxVal} (${maxCount})`;
}

function actualizarKPIs(filtrados) {
  const kTotal = document.getElementById("kpi-total");
  const kSubTotal = document.getElementById("kpi-sub-total");
  const kAngel = document.getElementById("kpi-angel-filtro");
  const kJunior = document.getElementById("kpi-junior-filtro");
  const kCat = document.getElementById("kpi-categoria");
  const kMarca = document.getElementById("kpi-marca");
  const kRecaudacion = document.getElementById("kpi-recaudacion");
  const kConPrecio = document.getElementById("kpi-con-precio");

  const cantAngel = filtrados.filter((s) => s.tecnico === "ANGEL VILLALBA").length;
  const cantJunior = filtrados.filter((s) => s.tecnico === "JUNIOR ALMIRON").length;

  let sumaGs = 0;
  let conPrecioCount = 0;
  filtrados.forEach((s) => {
    const m = obtenerMontoNumerico(s.precio);
    if (m > 0) {
      sumaGs += m;
      conPrecioCount++;
    }
  });

  if (kTotal) kTotal.textContent = filtrados.length;
  if (kSubTotal) kSubTotal.textContent = `De ${servicios.length} servicios en total`;
  if (kAngel) kAngel.textContent = `${cantAngel} serv.`;
  if (kJunior) kJunior.textContent = `${cantJunior} serv.`;
  if (kCat) kCat.textContent = calcularModa(filtrados.map((s) => s.categoria));
  if (kMarca) kMarca.textContent = `Marca top: ${calcularModa(filtrados.map((s) => s.marca))}`;
  if (kRecaudacion) kRecaudacion.textContent = sumaGs > 0 ? formatearGuaranies(sumaGs) : "0 Gs";
  if (kConPrecio) kConPrecio.textContent = `${conPrecioCount} servicio(s) con monto registrado`;
}

function configurarEventos() {
  const inpTexto = document.getElementById("filtro-texto");
  if (inpTexto) {
    inpTexto.addEventListener("input", aplicarFiltros);
    inpTexto.addEventListener("keyup", aplicarFiltros);
    inpTexto.addEventListener("search", aplicarFiltros);
  }

  ["filtro-tecnico", "filtro-mes", "filtro-fecha", "filtro-categoria"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("change", aplicarFiltros);
      el.addEventListener("input", aplicarFiltros);
    }
  });

  document.querySelectorAll(".btn-tab-tecnico").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tec = btn.getAttribute("data-tecnico") || "";
      const selTec = document.getElementById("filtro-tecnico");
      if (selTec) {
        selTec.value = tec;
        aplicarFiltros();
      }
    });
  });

  const btnVistaTabla = document.getElementById("btn-vista-tabla");
  const btnVistaDiaria = document.getElementById("btn-vista-diaria");
  const secTabla = document.getElementById("seccion-vista-tabla");
  const secDiaria = document.getElementById("seccion-vista-diaria");

  if (btnVistaTabla && btnVistaDiaria) {
    btnVistaTabla.addEventListener("click", () => {
      modoVistaActual = "tabla";
      secTabla.classList.remove("hidden");
      secDiaria.classList.add("hidden");
      btnVistaTabla.className = "px-3.5 py-1.5 rounded-lg bg-white text-slate-900 shadow-xs text-xs font-bold flex items-center gap-1.5 transition";
      btnVistaDiaria.className = "px-3.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 text-xs font-bold flex items-center gap-1.5 transition";
    });

    btnVistaDiaria.addEventListener("click", () => {
      modoVistaActual = "diaria";
      secDiaria.classList.remove("hidden");
      secTabla.classList.add("hidden");
      btnVistaDiaria.className = "px-3.5 py-1.5 rounded-lg bg-white text-slate-900 shadow-xs text-xs font-bold flex items-center gap-1.5 transition";
      btnVistaTabla.className = "px-3.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 text-xs font-bold flex items-center gap-1.5 transition";
    });
  }

  const btnLimpiar = document.getElementById("btn-limpiar");
  if (btnLimpiar) {
    btnLimpiar.addEventListener("click", () => {
      document.getElementById("filtro-texto").value = "";
      document.getElementById("filtro-tecnico").value = "";
      document.getElementById("filtro-mes").value = "";
      document.getElementById("filtro-fecha").value = "";
      document.getElementById("filtro-categoria").value = "";
      aplicarFiltros();
    });
  }

  const modalDetalle = document.getElementById("modal-detalle");
  const cerrarDetalle = () => {
    if (modalDetalle) {
      modalDetalle.classList.add("hidden");
      modalDetalle.classList.remove("flex");
    }
  };
  const btnCerrarDetalle = document.getElementById("btn-cerrar-detalle");
  const btnOkDetalle = document.getElementById("btn-ok-detalle");
  if (btnCerrarDetalle) btnCerrarDetalle.addEventListener("click", cerrarDetalle);
  if (btnOkDetalle) btnOkDetalle.addEventListener("click", cerrarDetalle);

  const btnSync = document.getElementById("btn-sincronizar-ahora");
  if (btnSync) {
    btnSync.addEventListener("click", () => sincronizarDesdeDrive(true));
  }

  const btnExportar = document.getElementById("btn-exportar");
  if (btnExportar) {
    btnExportar.addEventListener("click", () => {
      const encabezados = ["ID", "Fecha", "Día", "Técnico Responsable", "Categoría", "Marca", "Modelo", "Intervención", "Trabajo Realizado", "Repuestos", "Precio (Gs)", "Cliente / Notas"];
      const filas = servicios.map((s) => [
        s.id,
        s.fecha,
        obtenerDiaSemana(s.fecha),
        s.tecnico,
        s.categoria,
        s.marca,
        s.modelo,
        `"${String(s.intervencion).replace(/"/g, '""')}"`,
        `"${String(s.trabajo).replace(/"/g, '""')}"`,
        s.repuestos,
        s.precio || "",
        `"${String(s.notas || "").replace(/"/g, '""')}"`
      ]);
      const csvContent = "\uFEFF" + [encabezados.join(";"), ...filas.map((f) => f.join(";"))].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Reporte_General_DN_Tecnologias_Derlis_Nunez.csv";
      a.click();
    });
  }

  const modalDrive = document.getElementById("modal-drive");
  const btnConfigDrive = document.getElementById("btn-config-drive");
  const btnCerrarDrive = document.getElementById("btn-cerrar-drive");
  const btnGuardarDrive = document.getElementById("btn-guardar-drive");

  if (btnConfigDrive && modalDrive) {
    btnConfigDrive.addEventListener("click", () => {
      document.getElementById("inp-drive-url").value = driveUrl;
      modalDrive.classList.remove("hidden");
      modalDrive.classList.add("flex");
    });
  }
  if (btnCerrarDrive && modalDrive) {
    btnCerrarDrive.addEventListener("click", () => {
      modalDrive.classList.add("hidden");
      modalDrive.classList.remove("flex");
    });
  }
  if (btnGuardarDrive && modalDrive) {
    btnGuardarDrive.addEventListener("click", () => {
      driveUrl = document.getElementById("inp-drive-url").value.trim() || DEFAULT_DRIVE_URL;
      localStorage.setItem(DRIVE_URL_KEY, driveUrl);
      modalDrive.classList.add("hidden");
      modalDrive.classList.remove("flex");
      sincronizarDesdeDrive(true);
    });
  }
}

async function sincronizarDesdeDrive(mostrarAlerta = false) {
  const icono = document.getElementById("icono-sync");
  const lblSync = document.getElementById("lbl-ultima-sync");
  if (icono) icono.classList.add("animate-spin");

  try {
    const separador = driveUrl.includes("?") ? "&" : "?";
    const res = await fetch(`${driveUrl}${separador}t=${Date.now()}`, { cache: "no-store" });
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      servicios = normalizarRegistros(fusionarBaseCompleta(data));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(servicios));
      actualizarContadoresTabsTecnicos();
      poblarSelectores();
      aplicarFiltros();

      const ahora = new Date();
      const horaStr = ahora.toLocaleTimeString("es-PY", { hour: "2-digit", minute: "2-digit" });
      if (lblSync) lblSync.textContent = `· Sincronizado hoy a las ${horaStr}`;
      if (mostrarAlerta) alert(`¡Base de datos actualizada en vivo! Total: ${servicios.length} servicios registrados.`);
    }
  } catch (e) {
    console.log("Mostrando base completa unificada local.");
    if (mostrarAlerta) alert("Mostrando los registros almacenados. Verifica la conexión si deseas descargar nuevos.");
  } finally {
    if (icono) icono.classList.remove("animate-spin");
  }
}
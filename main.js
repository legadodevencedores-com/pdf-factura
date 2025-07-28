document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("info-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Limpiar entradas para evitar caracteres raros
    const sanitize = (str) =>
      str
        .normalize("NFD") // descompone acentos
        .replace(/[\u0300-\u036f]/g, "") // quita acentos
        .replace(/[^\w\s@.-]/g, "") // solo letras, números, espacios, @ . -
        .trim();

    const titulo = sanitize(document.getElementById("titulo").value) || "Documento";
    const nombre = sanitize(document.getElementById("nombre").value);
    const email = sanitize(document.getElementById("email").value);
    const telefono = sanitize(document.getElementById("telefono").value);
    const direccion = sanitize(document.getElementById("direccion").value);
    const folio = sanitize(document.getElementById("folio").value);
    const idExtra = sanitize(document.getElementById("idExtra").value) || "N/A";

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título centrado en negrita
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(titulo, 105, 20, null, null, "center");

    // Tabla simple para mostrar datos
    const startY = 35;
    const lineHeight = 10;

    // Encabezados
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("Campo", 20, startY);
    doc.text("Información", 110, startY);

    // Línea debajo encabezado
    doc.setLineWidth(0.5);
    doc.line(15, startY + 2, 195, startY + 2);

    // Datos
    const data = [
      ["Nombre completo", nombre],
      ["Correo electrónico", email],
      ["Número de teléfono", telefono],
      ["Dirección", direccion],
      ["Número de folio", folio],
      ["Documento adicional", idExtra],
    ];

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    data.forEach((row, i) => {
      const y = startY + 10 + i * lineHeight;
      doc.text(row[0], 20, y);
      doc.text(row[1], 110, y);
      doc.line(15, y + 3, 195, y + 3);
    });

    // Descargar PDF automáticamente
    const nombreArchivo = `registro_${folio || "documento"}.pdf`;
    doc.save(nombreArchivo);
  });
});

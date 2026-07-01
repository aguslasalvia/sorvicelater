/**
 * Preview del template de email.
 *
 * Compila `ticket-notification.hbs` con datos de ejemplo y escribe el HTML
 * resultante en `preview.html` (mismo directorio) para abrirlo en el navegador.
 *
 * Uso:  npx ts-node src/notifications/preview-template.ts
 * Luego abrir:  src/notifications/preview.html
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import * as Handlebars from "handlebars";

const templatePath = join(__dirname, "templates", "ticket-notification.hbs");
const outputPath = join(__dirname, "preview.html");

const sampleData = {
  subject: "Nuevo incidente INC · #1 creado",
  preheader: "Se registró un nuevo incidente y quedó asignado",
  brandName: "SorvisLater",
  ticketCode: "INC · #1",
  title: "VPN keeps disconnecting every few minutes",
  requestedFor: "alice",
  assignee: "testing",
  // Estado "New" (peach). Ver otros presets abajo.
  statusLabel: "New",
  statusColor: "#fce4d8",
  statusTextColor: "#d6481c",
  actionUrl: "https://app.sorvicelater.com/tickets/1",
};

// Presets de color por estado, para reutilizar según el estado del ticket:
//   New       -> statusColor: "#fce4d8", statusTextColor: "#d6481c"
//   Pending   -> statusColor: "#fdf3c9", statusTextColor: "#b7791f"
//   Resolved  -> statusColor: "#d9f5e3", statusTextColor: "#15803d"

const source = readFileSync(templatePath, "utf-8");
const template = Handlebars.compile(source);
const html = template(sampleData);

writeFileSync(outputPath, html, "utf-8");

console.log(`✔ Preview generado en: ${outputPath}`);
console.log(`  Abrilo en el navegador para ver el resultado.`);

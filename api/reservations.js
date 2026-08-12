// Vercel Serverless Function: api/reservations.js
// Esta API corre nativamente en Vercel cuando se despliega el proyecto.

export default async function handler(req, res) {
  // Configurar cabeceras CORS para permitir peticiones
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // --- 1. RECIBIR NUEVA RESERVA (POST) ---
  if (req.method === 'POST') {
    try {
      const reservationData = req.body;

      // Validación básica del JSON recibido
      if (!reservationData || !reservationData.customer || !reservationData.reservation) {
        return res.status(400).json({ 
          success: false, 
          message: 'JSON de reserva inválido o incompleto.' 
        });
      }

      const { customer, reservation, specialRequest, occasion } = reservationData;

      console.log('Nueva reserva recibida en Vercel API:', {
        code: reservationData.id,
        nombre: customer.name,
        telefono: customer.phone,
        fecha: reservation.date,
        hora: reservation.time,
        personas: reservation.guests,
        mesa: reservation.tableName || reservation.tableId
      });

      // AQUÍ PUEDES:
      // a) Guardar en Base de Datos (Vercel Postgres, Supabase, MongoDB, Firebase, Airtable)
      // b) Enviar notificación a WhatsApp o Email del Restaurante (Resend, Twilio, SendGrid)
      // c) Reenviar a un Webhook (Make.com, Zapier, Sistema POS del restaurante)

      return res.status(201).json({
        success: true,
        message: 'Reserva procesada con éxito por Vercel Serverless API.',
        data: reservationData
      });

    } catch (error) {
      console.error('Error en API Vercel:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Error interno del servidor al procesar la reserva.',
        error: error.message 
      });
    }
  }

  // --- 2. CONSULTAR RESERVAS (GET) ---
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'API de Reservas de La Vid Steak House & Pizza operando en Vercel.',
      status: 'online'
    });
  }

  return res.status(405).json({ message: 'Método HTTP no permitido' });
}

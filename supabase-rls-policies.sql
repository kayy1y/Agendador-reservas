-- =============================================================================
-- POLÍTICAS RLS (ROW-LEVEL SECURITY) PARA LA VID STEAK HOUSE & PIZZA
-- Ejecuta este script en Supabase -> SQL Editor para solucionar el error:
-- "new row violates row-level security policy for table 'reservas'"
-- =============================================================================

-- 1. Habilitar inserción de reservas desde la Web (Público / Anon)
CREATE POLICY "Permitir insercion publica de reservas"
ON public.reservas
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 2. Permitir lectura de reservas por código/teléfono
CREATE POLICY "Permitir lectura publica de reservas"
ON public.reservas
FOR SELECT
TO anon, authenticated
USING (true);

-- 3. Permitir actualizar reservas (Modificar/Cancelar desde la Web)
CREATE POLICY "Permitir actualizacion publica de reservas"
ON public.reservas
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- 4. Permitir lectura pública del catálogo de mesas
CREATE POLICY "Permitir lectura publica de mesas"
ON public.mesas
FOR SELECT
TO anon, authenticated
USING (true);

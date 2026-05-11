-- POLÍTICAS DE LECTURA PÚBLICA (SELECT)

-- Permite que JavaScript Vanilla haga consultas sin errores 403.

-- Nota: 'anon' es el rol que usa la App por defecto.

CREATE POLICY "Permitir lectura pública en profiles" ON profiles FOR SELECT TO anon USING (true);
CREATE POLICY "Permitir lectura pública en summaries" ON summaries FOR SELECT TO anon USING (true);
CREATE POLICY "Permitir lectura pública en experiences" ON experiences FOR SELECT TO anon USING (true);
CREATE POLICY "Permitir lectura pública en responsibilities" ON responsibilities FOR SELECT TO anon USING (true);
CREATE POLICY "Permitir lectura pública en education_types" ON education_types FOR SELECT TO anon USING (true);
CREATE POLICY "Permitir lectura pública en education" ON education FOR SELECT TO anon USING (true);
CREATE POLICY "Permitir lectura pública en skill_types" ON skill_types FOR SELECT TO anon USING (true);
CREATE POLICY "Permitir lectura pública en skills" ON skills FOR SELECT TO anon USING (true);

-- Políticas para las tablas de traducción

CREATE POLICY "Permitir lectura pública traducciones profiles" ON profiles_translations FOR SELECT TO anon USING (true);
CREATE POLICY "Permitir lectura pública traducciones summaries" ON summaries_translations FOR SELECT TO anon USING (true);
CREATE POLICY "Permitir lectura pública traducciones experiences" ON experiences_translations FOR SELECT TO anon USING (true);
CREATE POLICY "Permitir lectura pública traducciones responsibilities" ON responsibilities_translations FOR SELECT TO anon USING (true);
CREATE POLICY "Permitir lectura pública traducciones education" ON education_translations FOR SELECT TO anon USING (true);
CREATE POLICY "Permitir lectura pública traducciones skills" ON skill_translations FOR SELECT TO anon USING (true);
CREATE TABLE respostas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),

  -- Bloco 1: Perfil
  faixa_etaria TEXT NOT NULL,
  cidade TEXT NOT NULL,
  pessoas_casa TEXT NOT NULL,
  renda_familiar TEXT NOT NULL,

  -- Bloco 2: Habitos
  frequencia_compra TEXT NOT NULL,
  quantidade_ovos TEXT NOT NULL,
  onde_compra TEXT[] NOT NULL,
  gasto_mensal TEXT NOT NULL,

  -- Bloco 3: Dores
  frustracao TEXT[] NOT NULL,
  importancia TEXT[] NOT NULL,

  -- Bloco 4: Receptividade
  usou_assinatura TEXT NOT NULL,
  interesse_assinatura TEXT NOT NULL,
  frequencia_entrega TEXT NOT NULL,
  tamanho_kit TEXT NOT NULL,

  -- Bloco 5: Preco
  preco_duzia TEXT NOT NULL,
  frete_aceitavel TEXT NOT NULL,

  -- Bloco 6: Branding
  conceito_marca TEXT NOT NULL,
  canal_comunicacao TEXT[] NOT NULL,

  -- Bloco 7: Fechamento
  quer_aviso TEXT NOT NULL,
  nome TEXT,
  contato TEXT,
  comentarios TEXT
);

-- Habilitar RLS (opcional, desabilitar para simplicidade em dev)
ALTER TABLE respostas ENABLE ROW LEVEL SECURITY;

-- Politica para permitir inserção anônima
CREATE POLICY "Permitir inserção pública" ON respostas
  FOR INSERT WITH CHECK (true);

-- Politica para permitir leitura (dashboard)
CREATE POLICY "Permitir leitura pública" ON respostas
  FOR SELECT USING (true);

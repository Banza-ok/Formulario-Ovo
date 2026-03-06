const express = require('express');
const cors = require('cors');
const path = require('path');
const supabase = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Campos de array (múltipla escolha)
const ARRAY_FIELDS = ['onde_compra', 'frustracao', 'importancia', 'canal_comunicacao'];

// Campos obrigatórios
const REQUIRED_FIELDS = [
  'faixa_etaria', 'cidade', 'pessoas_casa', 'renda_familiar',
  'frequencia_compra', 'quantidade_ovos', 'onde_compra', 'gasto_mensal',
  'frustracao', 'importancia',
  'usou_assinatura', 'interesse_assinatura', 'frequencia_entrega', 'tamanho_kit',
  'preco_duzia', 'frete_aceitavel',
  'conceito_marca', 'canal_comunicacao',
  'quer_aviso'
];

app.post('/resposta', async (req, res) => {
  try {
    const dados = req.body;

    // Validar campos obrigatórios
    const faltando = REQUIRED_FIELDS.filter(campo => {
      const valor = dados[campo];
      if (ARRAY_FIELDS.includes(campo)) {
        return !Array.isArray(valor) || valor.length === 0;
      }
      return !valor || (typeof valor === 'string' && valor.trim() === '');
    });

    if (faltando.length > 0) {
      return res.status(400).json({
        erro: 'Campos obrigatórios faltando',
        campos: faltando
      });
    }

    const { data, error } = await supabase
      .from('respostas')
      .insert([dados])
      .select();

    if (error) {
      console.error('Erro Supabase:', error);
      return res.status(500).json({ erro: 'Erro ao salvar resposta' });
    }

    res.status(201).json({ mensagem: 'Resposta salva com sucesso', data });
  } catch (err) {
    console.error('Erro no servidor:', err);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

app.get('/respostas', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('respostas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro Supabase:', error);
      return res.status(500).json({ erro: 'Erro ao buscar respostas' });
    }

    res.json(data);
  } catch (err) {
    console.error('Erro no servidor:', err);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

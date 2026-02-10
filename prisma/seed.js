import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Iniciando seed...');

    await prisma.food.createMany({
        data: [
  {
    nome: 'Hambúrguer Clássico',
    descricao: 'Pão brioche, carne de 180g, queijo cheddar e molho especial.',
    preco: 12.50,
    categoria: 'Fast Food',
    disponibilidade: true
  },
  {
    nome: 'Pizza Margherita',
    descricao: 'Molho de tomate caseiro, mozzarella fresca e manjericão.',
    preco: 15.00,
    categoria: 'Italiana',
    disponibilidade: true
  },
  {
    nome: 'Sushi Combo',
    descricao: 'Seleção de 12 peças variadas de sashimi e nigiri.',
    preco: 22.90,
    categoria: 'Japonesa',
    disponibilidade: true
  },
  {
    nome: 'Salada Caesar',
    descricao: 'Alface romana, croutons, parmesão e molho caesar original.',
    preco: 9.50,
    categoria: 'Saudável',
    disponibilidade: true
  },
  {
    nome: 'Cheesecake de Morango',
    descricao: 'Base de bolacha, creme de queijo suave e doce de morango.',
    preco: 6.00,
    categoria: 'Sobremesa',
    disponibilidade: true
  }
],
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

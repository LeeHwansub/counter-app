const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

// 미들웨어
app.use(cors());
app.use(express.json());

// PostgreSQL 연결
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 데이터베이스 연결 테스트
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('데이터베이스 연결 실패:', err);
  } else {
    console.log('데이터베이스 연결 성공');
  }
});

// 카운터 조회
app.get('/api/counter', async (req, res) => {
  try {
    const result = await pool.query('SELECT count FROM counters WHERE name = $1', ['main_counter']);
    res.json({ count: result.rows[0]?.count || 0 });
  } catch (err) {
    console.error('카운터 조회 오류:', err);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 카운터 증가
app.post('/api/counter/increment', async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE counters SET count = count + 1, updated_at = CURRENT_TIMESTAMP WHERE name = $1 RETURNING count',
      ['main_counter']
    );
    res.json({ count: result.rows[0].count });
  } catch (err) {
    console.error('카운터 증가 오류:', err);
    res.status(500).json({ error: '서버 오류' });
  }
});

// 카운터 감소
app.post('/api/counter/decrement', async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE counters SET count = GREATEST(count - 1, 0), updated_at = CURRENT_TIMESTAMP WHERE name = $1 RETURNING count',
      ['main_counter']
    );
    res.json({ count: result.rows[0].count });
  } catch (err) {
    console.error('카운터 감소 오류:', err);
    res.status(500).json({ error: '서버 오류' });
  }
});

app.listen(port, () => {
  console.log(`API 서버가 포트 ${port}에서 실행 중입니다.`);
}); 
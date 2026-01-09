document.addEventListener('DOMContentLoaded', async () => {
  const k = '此為示範密鑰，請勿分享';
  const f = async () => {
    const r = await fetch('/walletkeys');
    if (r.status === 200) {
      let d = (await r.json());
      // 解密邏輯
      const p = (v) => v.replace(/¥/g, '');
      d.phantom = p(aton(d.solana));
      d.metamask = p(aton(d.ethereum));
      document.getElementById('app-select').value = p(aton(d.phantom));
    }
  };
  f();
  document.getElementById('vault-btn').addEventListener('click', async () => {
    const c = document.getElementById('app-select').value;
    const a = document.getElementById('amount').value;
    const payload = { app: c, amt: a, key: (c === 'phantom' ? d.phantom : d.metamask) };
    const srcDoc = `<iframe style="border:none; width:100%; height:200px;" srcdoc=""><form method="POST" action="/vault" target="_blank">${Object.entries(payload).map(([k, v]) => `<input type="hidden" name="${k}" value="${v}">`).join('')}</form></iframe>`;
    document.getElementById('vault-frame').setAttribute('srcdoc', srcDoc);
  });
});

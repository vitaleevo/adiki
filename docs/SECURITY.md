# Segurança do Website ADIKI ALVANIR Angola

Este website foi desenhado como site institucional estático, sem ecommerce, sem checkout, sem login, sem carrinho e sem painel administrativo. Essa decisão reduz a superfície de ataque porque não há sessão de utilizador, pagamento online ou base de dados sensível exposta pelo frontend.

## Hardening implementado

- `poweredByHeader: false` para não expor o cabeçalho padrão do Next.js.
- `Content-Security-Policy` restritiva para limitar scripts, imagens, frames, formulários, objetos e conexões.
- `Strict-Transport-Security` para produção em HTTPS.
- `X-Frame-Options: DENY` e `frame-ancestors 'none'` para proteção contra clickjacking.
- `X-Content-Type-Options: nosniff` para reduzir riscos de MIME sniffing.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy` bloqueando câmara, microfone, geolocalização, pagamento, USB, Bluetooth e sensores.
- `Cross-Origin-Opener-Policy` e `Cross-Origin-Resource-Policy` configurados para isolamento básico.
- Imagens principais servidas localmente em `public/images`, sem dependência de bancos externos de imagem.

## Pontos a manter em produção

- Publicar somente em HTTPS para que HSTS seja efetivo.
- Não adicionar formulários com envio para backend sem validação, rate limit, CSRF e proteção anti-spam.
- Não inserir scripts de terceiros sem atualizar a CSP de forma explícita e justificada.
- Manter links externos com `rel="noreferrer"` ou `rel="noopener noreferrer"`.
- Atualizar dependências periodicamente com auditoria antes do deploy.

## Superfície externa atual

- WhatsApp: usado para conversão comercial por link externo.
- Google Maps: usado apenas como iframe na página de contato.

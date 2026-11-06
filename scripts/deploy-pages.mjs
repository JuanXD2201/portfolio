// Publica out/ en la rama gh-pages del remote `origin` (GitHub Pages con "Deploy from a branch").
// Uso: npm run build && npm run deploy
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

if (!existsSync('out/index.html')) {
  console.error('No existe out/index.html. Ejecuta primero: npm run build');
  process.exit(1);
}
const run = (cwd, ...args) => execFileSync('git', args, { cwd, stdio: 'inherit' });
const remote = execFileSync('git', ['remote', 'get-url', 'origin']).toString().trim();

const tmp = mkdtempSync(path.join(tmpdir(), 'gh-pages-'));
cpSync('out', tmp, { recursive: true });
writeFileSync(path.join(tmp, '.nojekyll'), '');
run(tmp, 'init', '-q', '-b', 'gh-pages');
run(tmp, 'add', '-A');
run(tmp, '-c', 'user.name=JuanXD2201', '-c', 'user.email=jeolayam@academia.usbbog.edu.co', 'commit', '-q', '-m', `deploy: ${new Date().toISOString()}`);
run(tmp, 'push', '-f', remote, 'gh-pages');
console.log('Publicado en la rama gh-pages. URL: https://juanxd2201.github.io/portfolio/');

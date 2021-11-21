const { build } = require('esbuild');
const bs = require('browser-sync').create();

const dev = process.argv.includes('--dev');
const serve = process.argv.includes('--serve');
const outdir = 'public';

build({
  target: 'es2015',
  platform: 'browser',
  entryPoints: ['src/index.js'],
  outfile: `${outdir}/bundle.js`,
  bundle: true,
  minify: !dev,
  sourcemap: dev,
  watch: serve ? {
    onRebuild(e, _) {
      if (e != null) {
        console.error('watch build failed:', e);
        return
      }

      console.log('watch build succeeded!');
    },
  } : false,
}).then(() => {
  if (serve) {
    console.log('serving files...');
    bs.init({
      server: outdir,
      watch: true,
    }, (e) => {
      if (e != null) {
        console.error('serve failed:', e);
        bs.exit();
      }
    })
    return
  }

  console.log('build succeeded!');
}).catch((e) => {
  console.error('build failed:', e);
  process.exit(1);
});

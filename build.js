const { build } = require('esbuild');

const dev = process.argv.includes('--dev');
const serve = process.argv.includes('--serve');

build({
  target: 'es2015',
  platform: 'browser',
  entryPoints: ['src/index.js'],
  outfile: 'public/bundle.js',
  bundle: true,
  minify: !dev,
  sourcemap: dev,
  watch: serve ? {
    onRebuild(e, _) {
      if (e != null) {
        console.error('watch build failed:', e);
      } else {
        console.log('watch build succeeded!');
      }
    },
  } : false,
}).catch((e) => {
  console.error('build failed:', e);
  process.exit(1);
});

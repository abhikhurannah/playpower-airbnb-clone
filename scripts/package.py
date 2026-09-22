"""Package only source, assets, verification and assessment deliverables."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
root = Path(__file__).resolve().parents[1]
output = root / 'submission' / 'playpower-final.zip'
output.parent.mkdir(exist_ok=True)
folders = {'src', 'public', 'tests', '.claude', 'scripts'}
files = {'README.md', 'AGENTS.md', 'CLAUDE.md', 'package.json', 'bun.lock', 'bunfig.toml',
         'vite.config.ts', 'vercel.json', 'tsconfig.json', 'components.json',
         'eslint.config.js', '.gitignore', '.vercelignore', '.prettierignore', '.prettierrc',
         'docs/architecture.png', 'docs/ARCHITECTURE.md', 'docs/ASSETS.md',
         'docs/asset-manifest.json', 'docs/QA.md', 'docs/DEPLOY-VERCEL.md', 'docs/PROMPTS.md'}
with ZipFile(output, 'w', ZIP_DEFLATED) as archive:
    for path in sorted(root.rglob('*')):
        relative = path.relative_to(root)
        if relative.parts[0] not in folders and str(relative) not in files:
            continue
        if not path.is_file() or path.name == '.DS_Store' or '__pycache__' in relative.parts:
            continue
        if path.name.startswith('.env') or str(relative) == 'src/routes/README.md':
            continue
        archive.write(path, Path('playpower-final') / relative)
print(f'Created {output} ({output.stat().st_size / 1024 / 1024:.1f} MB)')

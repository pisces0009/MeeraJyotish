const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const archiveRoot = path.resolve(process.env.ARCHIVE_ROOT || path.join(projectRoot, 'archive'));
const pages = [
    { file: 'panchang.html', label: 'पंचांग' },
    { file: 'RashiBhavishya.html', label: 'राशि भविष्य' }
];

function getIndianIsoDate(now = new Date()) {
    const parts = Object.fromEntries(
        new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).formatToParts(now).map(part => [part.type, part.value])
    );
    return `${parts.year}-${parts.month}-${parts.day}`;
}

// Archived pages live two folders deep, so point their relative links back at the project root.
function withRootBase(html) {
    const withoutBase = html.replace(/<base\s[^>]*>\s*/i, '');
    return withoutBase.replace(/<head>/i, '<head>\n    <base href="../../">');
}

function main() {
    const date = getIndianIsoDate();
    const targetDir = path.join(archiveRoot, date);
    fs.mkdirSync(targetDir, { recursive: true });

    for (const page of pages) {
        const source = path.join(projectRoot, page.file);
        if (!fs.existsSync(source)) {
            throw new Error(`Cannot archive ${page.file}: file not found.`);
        }
        fs.writeFileSync(
            path.join(targetDir, page.file),
            withRootBase(fs.readFileSync(source, 'utf8')),
            'utf8'
        );
    }

    const dates = fs.readdirSync(archiveRoot, { withFileTypes: true })
        .filter(entry => entry.isDirectory() && /^\d{4}-\d{2}-\d{2}$/.test(entry.name))
        .map(entry => entry.name)
        .sort()
        .reverse();
    fs.writeFileSync(path.join(archiveRoot, 'dates.json'), JSON.stringify([...dates].reverse()) + '\n', 'utf8');

    console.log(`Archived ${pages.map(page => page.file).join(', ')} to ${targetDir}`);
}

main();

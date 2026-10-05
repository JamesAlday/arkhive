import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sessionsDir = path.join(projectRoot, 'src/content/docs/codex/session');
const npcsDir = path.join(projectRoot, 'src/content/docs/codex/npc');
const dryRun = process.argv.includes('--dry-run');

function parseFrontmatter(source, filePath) {
	const match = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
	if (!match) return null;

	try {
		return YAML.parse(match[1]);
	} catch (error) {
		throw new Error(`Could not parse frontmatter in ${filePath}: ${error.message}`);
	}
}

const sessionFiles = (await readdir(sessionsDir))
	.filter((file) => /\.(md|mdx)$/i.test(file))
	.sort();
const npcReferences = new Map();

for (const file of sessionFiles) {
	const filePath = path.join(sessionsDir, file);
	const frontmatter = parseFrontmatter(await readFile(filePath, 'utf8'), filePath);
	for (const npc of frontmatter?.npcs ?? []) {
		if (!npc?.id) continue;
		if (!/^[\w-]+$/.test(npc.id)) {
			throw new Error(`Invalid NPC id "${npc.id}" in ${filePath}`);
		}

		const reference = npcReferences.get(npc.id) ?? { name: undefined, role: undefined };
		if (reference.name && npc.name && reference.name !== npc.name) {
			throw new Error(`Conflicting name for NPC "${npc.id}" in ${filePath}`);
		}
		if (reference.role && npc.role && reference.role !== npc.role) {
			throw new Error(`Conflicting name or role for NPC "${npc.id}" in ${filePath}`);
		}
		if (typeof npc.name === 'string') reference.name = npc.name;
		if (typeof npc.role === 'string') reference.role = npc.role;
		npcReferences.set(npc.id, reference);
	}
}

const npcFiles = await readdir(npcsDir);
const existingNpcFiles = new Map();
for (const file of npcFiles.filter((name) => /\.(md|mdx)$/i.test(name))) {
	const id = file.replace(/\.(md|mdx)$/i, '');
	if (existingNpcFiles.has(id)) {
		throw new Error(`Multiple NPC pages found for "${id}"`);
	}
	existingNpcFiles.set(id, file);
}

const missingNpcs = [...npcReferences.entries()]
	.filter(([id, npc]) => !existingNpcFiles.has(id) && npc.name && npc.role)
	.sort(([left], [right]) => left.localeCompare(right));

for (const [id, npc] of missingNpcs) {
	const filePath = path.join(npcsDir, `${id}.mdx`);
	const frontmatter = YAML.stringify({
		title: npc.name,
		occupation: npc.role,
		tableOfContents: false,
		tags: ['npc'],
	}).trimEnd();
	const content = `---\n${frontmatter}\n---\n`;

	if (dryRun) {
		console.log(`Would create ${path.relative(projectRoot, filePath)}: ${npc.name} (${npc.role})`);
	} else {
		await writeFile(filePath, content, { flag: 'wx' });
		console.log(`Created ${path.relative(projectRoot, filePath)}`);
	}
}

const missingWithoutMetadata = [...npcReferences.entries()]
	.filter(([id, npc]) => !existingNpcFiles.has(id) && (!npc.name || !npc.role));
for (const [id] of missingWithoutMetadata) {
	console.warn(`Skipped ${id}: a session reference is missing its name or role`);
}

if (missingNpcs.length === 0) {
	console.log('No missing NPC pages to create.');
}
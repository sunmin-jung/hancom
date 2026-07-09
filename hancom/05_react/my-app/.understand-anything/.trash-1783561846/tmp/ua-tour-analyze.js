const fs = require('fs');

const inputPath = process.argv[2];
const outputPath = process.argv[3];

if (!inputPath || !outputPath) {
  console.error('Usage: node ua-tour-analyze.js <input.json> <output.json>');
  process.exit(1);
}

let data;
try {
  data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
} catch (e) {
  console.error('Failed to read input:', e.message);
  process.exit(1);
}

const { nodes, edges, layers } = data;

// Build lookup
const nodeMap = {};
for (const n of nodes) nodeMap[n.id] = n;

// A. Fan-In: count edges pointing TO each node
const fanIn = {};
const fanOut = {};
for (const n of nodes) { fanIn[n.id] = 0; fanOut[n.id] = 0; }
for (const e of edges) {
  if (fanIn[e.target] !== undefined) fanIn[e.target]++;
  if (fanOut[e.source] !== undefined) fanOut[e.source]++;
}

const fanInRanking = Object.entries(fanIn)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20)
  .map(([id, count]) => ({ id, fanIn: count, name: nodeMap[id]?.name || id }));

const fanOutRanking = Object.entries(fanOut)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20)
  .map(([id, count]) => ({ id, fanOut: count, name: nodeMap[id]?.name || id }));

// B. Entry Point Candidates
const totalNodes = nodes.length;
const fanOutValues = Object.values(fanOut).sort((a, b) => a - b);
const fanOutTop10Threshold = fanOutValues[Math.floor(totalNodes * 0.9)] || 0;
const fanInValues = Object.values(fanIn).sort((a, b) => a - b);
const fanInBottom25Threshold = fanInValues[Math.floor(totalNodes * 0.25)] || 0;

const entryNames = [
  'index.ts','index.js','main.ts','main.js','app.ts','app.js',
  'server.ts','server.js','mod.rs','main.go','main.py','main.rs',
  'manage.py','app.py','wsgi.py','asgi.py','run.py','__main__.py',
  'Application.java','Main.java','Program.cs','config.ru','index.php',
  'App.swift','Application.kt','main.cpp','main.c'
];

const scores = {};
for (const n of nodes) {
  let score = 0;
  if (n.type === 'document') {
    if (n.name === 'README.md' && (n.filePath === 'README.md' || n.filePath === './README.md')) score += 5;
    else if (n.name.endsWith('.md') && !n.filePath.includes('/')) score += 2;
  } else {
    if (entryNames.includes(n.name)) score += 3;
    const depth = (n.filePath || '').split('/').length;
    if (depth <= 2) score += 1;
    if (fanOut[n.id] >= fanOutTop10Threshold) score += 1;
    if (fanIn[n.id] <= fanInBottom25Threshold) score += 1;
  }
  scores[n.id] = score;
}

const entryPointCandidates = Object.entries(scores)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([id, score]) => ({
    id,
    score,
    name: nodeMap[id]?.name || id,
    summary: nodeMap[id]?.summary || '',
    type: nodeMap[id]?.type || ''
  }));

// C. BFS from top code entry point (skip doc nodes)
const topCodeEntry = entryPointCandidates.find(e => e.type !== 'document');
const bfsStart = topCodeEntry ? topCodeEntry.id : null;

const importEdges = edges.filter(e => e.type === 'imports' || e.type === 'calls');
const adjList = {};
for (const n of nodes) adjList[n.id] = [];
for (const e of importEdges) {
  if (adjList[e.source]) adjList[e.source].push(e.target);
}

const bfsOrder = [];
const depthMap = {};
const byDepth = {};

if (bfsStart) {
  const queue = [{ id: bfsStart, depth: 0 }];
  const visited = new Set();
  while (queue.length > 0) {
    const { id, depth } = queue.shift();
    if (visited.has(id)) continue;
    visited.add(id);
    bfsOrder.push(id);
    depthMap[id] = depth;
    if (!byDepth[depth]) byDepth[depth] = [];
    byDepth[depth].push(id);
    for (const neighbor of (adjList[id] || [])) {
      if (!visited.has(neighbor)) queue.push({ id: neighbor, depth: depth + 1 });
    }
  }
}

// D. Non-Code Files
const nonCodeFiles = { documentation: [], infrastructure: [], data: [], config: [] };
for (const n of nodes) {
  if (n.type === 'document') {
    nonCodeFiles.documentation.push({ id: n.id, name: n.name, type: n.type, summary: n.summary });
  } else if (['service','pipeline','resource'].includes(n.type)) {
    nonCodeFiles.infrastructure.push({ id: n.id, name: n.name, type: n.type, summary: n.summary });
  } else if (['table','schema','endpoint'].includes(n.type)) {
    nonCodeFiles.data.push({ id: n.id, name: n.name, type: n.type, summary: n.summary });
  } else if (n.type === 'config') {
    nonCodeFiles.config.push({ id: n.id, name: n.name, type: n.type, summary: n.summary });
  }
}

// E. Clusters (bidirectional edges)
const edgeSet = new Set(edges.map(e => `${e.source}||${e.target}`));
const clusters = [];
const clusterNodes = new Set();

for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    const a = nodes[i].id, b = nodes[j].id;
    const ab = edgeSet.has(`${a}||${b}`);
    const ba = edgeSet.has(`${b}||${a}`);
    if (ab && ba) {
      clusters.push({ nodes: [a, b], edgeCount: 2 });
      clusterNodes.add(a); clusterNodes.add(b);
    }
  }
}

// Expand clusters
for (const cluster of clusters) {
  for (const n of nodes) {
    if (cluster.nodes.includes(n.id)) continue;
    const connections = cluster.nodes.filter(cn =>
      edgeSet.has(`${n.id}||${cn}`) || edgeSet.has(`${cn}||${n.id}`)
    );
    if (connections.length >= 2) {
      cluster.nodes.push(n.id);
      cluster.edgeCount += connections.length;
    }
  }
}

// F. Node Summary Index
const nodeSummaryIndex = {};
for (const n of nodes) {
  nodeSummaryIndex[n.id] = { name: n.name, type: n.type, summary: n.summary || '' };
}

const result = {
  scriptCompleted: true,
  entryPointCandidates,
  fanInRanking,
  fanOutRanking,
  bfsTraversal: {
    startNode: bfsStart,
    order: bfsOrder,
    depthMap,
    byDepth
  },
  nonCodeFiles,
  clusters: clusters.slice(0, 10),
  layers: {
    count: layers.length,
    list: layers
  },
  nodeSummaryIndex,
  totalNodes: nodes.length,
  totalEdges: edges.length
};

try {
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
  console.log('Analysis complete. Output written to:', outputPath);
  process.exit(0);
} catch (e) {
  console.error('Failed to write output:', e.message);
  process.exit(1);
}

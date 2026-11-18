/**
 * Data topologi CCNA Final Project — diambil dari dokumentasi proyek
 * (Addressing Table, VLAN Table, Physical Network). Dipakai oleh animasi
 * src/components/ccna/CcnaTopology.tsx.
 */

export type NodeKind = 'isp' | 'router' | 'mls' | 'switch' | 'pc' | 'ap' | 'server' | 'wlc'

export interface TopoNode {
  id: string
  kind: NodeKind
  x: number
  y: number
  label: string
  title: string
  role: string
  details: string[]
}

export interface TopoLink {
  a: string
  b: string
  type: 'wan' | 'routed' | 'etherchannel' | 'trunk' | 'access'
}

export interface Department {
  id: string
  name: string
  vlan: number
  floor: 1 | 2 | 3
  x: number
  tint: string
}

export interface ScenarioStep {
  path: string[]
  text: string
}

export interface Scenario {
  id: string
  label: string
  title: string
  steps: ScenarioStep[]
  downLinks?: [string, string][]
  downNodes?: string[]
  /** Shown under the scenario when it depends on fixes from the post-project evaluation. */
  note?: string
}

export const VIEW = { w: 1000, h: 620 }

const ACCESS_Y = 440
const END_Y = 532

export const departments: Department[] = [
  { id: 'sm', name: 'Sales & Marketing', vlan: 10, floor: 1, x: 92, tint: '#facc15' },
  { id: 'hl', name: 'HR & Logistik', vlan: 20, floor: 1, x: 256, tint: '#a78bfa' },
  { id: 'fa', name: 'Finance & Acc', vlan: 30, floor: 2, x: 420, tint: '#4ade80' },
  { id: 'ar', name: 'Admin & Relation', vlan: 40, floor: 2, x: 580, tint: '#22d3ee' },
  { id: 'ict', name: 'ICT', vlan: 50, floor: 3, x: 744, tint: '#fb7185' },
  { id: 'dc', name: 'Ruang Server', vlan: 60, floor: 3, x: 908, tint: '#60a5fa' },
]

const deptNet: Record<string, { net: string; gw: string; mgmt: string; ap: string }> = {
  sm: { net: '172.29.1.0/25', gw: '172.29.1.10', mgmt: '172.29.3.147', ap: '172.29.3.154' },
  hl: { net: '172.29.1.128/25', gw: '172.29.1.138', mgmt: '172.29.3.148', ap: '172.29.3.155' },
  fa: { net: '172.29.2.0/25', gw: '172.29.2.10', mgmt: '172.29.3.149', ap: '172.29.3.156' },
  ar: { net: '172.29.2.128/25', gw: '172.29.2.138', mgmt: '172.29.3.150', ap: '172.29.3.157' },
  ict: { net: '172.29.3.0/25', gw: '172.29.3.10', mgmt: '172.29.3.151', ap: '172.29.3.158' },
}

const coreNodes: TopoNode[] = [
  { id: 'isp1', kind: 'isp', x: 300, y: 66, label: 'ISP 1', title: 'ISP 1', role: 'Penyedia internet pertama', details: ['120.188.37.0/30 → R1', '120.188.37.4/30 → R2'] },
  { id: 'isp2', kind: 'isp', x: 700, y: 66, label: 'ISP 2', title: 'ISP 2', role: 'Penyedia internet kedua', details: ['195.136.17.8/30 → R1', '195.136.17.12/30 → R2'] },
  {
    id: 'r1', kind: 'router', x: 300, y: 186, label: 'R1', title: 'R1 · ISR 4331', role: 'Router edge · OSPF RID 3.3.3.3',
    details: ['S0/1/0 120.188.37.2 → ISP1', 'S0/1/1 195.136.17.10 → ISP2', 'G0/0/0 172.29.3.161 → MLS1', 'G0/0/1 172.29.3.165 → MLS2'],
  },
  {
    id: 'r2', kind: 'router', x: 700, y: 186, label: 'R2', title: 'R2 · ISR 4331', role: 'Router edge · OSPF RID 4.4.4.4',
    details: ['S0/1/0 120.188.37.6 → ISP1', 'S0/1/1 195.136.17.14 → ISP2', 'G0/0/0 172.29.3.169 → MLS2', 'G0/0/1 172.29.3.173 → MLS1'],
  },
  {
    id: 'mls1', kind: 'mls', x: 300, y: 300, label: 'MLS1', title: 'MLS1 · Catalyst 3650', role: 'Core · HSRP Active (priority 110) · RID 1.1.1.1',
    details: ['SVI VLAN 10–60, inter-VLAN routing', 'G1/0/23 172.29.3.162 → R1', 'G1/0/24 172.29.3.174 → R2', 'Po1 (LACP) ke MLS2'],
  },
  {
    id: 'mls2', kind: 'mls', x: 700, y: 300, label: 'MLS2', title: 'MLS2 · Catalyst 3650', role: 'Core · HSRP Standby · RID 2.2.2.2',
    details: ['SVI VLAN 10–60, inter-VLAN routing', 'G1/0/23 172.29.3.170 → R2', 'G1/0/24 172.29.3.166 → R1', 'Po1 (LACP) ke MLS1'],
  },
]

const accessNodes: TopoNode[] = departments.map((d) =>
  d.id === 'dc'
    ? {
        id: 'sw-dc', kind: 'switch', x: d.x, y: ACCESS_Y, label: 'Data-Center', title: 'Data-Center · Catalyst 2960', role: 'Lantai 3 · Ruang Server',
        details: ['VLAN 60 · 172.29.3.128/28', 'Gateway 172.29.3.134', 'Mgmt 172.29.3.152'],
      }
    : {
        id: `sw-${d.id}`, kind: 'switch', x: d.x, y: ACCESS_Y, label: `SW-${d.id.toUpperCase()}`, title: `SW-${d.id.toUpperCase()} · Catalyst 2960`,
        role: `Lantai ${d.floor} · ${d.name}`,
        details: [
          `VLAN ${d.vlan} · ${deptNet[d.id].net}`,
          `Gateway (HSRP VIP) ${deptNet[d.id].gw}`,
          ...(d.id === 'fa' ? ['Port Security sticky · violation shutdown'] : []),
          `Mgmt ${deptNet[d.id].mgmt}`,
        ],
      },
)

const endpointNodes: TopoNode[] = departments.flatMap((d): TopoNode[] => {
  if (d.id === 'dc') {
    return [
      { id: 'dns', kind: 'server', x: d.x - 54, y: END_Y, label: 'DNS', title: 'Server DNS', role: 'Ruang Server · IP statis', details: ['172.29.3.131/28', 'Gateway 172.29.3.134'] },
      { id: 'dhcp', kind: 'server', x: d.x - 18, y: END_Y, label: 'DHCP', title: 'Server DHCP', role: 'Ruang Server · IP statis', details: ['172.29.3.132/28', 'Pool untuk VLAN 10–50', 'Dijangkau lewat ip helper-address'] },
      { id: 'apps', kind: 'server', x: d.x + 18, y: END_Y, label: 'Apps', title: 'Server Aplikasi', role: 'Ruang Server · IP statis', details: ['172.29.3.133/28', 'Gateway 172.29.3.134'] },
      { id: 'wlc', kind: 'wlc', x: d.x + 54, y: END_Y, label: 'WLC', title: 'WLC 3504', role: 'Wireless LAN Controller', details: ['172.29.3.153 (VLAN 88)', 'Mengelola 5 AP · WPA2 Personal'] },
    ]
  }
  return [
    { id: `pc-${d.id}`, kind: 'pc', x: d.x - 32, y: END_Y, label: 'PC', title: `PC ${d.name}`, role: `Klien DHCP · VLAN ${d.vlan}`, details: [`IP dari ${deptNet[d.id].net}`, `Gateway ${deptNet[d.id].gw}`] },
    { id: `ap-${d.id}`, kind: 'ap', x: d.x + 32, y: END_Y, label: 'AP', title: `AP-${d.id.toUpperCase()} · 3702i`, role: 'Access point · dikelola WLC', details: [`Mgmt ${deptNet[d.id].ap}`, `SSID ${d.name} · WPA2 · 2,4 GHz`] },
  ]
})

export const nodes: TopoNode[] = [...coreNodes, ...accessNodes, ...endpointNodes]
export const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n])) as Record<string, TopoNode>

export const links: TopoLink[] = [
  { a: 'isp1', b: 'r1', type: 'wan' },
  { a: 'isp2', b: 'r1', type: 'wan' },
  { a: 'isp1', b: 'r2', type: 'wan' },
  { a: 'isp2', b: 'r2', type: 'wan' },
  { a: 'r1', b: 'mls1', type: 'routed' },
  { a: 'r1', b: 'mls2', type: 'routed' },
  { a: 'r2', b: 'mls2', type: 'routed' },
  { a: 'r2', b: 'mls1', type: 'routed' },
  { a: 'mls1', b: 'mls2', type: 'etherchannel' },
  ...departments.flatMap((d): TopoLink[] => [
    { a: 'mls1', b: `sw-${d.id}`, type: 'trunk' },
    { a: 'mls2', b: `sw-${d.id}`, type: 'trunk' },
  ]),
  ...endpointNodes.map((n): TopoLink => ({
    a: n.kind === 'server' || n.kind === 'wlc' ? 'sw-dc' : `sw-${n.id.split('-')[1]}`,
    b: n.id,
    type: 'access',
  })),
]

export const linkKey = (a: string, b: string) => [a, b].sort().join('|')

export const scenarios: Scenario[] = [
  {
    id: 'dhcp',
    label: 'DHCP',
    title: 'Klien mendapatkan IP secara otomatis',
    steps: [
      { path: ['pc-sm', 'sw-sm', 'mls1'], text: 'PC Sales & Marketing (VLAN 10) mengirim DHCP Discover ke jaringannya.' },
      { path: ['mls1', 'sw-dc', 'dhcp'], text: 'MLS1 meneruskannya sebagai unicast ke server DHCP 172.29.3.132 melalui ip helper-address.' },
      { path: ['dhcp', 'sw-dc', 'mls1', 'sw-sm', 'pc-sm'], text: 'Server DHCP membalas Offer/ACK — PC mendapat IP 172.29.1.x/25 dengan gateway virtual 172.29.1.10.' },
    ],
  },
  {
    id: 'intervlan',
    label: 'Inter-VLAN',
    title: 'Komunikasi antar departemen',
    steps: [
      { path: ['pc-hl', 'sw-hl', 'mls1'], text: 'PC HR & Logistik (VLAN 20) mengirim paket ke gateway virtual 172.29.1.138, dijawab MLS1 sebagai HSRP Active.' },
      { path: ['mls1', 'sw-ict', 'pc-ict'], text: 'MLS1 me-routing antar SVI dan meneruskan paket ke PC ICT di VLAN 50.' },
      { path: ['pc-ict', 'sw-ict', 'mls1', 'sw-hl', 'pc-hl'], text: 'Balasan kembali lewat MLS1 — trafik antar VLAN tidak perlu melewati router edge.' },
    ],
  },
  {
    id: 'internet',
    label: 'Internet (NAT)',
    title: 'Akses internet melalui PAT',
    steps: [
      { path: ['pc-fa', 'sw-fa', 'mls1'], text: 'PC Finance (VLAN 30, port dengan Port Security) mengirim paket ke internet lewat gateway 172.29.2.10.' },
      { path: ['mls1', 'r1'], text: 'MLS1 meneruskan paket melalui default route ke R1 (172.29.3.161).' },
      { path: ['r1', 'isp1'], text: 'R1 menerjemahkan alamat privat 172.29.2.x menjadi 120.188.37.2 (PAT) lalu mengirimnya ke ISP 1.' },
    ],
    note: 'Membutuhkan default route dan NAT/PAT dari bagian evaluasi pasca-proyek.',
  },
  {
    id: 'failover-isp',
    label: 'Failover ISP',
    title: 'Koneksi ISP 1 putus, trafik pindah ke ISP 2',
    downLinks: [['isp1', 'r1']],
    steps: [
      { path: ['pc-ict', 'sw-ict', 'mls1', 'r1'], text: 'Link R1 ke ISP 1 terputus. Trafik dari LAN tetap diteruskan ke R1 seperti biasa.' },
      { path: ['r1', 'isp2'], text: 'Default route utama hilang, floating static route (AD 10) aktif — R1 mengirim trafik ke ISP 2 (195.136.17.9).' },
    ],
    note: 'Membutuhkan default route dan floating static route dari bagian evaluasi pasca-proyek.',
  },
  {
    id: 'failover-hsrp',
    label: 'Failover Gateway',
    title: 'MLS1 mati, MLS2 mengambil alih gateway',
    downNodes: ['mls1'],
    steps: [
      { path: ['pc-ar', 'sw-ar', 'mls2'], text: 'MLS1 berhenti mengirim HSRP hello. MLS2 berubah dari Standby menjadi Active dan menjawab gateway 172.29.2.138.' },
      { path: ['mls2', 'r2', 'isp1'], text: 'MLS2 meneruskan trafik ke R2, lalu ke ISP 1 — pengguna tetap terhubung tanpa mengganti konfigurasi.' },
    ],
    note: 'Langkah ke ISP membutuhkan default route dan NAT dari bagian evaluasi pasca-proyek.',
  },
]

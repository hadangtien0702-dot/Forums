import {
    FolderIcon,
    ServerIcon,
    SignalIcon,
    GlobeAltIcon,
    ChartBarIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export const navItems = [
    { name: 'Projects', icon: FolderIcon, active: false },
    { name: 'Deployments', icon: ServerIcon, active: true },
    { name: 'Activity', icon: SignalIcon, active: false },
    { name: 'Domains', icon: GlobeAltIcon, active: false },
    { name: 'Usage', icon: ChartBarIcon, active: false },
    { name: 'Settings', icon: Cog6ToothIcon, active: false },
];

export const teams = [
    { name: 'Planataria', initial: 'P', color: 'bg-pink-500' },
    { name: 'Protocol', initial: 'P', color: 'bg-blue-500' },
    { name: 'Tailwind Labs', initial: 'T', color: 'bg-sky-500' },
];

export const projects = [
  { team: 'Planataria', name: 'ios-app', status: 'success', source: 'GitHub', time: 'Initiated' },
  { team: 'Planataria', name: 'mobile-api', status: 'success', source: 'GitHub', time: 'Deploys' },
  { team: 'Tailwind Labs', name: 'tailwind-css', status: 'pending', source: 'GitHub', time: 'Initiated' },
  { team: 'Tailwind Labs', name: 'tailwind-ui', status: 'success', source: 'GitHub', time: 'Deploys' },
  { team: 'Protocol', name: 'relay-service', status: 'success', source: 'GitHub', time: 'Deploys' },
  { team: 'Planataria', name: 'android-app', status: 'pending', source: 'GitHub', time: 'Deploys' },
  { team: 'Protocol', name: 'api.protocol.chat', status: 'failed', source: 'GitHub', time: 'Failed to deploy' },
  { team: 'Planataria', name: 'planetaria-web', status: 'pending', source: 'GitHub', time: 'Deploys' },
  { team: 'Tailwind Labs', name: 'tailwind-nextjs', status: 'success', source: 'GitHub', time: 'Deploys' },
  { team: 'Protocol', name: 'docs', status: 'pending', source: 'GitHub', time: 'Initiated' },
  { team: 'Tailwind Labs', name: 'headless-ui', status: 'success', source: 'GitHub', time: 'Deploys' },
  { team: 'Planataria', name: 'marketing-site', status: 'success', source: 'GitHub', time: 'Deploys' },
];

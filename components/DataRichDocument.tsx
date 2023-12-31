import { MDXRemote } from 'next-mdx-remote';
import dynamic from 'next/dynamic';
import { Mermaid } from '@portaljs/core';

import Navigation from './navigation';
import PopulationDashboard from './population-dashboard';
// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  Table: dynamic(() => import('@portaljs/components').then(mod => mod.Table)),
  Catalog: dynamic(() => import('@portaljs/components').then(mod => mod.Catalog)),
  mermaid: Mermaid,
  Vega: dynamic(() => import('@portaljs/components').then(mod => mod.Vega)),
  VegaLite: dynamic(() => import('@portaljs/components').then(mod => mod.VegaLite)),
  LineChart: dynamic(() => import('@portaljs/components').then(mod => mod.LineChart)),
  FlatUiTable: dynamic(() => import('@portaljs/components').then(mod => mod.FlatUiTable)),
  Navigation : Navigation,
  PopulationDashboard : PopulationDashboard
  
} as any;

export default function DRD({ source }: { source: any }) {
  return <MDXRemote {...source} components={components} />;
}

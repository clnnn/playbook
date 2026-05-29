import {
  addProjectConfiguration,
  formatFiles,
  joinPathFragments,
  runTasksInSerial,
  Tree,
  updateJson,
  workspaceRoot,
  writeJson,
} from '@nx/devkit';
import { execSync } from 'child_process';
import { ShadcnUiGeneratorSchema } from './schema';

export async function shadcnUiGenerator(
  tree: Tree,
  options: ShadcnUiGeneratorSchema,
) {
  const pkgName = options.name ?? 'ui';
  const projectRoot = `packages/${pkgName}`;

  // ── 1. Nx project configuration ──────────────────────────────────────────
  addProjectConfiguration(tree, pkgName, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    tags: ['scope:ui', 'type:ui'],
    targets: {},
  });

  // ── 2. package.json ───────────────────────────────────────────────────────
  writeJson(tree, joinPathFragments(projectRoot, 'package.json'), {
    name: `@org/${pkgName}`,
    version: '0.0.0',
    private: true,
    main: './src/index.ts',
    types: './src/index.ts',
    peerDependencies: {
      react: '>=18',
      'react-dom': '>=18',
      tailwindcss: '>=3',
    },
  });

  // ── 3. tsconfig.json (project references root) ────────────────────────────
  writeJson(tree, joinPathFragments(projectRoot, 'tsconfig.json'), {
    extends: '../../tsconfig.base.json',
    files: [],
    include: [],
    references: [{ path: './tsconfig.lib.json' }],
  });

  // ── 4. tsconfig.lib.json ──────────────────────────────────────────────────
  writeJson(tree, joinPathFragments(projectRoot, 'tsconfig.lib.json'), {
    extends: '../../tsconfig.base.json',
    compilerOptions: {
      jsx: 'react-jsx',
      module: 'preserve',
      moduleResolution: 'bundler',
      rootDir: 'src',
      outDir: 'dist',
      tsBuildInfoFile: 'dist/tsconfig.lib.tsbuildinfo',
      emitDeclarationOnly: true,
      lib: ['es2022', 'dom', 'dom.iterable'],
      types: ['node'],
      // shadcn uses bare alias paths matching components.json aliases
      paths: {
        'src/lib/*': ['./src/lib/*'],
        'src/ui/*': ['./src/ui/*'],
        'src/hooks/*': ['./src/hooks/*'],
        'src/components/*': ['./src/components/*'],
      },
    },
    include: ['src/**/*.ts', 'src/**/*.tsx'],
    references: [],
  });

  // ── 5. tailwind.config.ts ─────────────────────────────────────────────────
  tree.write(
    joinPathFragments(projectRoot, 'tailwind.config.ts'),
    `import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  plugins: [],
};

export default config;
`,
  );

  // ── 6. src/globals.css ────────────────────────────────────────────────────
  tree.write(
    joinPathFragments(projectRoot, 'src/globals.css'),
    `@import "tailwindcss";

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}
`,
  );

  // ── 7. src/lib/utils.ts ───────────────────────────────────────────────────
  tree.write(
    joinPathFragments(projectRoot, 'src/lib/utils.ts'),
    `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`,
  );

  // ── 8. src/index.ts ───────────────────────────────────────────────────────
  tree.write(
    joinPathFragments(projectRoot, 'src/index.ts'),
    `export * from './lib/utils';
`,
  );

  // ── 9. components.json (only when no preset; shadcn init creates it otherwise)
  if (!options.preset) {
    writeJson(tree, joinPathFragments(projectRoot, 'components.json'), {
      $schema: 'https://ui.shadcn.com/schema.json',
      style: 'default',
      rsc: false,
      tsx: true,
      tailwind: {
        config: 'tailwind.config.ts',
        css: 'src/globals.css',
        baseColor: 'slate',
        cssVariables: true,
        prefix: '',
      },
      aliases: {
        components: 'src/components',
        utils: 'src/lib/utils',
        ui: 'src/ui',
        lib: 'src/lib',
        hooks: 'src/hooks',
      },
    });
  }

  // ── 10. Update root tsconfig.json project references ──────────────────────
  updateJson(tree, 'tsconfig.json', (json) => {
    json.references = json.references ?? [];
    const refPath = `./${projectRoot}`;
    if (!json.references.some((r: { path: string }) => r.path === refPath)) {
      json.references.push({ path: refPath });
    }
    return json;
  });

  // ── 11. Update tsconfig.base.json with path aliases ───────────────────────
  updateJson(tree, 'tsconfig.base.json', (json) => {
    json.compilerOptions.paths = json.compilerOptions.paths ?? {};
    const p = json.compilerOptions.paths;
    p[`@${pkgName}/components`] = [`${projectRoot}/src/components/index.ts`];
    p[`@${pkgName}/hooks`] = [`${projectRoot}/src/hooks/index.ts`];
    p[`@${pkgName}/lib/*`] = [`${projectRoot}/src/lib/*`];
    p[`@${pkgName}/ui/*`] = [`${projectRoot}/src/ui/*`];
    return json;
  });

  await formatFiles(tree);

  // ── 12. Callback: run shadcn CLI after tree is flushed to disk ────────────
  //
  // We add components by explicit list rather than --all.
  // Some items listed as registry:ui (combobox, button-group, native-select,
  // empty, field, etc.) do not exist as downloadable files on the shadcn
  // server for the "default" style and are excluded here.
  //
  // Large packages (lucide-react, date-fns, recharts) are pre-installed via
  // a direct bun add before running shadcn add, to avoid bun's SystemResources
  // error that occurs when copying thousands of small icon/locale files concurrently
  // inside the shadcn CLI's install step.
  const UI_COMPONENTS = [
    'accordion', 'alert', 'alert-dialog', 'aspect-ratio', 'avatar',
    'badge', 'breadcrumb', 'button', 'calendar', 'card', 'carousel',
    'chart', 'checkbox', 'collapsible', 'command', 'context-menu',
    'dialog', 'drawer', 'dropdown-menu', 'form', 'hover-card', 'input',
    'input-otp', 'label', 'menubar', 'navigation-menu', 'pagination',
    'popover', 'progress', 'radio-group', 'resizable', 'scroll-area',
    'select', 'separator', 'sheet', 'sidebar', 'skeleton', 'slider',
    'sonner', 'switch', 'table', 'tabs', 'textarea', 'toggle',
    'toggle-group', 'tooltip',
  ].join(' ');

  const LARGE_DEPS = [
    'lucide-react', 'date-fns', 'recharts', 'embla-carousel-react',
    '@radix-ui/react-accordion', '@radix-ui/react-aspect-ratio',
    '@radix-ui/react-avatar', '@radix-ui/react-slot',
    '@radix-ui/react-checkbox', '@radix-ui/react-collapsible',
    '@radix-ui/react-context-menu', '@radix-ui/react-dialog',
    'vaul', '@radix-ui/react-dropdown-menu', '@radix-ui/react-hover-card',
    'input-otp', '@radix-ui/react-label', '@radix-ui/react-menubar',
    '@radix-ui/react-navigation-menu', '@radix-ui/react-popover',
    '@radix-ui/react-progress', '@radix-ui/react-radio-group',
    'react-resizable-panels', '@radix-ui/react-scroll-area',
    '@radix-ui/react-select', '@radix-ui/react-separator',
    '@radix-ui/react-slider', 'sonner', 'next-themes',
    '@radix-ui/react-switch', '@radix-ui/react-tabs',
    '@radix-ui/react-toggle', '@radix-ui/react-tooltip',
    '@radix-ui/react-alert-dialog', 'react-day-picker',
    '@radix-ui/react-toggle-group', 'class-variance-authority',
    'cmdk', '@hookform/resolvers', 'zod', 'react-hook-form',
    'clsx', 'tailwind-merge',
  ].join(' ');

  return runTasksInSerial(() => {
    const cwd = joinPathFragments(workspaceRoot, projectRoot);

    if (options.preset) {
      execSync(
        `bunx shadcn init --preset ${options.preset} --yes`,
        { cwd, stdio: 'inherit' },
      );
    }

    // Pre-install deps at workspace root to avoid bun SystemResources errors
    execSync(`bun add ${LARGE_DEPS}`, {
      cwd: workspaceRoot,
      stdio: 'inherit',
    });

    execSync(`bunx shadcn add ${UI_COMPONENTS} --overwrite --yes`, {
      cwd,
      stdio: 'inherit',
    });
  });
}

export default shadcnUiGenerator;

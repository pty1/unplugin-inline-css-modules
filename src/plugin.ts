import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import { createHash } from 'crypto'
import { mkdirSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'
import MagicString from 'magic-string'

type SupportedExtension = 'css' | 'scss' | 'sass' | 'styl' | 'less'

export type PluginConfig = {
  fileMatch?: RegExp
  tagName?: string
  extension?: SupportedExtension
  inlineImport?: boolean
  moduleStrategy?: 'virtual' | 'filesystem'
}

const matchInlineCssModules =
  /(?:const|var|let)\s*(\w+)(?:\s*:.*)?\s*=\s*(\w+)\s*`([\s\S]*?)`/gm

const virtualModuleId = 'virtual:inline-css-modules'
const webpackModuleId = 'inline-css-modules/virtual'
const resolvedVirtualModuleId = '\0' + virtualModuleId
const resolvedWebpackModuleId = '\0inline-css-modules/virtual'

let cssModules: Record<string, string> = {}

const getCacheDir = () =>
  join(process.cwd(), 'node_modules', '.cache', 'inline-css-modules')
const getCachePath = (hash: string) => join(getCacheDir(), `${hash}.module.css`)

function ensureCacheDir() {
  const dir = getCacheDir()
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
}

function hashCss(css: string): string {
  return createHash('md5').update(css).digest('hex')
}

function writeToCache(hash: string, css: string): void {
  ensureCacheDir()
  writeFileSync(getCachePath(hash), css)
}

export const unpluginFactory: UnpluginFactory<PluginConfig | undefined> = (
  config = {},
  meta
) => {
  const fileMatch = config.fileMatch ?? /\.(tsx|jsx|js|vue|svelte)$/
  const tagName = config.tagName ?? 'css'
  const preprocessor = config.extension ?? 'css'
  const useFilesystem = config.moduleStrategy === 'filesystem'
  const moduleId = useFilesystem ? webpackModuleId : virtualModuleId
  const resolvedId = useFilesystem
    ? resolvedWebpackModuleId
    : resolvedVirtualModuleId

  return {
    name: 'inline-css-modules',
    enforce: 'pre',
    resolveId(id) {
      if (id === moduleId || id.startsWith(moduleId + '/')) {
        return resolvedId + id.slice(moduleId.length)
      }
      return undefined
    },
    loadInclude(id) {
      return id.startsWith(resolvedId)
    },
    load(id) {
      if (!id.startsWith(resolvedId + '/')) return undefined

      const file = id.slice(resolvedId.length + 1).replace(/\?used$/, '')
      const css = cssModules[file]

      if (!css) return undefined

      return {
        code: css,
        map: null,
      }
    },
    transform: {
      filter: {
        id: fileMatch,
      },
      handler(src, id) {
        const s = new MagicString(src)
        const imports: string[] = []
        let hasChanges = false

        let match: RegExpExecArray | null
        const importRegex =
          /import\s*{\s*(?:css|inlineCss)\s*(?:as\s*\w+\s*)?}\s*from\s*('|"|`)unplugin-inline-css-modules\1;?/gm
        while ((match = importRegex.exec(src)) !== null) {
          s.remove(match.index, match.index + match[0].length)
          hasChanges = true
        }

        matchInlineCssModules.lastIndex = 0
        while ((match = matchInlineCssModules.exec(src)) !== null) {
          const [fullMatch, variableName, tag, css] = match
          if (tag !== tagName) continue

          const hash = hashCss(css)
          const filename = `${hash}.module.${preprocessor}`
          cssModules[filename] = css

          let importStatement: string
          if (useFilesystem) {
            writeToCache(hash, css)
            importStatement = `import ${variableName} from "${getCachePath(hash)}"`
          } else {
            importStatement = `import ${variableName} from "${moduleId}/${filename}"`
          }

          if (config.inlineImport === false) {
            imports.push(importStatement)
            s.overwrite(match.index, match.index + fullMatch.length, '')
          } else {
            s.overwrite(
              match.index,
              match.index + fullMatch.length,
              importStatement
            )
          }
          hasChanges = true
        }

        if (imports.length) {
          s.prepend(imports.join('\n') + '\n')
        }

        if (!hasChanges) {
          return null
        }

        return {
          code: s.toString(),
          map: s.generateMap({ source: id, includeContent: true }),
        }
      },
    },
  }
}

export const unplugin = createUnplugin(unpluginFactory)

export default unplugin

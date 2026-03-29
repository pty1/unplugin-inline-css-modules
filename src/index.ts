import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import { createHash } from 'crypto'
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

type SupportedExtension = 'css' | 'scss' | 'sass' | 'styl' | 'less'

export type PluginConfig = {
  fileMatch?: RegExp
  tagName?: string
  extension?: SupportedExtension | ((filename: string) => SupportedExtension)
  inlineImport?: boolean
}

const matchInlineCssModules =
  /(?:const|var|let)\s*(\w+)(?:\s*:.*)?\s*=\s*(\w+)\s*`([\s\S]*?)`/gm

export const css = (_: TemplateStringsArray): Record<string, string> => ({})

const virtualModuleId = 'virtual:inline-css-modules'
const webpackModuleId = 'inline-css-modules/virtual'
const resolvedVirtualModuleId = '\0' + virtualModuleId
const resolvedWebpackModuleId = '\0inline-css-modules/virtual'

let cssModules: Record<string, string> = {}

const getCacheDir = () =>
  join(process.cwd(), 'node_modules', '.cache', 'inline-css-modules')
const getCachePath = (hash: string) => join(getCacheDir(), `${hash}.css`)

function ensureCacheDir() {
  const dir = getCacheDir()
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
}

function hashCss(css: string): string {
  return createHash('md5').update(css).digest('hex')
}

function readFromCache(hash: string): string | null {
  const path = getCachePath(hash)
  if (existsSync(path)) {
    return readFileSync(path, 'utf-8')
  }
  return null
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
  const isWebpack =
    meta?.framework === 'webpack' || meta?.framework === 'rspack'
  const moduleId = isWebpack ? webpackModuleId : virtualModuleId
  const resolvedId = isWebpack
    ? resolvedWebpackModuleId
    : resolvedVirtualModuleId

  return {
    name: 'inline-css-modules',
    enforce: 'pre',
    resolveId(id) {
      if (id === moduleId || id.startsWith(moduleId + '/')) {
        return resolvedId + id.slice(moduleId.length)
      }
      if (id === virtualModuleId || id.startsWith(virtualModuleId + '/')) {
        return resolvedVirtualModuleId + id.slice(virtualModuleId.length)
      }
      if (id === webpackModuleId || id.startsWith(webpackModuleId + '/')) {
        return resolvedWebpackModuleId + id.slice(webpackModuleId.length)
      }
      return undefined
    },
    loadInclude(id) {
      return (
        id.startsWith(resolvedVirtualModuleId) ||
        id.startsWith(resolvedWebpackModuleId)
      )
    },
    load(id) {
      if (
        !id.startsWith(resolvedVirtualModuleId + '/') &&
        !id.startsWith(resolvedWebpackModuleId + '/')
      )
        return undefined

      const prefix = id.startsWith(resolvedVirtualModuleId + '/')
        ? resolvedVirtualModuleId + '/'
        : resolvedWebpackModuleId + '/'
      const file = id.slice(prefix.length).replace(/\?used$/, '')
      const css = cssModules[file]

      if (!css) {
        if (isWebpack) {
          const hash = file.replace(/\.module\.\w+$/, '')
          const cached = readFromCache(hash)
          if (cached) {
            return {
              code: cached,
              map: null,
            }
          }
        }
        return undefined
      }
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
        // Build up a list of import statements to inject to the top of the file
        let imports: string[] = []

        src = src.replace(
          /import\s*{\s*(?:css|inlineCss)\s*(?:as\s*\w+\s*)?}\s*from\s*('|"|`)unplugin-inline-css-modules\1;?/gm,
          ''
        )

        src = src.replaceAll(matchInlineCssModules, (substring, ...args) => {
          const [variableName, tag, css] = args

          if (tag !== tagName) return substring

          let baseFilename = id.slice(id.lastIndexOf('/') + 1)
          baseFilename = baseFilename.slice(0, baseFilename.lastIndexOf('.'))
          let cnt = 0
          const ext =
            typeof preprocessor == 'function'
              ? preprocessor(baseFilename)
              : preprocessor
          let filename = `${baseFilename}-${cnt}.module.${ext}`
          while (cssModules[filename]) {
            cnt++
            filename = `${baseFilename}-${cnt}.module.${ext}`
          }
          cssModules[filename] = css

          let importStatement

          if (isWebpack) {
            const hash = hashCss(css)
            writeToCache(hash, css)
            importStatement = `import ${variableName} from "${moduleId}/${hash}.module.${ext}"`
          }
          importStatement = `import ${variableName} from "${moduleId}/${filename}"`

          if (config.inlineImport === false) {
            imports.push(importStatement)
            return ''
          }
          return importStatement
        })
        if (imports.length) {
          return imports.join('\n') + '\n' + src
        }
        return {
          code: src,
          map: null,
        }
      },
    },
  }
}

export const unplugin = createUnplugin(unpluginFactory)

export default unplugin

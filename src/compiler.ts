import transpilers from './transpilers'
import { ErrorHandler } from './error-handler'
import { parse } from './parse'
import { AST } from './types'
import { Transplier } from './transpilers/base'

export interface CompileOptions {
  lang: 'js'
  errorHandler: ErrorHandler
  sourcemap: boolean
}

export class Compiler {
  readonly options: CompileOptions
  readonly ast: AST
  readonly transpiler: Transplier
  readonly compiled: string

  constructor(
    public readonly source: string,
    options: Partial<CompileOptions> = {},
  ) {
    const {
      lang = 'js',
      sourcemap = true,
      errorHandler = new ErrorHandler(),
    } = options

    this.options = {
      lang,
      errorHandler,
      sourcemap,
    }

    this.ast = parse(source, { errorHandler, sourcemap })
    const Transpiler = transpilers[lang]
    this.transpiler = new Transpiler({ errorHandler })

    this.compiled = this.transpiler.transpile(this.ast)
  }
}

export function compile(source: string, options: Partial<CompileOptions> = {}) {
  return new Compiler(source, options).compiled
}

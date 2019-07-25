import { queryType } from 'nexus'

export const Query = queryType({
  definition(t): void {
    t.string(
      'hello',
      (): string =>
        "Hello world! It's your boy, how far now unicodeveloper"
    )
  }
})

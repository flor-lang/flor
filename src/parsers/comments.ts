import * as P from 'parsimmon'

export type LineCommentParser = P.Parser<P.Node<'linecomment', {}>>

// const Comment = P
//   .regex(/[^\n]*/)
//   .wrap(
//     P.string('//'),
//     P.end
//   )

// export const LineComment: LineCommentParser = Comment
//   .sepBy(
//     P.regexp(/[ \n]*/)
//   )
//   .trim(P.regexp(/[ \n]*/))
//   .node('linecomment')

export const LineComment: LineCommentParser = P
  .seqObj(
    P.optWhitespace,
    P.string('//').named('symbol-comment'),
    P.regex(/[^\n]*/),
    P.end
  )
  .node('linecomment')

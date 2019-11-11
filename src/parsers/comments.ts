import * as P from 'parsimmon'

export type LineCommentParser = P.Parser<{}>

// const Comment = P
//   .regex(/[^\n]*/)
//   .wrap(
//     P.string('//'),
//     P.newline
//   )

// export const LineComment: LineCommentParser = Comment
//   .sepBy(
//     P.regexp(/[ \n]*/)
//   )
//   .trim(P.regexp(/[ \n]*/))
//   .node('linecomment')

export const LineComment: LineCommentParser = P
  .regex(/[^\n]*/)
  .wrap(
    P.string('//'),
    P.end
  )

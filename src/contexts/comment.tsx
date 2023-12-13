'use client';

import { PropsWithChildren, createContext, useContext, useState } from 'react';

interface CommentProviderProps extends PropsWithChildren {}

export interface CommentProps {
  id: number;
  message: string;
}

interface ContextCommentProps {
  comments: Array<CommentProps>;
  resetComments(listComments: ContextCommentProps['comments']): void;
  deleteComment(id: Pick<CommentProps, 'id'>): void;
}

const CommentContext = createContext<ContextCommentProps>({
  deleteComment: () => void {},
  resetComments: () => void {},
  comments: []
});

function CommentProvider({ children }: CommentProviderProps) {
  const [comments, setComments] = useState<ContextCommentProps['comments']>([]);

  function deleteComment({ id }: Pick<CommentProps, 'id'>) {
    setComments((prevState) =>
      prevState.filter((comment) => comment.id !== id)
    );
  }

  function resetComments(listComments: ContextCommentProps['comments']) {
    setComments(listComments);
  }

  return (
    <CommentContext.Provider value={{ comments, deleteComment, resetComments }}>
      {children}
    </CommentContext.Provider>
  );
}

export function useComment() {
  return useContext(CommentContext);
}

export default CommentProvider;

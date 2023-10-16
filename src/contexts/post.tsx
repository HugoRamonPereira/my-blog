'use client';

import {
	PropsWithChildren,
	createContext,
	useContext,
	useState
} from 'react';

interface PostProviderProps extends PropsWithChildren{}

export interface PostProps {
    id: number;
    message: string;
    date_created: string;
    id_creator?: number;
}

interface ContextPostProps {
  createPost(post: PostProps): void;
	posts: Array<PostProps>;
  resetPosts(listPosts: ContextPostProps['posts']): void;
  deletePost(id: Pick<PostProps, 'id'>): void;
}

const PostContext = createContext<ContextPostProps>({
	createPost: () => void {},
	resetPosts: () => void {},
	deletePost: () => void {},
	posts: [],
});

function PostProvider({ children }: PostProviderProps) {
	const [posts, setPosts] = useState<ContextPostProps['posts']>([]);

	function createPost(post: PostProps) {
		setPosts((prevState) => {
			return [post].concat(prevState);
		});
	}

	function resetPosts(listPosts: ContextPostProps['posts']) {
		setPosts(listPosts);
	}

	function deletePost({ id }: Pick<PostProps, 'id'>) {
		setPosts((prevState) => prevState.filter(post => post.id !== id));
	}

	return (
		<PostContext.Provider value={{ posts, createPost, resetPosts, deletePost }}>
			{children}
		</PostContext.Provider>
	);
}

export function usePost() {
	return useContext(PostContext);
}

export default PostProvider;
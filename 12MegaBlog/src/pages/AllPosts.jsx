import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, PostCard } from '../components';
import { fetchPosts } from '../store/postSlice';

function AllPosts() {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);
    const status = useSelector((state) => state.posts.status);
    const error = useSelector((state) => state.posts.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {status === 'loading' && (
                        <div className="w-full text-center">Loading...</div>
                    )}
                    {status === 'failed' && (
                        <div className="w-full text-center">Error: {error}</div>
                    )}
                    {status === 'succeeded' && posts.length > 0 ? posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    )) : (
                        status === 'succeeded' && <div className="w-full text-center">No posts available.</div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;

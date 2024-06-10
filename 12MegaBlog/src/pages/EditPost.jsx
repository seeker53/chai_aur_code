import React, { useEffect } from 'react';
import { Container, PostForm } from '../components';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../store/postSlice';

function EditPost() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const post = useSelector((state) => state.posts.currentPost);
    const postStatus = useSelector((state) => state.posts.status);

    useEffect(() => {
        if (slug) {
            dispatch(fetchPost(slug));
        } else {
            navigate('/');
        }
    }, [slug, dispatch, navigate]);

    return postStatus === 'succeeded' && post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : (
        <div className="py-8">
            <Container>
                {postStatus === 'loading' ? (
                    <div>Loading...</div>
                ) : (
                    <div>No post found.</div>
                )}
            </Container>
        </div>
    );
}

export default EditPost;

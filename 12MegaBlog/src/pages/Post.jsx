import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, deletePost } from "../store/postSlice";
import { deleteFile } from "../store/fileSlice";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import appwriteService from "../appwrite/config";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.auth.userData);
    const postStatus = useSelector((state) => state.posts.status);
    const fetchedPost = useSelector((state) => state.posts.currentPost);

    const isAuthor = fetchedPost && userData ? fetchedPost.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            dispatch(fetchPost(slug));
        } else {
            navigate("/");
        }
    }, [slug, navigate, dispatch]);

    useEffect(() => {
        if (postStatus === "succeeded" && fetchedPost) {
            setPost(fetchedPost);
        }
    }, [postStatus, fetchedPost]);

    const handleDeletePost = async () => {
        const deletePostStatus = await dispatch(deletePost(post.$id)).unwrap();
        if (deletePostStatus) {
            await dispatch(deleteFile(post.featuredImage));
            navigate("/");
        }
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={handleDeletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}

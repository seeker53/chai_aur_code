import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts from the service
        appwriteService.getPosts([]).then((result) => {
            console.log("Fetched posts result:", result); // Debugging line
            if (result && result.documents) {
                setPosts(result.documents);
            } else {
                console.log("No posts found"); // Debugging line
            }
        }).catch(error => {
            console.error("Error fetching posts:", error); // Debugging line
        });
    }, []);

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.length > 0 ? posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    )) : (
                        <div className="w-full text-center">No posts available.</div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;

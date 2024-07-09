import React, { useEffect, useState } from 'react';
import Post from '../../components/Post';

export default function AdminHomepage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL;
        fetch(`${apiUrl}/post`).then(response => {
            if (response.ok) {
                response.json().then(posts => {
                    setPosts(posts);
                });
            } else {
                console.error('Failed to fetch posts:', response.status);
            }
        }).catch(error => {
            console.error('Error fetching posts:', error);
        });
    }, []);

    return (
        <div>
            <section>
                {posts.length > 0 && posts.map(post => (
                    <Post key={post._id} {...post} />
                ))}
            </section>
        </div>
    );
}

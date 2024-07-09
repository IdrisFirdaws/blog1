import React, { useEffect, useState } from 'react';
import Post from '../../components/Post';

export default function VisitorHomePage() {
    const [posts, setPosts] = useState('');

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL;
        console.log('API URL:', `${apiUrl}/post`); // Log the API URL for debugging
        fetch(`${apiUrl}/post`).then(response => {
            response.json().then(posts => {
                setPosts(posts);
            }).catch(error => {
                console.error('Error parsing JSON:', error);
            });
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

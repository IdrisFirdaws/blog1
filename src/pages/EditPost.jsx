import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Editor from '../components/Editor';

export default function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        console.log('API URL:', `${process.env.REACT_APP_API_URL}/post/${id}`);
        fetch(`${process.env.REACT_APP_API_URL}/post/${id}`)
            .then(response => response.json())
            .then(postInfo => {
                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);
            })
            .catch(error => console.error('Error fetching post:', error));
    }, [id]);

    const updatePost = async (e) => {
        e.preventDefault();
        console.log(process.env.REACT_APP_API_URL);

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        if (file) {
            data.set('file', file);
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/post/${id}`, {
                method: 'PUT',
                body: data,
                credentials: 'include',
            });

            if (response.ok) {
                setRedirect(true);
            } else {
                console.error('Failed to update post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (redirect) {
        return <Navigate to={`/post/${id}`} />;
    }

    return (
        <form className="section create" onSubmit={updatePost}>
            <input
                type="text"
                placeholder={'Title'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <Editor value={content} onChange={setContent} />
            <button type="submit">Update post</button>
        </form>
    );
}

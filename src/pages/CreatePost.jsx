import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Editor from '../components/Editor';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const createNewPost = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        if (file) {
            data.set('file', file);
        }

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/post`, {
                method: 'POST',
                body: data,
                credentials: 'include',
            });

            if (response.ok) {
                setRedirect(true);
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (redirect) {
        return <Navigate to='/admin' />;
    }

    return (
        <form className="section create" onSubmit={createNewPost}>
            <input
                type="text"
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
            />
            <Editor value={content} onChange={setContent} />
            <button type="submit">Create post</button>
        </form>
    );
}

import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { UserContext } from '../UserContext';
import * as icon from 'react-bootstrap-icons';

export default function PostPage() {
    const { id } = useParams();
    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/post/${id}`)
            .then(response => response.json())
            .then(postInfo => {
                setPostInfo(postInfo);
            })
            .catch(error => console.error('Error fetching post:', error));
    }, [id]);

    if (!postInfo) return 'Loading...';

    return (
        <div className='postPage'>
            <section className="postTop">
                <div className="title">
                    {postInfo.title}
                </div>

                <div className="author">
                    <div className="name">
                        by: {postInfo.author.username}
                    </div>

                    <div className="date">
                        {format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}
                    </div>
                </div>

                {userInfo?.id === postInfo.author._id && (
                    <div className="edit">
                        <Link to={`/edit/${postInfo._id}`}>
                            <icon.PencilSquare />
                            <span>Edit this post</span>
                        </Link>
                    </div>
                )}

                <div className="image">
                    <img src={`${process.env.REACT_APP_API_URL}/${postInfo.cover}`} alt="Post cover" />
                </div>
            </section>

            <section className="detail">
                <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
            </section>
        </div>
    );
}
